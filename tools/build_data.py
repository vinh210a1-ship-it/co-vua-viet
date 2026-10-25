import json, sys, chess, chess.engine, re
from lessons import OPENING, BASE, VARS, TRAP
ALL = json.load(open('openings_all.json',encoding='utf-8'))
E = chess.engine.SimpleEngine.popen_uci('/usr/games/stockfish'); E.configure({'Threads':1,'Hash':128})
SQ = chess.parse_square
errors=[]
def err(m): errors.append(m); print('LỖI:',m)

def run_check(b_after, chk, ply_color):
    k=chk[0]
    if k=='att':
        pc=b_after.piece_at(SQ(chk[1]))
        return pc is not None and SQ(chk[2]) in b_after.attacks(SQ(chk[1]))
    if k=='empty': return b_after.piece_at(SQ(chk[1])) is None
    if k=='piece':
        pc=b_after.piece_at(SQ(chk[1])); return pc is not None and pc.symbol().upper()==chk[2]
    if k=='mob_gt':
        b=b_after.copy(); pc=b.piece_at(SQ(chk[1])); b.turn=pc.color
        return len([m for m in b.legal_moves if m.from_square==SQ(chk[1])])>chk[2]
    if k=='no_pawn_file':
        f='abcdefgh'.index(chk[1]); col=chess.BLACK if chk[2]=='b' else chess.WHITE
        return not any((p:=b_after.piece_at(chess.square(f,r))) and p.piece_type==chess.PAWN and p.color==col for r in range(8))
    if k=='castle_ok':
        b=b_after.copy(); b.turn=chess.WHITE
        return chess.Move.from_uci('e1g1') in b.legal_moves
    if k=='can_push_att':
        pc=b_after.piece_at(SQ(chk[1]))
        if not pc or pc.piece_type!=chess.PAWN: return False
        if b_after.piece_at(SQ(chk[2])) is not None: return False
        atk=chess.BB_PAWN_ATTACKS[pc.color][SQ(chk[2])]
        return bool(atk & chess.BB_SQUARES[SQ(chk[3])])
    err('điều kiện lạ '+str(chk)); return False

def epd_after(sans):
    bb=chess.Board()
    for x in sans: bb.push_san(x)
    return bb.epd()
_idx={}
for eco,name,pgn in ALL:
    bb=chess.Board()
    for x in pgn.split(): bb.push_san(x)
    _idx.setdefault(bb.epd(),[]).append((eco,name,pgn))
def named(sans):
    # tên theo VỊ TRÍ (xử lý hoán đổi nước): dòng Lichess dài nhất mà ta đi qua trùng thế cờ
    best=None
    for k in range(len(sans),0,-1):
        e=epd_after(sans[:k])
        if e in _idx:
            best=max(_idx[e],key=lambda r:len(r[2].split())); return best+(k,)
    return None

def final_eval(sans):
    b=chess.Board()
    for s in sans: b.push_san(s)
    i=E.analyse(b,chess.engine.Limit(depth=20))
    return i['score'].white().score(mate_score=10000), b.fen()

out={'opening':OPENING,'variations':[],'puzzles':[]}
base_steps=[(s[0],s[1],s[2],s[3]) for s in BASE]
for v in VARS:
    sans=v['moves'].split()
    b=chess.Board(); steps=[]
    for i,s in enumerate(sans):
        try: mv=b.parse_san(s)
        except Exception as e: err(f"{v['id']} nước {i} {s} không hợp lệ"); break
        who='Trắng' if b.turn else 'Đen'; san=b.san(mv); b.push(mv)
        if i<4: st=base_steps[i]; 
        else: st=v['steps'][i]
        assert st[0]==san,(v['id'],i,st[0],san)
        if st[1]!=who: err(f"{v['id']} nước {i} sai bên")
        for chk in st[3]:
            if not run_check(b,chk,mv): err(f"{v['id']} nước {i} {san}: điều kiện {chk} KHÔNG đúng")
        steps.append({'san':san,'who':who,'purpose':st[2],'fen':b.fen()})
    nm=named(sans); ev,fen=final_eval(sans)
    print(f"{v['id']}: khớp thế cờ ở nước thứ {nm[3]}/{len(sans)}: {nm[0]} {nm[1]} | {nm[2]} | máy chấm thế cuối {ev:+d}cp")
    vv=dict(v); vv.pop('steps'); vv['steps']=steps; vv['lichess_name']=nm[1]; vv['lichess_eco']=nm[0]; vv['eval_cp']=ev
    out['variations'].append(vv)

# Bẫy
sans=TRAP['moves'].split(); b=chess.Board()
for s in sans: b.push_san(s)
mv=b.parse_san('Nd6'); b.push(mv)
if not b.is_checkmate(): err('Bẫy: Nd6 không chiếu hết')
else: print('Bẫy Nd6#: chiếu hết ✓')
b.pop()
out['trap']={**{k:TRAP[k] for k in ('id','name_vi','moves','text')},'fen':b.fen()}
json.dump(out,open('data_partial.json','w',encoding='utf-8'),ensure_ascii=False)
E.quit()
print('Lỗi:',len(errors))
