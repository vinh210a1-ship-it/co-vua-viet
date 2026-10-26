import json, random, chess, chess.engine
data=json.load(open('data_partial.json',encoding='utf-8'))
E=chess.engine.SimpleEngine.popen_uci('/usr/games/stockfish'); E.configure({'Threads':1,'Hash':128})
PN={chess.PAWN:'Tốt',chess.KNIGHT:'Mã',chess.BISHOP:'Tượng',chess.ROOK:'Xe',chess.QUEEN:'Hậu',chess.KING:'Vua'}
def fmt(x): return f"{x:.1f}".replace('.',',')
def board(line):
    b=chess.Board()
    for s in line.split(): b.push_san(s)
    return b
errors=[]
def err(m): errors.append(m); print('LỖI:',m)
SPEC=[
 dict(id=1,var='base',tag='Ý tưởng Caro-Kann',line='e4 c6 d4',ok='d5',q='Đen đi. Chọn nước đúng theo ý tưởng của Caro-Kann.',
  hint='Tốt c6 đang bảo vệ một ô trung tâm. Hãy đẩy tốt tới ô đó.',
  explain='2...d5! Tốt c6 đã chuẩn bị sẵn: nếu Trắng ăn d5, Đen ăn lại bằng tốt c6. Đen đòi chia sẻ trung tâm ngay.',
  tip='Caro-Kann: c6 trước, d5 sau, chân tốt luôn có chỗ dựa.'),
 dict(id=2,var='advance',tag='Advance: tượng ra ngoài',line='e4 c6 d4 d5 e5',ok='Bf5',q='Trắng vừa đẩy e5. Đen nên làm gì với tượng c8?',
  hint='Tượng c8 chưa bị tốt nhà nhốt. Hãy đưa nó ra ngoài chuỗi tốt trước khi đẩy e6.',
  explain='3...Bf5! Tượng đi ra ngoài chuỗi tốt và nhắm tới cánh Trắng. Nếu Đen đi 3...e6 trước, tượng c8 gần như bị nhốt (chỉ còn đi được một ô).',
  tip='Tượng ra trước, tốt e6 sau.',
  verify='bishop_locked_after_e6'),
 dict(id=3,var='classical',tag='Classical: tượng ra f5',line='e4 c6 d4 d5 Nc3 dxe4 Nxe4',ok='Bf5',q='Đen đi. Tượng c8 nên ra ở đâu?',
  hint='Hãy đưa tượng ra ngoài trước khi đóng bằng e6, và nên đánh luôn vào Mã e4.',
  explain='4...Bf5! Tượng ra ngoài chuỗi tốt và đánh vào Mã e4 ngay. Đây là dấu hiệu của Caro-Kann Cổ điển.',
  tip='Đừng đóng cửa tượng bằng e6 khi chưa đưa tượng ra.'),
 dict(id=4,var='advance',tag='Advance: củng cố d5',line='e4 c6 d4 d5 e5 Bf5 Nf3',ok='e6',q='Đen đi. Tượng đã ra f5. Giờ Đen củng cố trung tâm bằng nước nào?',
  hint='Tốt d5 cần một tốt khác bảo vệ, và tốt đó cũng mở đường cho tượng f8.',
  explain='4...e6! Tốt e6 bảo vệ d5 và mở đường cho tượng f8. Tượng c8 đã ra ngoài nên không bị nhốt.',
  tip='Đóng cửa sau khi đã đưa tượng ra.'),
 dict(id=5,var='advance',tag='Advance: phá chân chuỗi',line='e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2',ok='c5',q='Đen đi. Làm sao đánh vào thế khóa của Trắng?',
  hint='Chân chuỗi tốt Trắng nằm ở d4. Hãy dùng một tốt đánh vào nó.',
  explain='5...c5! Tốt c5 đánh vào d4, chân của chuỗi tốt Trắng. Phá được chân, cả chuỗi tốt yếu đi.',
  tip='Muốn phá chuỗi tốt, hãy đánh vào chân của nó.'),
 dict(id=6,var='exchange',tag='Exchange: ăn lại',line='e4 c6 d4 d5 exd5',ok='cxd5',q='Trắng vừa ăn d5. Đen ăn lại thế nào cho đúng ý Caro-Kann?',
  hint='Ăn lại bằng tốt để giữ cấu trúc chắc chắn và giữ tốt ở d5.',
  explain='3...cxd5! Ăn lại bằng tốt c: Đen giữ tốt ở d5 và mở cột c cho xe.',
  tip='Ăn lại bằng tốt khi có thể: cấu trúc tốt giữ chắc.'),
 dict(id=7,var='panov',tag='Panov: bảo vệ d5',line='e4 c6 d4 d5 exd5 cxd5 c4',ok='Nf6',q='Trắng vừa đẩy c4 đánh vào d5. Đen đi nước nào?',
  hint='Hãy phát triển một quân vừa bảo vệ d5 vừa đánh vào trung tâm.',
  explain='4...Nf6! Mã f6 bảo vệ d5 và phát triển quân cùng lúc.',
  tip='Phát triển quân bằng nước có nhiệm vụ bảo vệ.'),
 dict(id=8,var='panov',tag='Panov: củng cố d5',line='e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3',ok='e6',q='Trắng có hai quân đánh vào d5. Đen đi nước nào?',
  hint='Đen cần thêm một người bảo vệ d5, và nên mở đường cho tượng f8.',
  explain='5...e6! Tốt e6 bảo vệ d5 và mở đường cho tượng f8. Nhưng tượng c8 bị chắn lại, nên Đen phải tính cách phát triển nó sau.',
  tip='Đếm số quân tấn công và bảo vệ d5 trước mỗi nước đi.'),
 dict(id=9,var='classical',tag='Classical: chừa ô cho tượng',line='e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4',ok='h6',q='Trắng đẩy h4, dọa h5. Đen đi nước nào để tượng g6 có chỗ rút?',
  hint='Tượng g6 sẽ cần một ô an toàn. Ô h7 đang bị tốt của Đen chiếm.',
  explain='6...h6! Tốt h7 đi lên h6 để chừa ô h7. Khi Trắng đẩy h5, tượng g6 rút về h7 an toàn.',
  tip='Chừa đường lui trước khi bị đuổi.'),
 dict(id=10,var='trap',tag='Bẫy cần biết',line='e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Qe2 Ngf6',ok='Nd6#',q='Đen vừa đi Ngf6?? Trắng chiếu hết ngay. Tìm nước đó!',
  hint='Mã e4 có thể nhảy tới một ô vừa chiếu vua e8, vừa mở cột e cho Hậu e2.',
  explain='6.Nd6# Mã nhảy tới d6 và chiếu vua e8. Mã rời e4 mở cột e: Hậu e2 ghim tốt e7 vào vua nên Đen không ăn được Mã d6. Mọi ô thoát của vua đều bị quân nhà chiếm.',
  tip='Đừng để Mã nhà chắn ô thoát của vua khi Hậu Trắng đã lên e2.',mate=True),
]
out=[]
for sp in SPEC:
    b=board(sp['line']); mover=b.turn
    ok_mv=b.parse_san(sp['ok']); 
    infos=E.analyse(b,chess.engine.Limit(depth=18),multipv=60)
    sc={i['pv'][0]:i['score'].pov(mover) for i in infos}
    best=max(s.score(mate_score=10000) for s in sc.values())
    ok_loss=best-sc[ok_mv].score(mate_score=10000)
    if ok_loss>40: err(f"P{sp['id']}: nước đúng {sp['ok']} kém nước tốt nhất {ok_loss}cp")
    cands=[]
    for mv,s in sc.items():
        if mv==ok_mv: continue
        pc=b.piece_at(mv.from_square)
        if pc.piece_type==chess.KING: continue
        loss=best-s.score(mate_score=10000)
        if sp.get('mate'):
            nb=b.copy(); nb.push(mv)
            if nb.is_checkmate(): err('distractor là chiếu hết?'); continue
            if s.is_mate(): continue
            cands.append((-s.score(mate_score=10000),mv,pc.piece_type,loss))   # ưu tiên nước tốt gần nhất (hấp dẫn)
        else:
            if 120<=loss<=700 and not s.is_mate(): cands.append((loss,mv,pc.piece_type,loss))
    cands.sort(key=lambda x:x[0] if not sp.get('mate') else x[0])
    chosen=[]; used={}
    if sp.get('mate'):
        for san in ['Nxf6+','Ng5','Bf4']:
            mv=b.parse_san(san); nb=b.copy(); nb.push(mv)
            if nb.is_checkmate(): err('ép: là chiếu hết '+san); continue
            s_=sc.get(mv); l=best-(s_.score(mate_score=10000) if s_ else 0)
            chosen.append((0,mv,b.piece_at(mv.from_square).piece_type,l))
        cands=[]
    for c in cands:
        if used.get(c[2],0)>=(3 if sp['id']==1 else 2): continue
        chosen.append(c); used[c[2]]=used.get(c[2],0)+1
        if len(chosen)==3: break
    if len(chosen)<3: err(f"P{sp['id']}: chỉ chọn được {len(chosen)} nước sai")
    opts=[]
    ob=b.copy(); label_ok=b.san(ok_mv)
    opts.append(dict(uci=ok_mv.uci(),label=label_ok,correct=True,why=''))
    for _,mv,pt,loss in chosen:
        lab=b.san(mv); nb=b.copy(); nb.push(mv)
        who='Trắng' if nb.turn else 'Đen'
        r=E.analyse(nb,chess.engine.Limit(depth=16))
        rep=r['pv'][0]; rsan=nb.san(rep)
        cap=''
        if nb.is_capture(rep):
            tp=nb.piece_at(rep.to_square)
            cap=f", ăn {PN[tp.piece_type]}" if tp else ", ăn Tốt"
        if sp.get('mate'):
            why=f"Chưa chiếu hết: Đen vẫn đi được, ví dụ {rsan}."
            if len(list(nb.legal_moves))==0: err('mate distractor có 0 nước hợp lệ')
        else:
            why=f"{who} đáp {rsan}{cap}. Máy chấm nước này kém nước đúng khoảng {fmt(loss/100)} tốt."
        opts.append(dict(uci=mv.uci(),label=lab,correct=False,why=why))
    random.Random(sp['id']*7+3).shuffle(opts)
    if sp.get('mate'):
        nb=b.copy(); nb.push(ok_mv)
        if not nb.is_checkmate(): err('đáp án đúng không chiếu hết')
        ksq=nb.king(chess.BLACK); adj=[s for s in chess.SquareSet(chess.BB_KING_ATTACKS[ksq])]
        if not all(nb.piece_at(s) and nb.piece_at(s).color==chess.BLACK for s in adj): err('ô thoát của vua chưa bị chiếm hết')
        if not nb.is_pinned(chess.BLACK,chess.E7): err('tốt e7 không bị ghim')
    if sp.get('verify')=='bishop_locked_after_e6':
        t=board(sp['line']); t.push_san('Bf5'); t.pop()  # đảm bảo Bf5 hợp lệ
        t=board(sp['line']); t.push_san('e6'); t.turn=chess.BLACK
        mob=len([m for m in t.legal_moves if m.from_square==chess.C8])
        print(f'  P2: tượng c8 sau 3...e6 còn {mob} nước đi')
        if mob>1: err('tượng c8 sau e6 còn >1 nước')
    nb=b.copy(); nb.push(ok_mv)
    if len(sc)!=b.legal_moves.count(): err(f"P{sp['id']}: máy chỉ chấm {len(sc)}/{b.legal_moves.count()} nước hợp lệ")
    ev={m.uci():int(min(best-v.score(mate_score=10000),9999)) for m,v in sc.items()}
    out.append(dict(id=sp['id'],var=sp['var'],fen=b.fen(),uci=ok_mv.uci(),san=label_ok,ev=ev,tag=sp['tag'],turn='w' if mover else 'b',q=sp['q'],hint=sp['hint'],
        opts=opts,explain=sp['explain'],tip=sp['tip'],board=b.fen().split()[0],after=nb.fen().split()[0],
        **{'from':chess.square_name(ok_mv.from_square),'to':chess.square_name(ok_mv.to_square)}))
    print(f"P{sp['id']} {sp['ok']} (kém tốt nhất {ok_loss}cp):",[ (o['label'],o['correct']) for o in opts])
    for o in opts:
        if not o['correct']: print('    ',o['label'],'→',o['why'])
data['puzzles']=out
json.dump(data,open('data.json','w',encoding='utf-8'),ensure_ascii=False)
E.quit(); print('Lỗi:',len(errors))
