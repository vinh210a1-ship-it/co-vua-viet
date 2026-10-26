#!/usr/bin/env python3
"""Lọc kho câu đố Lichess (CC0, lichess_db_puzzle.csv) thành các bộ theo chủ đề cho web.
Chạy: python3 tools/build_themes.py <puzzles.csv>. Ghi data/puz/<chủ đề>.js và data/puz/index.js.
Mỗi câu: [id, fen, "nước đi UCI cách nhau bằng dấu cách", độ khó Lichess]. Nước đầu là nước của đối thủ."""
import csv, json, random, sys, collections, chess

SRC = sys.argv[1]
OUT = 'data/puz/'
PER_BAND = 20
BANDS = [('de', 'Dễ', 400, 1100), ('vua', 'Vừa', 1100, 1600), ('kho', 'Khó', 1600, 2200)]
THEMES = [  # id Lichess, tên Việt, mô tả
 ('mateIn1', 'Chiếu hết 1 nước', 'Tìm nước chiếu hết ngay.'),
 ('mateIn2', 'Chiếu hết 2 nước', 'Đi một nước, đối thủ buộc phải đỡ, rồi chiếu hết.'),
 ('mateIn3', 'Chiếu hết 3 nước', 'Chuỗi ba nước dẫn tới chiếu hết.'),
 ('backRankMate', 'Chiếu hết hàng cuối', 'Vua bị kẹt sau hàng Tốt của chính nó.'),
 ('smotheredMate', 'Chiếu hết ngạt', 'Mã chiếu hết khi Vua bị quân mình vây kín.'),
 ('fork', 'Đòn đôi (đòn nĩa)', 'Một quân tấn công hai quân cùng lúc.'),
 ('pin', 'Ghim', 'Quân bị ghim không dám rời chỗ vì sau nó là quân quý hơn.'),
 ('skewer', 'Xiên', 'Ép quân quý phải tránh để ăn quân đứng sau nó.'),
 ('discoveredAttack', 'Tấn công lộ', 'Dời một quân để mở đường cho quân phía sau tấn công.'),
 ('hangingPiece', 'Quân treo', 'Tìm quân không được bảo vệ để ăn.'),
 ('trappedPiece', 'Quân bị nhốt', 'Quân không còn đường thoát và sẽ bị bắt.'),
 ('deflection', 'Dụ khai', 'Kéo quân bảo vệ rời khỏi vị trí quan trọng.'),
]
TIPS = {  # lời khuyên chung của từng chủ đề (viết tay, không phải giải thích riêng từng câu)
 'mateIn1': 'Liệt kê mọi nước chiếu. Nước nào mà Vua không chạy được, không ăn được quân chiếu và không chắn được là chiếu hết.',
 'mateIn2': 'Tìm nước ép đối thủ vào thế chỉ còn một cách đỡ, rồi chiếu hết. Thử cả những nước chiếu lẫn nước im lặng.',
 'mateIn3': 'Bắt đầu từ ô cuối cùng: Vua bị chiếu hết ở đâu? Rồi đi ngược lại, dùng nước chiếu để ép Vua vào đó.',
 'backRankMate': 'Vua kẹt sau hàng Tốt của mình thì một Xe hoặc Hậu chiếu ở hàng cuối có thể là chiếu hết. Hãy nhìn xem quân nào đang bảo vệ hàng cuối.',
 'smotheredMate': 'Vua bị chính quân mình vây kín thì chỉ một con Mã chiếu cũng đủ hết cờ. Thường phải hy sinh Hậu để dồn Vua vào góc.',
 'fork': 'Tìm ô mà quân của bạn đứng đó tấn công hai mục tiêu cùng lúc, tốt nhất là một trong hai là chiếu Vua.',
 'pin': 'Quân bị ghim không được rời vị trí vì sau nó là quân quý hơn. Hãy tấn công thêm vào quân bị ghim.',
 'skewer': 'Xiên là ghim ngược: ép quân quý ở phía trước phải tránh, rồi ăn quân đứng sau nó.',
 'discoveredAttack': 'Dời một quân đi để mở đường cho quân phía sau tấn công. Quân vừa dời đi có thể tự gây ra một đòn dọa khác.',
 'hangingPiece': 'Trước khi đi, hỏi: quân nào của đối thủ không có ai bảo vệ? Ăn nó, hoặc dọa nó bằng nước có lợi.',
 'trappedPiece': 'Đếm các ô mà quân đó có thể thoát. Nếu mọi ô đều bị tấn công, hãy dọa nó thêm một lần nữa.',
 'deflection': 'Quân đối thủ đang làm một việc quan trọng (bảo vệ quân, chắn nước chiếu). Ép nó rời đi bằng một đòn dọa hoặc một lần hy sinh.',
}
rnd = random.Random(20261026)
want = {t[0] for t in THEMES}
pool = {(t, b[0]): [] for t in want for b in BANDS}
with open(SRC, encoding='utf-8') as f:
    for r in csv.DictReader(f):
        if int(r['Popularity']) < 92 or int(r['NbPlays']) < 3000 or int(r['RatingDeviation']) > 80: continue
        th = set(r['Themes'].split())
        if 'veryLong' in th or 'masterVsMaster' in th: continue
        rating = int(r['Rating'])
        for t in want & th:
            for b in BANDS:
                if b[2] <= rating < b[3]: pool[(t, b[0])].append((r['PuzzleId'], r['FEN'], r['Moves'], rating))

def check(t, fen, moves):
    """Mọi nước phải hợp lệ; chủ đề chiếu hết thì thế cuối phải là chiếu hết."""
    b = chess.Board(fen)
    for m in moves.split():
        mv = chess.Move.from_uci(m)
        if mv not in b.legal_moves: return False
        b.push(mv)
    if t.startswith('mate') or t in ('backRankMate', 'smotheredMate'): return b.is_checkmate()
    return True

index, total = [], 0
for t, vi, desc in THEMES:
    rows = []
    for b in BANDS:
        c = pool[(t, b[0])]; rnd.shuffle(c); got = []
        for p in c:
            if len(got) >= PER_BAND: break
            if check(t, p[1], p[2]): got.append(p)
        got.sort(key=lambda p: p[3]); rows += got
    total += len(rows)
    open(OUT + t + '.js', 'w', encoding='utf-8').write(
        '/* Chủ đề "' + vi + '": câu đố lọc từ kho Lichess (CC0). Tạo bởi tools/build_themes.py, đừng sửa tay. */\n' +
        "(window.PUZT=window.PUZT||{})['" + t + "']=" + json.dumps([list(p) for p in rows], ensure_ascii=False, separators=(',', ':')) + ';\n')
    index.append({'id': t, 'name': vi, 'desc': desc, 'tip': TIPS[t], 'n': len(rows)})
    print(t, len(rows), collections.Counter('de' if p[3] < 1100 else 'vua' if p[3] < 1600 else 'kho' for p in rows))
open(OUT + 'index.js', 'w', encoding='utf-8').write(
    '/* Danh sách chủ đề câu đố. Tạo bởi tools/build_themes.py. */\nconst PUZ_THEMES=' + json.dumps(index, ensure_ascii=False, indent=1) + ';\n')
print('tổng', total)
