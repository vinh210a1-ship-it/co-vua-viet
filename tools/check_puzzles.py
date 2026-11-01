#!/usr/bin/env python3
"""Kiểm kho câu đố theo chủ đề (data/puz). Chạy: python3 tools/check_puzzles.py [--engine N]
Kiểm: mọi nước hợp lệ; chủ đề 'Mate' và 'mateInN' kết thúc bằng chiếu hết đúng số nước; chủ đề tàn cuộc đúng loại quân;
chủ đề phong cấp có nước phong cấp; không trùng id trong cùng một chủ đề; mỗi mức có đủ câu.
--engine N: chấm Stockfish (độ sâu 12) N câu ngẫu nhiên, báo câu mà nước đáp án thua nước tốt nhất quá 150 cp (trừ khi dẫn tới chiếu hết)."""
import shutil, re, json, sys, random, glob, os, collections, chess, chess.engine
OK, bad = 0, []
def load(path):
    t = open(path, encoding='utf-8').read()
    return json.loads(t[t.index('=[') + 1: t.rindex(';')]) if "=[" in t else None
idx = open('data/puz/index.js', encoding='utf-8').read()
themes = json.loads(idx[idx.index('['): idx.rindex(']') + 1])
END = {'pawnEndgame': set(), 'rookEndgame': {chess.ROOK}, 'bishopEndgame': {chess.BISHOP}, 'knightEndgame': {chess.KNIGHT},
       'queenEndgame': {chess.QUEEN}, 'queenRookEndgame': {chess.QUEEN, chess.ROOK}}
allrows = []
for th in themes:
    t = th['id']; rows = load('data/puz/%s.js' % t)
    if rows is None: bad.append((t, 'không đọc được file')); continue
    if len(rows) != th['n']: bad.append((t, 'n trong index lệch'))
    if len({r[0] for r in rows}) != len(rows): bad.append((t, 'trùng id'))
    bands = collections.Counter('de' if r[3] < 1100 else 'vua' if r[3] < 1600 else 'kho' for r in rows)
    if min(bands.get(k, 0) for k in ('de', 'vua', 'kho')) < 10: bad.append((t, 'mức thiếu câu %s' % dict(bands)))
    for pid, fen, mv, rt in rows:
        try:
            b = chess.Board(fen); ms = mv.split(); promo = False
            first = b.copy(); 
            for u in ms:
                m = chess.Move.from_uci(u)
                if m not in b.legal_moves: raise ValueError('nước không hợp lệ ' + u)
                if m.promotion: promo = True
                b.push(m)
            if len(ms) < 2: raise ValueError('quá ngắn')
            solver_moves = (len(ms)) // 2  # số nước của người giải (nước đầu là của đối thủ)
            if t.endswith('Mate') or t.startswith('mateIn'):
                if not b.is_checkmate(): raise ValueError('không kết thúc bằng chiếu hết')
            mm = re.match(r'mateIn(\d)', t)
            if mm and solver_moves != int(mm.group(1)): raise ValueError('sai số nước chiếu hết %d' % solver_moves)
            if t in END:
                kinds = {p.piece_type for p in chess.Board(fen).piece_map().values()} - {chess.KING, chess.PAWN}
                if kinds != END[t]: raise ValueError('loại quân không khớp tàn cuộc: %s' % kinds)
            if t == 'promotion' and not promo: raise ValueError('không có nước phong cấp')
        except Exception as e:
            bad.append((t, pid, str(e)))
        allrows.append((t, pid, fen, mv))
print('chủ đề:', len(themes), '| câu:', len(allrows))
n = int(sys.argv[sys.argv.index('--engine') + 1]) if '--engine' in sys.argv else 0
if n:
    eng = chess.engine.SimpleEngine.popen_uci(shutil.which('stockfish') or '/usr/games/stockfish'); eng.configure({'Threads': 1, 'Hash': 64})
    rnd = random.Random(1101); worst = []
    for t, pid, fen, mv in rnd.sample(allrows, n):
        b = chess.Board(fen); ms = mv.split(); b.push(chess.Move.from_uci(ms[0])); ans = chess.Move.from_uci(ms[1])
        lim = chess.engine.Limit(depth=12)
        best = eng.analyse(b, lim)['score'].pov(b.turn).score(mate_score=10000)
        b.push(ans); got = eng.analyse(b, lim)['score'].pov(not b.turn).score(mate_score=10000)
        if best - got > 150: bad.append((t, pid, 'đáp án kém nước tốt nhất %d cp' % (best - got)))
        worst.append(best - got)
    eng.quit(); print('Stockfish chấm %d câu; lệch trung bình %.1f cp' % (n, sum(worst) / n))
print('LỖI:', len(bad))
for x in bad[:40]: print(' ', x)
