/* Trang chủ 6 nút, khu Câu đố, lộ trình 6 cấp và bài học cấp 0.
   Nạp TRƯỚC js/app.js (app.js gọi route() ở cuối). Dùng các hàm của app.js và board.js khi được gọi. */

/* ---------- 6 nút ở trang chủ ---------- */
/* Mỗi nút có một bàn cờ nhỏ tự đi vài nước. Các thế cờ đã kiểm bằng chess.js (tools/ hoặc chạy thử). */
const TILES = [
  {href:'#/hoc', title:'Học theo cấp', sub:'Sáu cấp, từ bàn cờ đến chiến lược', fen:'4k3/8/8/8/8/8/8/6N1 w - - 0 1', sans:'Nf3 Kd7 Ne5+ Ke7 Nc6+ Kd6 Nb4'},
  {href:'#/cau-do', title:'Câu đố', sub:'Mỗi ngày một câu, và nhiều bộ khác', fen:'1k6/8/8/8/6K1/3r4/8/Q7 w - - 0 1', sans:'Qb1+ Kc7 Qxd3'},
  {href:'#/khai-cuoc', title:'Khai cuộc', sub:'Tìm khai cuộc, xem điểm mạnh và yếu', sans:'e4 c6 d4 d5 Nc3 dxe4 Nxe4', flip:1},
  {href:'#/cau-do/tan-cuoc', title:'Tàn cuộc', sub:'Luyện thắng khi còn ít quân', fen:'8/4P3/8/8/8/k7/8/4K3 w - - 0 1', sans:'e8=Q Kb3 Qe3+ Kb2'},
  {href:'#/may', title:'Đánh với máy', sub:'Chọn mức dễ đến khó', sans:'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6'},
  {href:'#/tam-nhin', title:'Luyện tầm nhìn', sub:'Nhìn ô cờ không cần bàn', fen:'4k3/8/8/8/8/8/8/R3K3 w - - 0 1', sans:'Ra8+ Kd7 Rh8 Ke7', soon:true}
];

/* ---------- Tiến độ theo bài ---------- */
function unitHref(u){
  if (u.soon) return null;
  if (u.href) return u.href;
  if (u.id && LESSON_BANK[u.id]) return '#/hoc/'+u.id;
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
/* Bài tiếp theo: bắt đầu từ cấp mà bài xếp lớp gợi ý (nếu đã làm), không có thì tìm từ cấp 0. */
function nextUnit(){
  const from = Prog.placed() || 0;
  for (const pass of [from, 0]) for (const lv of LEVELS){
    if (lv.n < pass) continue;
    for (const u of lv.units){
      const st = unitState(u);
      if (st.k==='open' || st.k==='retry') return {lv:lv, u:u, href:unitHref(u), st:st};
    }
  }
  return null;
}
function dueCount(){ return Prog.reviewDue(999).length; }
function levelProgress(lv){
  let done = 0, ready = 0;
  lv.units.forEach(u=>{ const k = unitState(u).k; if (k!=='soon') ready++; if (k==='done') done++; });
  return {done:done, ready:ready, total:lv.units.length};
}
function anyProgress(){ return LEVELS.some(lv=>levelProgress(lv).done>0); }

/* Câu đố hôm nay: mỗi ngày một chủ đề và một câu (trong nhóm Dễ và Vừa), ai mở cũng thấy cùng một câu. */
function dayNumber(){ const d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())/86400000); }
function dailyPick(){ const n = dayNumber(), t = PUZ_THEMES[n % PUZ_THEMES.length]; return {theme:t, idx:Math.floor(n/PUZ_THEMES.length) % 40}; }

/* ---------- Trang chủ ---------- */
function tileHTML(t){
  let foot = '';
  if (t.soon) foot = '<span class="pill soon">Sắp có</span>';
  else if (t.href==='#/hoc'){
    const all = LEVELS.reduce((a,lv)=>{ const p = levelProgress(lv); return {d:a.d+p.done, r:a.r+p.ready}; }, {d:0,r:0});
    foot = '<span class="pill">'+all.d+'/'+all.r+' bài đã làm</span>';
  } else if (t.href==='#/cau-do'){
    foot = '<span class="pill'+(Prog.doneToday()?' ok':'')+'">'+(Prog.doneToday()?'Hôm nay xong ✓':'Câu hôm nay chưa làm')+'</span>';
  } else if (t.href==='#/may'){
    let w = 0; for (const lv of ENGINE_LEVELS) if (mayStats(lv.n).w) w = lv.n;
    foot = '<span class="pill'+(w?' ok':'')+'">'+(w ? 'Đã thắng tới mức '+w : '8 mức, dễ đến khó')+'</span>';
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
  const due = dueCount(), nRev = Prog.reviewCount();
  const review = nRev ? '<a class="goon" href="#/on-tap"><span class="vnum" aria-hidden="true">↻</span><div><b>Ôn hôm nay</b><span class="muted">'+(due ? due+' câu đến hạn ôn' : 'Chưa có câu nào đến hạn')+'</span></div><span class="go" aria-hidden="true">›</span></a>' : '';
  const place = Prog.placed()===null && !anyProgress() ? '<a class="goon" href="#/xep-lop"><span class="vnum" aria-hidden="true">?</span><div><b>Bài xếp lớp</b><span class="muted">15 câu, biết nên bắt đầu từ cấp nào</span></div><span class="go" aria-hidden="true">›</span></a>' : '';
  const nPuz = window.LESSON_LIST.reduce((a,m)=>a+m.puzzles,0) + PUZ_END.length + PUZ_THEMES.reduce((a,t)=>a+t.n,0);
  stage.innerHTML =
    '<section class="hero"><div><h2>Học cờ vua từng bước, dễ hiểu, miễn phí</h2>'+
      '<p>Chọn một nút bên dưới. Mọi bài đều có bàn cờ để bạn tự đi quân.</p>'+
      '<ol class="steps3"><li><b>1</b>Học</li><li><b>2</b>Luyện</li><li><b>3</b>Chơi</li></ol>'+
      '<div class="stats"><span><strong>'+LEVELS.length+'</strong>cấp học</span>'+
      '<span><strong>'+ALL.length.toLocaleString('vi-VN')+'</strong>dòng khai cuộc</span><span><strong>'+nPuz+'</strong>câu đố</span></div></div>'+
      '<div class="herobox"><div class="boardbox" id="heroBoard"></div><a class="herocap" id="heroCap" href="#/"><b id="heroName"></b><span id="heroMoves"></span></a></div></section>'+
    '<div class="goons">'+cont+daily+place+review+'</div>'+
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
  const ck = Prog.best('ck-all'), en = Prog.best('end'), today = Prog.doneToday(), dp = dailyPick(), st = Prog.streak();
  stage.innerHTML =
    '<section class="card"><h2>Câu đố</h2><p class="muted">Bạn đi quân thật trên bàn cờ. Mỗi câu có gợi ý, câu nhiều nước thì máy tự đi nước đáp của đối thủ.</p></section>'+
    '<section class="card"><h3 class="sec">Hôm nay</h3>'+
      hubCard({href:'#/cau-do/hom-nay', tag:'Câu đố hôm nay', title:dp.theme.name, desc:today ? 'Bạn đã xong hôm nay. Có thể làm lại.' : 'Mỗi ngày một câu, giữ chuỗi ngày liên tiếp.', note:st ? 'Chuỗi '+st+' ngày' : (today?'Đã xong':'Chưa làm'), ok:today, sans:'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5', flip:0})+
    '</section>'+
    '<section class="card"><h3 class="sec">Theo chủ đề</h3>'+
      hubCard({href:'#/cau-do/chu-de', tag:'Chiến thuật', title:'Đòn đôi, ghim, xiên, chiếu hết...', desc:PUZ_THEMES.length+' chủ đề, mỗi chủ đề 3 mức Dễ, Vừa, Khó. Lọc từ kho câu đố Lichess.', note:'Mới', ok:true, fen:'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', sans:'Qxf7'})+
      hubCard({href:'#/cau-do/tan-cuoc', tag:'Tàn cuộc', title:'Luyện '+PUZ_END.length+' câu tàn cuộc', desc:'Đòn nĩa, xiên, chiếu hết khi còn ít quân.', note:en?'Điểm cao nhất '+en.pts+'/'+en.n:'Chưa làm', ok:!!en, fen:'1k6/8/8/8/6K1/3r4/8/Q7 w - - 0 1', sans:'Qb1+ Kc7 Qxd3'})+
    '</section>'+
    '<section class="card"><h3 class="sec">Theo khai cuộc</h3>'+
      hubCard({href:'#/khai-cuoc', tag:'Từng khai cuộc', title:window.LESSON_LIST.length+' khai cuộc có câu đố riêng', desc:'Mở một khai cuộc, rồi bấm "Làm câu đố" để luyện đúng khai cuộc đó, kèm bẫy cần biết.', note:ck?'Caro-Kann: '+ck.pts+'/'+ck.n:'Chưa làm', ok:!!ck, sans:'e4 c6 d4 d5 Nc3 dxe4 Nxe4', flip:1})+
    '</section>'+
    '<section class="card"><h3 class="sec">Thử thách</h3>'+
      hubCard({tag:'Chạy đua', title:'Câu đố tốc độ', desc:'Giải càng nhiều câu càng tốt trong ba phút.', note:'Sắp có', soon:true, fen:'4k3/8/8/8/8/8/8/R3K3 w - - 0 1', sans:'Ra8+ Kd7 Rh8 Ke7'})+
    '</section>';
  onLeave(mountThumbs(stage));
}

/* ---------- Câu đố theo chủ đề (kho Lichess, CC0) ---------- */
const BAND_INFO = {de:{name:'Dễ', lo:0, hi:1100, d:'dưới 1100 điểm'}, vua:{name:'Vừa', lo:1100, hi:1600, d:'1100 đến 1600'}, kho:{name:'Khó', lo:1600, hi:9999, d:'trên 1600'}};
function loadTheme(id, cb){
  if (window.PUZT && PUZT[id]) return cb(PUZT[id]);
  const sc = document.createElement('script'); sc.src = 'data/puz/'+id+'.js';
  sc.onload = ()=>cb(window.PUZT && PUZT[id]); sc.onerror = ()=>cb(null);
  document.head.appendChild(sc);
}
function bandOf(r){ return r < 1100 ? 'de' : r < 1600 ? 'vua' : 'kho'; }
function viewThemes(){
  setCrumbs([['Trang chủ','#/'],['Câu đố','#/cau-do'],['Theo chủ đề']]);
  stage.innerHTML = '<section class="card"><h2>Câu đố theo chủ đề</h2><p class="muted">Chọn một chủ đề, rồi chọn mức. Điểm Dễ, Vừa, Khó theo độ khó do Lichess tính từ hàng triệu lượt giải.</p></section>'+
    '<section class="card"><div class="vlist">'+PUZ_THEMES.map(t=>{
      const best = ['de','vua','kho'].map(b=>Prog.best('th:'+t.id+':'+b)).filter(Boolean).length;
      return '<a class="vcard" href="#/cau-do/chu-de/'+t.id+'"><div><h3>'+esc(t.name)+'</h3><p class="muted">'+esc(t.desc)+'</p><p><span class="pill'+(best?' ok':'')+'">'+(best?best+'/3 mức đã làm':'Chưa làm')+'</span></p></div><span class="go" aria-hidden="true">›</span></a>';
    }).join('')+'</div></section>';
}
function viewTheme(id){
  const t = PUZ_THEMES.find(x=>x.id===id);
  if (!t){ go('#/cau-do/chu-de'); return; }
  setCrumbs([['Trang chủ','#/'],['Câu đố','#/cau-do'],['Theo chủ đề','#/cau-do/chu-de'],[t.name]]);
  stage.innerHTML = '<section class="card"><h2>'+esc(t.name)+'</h2><p>'+esc(t.desc)+'</p><p class="tipbox">Mẹo: '+esc(t.tip)+'</p></section>'+
    '<section class="card"><h3 class="sec">Chọn mức</h3><div class="vlist">'+['de','vua','kho'].map(b=>{
      const best = Prog.best('th:'+id+':'+b), bi = BAND_INFO[b];
      return '<a class="vcard" href="#/cau-do/chu-de/'+id+'/'+b+'"><div><h3>Mức '+bi.name+'</h3><p class="muted">Độ khó '+bi.d+'. Mỗi lượt 10 câu.</p><p><span class="pill'+(best?' ok':'')+'">'+(best?'Điểm cao nhất '+best.pts+'/'+best.n:'Chưa làm')+'</span></p></div><span class="go" aria-hidden="true">›</span></a>';
    }).join('')+'</div></section>';
}
function viewThemeRun(id, band){
  const t = PUZ_THEMES.find(x=>x.id===id);
  if (!t || !BAND_INFO[band]){ go('#/cau-do/chu-de'); return; }
  setCrumbs([['Trang chủ','#/'],['Câu đố','#/cau-do'],['Theo chủ đề','#/cau-do/chu-de'],[t.name,'#/cau-do/chu-de/'+id],['Mức '+BAND_INFO[band].name]]);
  stage.innerHTML = '<section class="card center"><p class="muted">Đang tải câu đố...</p></section>';
  let alive = true; onLeave(()=>{ alive = false; });
  loadTheme(id, rows=>{
    if (!alive) return;
    if (!rows){ stage.innerHTML = '<section class="card center"><p>Không tải được bộ câu đố. Kiểm tra mạng rồi thử lại.</p><a class="btn" href="#/cau-do/chu-de/'+id+'">Quay lại</a></section>'; return; }
    const pool = rows.filter(r=>bandOf(r[3])===band);
    startPuzzleRun(pool, t, {backHref:'#/cau-do/chu-de/'+id, backText:'Về chủ đề', setId:'th:'+id+':'+band, count:10, title:t.name+' · '+BAND_INFO[band].name});
  });
}

/* Chạy một lượt câu đố Lichess: nước đầu là của đối thủ (máy tự đi), rồi bạn đi, máy đáp, cho tới khi xong.
   Nước chiếu hết nào cũng được tính đúng (giống Lichess). po: {backHref, backText, setId, count, title, single, onEnd, endHTML} */
function replayUci(fen, ucis){
  const c = new Chess(fen), out = [{fen:c.fen(), from:null, to:null, san:null, promo:''}];
  for (const u of ucis){
    const m = c.move({from:u.slice(0,2), to:u.slice(2,4), promotion:u[4]});
    if (!m) break;
    out.push({fen:c.fen(), from:m.from, to:m.to, san:m.san, promo:m.promotion||''});
  }
  return out;
}
function startPuzzleRun(pool, theme, po){
  const rows = pool.slice();
  for (let i=rows.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); const x = rows[i]; rows[i] = rows[j]; rows[j] = x; }
  const list = rows.slice(0, po.count || 10);
  if (!list.length){ go(po.backHref); return; }
  let idx = 0, answers = [], board = null, timer = null;
  const $ = id => document.getElementById(id);
  const dotsEl = $('dots');
  onLeave(()=>{ clearTimeout(timer); if (board) board.destroy(); });
  function renderDots(){
    if (list.length<2){ dotsEl.hidden = true; return; }
    let h = '';
    for (let i=0;i<list.length;i++){ const a = answers[i]; h += '<span class="dot '+(a===undefined ? (i===idx?'now':'') : (a?'ok':'no'))+'">'+(i+1)+'</span>'; }
    dotsEl.innerHTML = h+'<span class="score">Điểm: '+answers.filter(Boolean).length+'</span>'; dotsEl.hidden = false;
  }
  function show(){
    clearTimeout(timer); if (board){ board.destroy(); board = null; }
    renderDots();
    const pz = list[idx], ucis = pz[2].split(' '), pos = replayUci(pz[1], ucis), last = pos.length-1;
    const th = po.themeOf ? po.themeOf(pz) : theme;
    const me = pos[1].fen.split(' ')[1];   // bên đi sau nước đầu của đối thủ
    stage.innerHTML =
      '<section class="card"><div class="meta"><span class="tag">'+(list.length>1?'Câu '+(idx+1)+'/'+list.length+' · ':'')+esc(th.name)+'</span>'+
      '<span class="turn"><i class="'+me+'"></i>'+(me==='w'?'Trắng':'Đen')+' đi</span></div>'+
      '<h2>'+esc(th.desc)+'</h2>'+
      '<div class="boardbox" id="qbox"></div>'+
      '<div class="boardtools"><button class="btn ghost small" id="hintBtn" type="button">Gợi ý</button><button class="btn ghost small" id="showBtn" type="button">Xem đáp án</button></div>'+
      '<div class="status info" id="fb" aria-live="polite"></div><div class="next" id="next"></div>'+
      '<p class="muted small">Độ khó '+pz[3]+' (Lichess). Mã câu '+esc(pz[0])+'.</p></section>';
    let k = 0, attempts = 0, solved = false, hintLvl = 0;
    if (po.noHelp) $('hintBtn').hidden = true;
    const fb = (kind, ico, html)=>{ const el = $('fb'); el.hidden = false; el.className = 'status '+kind; el.innerHTML = '<span class="ico" aria-hidden="true">'+ico+'</span><div>'+html+'</div>'; };
    const b = new Board($('qbox'), {fen:pos[0].fen, flip:me==='b', interactive:true, intro:true, canMove:c=>c===me, onMove});
    board = b; b.lock(true);
    fb('info','♟','<p>Nhìn thế cờ. Đối thủ sắp đi nước đầu...</p>');
    timer = setTimeout(()=>{ if (board!==b) return; b.play(pos[1].from, pos[1].to, pos[1].promo, !REDUCE); k = 1; b.lock(false);
      fb('info','♟','<p>Đến lượt bạn. Chạm quân muốn đi rồi chạm ô đến, hoặc kéo quân.</p>'); }, 700);
    function finish(kind){
      solved = true; b.lock(true); b.setHint(null);
      if (answers[idx]===undefined) answers[idx] = kind==='first';
      Prog.reviewResult('th:'+th.id+':'+pz[0], kind==='first');
      renderDots();
      const sol = pos.slice(2).map((p,i)=>p.san).join(' ');
      fb(kind==='show'?'info':'ok', kind==='show'?'→':'✓',
        '<p><b>'+(kind==='first' ? PRAISE[idx%PRAISE.length] : kind==='retry' ? 'Đúng rồi! Lần này bạn đã tìm ra.' : 'Đáp án')+'</b></p><p>Các nước: <b>'+esc(movesTextFrom(pos, 1))+'</b></p><p class="tip">Mẹo: '+esc(th.tip)+'</p>');
      if (kind!=='show') $('fb').classList.add('celebrate');
      $('hintBtn').hidden = $('showBtn').hidden = true;
      const lastQ = idx===list.length-1;
      $('next').innerHTML = '<button class="btn" id="nb" type="button">'+(lastQ?'Xem kết quả':'Câu tiếp theo')+'</button>';
      $('nb').addEventListener('click', ()=>{ idx++; idx<list.length ? show() : end(); window.scrollTo({top:0}); });
      $('nb').focus({preventScroll:true});
      void sol;
    }
    function onMove(m){
      if (solved || board!==b) return;
      const ex = pos[k+1];
      const ok = ex && m.from===ex.from && m.to===ex.to && (m.promotion||'')===(ex.promo||'');
      if (ok || b.game.in_checkmate()){
        k++; b.setFlash(m.to,'ok',700); b.setHint(null);
        if (b.game.in_checkmate() || k>=last) return finish(attempts===0 ? 'first' : 'retry');
        b.lock(true);
        fb('ok','✓','<p><b>Đúng!</b> Đối thủ đáp lại...</p>');
        timer = setTimeout(()=>{
          if (board!==b) return;
          const p = pos[k+1]; b.play(p.from, p.to, p.promo, !REDUCE); k++; hintLvl = 0; b.lock(false);
          fb('info','♟','<p>Đến lượt bạn, tiếp tục nhé.</p>');
        }, 650);
      } else {
        attempts++; if (answers[idx]===undefined){ answers[idx] = false; renderDots(); }
        b.lock(true); b.setFlash(m.to,'no',700);
        fb('no','✗','<p><b>'+esc(m.san)+'</b> chưa đúng.</p><p>'+(attempts>=2?'Bí rồi? Bấm Gợi ý hoặc Xem đáp án.':'Hãy thử nước khác.')+'</p>');
        timer = setTimeout(()=>{ if (board!==b || solved) return; b.setFen(pos[k].fen, {last:[pos[k].from,pos[k].to]}); if (hintLvl>=1) b.setHint(pos[k+1].from, hintLvl>=2 ? pos[k+1].to : null); b.lock(false); }, 800);
      }
    }
    $('hintBtn').addEventListener('click', ()=>{
      if (solved || k<1) return;
      hintLvl = Math.min(2, hintLvl+1); b.setHint(pos[k+1].from, hintLvl>=2 ? pos[k+1].to : null);
      if (hintLvl>=2) $('hintBtn').hidden = true;
      else $('hintBtn').textContent = 'Chỉ cho tôi ô cần đến';
    });
    $('showBtn').addEventListener('click', ()=>{
      if (solved || k<1) return;
      if (answers[idx]===undefined){ answers[idx] = false; renderDots(); }
      clearTimeout(timer); b.setFen(pos[last].fen, {last:[pos[last].from,pos[last].to]});
      finish('show');
    });
  }
  function end(){
    dotsEl.hidden = true;
    const pts = answers.filter(Boolean).length, n = list.length, ratio = pts/n;
    if (po.setId) Prog.setBest(po.setId, pts, n);
    if (po.onEnd) po.onEnd(pts, n);
    const msg = po.single ? (pts ? 'Xong câu đố hôm nay, đúng ngay lần đầu!' : 'Xong câu đố hôm nay!') : pts===n ? 'Tuyệt vời, trọn điểm!' : ratio>=0.8 ? 'Rất xuất sắc!' : ratio>=0.5 ? 'Khá lắm, luyện thêm chút nữa nhé!' : 'Đừng lo, câu khó cần luyện nhiều. Thử lại nào!';
    const stars = ratio>=0.9 ? 3 : ratio>=0.6 ? 2 : ratio>=0.3 ? 1 : 0;
    let st = ''; for (let i=0;i<3;i++) st += '<span'+(i<stars?'':' style="opacity:.3"')+'>★</span>';
    if (po.after){
      stage.innerHTML = '<section class="card end"><h2>Xong phần này</h2><div class="big">'+pts+'/'+n+'</div><p class="muted small">Số câu đúng ngay lần đầu.</p>'+
        '<div class="actions"><button class="btn" id="cont" type="button">Tiếp tục</button></div></section>';
      $('cont').addEventListener('click', ()=>{ window.scrollTo({top:0}); po.after(pts, n); });
      return;
    }
    stage.innerHTML = '<section class="card end"><h2>'+msg+'</h2>'+
      (po.single ? '' : '<div class="big">'+pts+'/'+n+'</div><div class="stars" aria-hidden="true">'+st+'</div><p class="muted small">Điểm chỉ tính khi bạn đi đúng ngay lần đầu.</p>')+(po.endHTML ? po.endHTML() : '')+
      '<div class="actions"><button class="btn" id="again" type="button">Chơi lại</button> <a class="btn ghost" href="'+po.backHref+'">'+esc(po.backText)+'</a></div></section>';
    $('again').addEventListener('click', ()=>{
      const r2 = pool.slice().sort(()=>Math.random()-.5); list.length = 0; r2.slice(0, po.count||10).forEach(x=>list.push(x));
      idx = 0; answers = []; show(); window.scrollTo({top:0});
    });
    if (ratio>=0.6 && !po.single) confetti();
  }
  show();
}
/* "1. e4 e5 ..." hoặc "1... e5" từ vị trí i của dãy thế cờ (pos[0] là thế gốc, nước đầu là pos[1]). */
function movesTextFrom(pos, from){
  const turn0 = pos[0].fen.split(' ')[1]==='w' ? 0 : 1, num0 = +pos[0].fen.split(' ')[5] || 1;
  const parts = [];
  for (let i=from;i<pos.length;i++){
    const white = ((i-1+turn0)%2===0), num = num0 + Math.floor((i-1+turn0)/2);
    parts.push((white ? num+'. ' : (i===from ? num+'... ' : ''))+pos[i].san);
  }
  return parts.join(' ');
}
function viewDaily(){
  const dp = dailyPick(), t = dp.theme;
  setCrumbs([['Trang chủ','#/'],['Câu đố','#/cau-do'],['Hôm nay']]);
  stage.innerHTML = '<section class="card center"><p class="muted">Đang tải câu đố...</p></section>';
  let alive = true; onLeave(()=>{ alive = false; });
  loadTheme(t.id, rows=>{
    if (!alive) return;
    if (!rows){ stage.innerHTML = '<section class="card center"><p>Không tải được câu đố. Kiểm tra mạng rồi thử lại.</p><a class="btn" href="#/cau-do">Quay lại</a></section>'; return; }
    const easy = rows.filter(r=>r[3]<1600), pz = easy[dp.idx % easy.length];
    startPuzzleRun([pz], t, {
      count:1, single:true, backHref:'#/cau-do', backText:'Về khu Câu đố', onEnd:()=>Prog.markDay(),
      endHTML:()=>'<p class="streak"><b>Chuỗi '+Prog.streak()+' ngày</b> liên tiếp. Mai quay lại để giữ chuỗi nhé.</p>'
    });
  });
}
/* ---------- Ôn hôm nay: các câu đố đến hạn ôn lặp ----------
   Mỗi câu đố đã làm có một "hộp" 0 đến 3 (Prog.reviewResult): đúng ngay lần đầu thì quay lại sau 3, 7, 21 ngày; sai thì quay lại hôm sau. */
function viewReview(){
  setCrumbs([['Trang chủ','#/'],['Ôn hôm nay']]);
  const keys = Prog.reviewDue(10), total = Prog.reviewCount();
  const empty = why => { stage.innerHTML = '<section class="card center"><h2>Ôn hôm nay</h2><p>'+why+'</p>'+
    '<p class="muted small">Câu đố nào bạn làm đúng ngay lần đầu sẽ quay lại sau 3 ngày, rồi 7 ngày, rồi 21 ngày. Câu làm sai sẽ quay lại vào ngày mai. Ôn đúng lúc sắp quên là cách nhớ lâu nhất.</p>'+
    '<div class="actions"><a class="btn" href="#/cau-do">Làm câu đố</a><a class="btn ghost" href="#/">Về trang chủ</a></div></section>'; };
  if (!keys.length) return empty(total ? 'Hôm nay không còn câu nào cần ôn. Giỏi lắm!' : 'Bạn chưa làm câu đố nào nên chưa có gì để ôn. Hãy làm vài câu đố trước.');
  stage.innerHTML = '<section class="card center"><p class="muted">Đang tải câu đố cần ôn...</p></section>';
  let alive = true; onLeave(()=>{ alive = false; });
  const want = {}, themes = [];
  keys.forEach(k=>{ const m = /^th:(\w+):(.+)$/.exec(k); if (!m) return; (want[m[1]] || (want[m[1]] = (themes.push(m[1]), {})))[m[2]] = 1; });
  const pool = [], tmap = {}; let left = themes.length;
  themes.forEach(id=>loadTheme(id, rows=>{
    const th = PUZ_THEMES.find(t=>t.id===id);
    if (rows && th) rows.forEach(r=>{ if (want[id][r[0]]){ pool.push(r); tmap[r[0]] = th; } });
    if (--left || !alive) return;
    if (!pool.length) return empty('Không tải được các câu cần ôn. Kiểm tra mạng rồi thử lại.');
    startPuzzleRun(pool, null, {count:pool.length, themeOf:r=>tmap[r[0]], backHref:'#/', backText:'Về trang chủ', title:'Ôn hôm nay',
      endHTML:()=>'<p class="muted small">Câu đúng sẽ quay lại sau 3, 7 hoặc 21 ngày. Câu sai sẽ quay lại vào ngày mai.</p>'});
  }));
}
function viewEndgameQuiz(){
  startQuiz(PUZ_END, '#/cau-do', 'Tàn cuộc', {
    crumbs:[['Trang chủ','#/'],['Câu đố','#/cau-do'],['Tàn cuộc']], setId:'end', backText:'Về khu Câu đố'
  });
}

/* ---------- Lộ trình 6 cấp ---------- */
/* Huy hiệu cấp: đã qua (bài kiểm tra đạt 80%), hoặc gợi ý bỏ qua nhờ bài xếp lớp. */
function badgeOf(lv){
  const g = Prog.level(lv.n), pl = Prog.placed();
  if (g && g.passed) return '<p><span class="lvbadge">★ Đã qua cấp '+lv.n+(g.n ? ' · '+g.pts+'/'+g.n : '')+'</span></p>';
  if (pl !== null && lv.n < pl) return '<p><span class="lvbadge hint">Bài xếp lớp: bạn đã biết cấp này</span></p>';
  return '';
}
/* Bản đồ: mỗi cấp một nút tròn trên con đường quanh co. done = xong hết bài, now = cấp có bài kế tiếp, open = có bài làm được, soon = đang soạn. */
function wrapWords(s, max){
  const out = []; let line = '';
  s.split(' ').forEach(w=>{ if (line && (line+' '+w).length > max){ out.push(line); line = w; } else line = line ? line+' '+w : w; });
  if (line) out.push(line);
  return out;
}
function roadmapMap(nx){
  const n = LEVELS.length, H = 96, y0 = 58, W = 340, xs = [84, 256];
  const st = LEVELS.map(lv=>{
    const p = levelProgress(lv);
    return {lv:lv, p:p, k: p.total && p.done===p.total ? 'done' : (nx && nx.lv===lv) ? 'now' : p.ready===0 ? 'soon' : 'open'};
  });
  let g = '<svg viewBox="0 0 '+W+' '+(y0+H*(n-1)+54)+'" role="group" aria-label="Bản đồ '+n+' cấp">';
  for (let i=0;i<n-1;i++){
    const x1 = xs[i%2], y1 = y0+H*i, x2 = xs[(i+1)%2], y2 = y0+H*(i+1);
    const d = 'M'+x1+','+y1+' C'+x1+','+(y1+H*.6)+' '+x2+','+(y2-H*.6)+' '+x2+','+y2;
    g += '<path d="'+d+'" class="mp-road'+(st[i].k==='done' ? ' done' : '')+'"/>';
  }
  st.forEach((s,i)=>{
    const x = xs[i%2], y = y0+H*i, left = i%2===0, lx = left ? x+42 : x-42, anc = left ? 'start' : 'end';
    const label = 'Cấp '+s.lv.n+': '+s.lv.name+'. '+(s.k==='done' ? 'Đã xong' : s.k==='now' ? 'Đang học' : s.k==='soon' ? 'Đang soạn' : 'Chưa học');
    g += '<g class="mp-node '+s.k+'" role="link" tabindex="0" data-lv="'+s.lv.n+'" aria-label="'+esc(label)+'">';
    if (s.k==='now') g += '<circle class="mp-ring" cx="'+x+'" cy="'+y+'" r="31"/>';
    g += '<circle class="mp-dot" cx="'+x+'" cy="'+y+'" r="28"/>';
    if (s.k==='done') g += '<path class="mp-tick" d="M'+(x-10)+','+y+' l7,8 l13,-16"/>';
    else if (s.k==='soon') g += '<g class="mp-lock" transform="translate('+(x-9)+','+(y-11)+')"><rect x="0" y="9" width="18" height="13" rx="3"/><path d="M4 9V6a5 5 0 0 1 10 0v3"/></g>';
    else g += '<text class="mp-num" x="'+x+'" y="'+(y+7)+'" text-anchor="middle">'+s.lv.n+'</text>';
    g += '<text class="mp-t1" x="'+lx+'" y="'+(y-8)+'" text-anchor="'+anc+'">Cấp '+s.lv.n+'</text>';
    const lines = wrapWords(s.lv.name, 17);
    lines.forEach((ln,j)=>{ g += '<text class="mp-t2" x="'+lx+'" y="'+(y+8+j*15)+'" text-anchor="'+anc+'">'+esc(ln)+'</text>'; });
    const sub = s.k==='soon' ? 'Đang soạn' : s.p.done+'/'+s.p.total+' bài';
    g += '<text class="mp-t3'+(s.k==='now' ? ' now' : '')+'" x="'+lx+'" y="'+(y+8+lines.length*15)+'" text-anchor="'+anc+'">'+(s.k==='now' ? 'Bạn đang ở đây · ' : '')+sub+'</text>';
    g += '</g>';
  });
  return '<section class="card mapcard"><h3>Bản đồ</h3><div class="mapbox" id="rmap">'+g+'</svg></div></section>';
}
function mountRoadmapMap(){
  const m = document.getElementById('rmap'); if (!m) return;
  const jump = el => { const t = document.getElementById('lv'+el.dataset.lv); if (t) t.scrollIntoView({behavior: REDUCE ? 'auto' : 'smooth', block:'start'}); };
  m.addEventListener('click', e=>{ const nd = e.target.closest('.mp-node'); if (nd) jump(nd); });
  m.addEventListener('keydown', e=>{ if (e.key==='Enter' || e.key===' '){ const nd = e.target.closest('.mp-node'); if (nd){ e.preventDefault(); jump(nd); } } });
}
/* Biểu tượng động cho từng bài trong danh sách: mỗi quân đi theo đúng kiểu của nó (css/theme.css, .uico). */
const UNIT_PIECE = {tot:['wP','P'], xe:['wR','R'], tuong:['wB','B'], ma:['wN','N'], hau:['wQ','Q'], vua:['wK','K'], 'caro-kann':['bP','P'], 'tan-cuoc':['wK','K'],
  chieu:['wK','K'], 'hoa-co':['wK','K'], 'nhap-thanh':['wR','R'], 'qua-duong':['wP','P'], 'phong-cap':['wQ','Q'], 'chieu-het-hau-xe':['wQ','Q'],
  doi:['wN','N'], ghim:['wB','B'], xien:['wR','R'], 'quan-treo':['wP','P'], 'chieu-het-1-2':['wK','K'], 'tranh-nha-quan':['wN','N']};
function unitIcon(u, st){
  if (st.k==='done') return {cls:'is-done', html:'✓'};
  if (st.k==='soon') return {cls:'is-soon', html:'·'};
  if (st.k==='retry') return {cls:'is-retry', html:'↻'};
  if (u.test) return {cls:'pic mv-star', html:'★'};
  if (u.id==='ban-co') return {cls:'pic mv-board', html:'<i class="mb"><s></s><s></s><s></s><s></s></i>'};
  if (u.id==='gia-tri') return {cls:'pic mv-nums', html:'<i class="nums"><b>1</b><b>3</b><b>9</b></i>'};
  const pc = UNIT_PIECE[u.id] || ['wP','P'];
  return {cls:'pic mv-'+pc[1], html:'<svg class="pc" viewBox="0 0 45 45"><use href="#'+pc[0]+'"/></svg>'};
}
function viewRoadmap(){
  setCrumbs([['Trang chủ','#/'],['Học theo cấp']]);
  const nx = nextUnit();
  let h = '<section class="card"><h2>Lộ trình 6 cấp</h2>'+
    '<p>Đi từ cấp 0 lên cấp 5. Học xong bài nào, bài đó được đánh dấu ✓ (lưu ngay trên máy của bạn). Cuối mỗi cấp có bài kiểm tra: đúng từ 80% là qua cấp. Bài ghi "Đang soạn" sẽ có sau.</p>'+
    '<div class="placebar"><p>'+(Prog.placed()===null ? 'Chưa biết bắt đầu từ cấp nào? Làm bài xếp lớp 15 câu để được gợi ý.' : 'Bài xếp lớp gợi ý bạn bắt đầu từ <b>Cấp '+Prog.placed()+'</b>. Bạn vẫn học lại cấp nào cũng được.')+'</p><a class="btn small'+(Prog.placed()===null?'':' ghost')+'" href="#/xep-lop">'+(Prog.placed()===null ? 'Làm bài xếp lớp' : 'Làm lại')+'</a></div>'+
    (nx ? '<a class="goon" href="'+nx.href+'"><span class="vnum" aria-hidden="true">▶</span><div><b>'+(anyProgress()?'Tiếp tục':'Bắt đầu')+'</b><span class="muted">Cấp '+nx.lv.n+' · '+esc(nx.u.title)+'</span></div><span class="go" aria-hidden="true">›</span></a>' : '')+
    '</section>';
  h += roadmapMap(nx);
  LEVELS.forEach(lv=>{
    const p = levelProgress(lv), soonN = p.total-p.ready;
    h += '<section class="card level" id="lv'+lv.n+'"><div class="lvhead"><span class="lvnum" aria-hidden="true">'+lv.n+'</span><div><h2>Cấp '+lv.n+': '+esc(lv.name)+'</h2><p class="muted small">'+esc(lv.desc)+'</p></div></div>'+
      '<div class="progress" aria-hidden="true"><i style="width:'+(p.total ? p.done/p.total*100 : 0)+'%"></i></div>'+
      '<p class="muted small">'+p.done+'/'+p.total+' bài đã xong'+(soonN?' · '+soonN+' bài đang soạn':'')+'</p>'+badgeOf(lv)+
      '<ol class="units">'+lv.units.map(u=>{
        const st = unitState(u), href = unitHref(u), here = nx && nx.u===u;
        const ic = unitIcon(u, st);
        const note = st.k==='done' && st.note ? '<span class="pill ok">'+st.note+'</span>' : st.k==='retry' ? '<span class="pill">Làm lại ('+st.note+')</span>' : st.k==='soon' ? '<span class="pill soon">Đang soạn</span>' : here ? '<span class="pill here">Bạn đang ở đây</span>' : '';
        const body = '<span class="uico '+ic.cls+'" aria-hidden="true">'+ic.html+'</span><span class="ut">'+esc(u.title)+(u.test?' <small>(kiểm tra)</small>':'')+'</span>'+note;
        return '<li class="unit st-'+st.k+(here?' here':'')+'">'+(href ? '<a href="'+href+'">'+body+'</a>' : '<div>'+body+'</div>')+'</li>';
      }).join('')+'</ol></section>';
  });
  stage.innerHTML = h;
  mountRoadmapMap();
}

/* ---------- Trang "sắp có" ---------- */
const SOON = {
  'tam-nhin':{title:'Luyện tầm nhìn', crumb:'Luyện tầm nhìn', text:['Bài luyện nhìn ô cờ không cần bàn: máy đọc một tọa độ, bạn chạm đúng ô. Giúp đọc nhanh tọa độ và hình dung đường đi của quân.','Đang chuẩn bị. Bài "Bàn cờ và tọa độ" ở cấp 0 là bước đầu tiên.'], to:['#/hoc/ban-co','Học tọa độ']},
  lop:{title:'Lớp của thầy', crumb:'Lớp của thầy', text:['Đây sẽ là khu riêng dành cho học sinh của thầy: thầy giao bài, học sinh làm bài, thầy xem tiến độ từng em.','Phần còn lại của web luôn mở cho mọi người, không cần đăng nhập. Chỉ khu này cần tài khoản do thầy cấp.','Khu này đang được thiết kế, sẽ làm sau khi phần học và câu đố đã ổn.'], to:['#/hoc','Xem lộ trình']}
};
function viewSoon(k){
  const s = SOON[k];
  setCrumbs([['Trang chủ','#/'],[s.crumb]]);
  stage.innerHTML = '<section class="card center"><span class="pill soon">Sắp có</span><h2>'+esc(s.title)+'</h2>'+s.text.map(t=>'<p>'+esc(t)+'</p>').join('')+
    '<div class="actions"><a class="btn" href="'+s.to[0]+'">'+esc(s.to[1])+'</a><a class="btn ghost" href="#/">Về trang chủ</a></div></section>';
}
