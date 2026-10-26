/* Trang chủ 6 nút, khu Câu đố, lộ trình 6 cấp và bài học cấp 0.
   Nạp TRƯỚC js/app.js (app.js gọi route() ở cuối). Dùng các hàm của app.js và board.js khi được gọi. */

/* ---------- 6 nút ở trang chủ ---------- */
/* Mỗi nút có một bàn cờ nhỏ tự đi vài nước. Các thế cờ đã kiểm bằng chess.js (tools/ hoặc chạy thử). */
const TILES = [
  {href:'#/hoc', title:'Học theo cấp', sub:'Sáu cấp, từ bàn cờ đến chiến lược', fen:'4k3/8/8/8/8/8/8/6N1 w - - 0 1', sans:'Nf3 Kd7 Ne5+ Ke7 Nc6+ Kd6 Nb4'},
  {href:'#/cau-do', title:'Câu đố', sub:'Mỗi ngày một câu, và nhiều bộ khác', fen:'1k6/8/8/8/6K1/3r4/8/Q7 w - - 0 1', sans:'Qb1+ Kc7 Qxd3'},
  {href:'#/khai-cuoc', title:'Khai cuộc', sub:'Tìm khai cuộc, xem điểm mạnh và yếu', sans:'e4 c6 d4 d5 Nc3 dxe4 Nxe4', flip:1},
  {href:'#/cau-do/tan-cuoc', title:'Tàn cuộc', sub:'Luyện thắng khi còn ít quân', fen:'8/4P3/8/8/8/k7/8/4K3 w - - 0 1', sans:'e8=Q Kb3 Qe3+ Kb2'},
  {href:'#/may', title:'Đánh với máy', sub:'Chọn mức dễ đến khó', sans:'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6', soon:true},
  {href:'#/tam-nhin', title:'Luyện tầm nhìn', sub:'Nhìn ô cờ không cần bàn', fen:'4k3/8/8/8/8/8/8/R3K3 w - - 0 1', sans:'Ra8+ Kd7 Rh8 Ke7', soon:true}
];

/* ---------- Tiến độ theo bài ---------- */
function unitHref(u){
  if (u.soon) return null;
  if (u.href) return u.href;
  if (typeof LV0 !== 'undefined' && u.id && LV0[u.id]) return '#/hoc/'+u.id;
  return null;
}
/* k: soon (đang soạn), open (chưa làm), retry (làm rồi nhưng chưa đạt), done (xong) */
function unitState(u){
  if (!unitHref(u)) return {k:'soon'};
  if (u.quiz){ const b = Prog.best(u.quiz); return b ? {k:'done', note:b.pts+'/'+b.n} : {k:'open'}; }
  const l = Prog.lesson(u.id);
  if (!l) return {k:'open'};
  if (l.done) return {k:'done', note:l.n ? l.pts+'/'+l.n : ''};
  return {k:'retry', note:l.pts+'/'+l.n};
}
function nextUnit(){
  for (const lv of LEVELS) for (const u of lv.units){
    const st = unitState(u);
    if (st.k==='open' || st.k==='retry') return {lv:lv, u:u, href:unitHref(u), st:st};
  }
  return null;
}
function levelProgress(lv){
  let done = 0, ready = 0;
  lv.units.forEach(u=>{ const k = unitState(u).k; if (k!=='soon') ready++; if (k==='done') done++; });
  return {done:done, ready:ready, total:lv.units.length};
}
function anyProgress(){ return LEVELS.some(lv=>levelProgress(lv).done>0); }

/* Câu đố hôm nay: mỗi ngày một câu trong kho hiện có, ai mở cũng thấy cùng một câu. */
function dailyPool(){ return PUZ.filter(p=>p.var!=='trap').concat(typeof PUZ_END !== 'undefined' ? PUZ_END : []); }
function dailyPuzzle(){
  const d = new Date(), n = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())/86400000), pool = dailyPool();
  return pool[n % pool.length];
}

/* ---------- Trang chủ ---------- */
function tileHTML(t){
  let foot = '';
  if (t.soon) foot = '<span class="pill soon">Sắp có</span>';
  else if (t.href==='#/hoc'){
    const all = LEVELS.reduce((a,lv)=>{ const p = levelProgress(lv); return {d:a.d+p.done, r:a.r+p.ready}; }, {d:0,r:0});
    foot = '<span class="pill">'+all.d+'/'+all.r+' bài đã làm</span>';
  } else if (t.href==='#/cau-do'){
    foot = '<span class="pill'+(Prog.doneToday()?' ok':'')+'">'+(Prog.doneToday()?'Hôm nay xong ✓':'Câu hôm nay chưa làm')+'</span>';
  } else if (t.href==='#/khai-cuoc'){
    foot = '<span class="pill">'+ALL.length.toLocaleString('vi-VN')+' dòng</span>';
  } else if (t.href==='#/cau-do/tan-cuoc'){
    const b = Prog.best('end'); foot = '<span class="pill'+(b?' ok':'')+'">'+(b ? 'Điểm cao '+b.pts+'/'+b.n : PUZ_END.length+' câu')+'</span>';
  }
  return '<a class="tile'+(t.soon?' is-soon':'')+'" href="'+t.href+'"><span class="thumb"'+(t.fen?' data-fen="'+t.fen+'"':'')+' data-sans="'+esc(t.sans)+'" data-flip="'+(t.flip?1:0)+'"></span>'+
    '<b>'+esc(t.title)+'</b><span class="muted">'+esc(t.sub)+'</span>'+foot+'</a>';
}
function viewHome(){
  setCrumbs([['Trang chủ']]);
  const nx = nextUnit(), st = Prog.streak(), today = Prog.doneToday();
  const cont = nx
    ? '<a class="goon" href="'+nx.href+'"><span class="vnum" aria-hidden="true">▶</span><div><b>'+(anyProgress()?'Tiếp tục học':'Bắt đầu học')+'</b><span class="muted">Cấp '+nx.lv.n+' · '+esc(nx.u.title)+'</span></div><span class="go" aria-hidden="true">›</span></a>'
    : '<a class="goon" href="#/hoc"><span class="vnum" aria-hidden="true">★</span><div><b>Bạn đã làm hết các bài hiện có</b><span class="muted">Xem lại lộ trình</span></div><span class="go" aria-hidden="true">›</span></a>';
  const daily = '<a class="goon daily'+(today?' done':'')+'" href="#/cau-do/hom-nay"><span class="vnum" aria-hidden="true">'+(today?'✓':'?')+'</span><div><b>Câu đố hôm nay</b><span class="muted">'+(today?'Hôm nay bạn đã xong':'Một câu, vài phút')+(st?' · chuỗi '+st+' ngày':'')+'</span></div><span class="go" aria-hidden="true">›</span></a>';
  const nPuz = PUZ.length + PUZ_END.length;
  stage.innerHTML =
    '<section class="hero"><div><h2>Học cờ vua từng bước, dễ hiểu, miễn phí</h2>'+
      '<p>Chọn một nút bên dưới. Mọi bài đều có bàn cờ để bạn tự đi quân.</p>'+
      '<ol class="steps3"><li><b>1</b>Học</li><li><b>2</b>Luyện</li><li><b>3</b>Chơi</li></ol>'+
      '<div class="stats"><span><strong>'+LEVELS.length+'</strong>cấp học</span>'+
      '<span><strong>'+ALL.length.toLocaleString('vi-VN')+'</strong>dòng khai cuộc</span><span><strong>'+nPuz+'</strong>câu đố</span></div></div>'+
      '<div class="herobox"><div class="boardbox" id="heroBoard"></div><a class="herocap" id="heroCap" href="#/"><b id="heroName"></b><span id="heroMoves"></span></a></div></section>'+
    '<div class="goons">'+cont+daily+'</div>'+
    '<h3 class="sec">Chọn một khu</h3>'+
    '<div class="tiles">'+TILES.map(tileHTML).join('')+'</div>'+
    '<a class="classbar" href="#/lop"><span class="vnum" aria-hidden="true">♜</span><div><b>Lớp của thầy</b><span class="muted">Khu riêng cho học sinh của thầy. Sắp có.</span></div><span class="go" aria-hidden="true">›</span></a>'+
    '<details class="legend"><summary>Cách đọc nước đi</summary><p>K = Vua, Q = Hậu, R = Xe, B = Tượng, N = Mã, không có chữ = Tốt. x là ăn quân, + là chiếu, # là chiếu hết, O-O là nhập thành gần.</p></details>';
  animateHero(document.getElementById('heroBoard'));
  onLeave(mountThumbs(stage));
}

/* ---------- Khu Câu đố ---------- */
function hubCard(o){
  const inner = '<span class="thumb"'+(o.fen?' data-fen="'+o.fen+'"':'')+' data-sans="'+esc(o.sans)+'" data-flip="'+(o.flip?1:0)+'"></span>'+
    '<div><span class="tag">'+esc(o.tag)+'</span><h3>'+esc(o.title)+'</h3><p class="muted">'+esc(o.desc)+'</p>'+(o.note?'<p><span class="pill'+(o.ok?' ok':(o.soon?' soon':''))+'">'+esc(o.note)+'</span></p>':'')+'</div>';
  return o.href ? '<a class="vcard" href="'+o.href+'">'+inner+'<span class="go" aria-hidden="true">›</span></a>' : '<div class="vcard is-soon">'+inner+'</div>';
}
function viewPuzzleHub(){
  setCrumbs([['Trang chủ','#/'],['Câu đố']]);
  const ck = Prog.best('ck-all'), en = Prog.best('end'), today = Prog.doneToday(), d = dailyPuzzle(), st = Prog.streak();
  const ckN = PUZ.filter(p=>p.var!=='trap').length;
  stage.innerHTML =
    '<section class="card"><h2>Câu đố</h2><p class="muted">Bạn đi quân thật trên bàn cờ. Mỗi câu có gợi ý và giải thích.</p></section>'+
    '<section class="card"><h3 class="sec">Hôm nay</h3>'+
      hubCard({href:'#/cau-do/hom-nay', tag:'Câu đố hôm nay', title:d.tag, desc:today ? 'Bạn đã xong hôm nay. Có thể làm lại.' : 'Mỗi ngày một câu, giữ chuỗi ngày liên tiếp.', note:st ? 'Chuỗi '+st+' ngày' : (today?'Đã xong':'Chưa làm'), ok:today, fen:d.fen, sans:d.san, flip:d.turn==='b'})+
    '</section>'+
    '<section class="card"><h3 class="sec">Theo khai cuộc</h3>'+
      hubCard({href:'#/o/'+OP.opening.id+'/quiz', tag:OP.opening.eco, title:OP.opening.name_vi, desc:PUZ.length+' câu, từ dễ đến khó, kèm bẫy cần biết.', note:ck?'Điểm cao nhất '+ck.pts+'/'+ck.n:'Chưa làm', ok:!!ck, sans:OP.variations[0].moves, flip:OP.opening.side==='b'})+
      '<p class="muted small">Khai cuộc khác (Sicilian, Pháp, Ruy Lopez...) sẽ thêm cùng với bài học của chúng.</p>'+
    '</section>'+
    '<section class="card"><h3 class="sec">Theo chủ đề</h3>'+
      hubCard({href:'#/cau-do/tan-cuoc', tag:'Tàn cuộc', title:'Luyện '+PUZ_END.length+' câu tàn cuộc', desc:'Đòn nĩa, xiên, chiếu hết khi còn ít quân.', note:en?'Điểm cao nhất '+en.pts+'/'+en.n:'Chưa làm', ok:!!en, fen:'1k6/8/8/8/6K1/3r4/8/Q7 w - - 0 1', sans:'Qb1+ Kc7 Qxd3'})+
      hubCard({tag:'Chiến thuật', title:'Đòn đôi, ghim, xiên, chiếu hết 2 nước', desc:'Hàng trăm câu chia theo chủ đề. Đang chuẩn bị kho câu đố.', note:'Sắp có', soon:true, sans:'e4 e5 Qh5 Nc6 Bc4 Nf6 Qxf7', flip:0})+
    '</section>'+
    '<section class="card"><h3 class="sec">Thử thách</h3>'+
      hubCard({tag:'Chạy đua', title:'Câu đố tốc độ', desc:'Giải càng nhiều câu càng tốt trong ba phút.', note:'Sắp có', soon:true, fen:'4k3/8/8/8/8/8/8/R3K3 w - - 0 1', sans:'Ra8+ Kd7 Rh8 Ke7'})+
    '</section>';
  onLeave(mountThumbs(stage));
}
function viewDaily(){
  const pz = dailyPuzzle();
  startQuiz([pz], '#/cau-do', 'Câu đố hôm nay', {
    crumbs:[['Trang chủ','#/'],['Câu đố','#/cau-do'],['Hôm nay']], single:true, backText:'Về khu Câu đố',
    onEnd:()=>Prog.markDay(),
    endHTML:()=>'<p class="streak"><b>Chuỗi '+Prog.streak()+' ngày</b> liên tiếp. Mai quay lại để giữ chuỗi nhé.</p>'
  });
}
function viewEndgameQuiz(){
  startQuiz(PUZ_END, '#/cau-do', 'Tàn cuộc', {
    crumbs:[['Trang chủ','#/'],['Câu đố','#/cau-do'],['Tàn cuộc']], setId:'end', backText:'Về khu Câu đố'
  });
}

/* ---------- Lộ trình 6 cấp ---------- */
function viewRoadmap(){
  setCrumbs([['Trang chủ','#/'],['Học theo cấp']]);
  const nx = nextUnit();
  let h = '<section class="card"><h2>Lộ trình 6 cấp</h2>'+
    '<p>Đi từ cấp 0 lên cấp 5. Học xong bài nào, bài đó được đánh dấu ✓ (lưu ngay trên máy của bạn). Bài ghi "Đang soạn" sẽ có sau.</p>'+
    (nx ? '<a class="goon" href="'+nx.href+'"><span class="vnum" aria-hidden="true">▶</span><div><b>'+(anyProgress()?'Tiếp tục':'Bắt đầu')+'</b><span class="muted">Cấp '+nx.lv.n+' · '+esc(nx.u.title)+'</span></div><span class="go" aria-hidden="true">›</span></a>' : '')+
    '</section>';
  LEVELS.forEach(lv=>{
    const p = levelProgress(lv), soonN = p.total-p.ready;
    h += '<section class="card level"><div class="lvhead"><span class="lvnum" aria-hidden="true">'+lv.n+'</span><div><h2>Cấp '+lv.n+': '+esc(lv.name)+'</h2><p class="muted small">'+esc(lv.desc)+'</p></div></div>'+
      '<div class="progress" aria-hidden="true"><i style="width:'+(p.total ? p.done/p.total*100 : 0)+'%"></i></div>'+
      '<p class="muted small">'+p.done+'/'+p.total+' bài đã xong'+(soonN?' · '+soonN+' bài đang soạn':'')+'</p>'+
      '<ol class="units">'+lv.units.map(u=>{
        const st = unitState(u), href = unitHref(u), here = nx && nx.u===u;
        const ico = st.k==='done' ? '✓' : st.k==='soon' ? '·' : st.k==='retry' ? '↻' : '●';
        const note = st.k==='done' && st.note ? '<span class="pill ok">'+st.note+'</span>' : st.k==='retry' ? '<span class="pill">Làm lại ('+st.note+')</span>' : st.k==='soon' ? '<span class="pill soon">Đang soạn</span>' : here ? '<span class="pill here">Bạn đang ở đây</span>' : '';
        const body = '<span class="uico" aria-hidden="true">'+ico+'</span><span class="ut">'+esc(u.title)+(u.test?' <small>(kiểm tra)</small>':'')+'</span>'+note;
        return '<li class="unit st-'+st.k+(here?' here':'')+'">'+(href ? '<a href="'+href+'">'+body+'</a>' : '<div>'+body+'</div>')+'</li>';
      }).join('')+'</ol></section>';
  });
  stage.innerHTML = h;
}

/* ---------- Trang "sắp có" ---------- */
const SOON = {
  may:{title:'Đánh với máy', crumb:'Đánh với máy', text:['Bạn sẽ đánh một ván với máy cờ Stockfish, chọn mức từ dễ đến khó, có gợi ý và xem lại ván.','Tính năng này đang được chuẩn bị. Trong lúc chờ, hãy thử các câu đố.'], to:['#/cau-do','Làm câu đố']},
  'tam-nhin':{title:'Luyện tầm nhìn', crumb:'Luyện tầm nhìn', text:['Bài luyện nhìn ô cờ không cần bàn: máy đọc một tọa độ, bạn chạm đúng ô. Giúp đọc nhanh tọa độ và hình dung đường đi của quân.','Đang chuẩn bị. Bài "Bàn cờ và tọa độ" ở cấp 0 là bước đầu tiên.'], to:['#/hoc/ban-co','Học tọa độ']},
  lop:{title:'Lớp của thầy', crumb:'Lớp của thầy', text:['Đây sẽ là khu riêng dành cho học sinh của thầy: thầy giao bài, học sinh làm bài, thầy xem tiến độ từng em.','Phần còn lại của web luôn mở cho mọi người, không cần đăng nhập. Chỉ khu này cần tài khoản do thầy cấp.','Khu này đang được thiết kế, sẽ làm sau khi phần học và câu đố đã ổn.'], to:['#/hoc','Xem lộ trình']}
};
function viewSoon(k){
  const s = SOON[k];
  setCrumbs([['Trang chủ','#/'],[s.crumb]]);
  stage.innerHTML = '<section class="card center"><span class="pill soon">Sắp có</span><h2>'+esc(s.title)+'</h2>'+s.text.map(t=>'<p>'+esc(t)+'</p>').join('')+
    '<div class="actions"><a class="btn" href="'+s.to[0]+'">'+esc(s.to[1])+'</a><a class="btn ghost" href="#/">Về trang chủ</a></div></section>';
}

/* ---------- Bài học cấp 0 ---------- */
function viewLesson(id){
  const L = typeof LV0 !== 'undefined' ? LV0[id] : null;
  if (!L){ go('#/hoc'); return; }
  const units = LEVELS[0].units, ui = units.findIndex(u=>u.id===id), n = L.steps.length;
  setCrumbs([['Trang chủ','#/'],['Học theo cấp','#/hoc'],[L.title]]);
  const $ = x => document.getElementById(x);
  let si = -1, res = {}, board = null;
  onLeave(()=>{ if (board) board.destroy(); });
  function kill(){ if (board){ board.destroy(); board = null; } }
  function fb(kind, ico, html){ const el = $('fb'); el.hidden = false; el.className = 'status '+kind; el.innerHTML = '<span class="ico" aria-hidden="true">'+ico+'</span><div>'+html+'</div>'; }
  function nextBtn(label){
    $('next').innerHTML = '<button class="btn" id="nb" type="button">'+label+'</button>';
    $('nb').addEventListener('click', ()=>{ si++; show(); });
    $('nb').focus({preventScroll:true});
  }
  function card(body){
    stage.innerHTML = '<section class="card"><div class="meta"><span class="tag">'+esc(L.title)+' · '+(si+1)+'/'+n+'</span></div>'+
      '<div class="progress" aria-hidden="true"><i style="width:'+(si/n*100)+'%"></i></div>'+body+
      '<div class="status info" id="fb" aria-live="polite" hidden></div><div class="next" id="next"></div></section>';
  }
  function show(){
    kill(); window.scrollTo({top:0});
    if (si<0) return intro();
    if (si>=n) return finish();
    const s = L.steps[si];
    if (s.type==='show') return stShow(s);
    if (s.type==='tap') return stTap(s);
    if (s.type==='quiz') return stQuiz(s);
    return stPlay(s);
  }
  function intro(){
    const first = L.steps.find(s=>s.fen);
    stage.innerHTML = '<section class="card"><div class="meta"><span class="tag">Cấp 0 · '+(L.test?'Kiểm tra':'Bài học')+'</span></div><h2>'+esc(L.title)+'</h2>'+
      (first ? '<div class="boardbox" id="bx"></div>' : '')+L.intro.map(t=>'<p>'+esc(t)+'</p>').join('')+
      '<p class="muted small">Bài này có '+n+' phần'+(L.test?'. Cần đúng ít nhất 70% để đạt.':'.')+'</p>'+
      '<div class="next"><button class="btn" id="go" type="button">'+(L.test?'Bắt đầu kiểm tra':'Bắt đầu')+'</button></div></section>';
    if (first) board = new Board($('bx'), {fen:first.fen, intro:true});
    $('go').addEventListener('click', ()=>{ si = 0; res = {}; show(); });
  }
  function stShow(s){
    card('<div class="boardbox" id="bx"></div><p>'+esc(s.text)+'</p>');
    board = new Board($('bx'), {fen:s.fen, intro:true});
    nextBtn(si===n-1 ? 'Xong' : 'Tiếp tục');
  }
  /* explore, reach, capture: đi quân thật; Vua Đen không có nên lượt luôn ở bên Trắng (solo). */
  function stPlay(s){
    const side = s.fen.split(' ')[1], blackLeft = ()=>board.game.board().reduce((a,r)=>a+r.filter(p=>p&&p.color==='b').length, 0);
    card('<p class="q">'+esc(s.text)+'</p><div class="boardbox" id="bx"></div>'+
      '<div class="boardtools"><button class="btn ghost small" id="redo" type="button">Làm lại</button><span class="cnt" id="cnt"></span></div>');
    let moves = 0, done = false;
    const test = !!L.test;
    function cnt(){ $('cnt').textContent = 'Số nước đã đi: '+moves; }
    board = new Board($('bx'), {fen:s.fen, interactive:true, solo:side, canMove:c=>c===side, intro:true, onMove});
    cnt();
    if (s.type==='reach') fb('info','♟','<p>Ô cần tới: <b>'+esc(s.target)+'</b>.</p>');
    if (s.type==='capture') fb('info','♟','<p>Còn <b>'+blackLeft()+'</b> quân Đen cần ăn.</p>');
    function win(){
      done = true; board.lock(true);
      const best = moves <= s.best; res[si] = best;
      fb(best?'ok':'info', best?'✓':'→',
        best ? '<p><b>Chính xác!</b> Bạn làm trong '+moves+' nước, đây là số nước ít nhất.</p>' :
        '<p><b>Hoàn thành, nhưng có cách ngắn hơn.</b> Bạn đi '+moves+' nước, còn cách chỉ cần '+s.best+' nước.</p>'+(test?'<p>Câu này không được tính điểm.</p>':'<p>Bấm Làm lại để thử tìm đường ngắn hơn, hoặc Tiếp tục.</p>'));
      if (best){ $('fb').classList.add('celebrate'); }
      nextBtn(si===n-1 ? 'Xong' : 'Tiếp tục');
    }
    function onMove(){
      moves++; cnt();
      if (s.type==='explore'){
        if (moves>=s.min){ if (!done){ done = true; fb('ok','✓','<p><b>Tốt lắm!</b> Bạn đã thử '+moves+' nước. Có thể đi thêm cho quen, rồi bấm Tiếp tục.</p>'); nextBtn(si===n-1 ? 'Xong' : 'Tiếp tục'); } }
        else fb('info','♟','<p>Đã đi '+moves+' nước. Thử thêm '+(s.min-moves)+' nước nữa.</p>');
        return;
      }
      if (done) return;
      if (s.type==='reach' && board.last && board.last[1]===s.target) return win();
      if (s.type==='capture' && blackLeft()===0) return win();
      if (!board.game.moves().length){ board.lock(true); fb('no','✗','<p>Không còn nước đi nào. Bấm Làm lại để thử cách khác.</p>'); return; }
      if (s.type==='reach') fb('info','♟','<p>Chưa tới ô <b>'+esc(s.target)+'</b>. Đã đi '+moves+' nước.</p>');
      else fb('info','♟','<p>Còn <b>'+blackLeft()+'</b> quân Đen cần ăn. Đã đi '+moves+' nước.</p>');
    }
    $('redo').addEventListener('click', ()=>{
      moves = 0; done = false; delete res[si]; $('next').innerHTML = ''; board.lock(false); board.setFen(s.fen); cnt();
      if (s.type==='reach') fb('info','♟','<p>Ô cần tới: <b>'+esc(s.target)+'</b>.</p>');
      else if (s.type==='capture') fb('info','♟','<p>Còn <b>'+blackLeft()+'</b> quân Đen cần ăn.</p>');
      else $('fb').hidden = true;
    });
  }
  /* tap: chạm đúng ô được hỏi trên bàn trống. */
  function stTap(s){
    card('<p class="q">'+esc(s.text)+'</p><p class="ask" id="ask"></p><div class="boardbox" id="bx"></div>');
    board = new Board($('bx'), {fen:'8/8/8/8/8/8/8/8 w - - 0 1'});
    board.root.classList.add('tapact'); if (L.test) board.root.classList.add('nocoord');
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
          nextBtn(si===n-1 ? 'Xong' : 'Tiếp tục');
        } else { fb('ok','✓','<p>Đúng, ô '+esc(sq)+'.</p>'); ask(); }
      } else {
        wrong++; board.setFlash(sq,'no',600);
        fb('no','✗','<p>Bạn chạm ô <b>'+esc(sq)+'</b>. Ô cần tìm là <b>'+esc(want)+'</b>: cột <b>'+esc(want[0])+'</b>, hàng <b>'+esc(want[1])+'</b>.</p>');
      }
    });
  }
  function stQuiz(s){
    card('<h2 class="qh">'+esc(s.q)+'</h2><div class="qopts">'+s.opts.map((o,i)=>'<button class="qopt" type="button" data-i="'+i+'">'+esc(o)+'</button>').join('')+'</div>');
    let answered = false;
    stage.querySelector('.qopts').addEventListener('click', e=>{
      const b = e.target.closest('.qopt'); if (!b || answered) return;
      answered = true; const i = +b.dataset.i, ok = i===s.correct; res[si] = ok;
      stage.querySelectorAll('.qopt').forEach(x=>{ x.disabled = true; if (+x.dataset.i===s.correct) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      fb(ok?'ok':'no', ok?'✓':'✗', '<p><b>'+(ok?PRAISE[si%PRAISE.length]:'Chưa đúng.')+'</b></p><p>'+esc(s.why)+'</p>');
      if (ok) $('fb').classList.add('celebrate');
      nextBtn(si===n-1 ? 'Xong' : 'Tiếp tục');
    });
  }
  function finish(){
    const keys = Object.keys(res), pts = keys.filter(k=>res[k]).length, tot = keys.length;
    const pass = !L.test || !tot || pts/tot>=0.7;
    Prog.setLesson(id, {done:pass, pts:pts, n:tot});
    const nu = units[ui+1], nh = nu && unitHref(nu);
    let rev = '';
    if (L.test) L.steps.forEach((s,i)=>{ if (res[i]===undefined) return; rev += '<li class="'+(res[i]?'ok':'no')+'"><b>'+(res[i]?'✓':'✗')+'</b><span>'+esc(s.q||s.text)+'</span></li>'; });
    stage.innerHTML = '<section class="card end"><h2>'+(L.test ? (pass ? 'Bạn đã đạt!' : 'Chưa đạt, thử lại nhé') : 'Hoàn thành bài '+esc(L.title)+'!')+'</h2>'+
      (tot ? '<div class="big">'+pts+'/'+tot+'</div><p class="muted small">'+(L.test ? 'Cần đúng ít nhất 70% để đạt.' : 'Số câu bạn làm đúng ngay lần đầu.')+'</p>' : '')+
      (L.test ? '<ul class="review">'+rev+'</ul>' : '')+
      '<div class="actions">'+
        (L.test && !pass ? '<button class="btn" id="again" type="button">Làm lại bài kiểm tra</button>' : (nh ? '<a class="btn" href="'+nh+'">Bài tiếp theo: '+esc(nu.title)+'</a>' : '<a class="btn" href="#/hoc">Về lộ trình</a>'))+
        '<a class="btn ghost" href="#/hoc">Xem lộ trình</a></div></section>';
    if (pass) confetti();
    const ag = $('again'); if (ag) ag.addEventListener('click', ()=>{ si = -1; res = {}; show(); });
  }
  show();
}
