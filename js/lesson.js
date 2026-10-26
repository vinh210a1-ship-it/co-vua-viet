/* Màn học từng bài (cấp 0, 1, 2), bài xếp lớp và bài kiểm tra cuối cấp. Dữ liệu bài nằm trong data/level0.js, level1.js, level2.js, placement.js.
   Một bài là danh sách bước; mỗi bước có type: show, demo, explore, reach, capture, tap, find, mate, quiz, run, note. */
const LESSON_BANK = Object.assign({},
  typeof LV0 !== 'undefined' ? LV0 : {}, typeof LV1 !== 'undefined' ? LV1 : {}, typeof LV2 !== 'undefined' ? LV2 : {},
  typeof PLACEMENT !== 'undefined' ? {'xep-lop':PLACEMENT} : {});
const SKIPPABLE = ['find', 'mate', 'reach', 'capture', 'explore', 'tap'];
const KIND_TEXT = {king:'đi Vua ra khỏi đường chiếu', block:'chắn đường chiếu', capture:'ăn quân đang chiếu'};
function shuffled(a){ const r = a.slice(); for (let i=r.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); const t = r[i]; r[i] = r[j]; r[j] = t; } return r; }
function levelOfUnit(id){
  for (const lv of LEVELS){ const i = lv.units.findIndex(u=>u.id===id); if (i >= 0) return {lv:lv, ui:i}; }
  return null;
}
/* Nước của bên bị bắt (Vua trơ trọi): tránh bị chiếu hết ngay, ăn quân treo, thích ô gần giữa bàn. */
function defendMove(g){
  const ms = g.moves({verbose:true}); let best = null, bs = -1e9;
  for (const m of ms){
    g.move(m);
    let sc = Math.random()*3;
    for (const r of g.moves({verbose:true})){ g.move(r); if (g.in_checkmate()) sc -= 1000; g.undo(); }
    if (m.captured) sc += 50*VAL[m.captured];
    let ks = null;
    for (let f=0;f<8 && !ks;f++) for (let r=0;r<8;r++){ const p = g.get('abcdefgh'[f]+(r+1)); if (p && p.type==='k' && p.color===m.color){ ks = [f,r]; break; } }
    if (ks) sc += 10*Math.min(ks[0], 7-ks[0], ks[1], 7-ks[1]);
    g.undo();
    if (sc > bs){ bs = sc; best = m; }
  }
  return best;
}

function viewLesson(id){
  const L = LESSON_BANK[id];
  if (!L){ go('#/hoc'); return; }
  const lu = levelOfUnit(id), units = lu ? lu.lv.units : [], ui = lu ? lu.ui : -1;
  setCrumbs(lu ? [['Trang chủ','#/'],['Học theo cấp','#/hoc'],[L.title]] : [['Trang chủ','#/'],[L.title]]);
  const $ = x => document.getElementById(x);
  let steps = L.steps, n = steps.length, si = -1, res = {}, board = null, alive = true, timer = null;
  onLeave(()=>{ alive = false; clearTimeout(timer); if (board) board.destroy(); });
  function kill(){ clearTimeout(timer); if (board){ board.destroy(); board = null; } }
  function fb(kind, ico, html){ const el = $('fb'); if (!el) return; el.hidden = false; el.className = 'status '+kind; el.innerHTML = '<span class="ico" aria-hidden="true">'+ico+'</span><div>'+html+'</div>'; }
  function nextBtn(label){
    $('next').innerHTML = '<button class="btn" id="nb" type="button">'+(label || (si===n-1 ? 'Xong' : 'Tiếp tục'))+'</button>';
    $('nb').addEventListener('click', ()=>{ si++; show(); });
    $('nb').focus({preventScroll:true});
  }
  function card(body, s){
    stage.innerHTML = '<section class="card"><div class="meta"><span class="tag">'+esc(L.title)+' · '+(si+1)+'/'+n+'</span>'+(s && s.phase ? '<span class="pill">'+esc(s.phase)+'</span>' : '')+'</div>'+
      '<div class="progress" aria-hidden="true"><i style="width:'+(si/n*100)+'%"></i></div>'+body+
      '<div class="status info" id="fb" aria-live="polite" hidden></div><div class="next" id="next"></div>'+
      ((L.test || L.placement) && s && SKIPPABLE.indexOf(s.type) >= 0 ? '<div class="skiprow"><button class="btn ghost small" id="skip" type="button">Bỏ qua câu này</button></div>' : '')+'</section>';
    const sk = $('skip');
    if (sk) sk.addEventListener('click', ()=>{ if (res[si] === undefined) res[si] = false; si++; show(); });
  }
  function show(){
    kill(); window.scrollTo({top:0});
    if (si<0) return intro();
    if (si>=n) return finish();
    const s = steps[si], h = {show:stShow, note:stNote, demo:stDemo, tap:stTap, quiz:stQuiz, find:stFind, mate:stMate, run:stRun}[s.type];
    (h || stPlay)(s);
  }
  function intro(){
    const first = L.steps.find(x=>x.fen && x.type!=='quiz');
    stage.innerHTML = '<section class="card"><div class="meta"><span class="tag">'+(L.placement ? 'Bài xếp lớp' : L.test ? 'Kiểm tra' : 'Bài học')+'</span></div><h2>'+esc(L.title)+'</h2>'+
      (first ? '<div class="boardbox" id="bx"></div>' : '')+L.intro.map(t=>'<p>'+esc(t)+'</p>').join('')+
      '<p class="muted small">Bài này có '+(L.take || n)+' phần'+(L.test ? '. Cần đúng ít nhất '+Math.round((L.pass||0.8)*100)+'% để qua.' : '.')+'</p>'+
      '<div class="next"><button class="btn" id="go" type="button">'+(L.placement ? 'Bắt đầu' : L.test ? 'Bắt đầu kiểm tra' : 'Bắt đầu')+'</button></div></section>';
    if (first) board = new Board($('bx'), {fen:first.fen, intro:true, flip:first.fen.split(' ')[1]==='b' && first.type==='find'});
    $('go').addEventListener('click', ()=>{
      res = {};
      if (L.take){ const fx = L.fixed || []; steps = shuffled(L.steps.filter((_,i)=>fx.indexOf(i)<0)).slice(0, L.take - fx.length).concat(fx.map(i=>L.steps[i])); steps = shuffled(steps); }
      else steps = L.steps;
      n = steps.length; si = 0; show();
    });
  }
  function stShow(s){
    card('<div class="boardbox" id="bx"></div><p>'+esc(s.text)+'</p>', s);
    board = new Board($('bx'), {fen:s.fen, intro:true, flip:s.flip});
    if (s.last) board.setLast(s.last[0], s.last[1]);
    nextBtn();
  }
  function stNote(s){
    card('<h2 class="qh">'+esc(s.title || 'Ghi nhớ')+'</h2>'+(s.text ? '<p>'+esc(s.text)+'</p>' : '')+(s.list ? '<ol class="notelist">'+s.list.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ol>' : '')+(s.tip ? '<p class="tipbox">Mẹo: '+esc(s.tip)+'</p>' : ''), s);
    nextBtn();
  }
  /* demo: máy tự đi từng nước kèm lời giải thích, bấm Tiếp để xem nước sau. */
  function stDemo(s){
    const pos = replayUci(s.fen, s.moves.map(m=>m.m)); let k = 0;
    card('<p class="q">'+esc(s.text)+'</p><div class="boardbox" id="bx"></div><div class="stepinfo" id="cap" aria-live="polite"></div>'+
      '<div class="boardtools"><button class="btn ghost small" id="dPrev" type="button">◀ Lùi</button><button class="btn small" id="dNext" type="button">Xem nước đầu ▶</button></div>', s);
    board = new Board($('bx'), {fen:s.fen, flip:s.flip, intro:true});
    const cap = ()=>{ $('cap').innerHTML = k===0 ? '<p class="muted">'+esc(s.start || 'Nhìn kỹ thế cờ rồi bấm nút bên dưới.')+'</p>' : '<p><b>'+esc(pos[k].san)+'</b></p><p>'+esc(s.moves[k-1].t)+'</p>'; $('dPrev').disabled = k===0; $('dNext').textContent = k>=s.moves.length ? 'Xong' : k===0 ? 'Xem nước đầu ▶' : 'Nước tiếp ▶'; };
    cap();
    $('dNext').addEventListener('click', ()=>{
      if (k >= s.moves.length){ if (!$('nb')) nextBtn(); $('nb').click(); return; }
      k++; board.play(pos[k].from, pos[k].to, pos[k].promo, !REDUCE); cap();
      if (k === s.moves.length) nextBtn();
    });
    $('dPrev').addEventListener('click', ()=>{ if (k===0) return; k--; board.setFen(pos[k].fen, {last:pos[k].from ? [pos[k].from, pos[k].to] : null}); $('next').innerHTML = ''; cap(); });
  }
  /* explore, reach, capture: đi quân thật; bên Đen không có Vua nên lượt luôn ở bên đi (solo). */
  function stPlay(s){
    const side = s.fen.split(' ')[1], blackLeft = ()=>board.game.board().reduce((a,r)=>a+r.filter(p=>p&&p.color!==side).length, 0);
    card('<p class="q">'+esc(s.text)+'</p><div class="boardbox" id="bx"></div>'+
      '<div class="boardtools"><button class="btn ghost small" id="redo" type="button">Làm lại</button><span class="cnt" id="cnt"></span></div>', s);
    let moves = 0, done = false;
    const test = !!L.test;
    function cnt(){ $('cnt').textContent = 'Số nước đã đi: '+moves; }
    board = new Board($('bx'), {fen:s.fen, interactive:true, solo:side, canMove:c=>c===side, intro:true, onMove});
    cnt();
    if (s.type==='reach') fb('info','♟','<p>Ô cần tới: <b>'+esc(s.target)+'</b>.</p>');
    if (s.type==='capture') fb('info','♟','<p>Còn <b>'+blackLeft()+'</b> quân cần ăn.</p>');
    function win(){
      done = true; board.lock(true);
      const best = moves <= s.best; res[si] = best;
      fb(best?'ok':'info', best?'✓':'→',
        best ? '<p><b>Chính xác!</b> Bạn làm trong '+moves+' nước, đây là số nước ít nhất.</p>' :
        '<p><b>Hoàn thành, nhưng có cách ngắn hơn.</b> Bạn đi '+moves+' nước, còn cách chỉ cần '+s.best+' nước.</p>'+(test?'<p>Câu này không được tính điểm.</p>':'<p>Bấm Làm lại để thử tìm đường ngắn hơn, hoặc Tiếp tục.</p>'));
      if (best) $('fb').classList.add('celebrate');
      nextBtn();
    }
    function onMove(){
      moves++; cnt();
      if (s.type==='explore'){
        if (moves>=s.min){ if (!done){ done = true; fb('ok','✓','<p><b>Tốt lắm!</b> Bạn đã thử '+moves+' nước. Có thể đi thêm cho quen, rồi bấm Tiếp tục.</p>'); nextBtn(); } }
        else fb('info','♟','<p>Đã đi '+moves+' nước. Thử thêm '+(s.min-moves)+' nước nữa.</p>');
        return;
      }
      if (done) return;
      if (s.type==='reach' && board.last && board.last[1]===s.target) return win();
      if (s.type==='capture' && blackLeft()===0) return win();
      if (!board.game.moves().length){ board.lock(true); fb('no','✗','<p>Không còn nước đi nào. Bấm Làm lại để thử cách khác.</p>'); return; }
      if (s.type==='reach') fb('info','♟','<p>Chưa tới ô <b>'+esc(s.target)+'</b>. Đã đi '+moves+' nước.</p>');
      else fb('info','♟','<p>Còn <b>'+blackLeft()+'</b> quân cần ăn. Đã đi '+moves+' nước.</p>');
    }
    $('redo').addEventListener('click', ()=>{
      moves = 0; done = false; delete res[si]; $('next').innerHTML = ''; board.lock(false); board.setFen(s.fen); cnt();
      if (s.type==='reach') fb('info','♟','<p>Ô cần tới: <b>'+esc(s.target)+'</b>.</p>');
      else if (s.type==='capture') fb('info','♟','<p>Còn <b>'+blackLeft()+'</b> quân cần ăn.</p>');
      else $('fb').hidden = true;
    });
  }
  /* tap: chạm đúng ô được hỏi trên bàn trống. */
  function stTap(s){
    card('<p class="q">'+esc(s.text)+'</p><p class="ask" id="ask"></p><div class="boardbox" id="bx"></div>', s);
    board = new Board($('bx'), {fen:'8/8/8/8/8/8/8/8 w - - 0 1'});
    board.root.classList.add('tapact'); if (L.test || L.placement) board.root.classList.add('nocoord');
    board.root.setAttribute('role','application'); board.root.setAttribute('aria-label','Bàn cờ trống. Chạm vào ô được hỏi.');
    let k = 0, wrong = 0;
    const ask = ()=>{ $('ask').innerHTML = 'Chạm vào ô <b>'+esc(s.squares[k])+'</b> <span class="muted">('+(k+1)+'/'+s.squares.length+')</span>'; };
    ask();
    board.root.addEventListener('pointerdown', e=>{
      if (k>=s.squares.length) return;
      const sq = board.sqAt(e.clientX, e.clientY); if (!sq) return;
      const want = s.squares[k];
      if (sq===want){
        board.setFlash(sq,'ok',600); k++;
        if (k>=s.squares.length){
          res[si] = wrong===0; $('ask').innerHTML = '<b>Xong!</b>';
          fb(wrong===0?'ok':'info', wrong===0?'✓':'→', wrong===0 ? '<p><b>Chính xác cả '+k+' ô!</b></p>' : '<p>Bạn đã tìm đúng cả '+k+' ô, có '+wrong+' lần chạm nhầm.</p>');
          nextBtn();
        } else { fb('ok','✓','<p>Đúng, ô '+esc(sq)+'.</p>'); ask(); }
      } else {
        wrong++; board.setFlash(sq,'no',600);
        fb('no','✗','<p>Bạn chạm ô <b>'+esc(sq)+'</b>. Ô cần tìm là <b>'+esc(want)+'</b>: cột <b>'+esc(want[0])+'</b>, hàng <b>'+esc(want[1])+'</b>.</p>');
      }
    });
  }
  function stQuiz(s){
    card('<h2 class="qh">'+esc(s.q)+'</h2>'+(s.fen ? '<div class="boardbox" id="bx"></div>' : '')+'<div class="qopts">'+s.opts.map((o,i)=>'<button class="qopt" type="button" data-i="'+i+'">'+esc(o)+'</button>').join('')+'</div>', s);
    if (s.fen){ board = new Board($('bx'), {fen:s.fen, flip:s.flip, intro:true}); if (s.last) board.setLast(s.last[0], s.last[1]); }
    let answered = false;
    stage.querySelector('.qopts').addEventListener('click', e=>{
      const b = e.target.closest('.qopt'); if (!b || answered) return;
      answered = true; const i = +b.dataset.i, ok = i===s.correct; res[si] = ok;
      stage.querySelectorAll('.qopt').forEach(x=>{ x.disabled = true; if (+x.dataset.i===s.correct) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      fb(ok?'ok':'no', ok?'✓':'✗', '<p><b>'+(ok?PRAISE[si%PRAISE.length]:'Chưa đúng.')+'</b></p><p>'+esc(s.why)+'</p>');
      if (ok) $('fb').classList.add('celebrate');
      nextBtn();
    });
  }
  /* find: tìm một nước đúng trong thế cờ có sẵn. Đúng khi nước thuộc answer, hoặc (mate) là chiếu hết, hoặc (want) đúng kiểu thoát chiếu. */
  function moveKind(m){ return m.captured ? 'capture' : m.piece==='k' ? 'king' : 'block'; }
  function stFind(s){
    const side = s.fen.split(' ')[1], before = new Chess(s.fen);
    card('<p class="q">'+esc(s.text)+'</p><div class="boardbox" id="bx"></div><div class="boardtools"><button class="btn ghost small" id="hintBtn" type="button"'+(L.test || L.placement ? ' hidden' : '')+'>Gợi ý</button></div>', s);
    board = new Board($('bx'), {fen:s.fen, flip:side==='b', interactive:true, intro:true, canMove:c=>c===side, onMove});
    if (s.last) board.setLast(s.last[0], s.last[1]);
    let tries = 0, hint = 0, solved = false;
    fb('info','♟','<p>'+(side==='w'?'Trắng':'Đen')+' đi. Chạm quân rồi chạm ô đến.</p>');
    const target = ()=>{
      if (s.answer) return s.answer[0];
      const ms = before.moves({verbose:true});
      for (const m of ms){ const c = new Chess(s.fen); c.move(m); if (s.mate ? c.in_checkmate() : (s.want ? moveKind(m)===s.want : true)) return m.from+m.to+(m.promotion||''); }
      return null;
    };
    function onMove(m){
      if (solved) return;
      const uci = m.from+m.to+(m.promotion||'');
      const ok = s.answer ? s.answer.indexOf(uci)>=0 : s.mate ? board.game.in_checkmate() : s.want ? moveKind(m)===s.want : true;
      if (ok){
        solved = true; res[si] = tries===0; board.lock(true); board.setFlash(m.to,'ok',800); board.setHint(null);
        const extra = s.want || s.escape ? 'Bạn đã '+KIND_TEXT[moveKind(m)]+'. ' : '';
        fb('ok','✓','<p><b>'+(tries===0 ? PRAISE[si%PRAISE.length] : 'Đúng rồi! Lần này bạn đã tìm ra.')+'</b> '+esc(extra+(s.why||''))+'</p>');
        $('fb').classList.add('celebrate'); $('hintBtn').hidden = true; nextBtn();
      } else {
        tries++; board.lock(true); board.setFlash(m.to,'no',700);
        let msg = s.wrong && s.wrong[uci];
        if (!msg && s.mate){
          msg = board.game.in_stalemate() ? 'Bế tắc! Bên kia không còn nước nào nhưng chưa bị chiếu, nên ván hòa. Hãy tìm nước chiếu hết thật sự.' :
            board.game.in_check() ? 'Có chiếu, nhưng chưa chiếu hết: Vua vẫn còn đường thoát.' : 'Chưa chiếu hết.';
        }
        if (!msg && s.want) msg = 'Bạn đã '+KIND_TEXT[moveKind(m)]+'. Lần này hãy '+KIND_TEXT[s.want]+'.';
        fb('no','✗','<p><b>'+esc(m.san)+'</b> '+esc(msg || 'chưa phải nước cần tìm.')+'</p><p>'+(tries>=2?'Bí rồi? Bấm Gợi ý.':'Thử nước khác nhé.')+'</p>');
        timer = setTimeout(()=>{ if (!alive || solved) return; board.setFen(s.fen); if (s.last) board.setLast(s.last[0], s.last[1]); if (hint>=2){ const t = target(); if (t) board.setHint(t.slice(0,2), null); } board.lock(false); }, 900);
      }
    }
    $('hintBtn').addEventListener('click', ()=>{
      if (solved) return; hint++;
      if (hint===1){ fb('info','?','<p>'+esc(s.hint || 'Nhìn kỹ: quân nào của bạn có thể làm được việc này?')+'</p>'); $('hintBtn').textContent = 'Chỉ cho tôi quân cần đi'; }
      else { const t = target(); if (t) board.setHint(t.slice(0,2), null); $('hintBtn').hidden = true; }
    });
  }
  /* mate: chiếu hết Vua trơ trọi bằng Hậu hoặc Xe, trong giới hạn số nước; máy đóng vai bên bị bắt. */
  function stMate(s){
    const side = s.fen.split(' ')[1];
    card('<p class="q">'+esc(s.text)+'</p><div class="boardbox" id="bx"></div>'+
      '<div class="boardtools"><button class="btn ghost small" id="tipBtn" type="button"'+(L.test || L.placement || !(s.tips && s.tips.length) ? ' hidden' : '')+'>Gợi ý</button><button class="btn ghost small" id="redo" type="button">Làm lại</button><span class="cnt" id="cnt"></span></div>', s);
    let moves = 0, done = false, tipN = 0, busy = false;
    board = new Board($('bx'), {fen:s.fen, flip:side==='b', interactive:true, intro:true, canMove:c=>c===side, onMove});
    const cnt = ()=>{ $('cnt').textContent = 'Nước đã đi: '+moves+'/'+s.max; };
    cnt(); fb('info','♟','<p>Bạn có '+s.max+' nước để chiếu hết. Máy sẽ cố chạy trốn.</p>');
    function lose(msg){ done = true; board.lock(true); fb('no','✗','<p>'+esc(msg)+'</p><p>Bấm Làm lại để thử lần nữa.</p>'); }
    function onMove(){
      if (done) return;
      moves++; cnt();
      const g = board.game;
      if (g.in_checkmate()){ done = true; board.lock(true); res[si] = true; fb('ok','✓','<p><b>Chiếu hết!</b> Bạn đã làm trong '+moves+' nước.</p>'); $('fb').classList.add('celebrate'); nextBtn(); return; }
      if (g.in_stalemate()) return lose('Bế tắc! Vua đen không còn nước đi nhưng chưa bị chiếu, nên ván hòa. Lần sau chừa cho Vua đen một ô để đi.');
      if (g.insufficient_material()) return lose('Bạn đã mất quân mạnh nên không thể chiếu hết nữa.');
      if (moves >= s.max) return lose('Hết '+s.max+' nước rồi mà chưa chiếu hết.');
      busy = true; board.lock(true);
      timer = setTimeout(()=>{
        if (!alive) return;
        const m = defendMove(g); board.play(m.from, m.to, m.promotion, !REDUCE); busy = false;
        if (g.in_stalemate()) return lose('Bế tắc! Ván hòa.');
        if (g.insufficient_material()) return lose('Máy đã ăn mất quân mạnh của bạn.');
        board.lock(false); fb('info','♟','<p>Máy đi <b>'+esc(m.san)+'</b>. Đến lượt bạn.</p>');
      }, 550);
    }
    $('tipBtn').addEventListener('click', ()=>{ const t = s.tips || []; if (!t.length) return; fb('info','?','<p>'+esc(t[Math.min(tipN, t.length-1)])+'</p>'); tipN++; });
    $('redo').addEventListener('click', ()=>{ clearTimeout(timer); moves = 0; done = false; busy = false; $('next').innerHTML = ''; delete res[si]; board.lock(false); board.setFen(s.fen); cnt(); fb('info','♟','<p>Làm lại từ đầu. Bạn có '+s.max+' nước.</p>'); });
  }
  /* run: làm vài câu đố Lichess ngay trong bài (cùng một chủ đề hoặc trộn nhiều chủ đề). */
  function stRun(s){
    stage.innerHTML = '<section class="card center"><p class="muted">Đang tải câu đố...</p></section>';
    const specs = s.mixed || [{theme:s.theme, band:s.band || 'de'}], all = [], tmap = {};
    let left = specs.length;
    specs.forEach(sp=>{
      const th = PUZ_THEMES.find(t=>t.id===sp.theme);
      loadTheme(sp.theme, rows=>{
        if (rows) rows.filter(r=>bandOf(r[3])===(sp.band || 'de')).forEach(r=>{ all.push(r); tmap[r[0]] = th; });
        if (--left) return;
        if (!alive) return;
        if (!all.length){ si++; show(); return; }
        const pool = s.mixed ? shuffled(all) : all;
        startPuzzleRun(pool, specs[0] && PUZ_THEMES.find(t=>t.id===specs[0].theme), {
          count:s.n || 5, themeOf:r=>tmap[r[0]], backHref:'#/hoc', backText:'Thoát', noHelp:!!s.noHelp,
          after:(pts, tot)=>{ res[si] = {pts:pts, n:tot}; si++; show(); }
        });
      });
    });
  }
  function finish(){
    let pts = 0, tot = 0; const byLv = {}, wrong = [];
    Object.keys(res).forEach(k=>{
      const r = res[k], st = steps[k], a = r && typeof r==='object' ? r : {pts:r?1:0, n:1};
      pts += a.pts; tot += a.n;
      if (st && st.lv !== undefined){ const b = byLv[st.lv] || (byLv[st.lv] = {pts:0, n:0}); b.pts += a.pts; b.n += a.n; }
      if (a.pts < a.n && st && st.from) wrong.push(st.from);
    });
    if (L.placement) return finishPlacement(pts, tot, byLv);
    const need = L.pass || 0.8;
    const pass = !L.test || !tot || pts/tot >= need;
    Prog.setLesson(id, {done:pass, pts:pts, n:tot});
    if (L.test && pass && L.level !== undefined) Prog.setLevel(L.level, {passed:true, pts:pts, n:tot, d:Prog.dayKey()});
    let nu = units[ui+1], nh = nu && unitHref(nu);
    if (!nu && lu && pass){ const nl = LEVELS[lu.lv.n+1], f = nl && nl.units.find(u=>unitHref(u)); if (f){ nu = f; nh = unitHref(f); } }
    const weak = Array.from(new Set(wrong)).filter(x=>LESSON_BANK[x]);
    let rev = '';
    if (L.test) steps.forEach((s,i)=>{ if (res[i]===undefined) return; const r = res[i], ok = r && typeof r==='object' ? r.pts===r.n : r; rev += '<li class="'+(ok?'ok':'no')+'"><b>'+(ok?'✓':'✗')+'</b><span>'+esc(s.q || s.text || s.label || (s.type==='run' && 'Câu đố: '+((PUZ_THEMES.find(t=>t.id===s.theme)||{}).name || '')) || 'Câu '+(i+1))+(r && typeof r==='object' ? ' ('+r.pts+'/'+r.n+')' : '')+'</span></li>'; });
    stage.innerHTML = '<section class="card end"><h2>'+(L.test ? (pass ? 'Bạn đã qua cấp '+L.level+'!' : 'Chưa đạt, ôn thêm rồi thử lại nhé') : 'Hoàn thành bài '+esc(L.title)+'!')+'</h2>'+
      (tot ? '<div class="big">'+pts+'/'+tot+'</div><p class="muted small">'+(L.test ? 'Cần đúng ít nhất '+Math.round(need*100)+'% để qua cấp.' : 'Số câu bạn làm đúng ngay lần đầu.')+'</p>' : '')+
      (L.test && !pass && weak.length ? '<div class="weak"><b>Nên ôn lại:</b><ul>'+weak.map(x=>'<li><a href="#/hoc/'+x+'">'+esc(LESSON_BANK[x].title)+'</a></li>').join('')+'</ul></div>' : '')+
      (L.test ? '<ul class="review">'+rev+'</ul>' : '')+
      '<div class="actions">'+
        (L.test && !pass ? '<button class="btn" id="again" type="button">Làm lại bài kiểm tra</button>' : (nh ? '<a class="btn" href="'+nh+'">Bài tiếp theo: '+esc(nu.title)+'</a>' : '<a class="btn" href="#/hoc">Về lộ trình</a>'))+
        '<a class="btn ghost" href="#/hoc">Xem lộ trình</a></div></section>';
    if (pass) confetti();
    const ag = $('again'); if (ag) ag.addEventListener('click', ()=>{ si = -1; res = {}; show(); });
  }
  function finishPlacement(pts, tot, byLv){
    let placed = 0;
    for (let lv=0; lv<4; lv++){ const b = byLv[lv]; if (b && b.n && b.pts/b.n >= 0.75) placed = lv+1; else break; }
    Prog.setPlaced(placed);
    const first = LEVELS[Math.min(placed, LEVELS.length-1)].units.find(u=>unitHref(u));
    stage.innerHTML = '<section class="card end"><h2>Kết quả xếp lớp</h2><div class="big">Cấp '+placed+'</div>'+
      '<p>Bạn làm đúng '+pts+'/'+tot+' câu. '+(placed===0 ? 'Hãy bắt đầu từ Cấp 0 để làm quen bàn cờ và các quân.' : 'Bạn đã biết các nội dung của '+(placed===1?'Cấp 0':'các cấp từ 0 đến '+(placed-1))+'. Hãy bắt đầu từ Cấp '+placed+'.')+'</p>'+
      '<p class="muted small">Đây là gợi ý, không phải điểm số. Bạn vẫn học lại cấp nào cũng được.</p>'+
      '<div class="actions">'+(first ? '<a class="btn" href="'+unitHref(first)+'">Bắt đầu: '+esc(first.title)+'</a>' : '')+'<a class="btn ghost" href="#/hoc">Xem lộ trình</a></div></section>';
    confetti();
  }
  show();
}
