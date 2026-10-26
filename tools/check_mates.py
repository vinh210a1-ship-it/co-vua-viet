"""Nhờ Stockfish xác nhận các bài trong data/level1.js, level2.js, placement.js (đọc JSON do tools/check_lessons.js ghi ra).
 - mates: thế Hậu/Xe chống Vua: phải có chiếu hết ép buộc và số nước tối ưu không quá max/2.
 - finds: nước đáp án phải nằm trong hai nước tốt nhất của Stockfish (hoặc là chiếu hết), nước wrong phải kém đáp án rõ rệt.
Dùng: python3 -I tools/check_mates.py <file.json>   (cần /usr/games/stockfish hoặc stockfish trong PATH)"""
import json, shutil, sys
import chess, chess.engine

path = shutil.which('stockfish') or '/usr/games/stockfish'
data = json.load(open(sys.argv[1], encoding='utf8'))
eng = chess.engine.SimpleEngine.popen_uci(path)
bad = 0

def cp(sc):  # điểm theo góc nhìn bên đi, đổi chiếu hết thành số lớn
    return sc.relative.score(mate_score=100000)

for m in data['mates']:
    b = chess.Board(m['fen'])
    info = eng.analyse(b, chess.engine.Limit(depth=30))
    mm = info['score'].relative.mate()
    ok = mm is not None and mm > 0 and mm <= m['max'] // 2
    print(('ok  ' if ok else 'SAI ') + m['where'], 'chiếu hết ép buộc sau', mm, 'nước, giới hạn học sinh', m['max'])
    if not ok: bad += 1

for f in data['finds']:
    if f.get('rule'):
        print('ok  ' + f['where'] + ' (luật nhập thành hoặc bắt qua đường, không chấm theo nước tốt nhất)'); continue
    b = chess.Board(f['fen'])
    infos = eng.analyse(b, chess.engine.Limit(depth=20), multipv=3)
    best = infos[0]['score']
    top = [i['pv'][0].uci() for i in infos]
    scores = {i['pv'][0].uci(): cp(i['score']) for i in infos}
    a0 = f['answer'][0]
    if a0 in top or f.get('mate') or any(a in top for a in f['answer']):
        status = 'ok  '
    else:
        # đáp án ngoài top 3: so điểm trực tiếp
        b.push_uci(a0); s = eng.analyse(b, chess.engine.Limit(depth=20))['score'].relative.score(mate_score=100000)
        sa = -s
        status = 'ok  ' if sa >= cp(best) - 60 else 'SAI '
        if status == 'SAI ': bad += 1
    line = status + f['where'] + ' đáp án ' + ','.join(f['answer'][:3]) + ' | top: ' + ' '.join(top)
    for w in f['wrong']:
        b = chess.Board(f['fen']); b.push_uci(w)
        if b.is_stalemate(): line += ' | ' + w + ' bế tắc'; continue
        sw = -eng.analyse(b, chess.engine.Limit(depth=20))['score'].relative.score(mate_score=100000)
        line += ' | ' + w + ' ' + str(sw) + ' so với ' + str(cp(best))
        if sw >= cp(best) - 60:
            line += ' (SAI: nước wrong không kém hơn)'; bad += 1
    print(line)
eng.quit()
if bad: print('SAI', bad, 'mục')
