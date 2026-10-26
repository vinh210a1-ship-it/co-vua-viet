"""Chuyển 10 câu tàn cuộc của thầy (tools/sources/tan-cuoc-10-cau.json) sang dạng dùng trong web:
thêm thế cờ đầy đủ (fen), nước đúng (uci, san) và điểm máy chấm từng nước (ev), rồi kiểm lại bằng Stockfish.
Chạy từ thư mục gốc của kho:  python3 tools/build_endgame.py
"""
import json, os, sys, chess, chess.engine

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'tools', 'sources', 'tan-cuoc-10-cau.json')
OUT = os.path.join(ROOT, 'data', 'tan-cuoc.js')
E = chess.engine.SimpleEngine.popen_uci('/usr/games/stockfish'); E.configure({'Threads': 1, 'Hash': 128})
errors = []
def err(m): errors.append(m); print('LỖI:', m)

out = []
for p in json.load(open(SRC, encoding='utf-8')):
    b = chess.Board(p['board'] + ' ' + p['turn'] + ' - - 0 1')
    if not b.is_valid(): err('thế không hợp lệ ở câu %d' % p['id']); continue
    ok = [o for o in p['opts'] if o['correct']]
    if len(ok) != 1: err('câu %d không có đúng một đáp án' % p['id']); continue
    mv = chess.Move.from_uci(ok[0]['uci'])
    if mv not in b.legal_moves: err('đáp án câu %d không hợp lệ' % p['id']); continue
    san = b.san(mv)
    if san != ok[0]['label']: err('câu %d: nhãn %s khác SAN %s' % (p['id'], ok[0]['label'], san))
    for o in p['opts']:
        if chess.Move.from_uci(o['uci']) not in b.legal_moves: err('câu %d: lựa chọn %s không hợp lệ' % (p['id'], o['label']))
    nb = b.copy(); nb.push(mv)
    if nb.board_fen() != p['after']: err('câu %d: thế sau nước đúng khác trường after' % p['id'])
    sc = {i['pv'][0]: i['score'].pov(b.turn) for i in E.analyse(b, chess.engine.Limit(depth=18), multipv=60)}
    best = max(s.score(mate_score=10000) for s in sc.values())
    loss = best - sc[mv].score(mate_score=10000)
    if loss > 40: err('câu %d: máy chấm nước đúng kém nước tốt nhất %d điểm' % (p['id'], loss))
    ev = {m.uci(): int(min(best - v.score(mate_score=10000), 9999)) for m, v in sc.items()}
    q = dict(p); q.update(id=100 + p['id'], var='endgame', fen=b.fen(), uci=ok[0]['uci'], san=san, ev=ev)
    out.append(q)
    print('câu %2d  %-24s đáp án %-6s  máy: nước tốt nhất kém %d' % (p['id'], p['tag'], san, loss))
E.quit()
if errors: print('\n%d lỗi, không ghi file.' % len(errors)); sys.exit(1)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('/* Tạo bởi tools/build_endgame.py từ 10 câu tàn cuộc của thầy. Đừng sửa tay. */\nconst PUZ_END = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('Đã ghi', OUT)
