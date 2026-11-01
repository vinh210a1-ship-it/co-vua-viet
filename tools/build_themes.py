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
GROUP_OLD = {'mateIn1':'Chiếu hết','mateIn2':'Chiếu hết','mateIn3':'Chiếu hết','backRankMate':'Chiếu hết','smotheredMate':'Chiếu hết'}
G_ADV, G_MATE, G_END = 'Chiến thuật nâng cao', 'Mẫu chiếu hết kinh điển', 'Tàn cuộc'
# Chủ đề thêm ngày 01/11/2026 (nối đuôi để 12 chủ đề cũ giữ nguyên kết quả bốc ngẫu nhiên). (id, tên, mô tả, mẹo, nhóm)
NEW = [
 ('sacrifice', 'Hy sinh', 'Cho đi quân để đổi lấy thứ lớn hơn: chiếu hết, thắng quân hoặc thế trận.', 'Hỏi: sau khi cho quân đi, đối thủ bị ép đi nước nào? Hy sinh đáng giá khi các nước ép buộc dẫn tới chiếu hết hoặc thắng lại nhiều hơn.', G_ADV),
 ('attraction', 'Dụ vào', 'Ép quân đối thủ, thường là Vua, đi vào một ô xấu để rồi bị đánh.', 'Nhìn ô mà Vua đối thủ bị ép đứng vào: từ đó nó có bị đòn đôi, chiếu hết hay bị ghim không? Thường phải hy sinh một quân để dụ.', G_ADV),
 ('exposedKing', 'Vua bị phơi trần', 'Vua thiếu quân che chắn nên dễ bị tấn công liên tiếp.', 'Đếm các ô quanh Vua đối thủ và quân nào của mình có thể chiếu tiếp. Khi Vua phơi trần, nước chiếu liên tiếp thường mạnh hơn thắng quân thường.', G_ADV),
 ('quietMove', 'Nước im lặng', 'Nước đi không chiếu, không ăn quân nhưng tạo ra đòn dọa mà đối thủ không đỡ nổi.', 'Khi mọi nước chiếu và nước ăn đều không hiệu quả, hãy tìm nước chuẩn bị: nâng quân lên vị trí tốt, chặn đường chạy của Vua.', G_ADV),
 ('clearance', 'Dọn đường', 'Đưa một quân đi khỏi để mở ô hoặc mở đường cho quân khác, thường kèm đòn dọa.', 'Hỏi: quân nào của mình đang đứng chắn đường quân khác? Dời nó đi bằng một nước có đòn dọa để đối thủ không kịp phản ứng.', G_ADV),
 ('intermezzo', 'Nước xen', 'Thay vì đáp ngay nước đối thủ mong đợi, chen vào một nước dọa lớn hơn trước.', 'Khi đối thủ vừa ăn quân của bạn, đừng vội ăn lại. Tự hỏi: có nước chiếu hoặc dọa lớn hơn để đi trước không?', G_ADV),
 ('interference', 'Chắn đường', 'Đặt quân vào giữa hai quân của đối thủ để cắt đường bảo vệ hoặc đường tấn công của họ.', 'Tìm hai quân của đối thủ đang bảo vệ nhau qua một đường. Đặt quân vào giữa đường đó, nhất là khi quân chắn được bảo vệ.', G_ADV),
 ('xRayAttack', 'Tấn công xuyên', 'Một quân tấn công hoặc bảo vệ một ô xuyên qua quân khác đứng cùng đường đi.', 'Xe, Hậu, Tượng vẫn nhìn xuyên qua quân đứng giữa. Sau khi hai quân đổi chác ở giữa, quân phía sau mới là quân quyết định.', G_ADV),
 ('capturingDefender', 'Ăn quân bảo vệ', 'Loại bỏ quân đang bảo vệ rồi ăn quân đang được bảo vệ.', 'Với mỗi quân đối thủ, hỏi: ai đang bảo vệ nó? Nếu ăn hoặc đuổi quân bảo vệ được, quân kia thành quân treo.', G_ADV),
 ('doubleCheck', 'Chiếu đôi', 'Hai quân cùng chiếu Vua một lúc, đối thủ chỉ còn cách đi Vua.', 'Chiếu đôi thường xuất hiện sau một nước chiếu lộ. Vì chỉ có Vua được đi, hãy tính trước Vua có chạy được ô nào không.', G_ADV),
 ('discoveredCheck', 'Chiếu lộ', 'Dời một quân đi để quân phía sau chiếu Vua, trong khi quân vừa dời tự tạo thêm đòn dọa.', 'Quân dời đi được phép làm gì cũng được vì đối thủ phải lo chiếu: ăn quân, dọa Hậu, hoặc chiếu thêm.', G_ADV),
 ('zugzwang', 'Zugzwang', 'Bên nào đến lượt đi thì bất lợi, vì mọi nước đi đều làm thế cờ xấu hơn.', 'Hãy liệt kê các nước đi của đối thủ rồi tìm nước khiến mọi lựa chọn của họ đều xấu. Thường gặp ở tàn cuộc.', G_ADV),
 ('advancedPawn', 'Tốt tiến sâu', 'Tốt đã đi gần hàng phong cấp và trở thành mối đe dọa quyết định.', 'Tốt gần hàng cuối buộc đối thủ phải lo giữ. Hãy xem quân nào đang chặn hoặc bảo vệ ô phong cấp.', G_ADV),
 ('promotion', 'Phong cấp', 'Đưa Tốt xuống hàng cuối để thành quân mạnh, thường là Hậu.', 'Đếm quân bảo vệ ô phong cấp. Có khi phải ăn quân hoặc dụ quân bảo vệ đi để Tốt đi qua.', G_ADV),
 ('defensiveMove', 'Phòng thủ chính xác', 'Tìm nước duy nhất để không thua hoặc không mất lợi thế.', 'Đừng chỉ tìm nước tấn công. Hỏi: đối thủ đang dọa gì? Nước nào vừa đỡ đòn dọa đó vừa không tạo thêm điểm yếu?', G_ADV),
 ('kingsideAttack', 'Tấn công cánh Vua', 'Tấn công Vua đối thủ khi họ đã nhập thành ngắn về cánh Vua.', 'Đếm số quân của mình có thể hướng về cánh Vua đối thủ. Tấn công thường cần ít nhất ba quân.', G_ADV),
 ('queensideAttack', 'Tấn công cánh Hậu', 'Tấn công Vua đối thủ khi họ đã nhập thành dài về cánh Hậu.', 'Mở cột bằng cách đẩy Tốt hoặc hy sinh Tốt, rồi đưa Xe và Hậu vào. Vua nhập thành dài thường kém an toàn hơn.', G_ADV),
 ('operaMate', 'Chiếu hết Opera', 'Tượng ghim một quân, rồi Xe chiếu hết ở hàng cuối. Tên theo ván Opera của Paul Morphy (Paris, 1858).', 'Tìm hàng cuối của đối thủ: Tượng ghim quân bảo vệ ô chiếu, Xe đến chiếu hết.', G_MATE),
 ('pillsburysMate', 'Chiếu hết Pillsbury', 'Xe chiếu hết ở biên, Tượng khống chế các ô thoát của Vua.', 'Vua nhập thành ngắn, Tốt đã đi mất: Tượng đứng trên đường chéo dài giữ ô thoát, Xe vào cột bên cạnh để chiếu hết.', G_MATE),
 ('anastasiaMate', 'Chiếu hết Anastasia', 'Mã và Xe nhốt Vua giữa mép bàn cờ và quân của chính nó.', 'Vua sát mép bàn cờ, Mã giữ các ô thoát, Xe chiếu hết dọc theo hàng.', G_MATE),
 ('arabianMate', 'Chiếu hết Ả Rập', 'Mã và Xe dồn Vua vào góc bàn cờ, Mã bảo vệ Xe.', 'Vua ở góc: Xe chiếu sát bên cạnh và Mã bảo vệ Xe, đồng thời giữ ô thoát duy nhất.', G_MATE),
 ('epauletteMate', 'Chiếu hết vai áo (Epaulette)', 'Vua bị hai quân của chính mình kẹp hai bên, Hậu chiếu hết.', 'Khi Vua bị hai Xe của chính nó đứng cạnh, ô thoát biến mất. Một nước chiếu của Hậu là chiếu hết.', G_MATE),
 ('hookMate', 'Chiếu hết cái móc (Hook)', 'Xe chiếu hết, Mã hỗ trợ, và một Tốt chặn đường chạy của Vua.', 'Nhìn Mã bảo vệ Xe, rồi nhìn Tốt chặn ô thoát: ba quân phối hợp tạo thành hình cái móc.', G_MATE),
 ('cornerMate', 'Chiếu hết góc', 'Xe hoặc Hậu giam Vua ở góc, Mã chiếu hết.', 'Giam Vua vào góc bằng Xe hoặc Hậu, rồi tìm ô để Mã chiếu hết.', G_MATE),
 ('dovetailMate', 'Chiếu hết đuôi én (Dovetail)', 'Hậu chiếu hết một Vua đứng sát, khi hai ô thoát cuối cùng bị chính quân của Vua chặn.', 'Hậu đứng chéo sát Vua và được bảo vệ. Hai ô thoát còn lại của Vua đã có quân mình chiếm.', G_MATE),
 ('pawnEndgame', 'Tàn cuộc Tốt', 'Chỉ còn Vua và Tốt hai bên.', 'Đếm nhịp: Tốt nào phong cấp trước? Dùng Vua để chặn Tốt và giữ ô đối vua.', G_END),
 ('rookEndgame', 'Tàn cuộc Xe', 'Còn Xe và Tốt.', 'Xe thích hoạt động: đặt Xe sau Tốt thông và đưa Xe ra xa cắt Vua đối thủ.', G_END),
 ('bishopEndgame', 'Tàn cuộc Tượng', 'Còn Tượng và Tốt.', 'Chú ý màu ô của Tượng và Tốt đối thủ. Tượng cùng màu thì hòa dễ hơn, Tượng khác màu thì mạnh khi chủ động.', G_END),
 ('knightEndgame', 'Tàn cuộc Mã', 'Còn Mã và Tốt.', 'Mã đi chậm, nên đếm kỹ số nước. Mã đứng trung tâm và gần Tốt thông thì mạnh.', G_END),
 ('queenEndgame', 'Tàn cuộc Hậu', 'Còn Hậu và Tốt.', 'Chú ý chiếu liên tục và Vua nào an toàn hơn. Hậu có thể vừa hỗ trợ Tốt vừa dọa Vua đối thủ.', G_END),
 ('queenRookEndgame', 'Tàn cuộc Hậu và Xe', 'Còn Hậu, Xe và Tốt.', 'Nhiều quân mạnh nghĩa là chiếu liên tục và đòn đôi xuất hiện thường xuyên. Giữ Vua an toàn trước khi tấn công.', G_END),
]
rnd = random.Random(20261026)
want = {t[0] for t in THEMES}
newid = {t[0] for t in NEW}
pool = {(t, b[0]): [] for t in want | newid for b in BANDS}
loose = {(t, b[0]): [] for t in newid for b in BANDS}
with open(SRC, encoding='utf-8') as f:
    for r in csv.DictReader(f):
        if int(r['RatingDeviation']) > 100: continue
        th = set(r['Themes'].split())
        if 'veryLong' in th or 'masterVsMaster' in th: continue
        pop, plays = int(r['Popularity']), int(r['NbPlays'])
        strict = pop >= 92 and plays >= 3000 and int(r['RatingDeviation']) <= 80
        if not strict and not (pop >= 80 and plays >= 500): continue
        rating = int(r['Rating'])
        for t in (want | newid) & th:
            for b in BANDS:
                if b[2] <= rating < b[3]:
                    row = (r['PuzzleId'], r['FEN'], r['Moves'], rating)
                    if strict: pool[(t, b[0])].append(row)
                    elif t in newid: loose[(t, b[0])].append(row)

END = {'pawnEndgame': set(), 'rookEndgame': {chess.ROOK}, 'bishopEndgame': {chess.BISHOP}, 'knightEndgame': {chess.KNIGHT},
       'queenEndgame': {chess.QUEEN}, 'queenRookEndgame': {chess.QUEEN, chess.ROOK}}
def check(t, fen, moves):
    """Mọi nước phải hợp lệ; chủ đề chiếu hết thì thế cuối phải là chiếu hết; chủ đề tàn cuộc thì thế đầu chỉ có đúng loại quân đó (và Tốt, Vua)."""
    b = chess.Board(fen)
    if t in END and {p.piece_type for p in b.piece_map().values()} - {chess.KING, chess.PAWN} != END[t]: return False
    if t == 'promotion' and not any(len(m) == 5 for m in moves.split()): return False
    for m in moves.split():
        mv = chess.Move.from_uci(m)
        if mv not in b.legal_moves: return False
        b.push(mv)
    if t.startswith('mate') or t.endswith('Mate'): return b.is_checkmate()
    return True

index, total, used = [], 0, set()
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
    index.append({'id': t, 'name': vi, 'desc': desc, 'tip': TIPS[t], 'group': GROUP_OLD.get(t, 'Chiến thuật cơ bản'), 'n': len(rows)})
    used.update(p[0] for p in rows)
    print(t, len(rows), collections.Counter('de' if p[3] < 1100 else 'vua' if p[3] < 1600 else 'kho' for p in rows))
for t, vi, desc, tip, group in NEW:
    rows = []
    for b in BANDS:
        got = []
        for src in (pool[(t, b[0])], loose[(t, b[0])]):  # nhóm chặt trước, thiếu mới lấy nhóm nới
            c = [p for p in src if p[0] not in used]; rnd.shuffle(c)
            for p in c:
                if len(got) >= PER_BAND: break
                if check(t, p[1], p[2]) and all(p[0] != g[0] for g in got): got.append(p)
        got.sort(key=lambda p: p[3]); rows += got
    cnt = collections.Counter('de' if p[3] < 1100 else 'vua' if p[3] < 1600 else 'kho' for p in rows)
    if min(cnt.get(k, 0) for k in ('de', 'vua', 'kho')) < 10:
        print('BỎ', t, dict(cnt)); continue
    total += len(rows); used.update(p[0] for p in rows)
    open(OUT + t + '.js', 'w', encoding='utf-8').write(
        '/* Chủ đề "' + vi + '": câu đố lọc từ kho Lichess (CC0). Tạo bởi tools/build_themes.py, đừng sửa tay. */\n' +
        "(window.PUZT=window.PUZT||{})['" + t + "']=" + json.dumps([list(p) for p in rows], ensure_ascii=False, separators=(',', ':')) + ';\n')
    index.append({'id': t, 'name': vi, 'desc': desc, 'tip': tip, 'group': group, 'n': len(rows)})
    print(t, len(rows), dict(cnt))
open(OUT + 'index.js', 'w', encoding='utf-8').write(
    '/* Danh sách chủ đề câu đố. Tạo bởi tools/build_themes.py. */\nconst PUZ_THEMES=' + json.dumps(index, ensure_ascii=False, indent=1) + ';\n')
print('tổng', total)
