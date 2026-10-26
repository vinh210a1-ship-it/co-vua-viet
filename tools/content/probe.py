"""Xem nhanh máy chấm một thế cờ: python3 tools/content/probe.py "e4 e5 Nf3" [độ sâu] [số nước]"""
import sys, chess, chess.engine
b = chess.Board()
for s in sys.argv[1].split(): b.push_san(s)
d = int(sys.argv[2]) if len(sys.argv) > 2 else 18
n = int(sys.argv[3]) if len(sys.argv) > 3 else 6
e = chess.engine.SimpleEngine.popen_uci('/usr/games/stockfish'); e.configure({'Threads': 3, 'Hash': 256})
print(b.fen(), 'đến lượt', 'Trắng' if b.turn else 'Đen')
for i in e.analyse(b, chess.engine.Limit(depth=d), multipv=n):
    pv = i['pv']; bb = b.copy(); sans = []
    for m in pv[:6]: sans.append(bb.san(m)); bb.push(m)
    print(f"{i['score'].white().score(mate_score=10000):+5d}  {' '.join(sans)}")
e.quit()
