"""Sinh bài học khai cuộc từ các file mô tả trong tools/content/specs/.

Mỗi khai cuộc là một file specs/<id>.py (nước đi, lời giải thích, câu puzzle). Tập lệnh này:
  1. kiểm mọi nước đi hợp lệ bằng python-chess và kiểm các khẳng định trong lời giải thích (điều kiện trên bàn cờ thật);
  2. nhờ Stockfish chấm thế cờ cuối mỗi biến thể và chấm từng puzzle (đáp án đúng phải là nước tốt nhất hoặc gần tốt nhất,
     các đáp án gây nhiễu phải kém ít nhất 1,2 tốt);
  3. ghi data/lessons/<id>.js (và data/lessons/index.js).

Chạy từ thư mục gốc của kho:
  python3 tools/content/build_lessons.py            # tất cả khai cuộc
  python3 tools/content/build_lessons.py sicilian   # một khai cuộc
Cần: pip install chess, và Stockfish (apt-get install stockfish).
"""
import csv, importlib.util, json, os, pickle, random, re, sys
import chess, chess.engine

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SPECS = os.path.join(HERE, 'specs')
OUT = os.path.join(ROOT, 'data', 'lessons')
BUILD = os.path.join(ROOT, 'tools', 'build')
STOCKFISH = os.environ.get('STOCKFISH', '/usr/games/stockfish')
DEPTH_PUZ, DEPTH_EVAL = 18, 20
SQ = chess.parse_square
PN = {chess.PAWN: 'Tốt', chess.KNIGHT: 'Mã', chess.BISHOP: 'Tượng', chess.ROOK: 'Xe', chess.QUEEN: 'Hậu', chess.KING: 'Vua'}

errors = []
def err(m):
    errors.append(m); print('  LỖI:', m)

# ---------- bảng tên khai cuộc Lichess (CC0) ----------
def load_lichess():
    rows = []
    d = os.path.join(ROOT, 'tools', 'sources')
    for f in 'abcde':
        with open(os.path.join(d, f + '.tsv'), encoding='utf-8', newline='') as fh:
            rows += list(csv.DictReader(fh, delimiter='\t'))
    idx = {}
    for r in rows:
        b = chess.Board()
        for tok in r['pgn'].split():
            if re.fullmatch(r'\d+\.+', tok): continue
            b.push_san(tok)
        idx.setdefault(b.epd(), []).append((r['eco'], r['name'], len(b.move_stack)))
    return idx

def lichess_name(idx, sans):
    b = chess.Board(); eps = []
    for s in sans:
        b.push_san(s); eps.append(b.epd())
    for k in range(len(sans), 0, -1):
        if eps[k - 1] in idx:
            return max(idx[eps[k - 1]], key=lambda r: r[2]) + (k,)
    return None

# ---------- điều kiện kiểm khẳng định trong lời giải thích ----------
def run_check(b, mv, chk, before):
    """b: bàn cờ SAU nước đi, before: bàn cờ TRƯỚC nước đi, mv: nước đi."""
    k = chk[0]
    if k == 'att':      # quân ở ô chk[1] đang đánh/bảo vệ ô chk[2]
        return b.piece_at(SQ(chk[1])) is not None and SQ(chk[2]) in b.attacks(SQ(chk[1]))
    if k == 'empty': return b.piece_at(SQ(chk[1])) is None
    if k == 'piece':    # loại quân (không phân màu)
        p = b.piece_at(SQ(chk[1])); return p is not None and p.symbol().upper() == chk[2]
    if k == 'sym':      # quân đúng màu: chữ hoa = Trắng, chữ thường = Đen
        p = b.piece_at(SQ(chk[1])); return p is not None and p.symbol() == chk[2]
    if k == 'mob_gt':   # quân ở ô có hơn n nước đi hợp lệ (như thể đến lượt nó)
        bb = b.copy(); p = bb.piece_at(SQ(chk[1])); bb.turn = p.color
        return len([m for m in bb.legal_moves if m.from_square == SQ(chk[1])]) > chk[2]
    if k == 'mob_le':
        bb = b.copy(); p = bb.piece_at(SQ(chk[1])); bb.turn = p.color
        return len([m for m in bb.legal_moves if m.from_square == SQ(chk[1])]) <= chk[2]
    if k == 'no_pawn_file':   # bên chk[2] ('w'/'b') không còn tốt trên cột chk[1]
        f = 'abcdefgh'.index(chk[1]); col = chess.WHITE if chk[2] == 'w' else chess.BLACK
        return not any((p := b.piece_at(chess.square(f, r))) and p.piece_type == chess.PAWN and p.color == col for r in range(8))
    if k == 'open_file':      # không còn tốt nào (cả hai bên) trên cột chk[1]
        f = 'abcdefgh'.index(chk[1])
        return not any((p := b.piece_at(chess.square(f, r))) and p.piece_type == chess.PAWN for r in range(8))
    if k == 'can_castle':     # ('can_castle','w','k'|'q')
        col = chess.WHITE if chk[1] == 'w' else chess.BLACK
        return b.has_kingside_castling_rights(col) if chk[2] == 'k' else b.has_queenside_castling_rights(col)
    if k == 'castled': return before.is_castling(mv)
    if k == 'check': return b.is_check()
    if k == 'mate': return b.is_checkmate()
    if k == 'capture': return before.is_capture(mv)
    if k == 'attacked_by':    # ô chk[1] bị bên chk[2] đánh
        return b.is_attacked_by(chess.WHITE if chk[2] == 'w' else chess.BLACK, SQ(chk[1]))
    if k == 'defended':       # quân ở ô chk[1] được chính bên nó bảo vệ
        p = b.piece_at(SQ(chk[1])); return p is not None and b.is_attacked_by(p.color, SQ(chk[1]))
    if k == 'undefended':
        p = b.piece_at(SQ(chk[1])); return p is not None and not b.is_attacked_by(p.color, SQ(chk[1]))
    if k == 'no_pawn_guard':  # không có tốt nào của bên chk[2] đánh được ô chk[1]
        col = chess.WHITE if chk[2] == 'w' else chess.BLACK
        return not any(b.piece_type_at(q) == chess.PAWN for q in b.attackers(col, SQ(chk[1])))
    if k == 'pinned':         # quân ở ô chk[1] đang bị ghim
        p = b.piece_at(SQ(chk[1])); return p is not None and b.is_pinned(p.color, SQ(chk[1]))
    if k == 'pawns':          # bên chk[1] có đúng chk[2] tốt
        col = chess.WHITE if chk[1] == 'w' else chess.BLACK
        return len(b.pieces(chess.PAWN, col)) == chk[2]
    if k == 'moved_from': return chess.square_name(mv.from_square) == chk[1]
    if k == 'can_push_att':   # tốt ở chk[1] đẩy lên chk[2] sẽ đánh ô chk[3]
        p = b.piece_at(SQ(chk[1]))
        if not p or p.piece_type != chess.PAWN or b.piece_at(SQ(chk[2])) is not None: return False
        return bool(chess.BB_PAWN_ATTACKS[p.color][SQ(chk[2])] & chess.BB_SQUARES[SQ(chk[3])])
    err('điều kiện lạ ' + str(chk)); return False

def check_all(b, mv, checks, before, where):
    for chk in checks:
        if not run_check(b, mv, chk, before): err(f'{where}: điều kiện {chk} KHÔNG đúng')

# ---------- Stockfish ----------
class Engine:
    def __init__(self):
        os.makedirs(BUILD, exist_ok=True)
        self.path = os.path.join(BUILD, 'cache.pkl')
        self.cache = pickle.load(open(self.path, 'rb')) if os.path.exists(self.path) else {}
        self.e = chess.engine.SimpleEngine.popen_uci(STOCKFISH)
        self.e.configure({'Threads': 2, 'Hash': 256})
    def multipv(self, b, depth):
        key = ('m', b.fen(), depth)
        if key not in self.cache:
            n = b.legal_moves.count()
            infos = self.e.analyse(b, chess.engine.Limit(depth=depth), multipv=n)
            self.cache[key] = [(i['pv'][0].uci(), i['score'].pov(b.turn).score(mate_score=10000),
                                i['score'].pov(b.turn).is_mate()) for i in infos]
        return self.cache[key]
    def single(self, b, depth):
        key = ('s', b.fen(), depth)
        if key not in self.cache:
            i = self.e.analyse(b, chess.engine.Limit(depth=depth))
            self.cache[key] = (i['score'].white().score(mate_score=10000), i['pv'][0].uci())
        return self.cache[key]
    def close(self):
        pickle.dump(self.cache, open(self.path, 'wb')); self.e.quit()

def fmt(x): return f'{x:.1f}'.replace('.', ',')
def side_name(color): return 'Trắng' if color == chess.WHITE else 'Đen'

# ---------- dựng bài ----------
def build_steps(sans, plies, where):
    """plies: danh sách (san, lời giải thích[, điều kiện]) khớp từng nước của sans."""
    b = chess.Board(); steps = []
    if len(plies) != len(sans): err(f'{where}: có {len(sans)} nước nhưng {len(plies)} lời giải thích'); return None
    for i, (s, p) in enumerate(zip(sans, plies)):
        try: mv = b.parse_san(s)
        except Exception: err(f'{where} nước {i} {s}: không hợp lệ'); return None
        san = b.san(mv)
        if p[0] != san: err(f'{where} nước {i}: spec ghi {p[0]} nhưng nước thật là {san}'); return None
        who = side_name(b.turn); before = b.copy(); b.push(mv)
        check_all(b, mv, p[2] if len(p) > 2 else [], before, f'{where} nước {i} {san}')
        steps.append({'san': san, 'who': who, 'purpose': p[1], 'fen': b.fen()})
    return steps

def build_variation(spec, v, eng, lich):
    base = spec.BASE
    plies = list(base) + list(v['steps'])
    sans = [p[0] for p in plies]
    where = f"{spec.OPENING['id']}/{v['id']}"
    steps = build_steps(sans, plies, where)
    if steps is None: return None
    b = chess.Board()
    for s in sans: b.push_san(s)
    ev, _ = eng.single(b, DEPTH_EVAL)
    nm = lichess_name(lich, sans)
    out = {k: v[k] for k in ('id', 'name_vi', 'name_en', 'idea', 'strengths', 'weaknesses', 'plan_w', 'plan_b', 'tip')}
    out['eco'] = v.get('eco') or (nm[0] if nm else spec.OPENING['eco'])
    out['moves'] = ' '.join(sans)
    out['steps'] = steps
    out['lichess_name'] = nm[1] if nm else ''
    out['lichess_eco'] = nm[0] if nm else ''
    out['eval_cp'] = ev
    lim = v.get('max_eval', 120)
    print(f"  {v['id']}: {len(sans)} nước | Lichess: {nm[0]} {nm[1]} (khớp tới nước {nm[3]}) | máy chấm {ev:+d}cp")
    if abs(ev) > lim: err(f'{where}: thế cờ cuối lệch {ev:+d}cp (vượt {lim}); xem lại biến thể hoặc nới max_eval')
    return out

def plausibility(b, mv):
    """Điểm "hấp dẫn" của một nước sai: nước ăn quân, chiếu, phát triển quân, đẩy tốt trung tâm thì hấp dẫn;
    lùi về hàng cuối, đẩy tốt rìa, đi Xe/Vua vô cớ thì ít hấp dẫn (học sinh sẽ loại ngay)."""
    pc = b.piece_at(mv.from_square); me = b.turn
    own_back = 0 if me == chess.WHITE else 7
    sc = 0
    if b.is_capture(mv): sc += 2
    if b.gives_check(mv): sc += 2
    if pc.piece_type in (chess.KNIGHT, chess.BISHOP, chess.QUEEN):
        if chess.square_rank(mv.to_square) == own_back and chess.square_rank(mv.from_square) != own_back: sc -= 3
        elif chess.square_rank(mv.from_square) == own_back and chess.square_rank(mv.to_square) != own_back: sc += 1
        if pc.piece_type == chess.QUEEN and b.fullmove_number < 8: sc -= 1
    if pc.piece_type == chess.PAWN:
        f = chess.square_file(mv.from_square)
        sc += 1 if f in (2, 3, 4, 5) else -2
    if pc.piece_type in (chess.ROOK, chess.KING): sc -= 2
    if b.is_castling(mv): sc += 1
    return sc

def pick_distractors(b, ok_mv, sc, best, mate, forced):
    """Chọn tối đa 3 nước sai: hấp dẫn nhưng kém đáp án ít nhất 1,2 tốt (hoặc không chiếu hết, với bài chiếu hết)."""
    legal = {m.uci(): m for m in b.legal_moves}
    king_ok = b.piece_at(ok_mv.from_square).piece_type == chess.KING
    pre = [b.parse_san(s) for s in (forced or [])]
    c = []
    for uci, score, ismate in sc:
        mv = legal[uci]
        if mv == ok_mv or mv in pre: continue
        if not king_ok and b.piece_at(mv.from_square).piece_type == chess.KING: continue
        loss = best - score
        if mate:
            nb = b.copy(); nb.push(mv)
            if nb.is_checkmate() or ismate: continue
            c.append((-plausibility(b, mv), loss, mv))
        elif loss >= 120 and not ismate:
            c.append((-plausibility(b, mv) + (1 if loss > 700 else 0) * 3, loss, mv))
    c.sort(key=lambda x: (x[0], x[1]))
    out = list(pre); used = {}
    for mv in pre:
        pt = b.piece_at(mv.from_square).piece_type; used[pt] = used.get(pt, 0) + 1
    for _, _, mv in c:
        if len(out) >= 3: break
        pt = b.piece_at(mv.from_square).piece_type
        if used.get(pt, 0) >= 2: continue
        out.append(mv); used[pt] = used.get(pt, 0) + 1
    return out[:3]

def build_puzzle(spec, sp, pid, eng):
    where = f"{spec.OPENING['id']} puzzle [{sp['tag']}]"
    b = chess.Board()
    for s in sp['line'].split():
        try: b.push_san(s)
        except Exception: err(f'{where}: nước {s} trong line không hợp lệ'); return None
    mover = b.turn
    try: ok_mv = b.parse_san(sp['ok'])
    except Exception: err(f"{where}: đáp án {sp['ok']} không hợp lệ"); return None
    sc = eng.multipv(b, DEPTH_PUZ)
    best = max(s for _, s, _ in sc)
    scd = {u: s for u, s, _ in sc}
    ok_loss = best - scd[ok_mv.uci()]
    if ok_loss > sp.get('max_loss', 40): err(f"{where}: đáp án {sp['ok']} kém nước tốt nhất {ok_loss}cp")
    nb = b.copy(); nb.push(ok_mv)
    mate = nb.is_checkmate()
    check_all(nb, ok_mv, sp.get('verify', []), b, where)
    near = [b.san(chess.Move.from_uci(u)) for u, s, _ in sc if u != ok_mv.uci() and best - s <= 25]
    if near and not sp.get('multi_ok'):
        print(f'  ! {where}: còn nước ngang đáp án (≤0,25 tốt): {near}  — nếu chấp nhận được, thêm multi_ok=True')
    dist = pick_distractors(b, ok_mv, sc, best, mate, sp.get('distractors'))
    if len(dist) < 3: err(f'{where}: chỉ chọn được {len(dist)} nước sai')
    opts = [{'uci': ok_mv.uci(), 'label': b.san(ok_mv), 'correct': True, 'why': ''}]
    for mv in dist:
        lab = b.san(mv); nb2 = b.copy(); nb2.push(mv)
        loss = best - scd[mv.uci()]
        if mate:
            if not any(nb2.legal_moves): err(f'{where}: nước sai {lab} lại chiếu hết'); continue
            rep = eng.multipv(nb2, 12)[0][0]
            why = f"Chưa chiếu hết: {side_name(nb2.turn)} vẫn đáp được bằng {nb2.san(chess.Move.from_uci(rep))}."
        else:
            rep = chess.Move.from_uci(eng.multipv(nb2, 14)[0][0])
            cap = ''
            if nb2.is_capture(rep):
                tp = nb2.piece_at(rep.to_square)
                cap = f', ăn {PN[tp.piece_type]}' if tp else ', ăn Tốt'
            why = f'{side_name(nb2.turn)} đáp {nb2.san(rep)}{cap}. Máy chấm nước này kém nước đúng khoảng {fmt(loss / 100)} tốt.'
        if lab in sp.get('why', {}): why = sp['why'][lab]
        opts.append({'uci': mv.uci(), 'label': lab, 'correct': False, 'why': why})
    random.Random(hash_str(where)).shuffle(opts)
    ev = {u: int(min(best - s, 9999)) for u, s, _ in sc}
    return {'id': pid, 'var': sp['var'], 'fen': b.fen(), 'uci': ok_mv.uci(), 'san': b.san(ok_mv), 'ev': ev,
            'tag': sp['tag'], 'turn': 'w' if mover else 'b', 'q': sp['q'], 'hint': sp['hint'], 'opts': opts,
            'explain': sp['explain'], 'tip': sp['tip'], 'board': b.fen().split()[0], 'after': nb.fen().split()[0],
            'from': chess.square_name(ok_mv.from_square), 'to': chess.square_name(ok_mv.to_square)}

def hash_str(s):
    h = 0
    for ch in s: h = (h * 131 + ord(ch)) % 1000003
    return h

def build_trap(spec, t, eng):
    where = f"{spec.OPENING['id']}/bẫy {t['id']}"
    sans = t['moves'].split()
    b = chess.Board()
    for s in sans:
        try: b.push_san(s)
        except Exception: err(f'{where}: nước {s} không hợp lệ'); return None, None
    fen = b.fen()
    try: fin = b.parse_san(t['finish'])
    except Exception: err(f"{where}: nước chốt {t['finish']} không hợp lệ"); return None, None
    nb = b.copy(); nb.push(fin)
    if not nb.is_checkmate(): err(f"{where}: {t['finish']} không chiếu hết")
    check_all(nb, fin, t.get('verify', []), b, where)
    trap = {'id': t['id'], 'name_vi': t['name_vi'], 'moves': t['moves'], 'finish': b.san(fin), 'by': 'w' if b.turn else 'b',
            'text': t['text'], 'fen': fen}
    pz = build_puzzle(spec, {'var': 'trap', 'tag': 'Bẫy: ' + t['name_vi'], 'line': t['moves'], 'ok': t['finish'],
                             'q': t['q'], 'hint': t['hint'], 'explain': t['explain'], 'tip': t['tip'],
                             'verify': t.get('verify', [])}, 'tmp', eng)
    if pz: pz['trap_id'] = t['id']
    print(f"  bẫy {t['id']}: {t['finish']} chiếu hết ✓")
    return trap, pz

def build_opening(spec, eng, lich):
    op = spec.OPENING; print(f"== {op['id']} ({op['name_vi']})")
    out_vars = []
    for v in spec.VARS:
        r = build_variation(spec, v, eng, lich)
        if r: out_vars.append(r)
    ids = {v['id'] for v in spec.VARS} | {'base', 'trap'}
    traps, puzzles = [], []
    for t in getattr(spec, 'TRAPS', []):
        tr, pz = build_trap(spec, t, eng)
        if tr: traps.append(tr)
        if pz: puzzles.append(pz)
    for sp in spec.PUZZLES:
        if sp['var'] not in ids: err(f"puzzle {sp.get('tag')}: biến thể {sp['var']} không có")
        puzzles.append(build_puzzle(spec, sp, 'tmp', eng))
    puzzles = [p for p in puzzles if p]
    for n, p in enumerate(puzzles, 1): p['id'] = f"{op['id']}-{n}"
    opening = dict(op); opening['reviewed'] = False
    data = {'opening': opening, 'variations': out_vars, 'trap': traps[0] if traps else None, 'traps': traps, 'puzzles': puzzles}
    print(f'  => {len(out_vars)} biến thể, {len(puzzles)} puzzle, {len(traps)} bẫy')
    return data

def dump(o): return json.dumps(o, ensure_ascii=False, separators=(',', ':'))

def load_spec(name):
    p = importlib.util.spec_from_file_location('spec_' + name, os.path.join(SPECS, name + '.py'))
    m = importlib.util.module_from_spec(p); p.loader.exec_module(m); return m

def all_ids():
    return sorted(f[:-3] for f in os.listdir(SPECS) if f.endswith('.py') and not f.startswith('_'))

def write_index():
    items = []
    for name in all_ids():
        s = load_spec(name); o = s.OPENING
        if not os.path.exists(os.path.join(OUT, o['id'] + '.js')): continue
        items.append({'id': o['id'], 'name_vi': o['name_vi'], 'name_en': o['name_en'], 'eco': o['eco'], 'side': o['side'],
                      'first_moves': o['first_moves'], 'tagline': o['tagline'], 'group': o.get('group', ''),
                      'level': o.get('level', 1), 'variations': len(s.VARS),
                      'puzzles': len(s.PUZZLES) + len(getattr(s, 'TRAPS', [])), 'reviewed': False})
    items.sort(key=lambda x: (x['level'], x['name_vi']))
    with open(os.path.join(OUT, 'index.js'), 'w', encoding='utf-8') as f:
        f.write('/* Danh sách khai cuộc. Tạo bởi tools/content/build_lessons.py. Đừng sửa tay. */\nwindow.LESSON_INDEX=' + dump(items) + ';\n')
    print(f'Đã ghi data/lessons/index.js ({len(items)} khai cuộc)')

def main():
    ids = sys.argv[1:] or all_ids()
    os.makedirs(OUT, exist_ok=True)
    lich = load_lichess(); eng = Engine()
    try:
        for name in ids:
            data = build_opening(load_spec(name), eng, lich)
            with open(os.path.join(OUT, name + '.js'), 'w', encoding='utf-8') as f:
                f.write(f'/* Tạo bởi tools/content/build_lessons.py từ tools/content/specs/{name}.py. Đừng sửa tay. */\n'
                        f"(window.LESSONS=window.LESSONS||{{}})['{data['opening']['id']}']=" + dump(data) + ';\n')
    finally:
        eng.close()
    write_index()
    print('TỔNG LỖI:', len(errors))
    sys.exit(1 if errors else 0)

if __name__ == '__main__':
    main()
