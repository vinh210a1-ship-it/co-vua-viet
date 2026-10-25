/* Thư Viện Khai Cuộc: bản mẫu. Dữ liệu: OP (bài học), PUZ (puzzle), ALL (bảng khai cuộc Lichess). */
const PRAISE = ['Chính xác!','Quá đỉnh!','Hay lắm!','Đúng rồi, giỏi quá!'];
const OOPS = ['Chưa đúng rồi.','Tiếc quá!','Chưa phải nước này.'];
const VN = {K:'Vua',Q:'Hậu',R:'Xe',B:'Tượng',N:'Mã',P:'Tốt'};
const FILES = 'abcdefgh';
const stage = document.getElementById('stage');
const crumbs = document.getElementById('crumbs');
const REDUCE = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
/* Việc cần dọn khi rời trang (bàn cờ tương tác, bộ hẹn giờ). */
let leaveJobs = [];
function onLeave(f){ leaveJobs.push(f); }
function cleanup(){ leaveJobs.forEach(f=>{ try { f(); } catch(e){} }); leaveJobs = []; }

function esc(s){ return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function norm(s){ return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase(); }

/* ---------- Bàn cờ ---------- */
function parseBoard(fen){
  const g = Array.from({length:8},()=>Array(8).fill(null));
  fen.split(' ')[0].split('/').forEach((row,i)=>{
    let f = 0;
    for (const ch of row){
      if (/\d/.test(ch)) f += +ch;
      else { g[7-i][f] = {c: ch === ch.toUpperCase() ? 'w' : 'b', p: ch.toUpperCase()}; f++; }
    }
  });
  return g;
}
function describe(fen){
  const g = parseBoard(fen), w = [], b = [];
  for (let r=7;r>=0;r--) for (let f=0;f<8;f++){
    const x = g[r][f]; if (!x) continue;
    (x.c==='w'?w:b).push(VN[x.p]+' '+FILES[f]+(r+1));
  }
  return 'Trắng: '+w.join(', ')+'. Đen: '+b.join(', ')+'.';
}
function boardHTML(fen, flip, hl, moved, cls){
  const g = parseBoard(fen);
  let h = '<div class="board'+(cls?' '+cls:'')+'" '+(cls==='mini' ? 'aria-hidden="true"' : 'role="img" aria-label="'+esc(describe(fen))+'"')+'>';
  for (let r=0;r<8;r++) for (let c=0;c<8;c++){
    const rank = flip ? r : 7-r, file = flip ? 7-c : c;
    const name = FILES[file]+(rank+1);
    const dark = (file+rank)%2===0;
    const x = g[rank][file];
    let cls = 'sq '+(dark?'dark':'light');
    if (hl && (name===hl[0] || name===hl[1])) cls += ' hl';
    h += '<div class="'+cls+'">';
    if (c===0) h += '<span class="co r">'+(rank+1)+'</span>';
    if (r===7) h += '<span class="co f">'+FILES[file]+'</span>';
    if (x) h += '<svg class="pc'+(moved && hl && name===hl[1]?' moved':'')+'" viewBox="0 0 45 45"><use href="#'+x.c+x.p+'"/></svg>';
    h += '</div>';
  }
  return h + '</div>';
}

/* ---------- Phát lại nước đi bằng chess.js ---------- */
function replay(sans){
  const c = new Chess();
  const out = [{fen:c.fen(), from:null, to:null, san:null}];
  for (const s of sans){
    const m = c.move(s);
    if (!m) break;
    out.push({fen:c.fen(), from:m.from, to:m.to, san:m.san, promo:m.promotion||''});
  }
  return out;
}
function movesText(sans, n){
  const parts = [];
  sans.slice(0,n).forEach((s,i)=>{ parts.push(i%2===0 ? (Math.floor(i/2)+1)+'. '+s : (i===0?'':'')+s); });
  return parts.join(' ');
}
function plyLabel(i, san){ return (Math.floor(i/2)+1)+(i%2===0?'. ':'... ')+san; }

/* ---------- Điều hướng ---------- */
function setCrumbs(list){
  crumbs.innerHTML = list.map((x,i)=> x[1] ? '<a href="'+x[1]+'">'+esc(x[0])+'</a>' : '<span>'+esc(x[0])+'</span>').join('<i aria-hidden="true">›</i>');
}
let CUR = '#/';
try { if (/^#\//.test(location.hash)) CUR = location.hash; } catch(e){}
function go(h){
  CUR = h;
  try { history.pushState(null,'',h); } catch(e){}
  route();
}
function route(){
  cleanup();
  document.getElementById('dots').hidden = true;
  stepperGo = stepperKey = null;
  const h = CUR.slice(2).split('/').filter(Boolean);
  window.scrollTo({top:0});
  if (h[0]==='o' && h[1]===OP.opening.id && h[2]==='trap' && h[3]==='quiz')
    return startQuiz([PUZ.find(p=>p.var==='trap')], '#/o/'+OP.opening.id+'/trap', 'Bẫy cần biết');
  if (h.length===0) return viewHome();
  if (h[0]==='o' && h[1]===OP.opening.id){
    if (!h[2]) return viewOpening();
    if (h[2]==='quiz') return startQuiz(PUZ, '#/o/'+OP.opening.id, 'Luyện tập '+OP.opening.name_vi);
    if (h[2]==='trap') return viewTrap();
    const v = OP.variations.find(x=>x.id===h[2]);
    if (v){
      if (h[3]==='quiz'){
        const list = PUZ.filter(p=>p.var===v.id);
        return startQuiz(list, '#/o/'+OP.opening.id+'/'+v.id, 'Luyện biến thể '+v.name_vi);
      }
      if (h[3]==='practice') return viewPractice(v);
      return viewVariation(v);
    }
  }
  if (h[0]==='line' && ALL[+h[1]]) return viewLine(+h[1]);
  viewHome();
}
document.addEventListener('click', e=>{
  const a = e.target.closest && e.target.closest('a[href^="#/"]');
  if (a){ e.preventDefault(); go(a.getAttribute('href')); }
});
window.addEventListener('popstate', ()=>{ try { CUR = /^#\//.test(location.hash) ? location.hash : '#/'; } catch(e){ CUR = '#/'; } route(); });

/* ---------- Trang chủ: tìm kiếm ---------- */
const ALIAS = {sicilia:'sicilian', phap:'french', 'tay ban nha':'ruy lopez', scotland:'scotch', anh:'english', 'ha lan':'dutch', 'an do':'indian'};
const POPULAR = ['Sicilian Defense','Ruy Lopez','French Defense','Italian Game',"Queen's Gambit Declined","Queen's Gambit Accepted",'Caro-Kann Defense',"King's Indian Defense",'English Opening','Scotch Game','London System','Scandinavian Defense'];
let searchState = {q:''};
function matchQuery(q){
  let t = norm(q).trim();
  if (!t) return [];
  for (const k in ALIAS) if (k.indexOf(' ')>=0 && t.includes(k)) t = t.replace(k, ALIAS[k]);
  const words = t.split(/\s+/).map(w=>ALIAS[w]||w);
  const res = [];
  for (let i=0;i<ALL.length;i++){
    const n = norm(ALL[i][1]+' '+ALL[i][0]);
    if (words.every(w=>n.includes(w))) res.push(i);
  }
  const starts = i => norm(ALL[i][1]).indexOf(words[0])===0 ? 0 : 1;
  res.sort((a,b)=> starts(a)-starts(b) || ALL[a][2].split(' ').length - ALL[b][2].split(' ').length || (ALL[a][1] < ALL[b][1] ? -1 : 1));
  return res;
}
function lessonMatches(q){
  const t = norm(q).trim(); if (!t) return true;
  const o = OP.opening;
  const hay = norm(o.name_vi+' '+o.name_en+' '+o.eco+' caro kann caro-kann');
  return t.split(/\s+/).every(w=>hay.includes(w) || (ALIAS[w] && hay.includes(ALIAS[w])));
}
function lessonCard(){
  const o = OP.opening, f = replay(o.first_moves.replace(/\d+\.\s*/g,'').split(/\s+/).filter(Boolean));
  const last = f[f.length-1];
  return '<a class="lesson" href="#/o/'+o.id+'"><span class="thumb">'+boardHTML(last.fen, o.side==='b', [last.from,last.to], false, 'mini')+'</span>'+
    '<div><span class="badge">Có bài học đầy đủ</span>'+
    '<h2>'+esc(o.name_vi)+'</h2><p class="muted">'+esc(o.name_en)+' · '+esc(o.eco)+' · '+esc(o.first_moves)+'</p>'+
    '<p>'+esc(o.tagline)+'</p></div><span class="go" aria-hidden="true">›</span></a>';
}
function resultItem(i){
  const r = ALL[i], sans = r[2].split(' ');
  return '<li><a class="item" href="#/line/'+i+'"><b>'+esc(r[1])+'</b><span class="muted">'+esc(r[0])+' · '+esc(movesText(sans, Math.min(sans.length,8)))+(sans.length>8?' …':'')+'</span></a></li>';
}
/* Bàn cờ minh hoạ ở trang chủ: tự đi mấy nước đầu của bài học, rồi lặp lại. */
function animateHero(host){
  const o = OP.opening, pos = replay(OP.variations[0].moves.split(' ').slice(0,10));
  const b = new Board(host, {fen:pos[0].fen, flip:o.side==='b'});
  b.root.setAttribute('aria-label','Minh hoạ: các nước đầu của '+o.name_vi);
  let k = 0, t = null, alive = true;
  onLeave(()=>{ alive = false; clearTimeout(t); b.destroy(); });
  const lastP = pos[pos.length-1];
  if (REDUCE){ b.setFen(lastP.fen, {last:[lastP.from,lastP.to]}); return; }
  function tick(){
    if (!alive) return;
    if (k >= pos.length-1){ k = 0; t = setTimeout(()=>{ if (!alive) return; b.setFen(pos[0].fen); t = setTimeout(tick, 700); }, 2200); return; }
    k++; const p = pos[k]; b.play(p.from, p.to, p.promo, true); t = setTimeout(tick, 950);
  }
  t = setTimeout(tick, 600);
}
function viewHome(){
  setCrumbs([['Trang chủ']]);
  const fam = {};
  ALL.forEach(r=>{ const f = r[1].split(':')[0]; fam[f] = (fam[f]||0)+1; });
  const chips = POPULAR.filter(f=>fam[f]).map(f=>'<button type="button" class="chip" data-q="'+esc(f)+'">'+esc(f)+' <small>'+fam[f]+'</small></button>').join('');
  stage.innerHTML =
    '<section class="hero"><div><h2>Học khai cuộc từng bước, có người chỉ từng nước đi</h2>'+
      '<p>Tìm một khai cuộc, xem mục đích của từng nước, tự đi lại trên bàn cờ, rồi luyện puzzle.</p>'+
      '<ol class="steps3"><li><b>1</b>Tìm</li><li><b>2</b>Học</li><li><b>3</b>Luyện</li></ol>'+
      '<div class="stats"><span><strong>'+ALL.length.toLocaleString('vi-VN')+'</strong>dòng khai cuộc</span>'+
      '<span><strong>'+OP.variations.length+'</strong>biến thể có bài</span><span><strong>'+PUZ.length+'</strong>puzzle</span></div></div>'+
      '<div class="boardbox" id="heroBoard"></div></section>'+
    '<section class="card">'+
      '<label class="lbl" for="q">Tìm khai cuộc</label>'+
      '<input id="q" class="search" type="search" inputmode="search" autocomplete="off" placeholder="Ví dụ: Sicilian, Caro-Kann, Ruy Lopez, B12" value="'+esc(searchState.q)+'">'+
      '<div class="chips" id="chips">'+chips+'</div>'+
      '<div id="results"></div>'+
    '</section>'+
    '<details class="legend"><summary>Cách đọc nước đi</summary><p>K = Vua, Q = Hậu, R = Xe, B = Tượng, N = Mã, không có chữ = Tốt. x là ăn quân, + là chiếu, # là chiếu hết, O-O là nhập thành gần.</p></details>';
  const q = document.getElementById('q');
  function draw(){
    searchState.q = q.value;
    const val = q.value.trim();
    let h = '';
    if (lessonMatches(val)) h += '<h3 class="sec">Bài học có sẵn</h3>'+lessonCard();
    if (!val){
      h += '<p class="muted">Gõ tên khai cuộc để tìm trong '+ALL.length.toLocaleString('vi-VN')+' dòng khai cuộc. Các khai cuộc khác hiện chỉ xem được nước đi, chưa có bài học chi tiết.</p>';
    } else {
      const ids = matchQuery(val), shown = ids.slice(0,40);
      h += '<h3 class="sec">Các dòng khai cuộc ('+ids.length+')</h3>';
      if (!ids.length) h += '<p class="muted">Không tìm thấy. Thử gõ tên tiếng Anh, ví dụ Sicilian, French, Italian.</p>';
      else h += '<ul class="list">'+shown.map(resultItem).join('')+'</ul>'+(ids.length>shown.length?'<p class="muted">Đang hiện '+shown.length+' dòng đầu. Gõ thêm để lọc kỹ hơn.</p>':'');
    }
    document.getElementById('results').innerHTML = h;
  }
  q.addEventListener('input', draw);
  animateHero(document.getElementById('heroBoard'));
  document.getElementById('chips').addEventListener('click', e=>{
    const b = e.target.closest('.chip'); if (!b) return;
    q.value = b.dataset.q; draw(); q.focus();
  });
  draw();
}

/* ---------- Dòng khai cuộc bất kỳ (chỉ xem nước đi) ---------- */
function viewLine(i){
  const r = ALL[i], sans = r[2].split(' ');
  setCrumbs([['Trang chủ','#/'],[r[1]]]);
  const inLesson = r[1].indexOf('Caro-Kann Defense')===0;
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">'+esc(r[0])+'</span></div><h2>'+esc(r[1])+'</h2>'+
    '<p class="muted">'+esc(movesText(sans, sans.length))+'</p>'+
    '<div class="note">'+(inLesson ? 'Dòng này thuộc Caro-Kann. <a href="#/o/'+OP.opening.id+'">Xem bài học đầy đủ</a>.' : 'Dòng này mới có tên và nước đi (từ bảng khai cuộc Lichess). Chưa có bảng mục đích từng nước và puzzle.')+'</div>'+
    '<div id="stepper"></div></section>';
  mountStepper(document.getElementById('stepper'), sans, null, {start:0});
}

/* ---------- Bộ điều khiển xem từng nước ---------- */
let stepperGo = null, stepperKey = null;
function mountStepper(el, sans, steps, opt){
  const pos = replay(sans);
  let i = opt.start || 0, flip = !!opt.flip;
  el.innerHTML =
    '<div class="boardbox"></div>'+
    '<div class="ctl"><button class="btn ghost small" data-a="first" aria-label="Về đầu">⏮</button>'+
    '<button class="btn small" data-a="prev" aria-label="Lùi một nước">◀</button>'+
    '<span class="cnt"></span>'+
    '<button class="btn small" data-a="next" aria-label="Đi tiếp một nước">▶</button>'+
    '<button class="btn ghost small" data-a="last" aria-label="Đến cuối">⏭</button>'+
    '<button class="btn ghost small" data-a="flip">Xoay bàn</button></div>'+
    '<div class="stepinfo" aria-live="polite"></div>';
  const board = new Board(el.querySelector('.boardbox'), {fen:pos[i].fen, flip});
  onLeave(()=>board.destroy());
  const btn = a => el.querySelector('[data-a="'+a+'"]');
  const last = pos.length-1;
  function ui(){
    const p = pos[i];
    board.root.setAttribute('aria-label', describe(p.fen));
    btn('first').disabled = btn('prev').disabled = i===0;
    btn('next').disabled = btn('last').disabled = i===last;
    el.querySelector('.cnt').textContent = i+'/'+last;
    let info = '';
    if (i===0) info = '<p class="curmove muted">Thế ban đầu. Bấm ▶ để đi nước đầu tiên.</p>';
    else {
      const st = steps ? steps[i-1] : null;
      info = '<p class="curmove"><b>'+esc(plyLabel(i-1, p.san))+'</b>'+(st?' <span class="who '+(st.who==='Trắng'?'w':'b')+'">'+st.who+'</span>':'')+'</p>'+
        (st?'<p class="why">'+esc(st.purpose)+'</p>':'');
    }
    el.querySelector('.stepinfo').innerHTML = info;
    const tbl = document.getElementById('steptable');
    if (tbl) tbl.querySelectorAll('tr[data-i]').forEach(tr=>tr.classList.toggle('cur', +tr.dataset.i===i));
  }
  /* Đi tới nước n: lùi hoặc nhảy xa thì dựng lại thế cờ; đi tiếp đúng một nước thì cho quân trượt. */
  function goTo(n){
    n = Math.max(0, Math.min(last, n));
    if (n === i) return;
    const prev = i; i = n;
    const p = pos[i];
    if (i === prev+1 && !REDUCE) board.play(p.from, p.to, p.promo, true);
    else board.setFen(p.fen, {last: p.from ? [p.from, p.to] : null});
    ui();
  }
  if (pos[i].from) board.setLast(pos[i].from, pos[i].to);
  el.onclick = e=>{
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    const a = b.dataset.a;
    if (a==='first') goTo(0); else if (a==='prev') goTo(i-1);
    else if (a==='next') goTo(i+1); else if (a==='last') goTo(last);
    else if (a==='flip'){ flip = !flip; board.setFlip(flip); }
  };
  stepperGo = goTo;
  stepperKey = k=>{ if (k==='ArrowRight') goTo(i+1); else if (k==='ArrowLeft') goTo(i-1); };
  ui();
}
document.addEventListener('keydown', e=>{
  if (!stepperKey || /INPUT|TEXTAREA/.test((e.target||{}).tagName||'')) return;
  if (e.key==='ArrowRight'||e.key==='ArrowLeft'){ stepperKey(e.key); }
});

/* ---------- Trang khai cuộc có bài học ---------- */
function proCon(strengths, weaknesses){
  return '<div class="pc2"><div class="pro"><h3>Điểm mạnh</h3><ul>'+strengths.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul></div>'+
    '<div class="con"><h3>Điểm yếu</h3><ul>'+weaknesses.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul></div></div>'+
    '<p class="muted small">Nhận định theo nguyên lý khai cuộc phổ biến, chưa phải chứng minh bằng máy. Điểm mạnh và điểm yếu tính cho Đen, người chơi Caro-Kann.</p>';
}
function viewOpening(){
  const o = OP.opening;
  setCrumbs([['Trang chủ','#/'],[o.name_vi]]);
  const first = replay(['e4','c6']);
  let cards = '';
  OP.variations.forEach((v,vi)=>{
    const rp = replay(v.moves.split(' ')), lp = rp[rp.length-1];
    cards += '<a class="vcard" href="#/o/'+o.id+'/'+v.id+'"><span class="thumb">'+boardHTML(lp.fen, o.side==='b', [lp.from,lp.to], false, 'mini')+'</span><div><span class="tag">'+esc(v.eco)+' · '+esc(v.name_en)+'</span>'+
      '<h3>'+esc(v.name_vi)+'</h3><p class="muted">'+esc(movesText(v.moves.split(' '), 8))+' …</p><p>'+esc(v.idea)+'</p></div><span class="go" aria-hidden="true">›</span></a>';
  });
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">'+esc(o.eco)+' · '+esc(o.name_en)+'</span></div>'+
    '<h2>'+esc(o.name_vi)+'</h2>'+
    '<div class="boardbox">'+boardHTML(first[2].fen, true, [first[2].from, first[2].to], false)+'</div>'+
    '<p class="muted center">'+esc(o.first_moves)+'. Đen đi sau nên bàn được xoay cho Đen ở dưới.</p>'+
    o.idea.map(t=>'<p>'+esc(t)+'</p>').join('')+
    proCon(o.strengths, o.weaknesses)+'</section>'+
    '<section class="card"><h2>Chọn một biến thể để học</h2><div class="vlist">'+cards+'</div></section>'+
    '<section class="card"><h2>Bẫy cần biết</h2><a class="vcard" href="#/o/'+o.id+'/trap"><div><h3>'+esc(OP.trap.name_vi)+'</h3><p>Một bẫy rất nhanh mà người mới hay mắc.</p></div><span class="go" aria-hidden="true">›</span></a></section>'+
    '<section class="card center"><h2>Luyện tập</h2><p>'+PUZ.length+' câu puzzle về '+esc(o.name_vi)+', từ dễ đến khó. Mỗi câu có gợi ý và giải thích.</p>'+
    '<a class="btn" href="#/o/'+o.id+'/quiz">Làm '+PUZ.length+' câu</a></section>';
}
function viewTrap(){
  const t = OP.trap, o = OP.opening, sans = t.moves.split(' ');
  setCrumbs([['Trang chủ','#/'],[o.name_vi,'#/o/'+o.id],[t.name_vi]]);
  const tp = PUZ.find(p=>p.var==='trap');
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">Bẫy</span></div><h2>'+esc(t.name_vi)+'</h2>'+
    '<p class="muted">'+esc(movesText(sans, sans.length))+'</p><p>'+esc(t.text)+'</p><div id="stepper"></div>'+
    '<div class="center"><a class="btn" href="#/o/'+o.id+'/trap/quiz">Thử tìm nước chiếu hết</a></div></section>';
  mountStepper(document.getElementById('stepper'), sans, null, {start:sans.length});
  // đường dẫn quiz riêng cho bẫy
  void tp;
}

/* ---------- Biến thể: bảng chỉ dẫn từng nước ---------- */
function viewVariation(v){
  const o = OP.opening, sans = v.moves.split(' ');
  setCrumbs([['Trang chủ','#/'],[o.name_vi,'#/o/'+o.id],[v.name_vi]]);
  const n = PUZ.filter(p=>p.var===v.id).length;
  const rows = v.steps.map((s,i)=>'<tr data-i="'+(i+1)+'" tabindex="0"><td class="m">'+esc(plyLabel(i,s.san))+'</td><td><span class="who '+(s.who==='Trắng'?'w':'b')+'">'+s.who+'</span></td><td>'+esc(s.purpose)+'</td></tr>').join('');
  const evalNote = Math.abs(v.eval_cp)<=50 ? 'cân bằng' : (v.eval_cp>0?'Trắng nhỉnh hơn':'Đen nhỉnh hơn');
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">'+esc(v.eco)+' · '+esc(v.lichess_name)+'</span></div>'+
    '<h2>'+esc(v.name_vi)+'</h2><p>'+esc(v.idea)+'</p><div id="stepper"></div>'+
    '<div class="actions"><a class="btn" href="#/o/'+o.id+'/'+v.id+'/practice">Tự đi lại bên '+(o.side==='b'?'Đen':'Trắng')+'</a>'+(n?'<a class="btn alt" href="#/o/'+o.id+'/'+v.id+'/quiz">Làm '+n+' puzzle</a>':'')+'</div></section>'+
    '<section class="card"><h2>Bảng chỉ dẫn từng nước</h2><p class="muted small">Bấm vào một dòng để xem thế cờ lúc đó.</p>'+
    '<div class="tablewrap"><table class="steps" id="steptable"><thead><tr><th>Nước</th><th>Bên</th><th>Mục đích</th></tr></thead><tbody>'+rows+'</tbody></table></div></section>'+
    '<section class="card"><h2>Điểm mạnh và điểm yếu</h2>'+proCon(v.strengths, v.weaknesses)+
    '<h3 class="sec">Kế hoạch</h3><p><b>Trắng:</b> '+esc(v.plan_w)+'</p><p><b>Đen:</b> '+esc(v.plan_b)+'</p>'+
    '<p class="tipbox">Mẹo: '+esc(v.tip)+'</p>'+
    '<p class="muted small">Máy (Stockfish) chấm thế cuối dòng này: '+evalNote+'.</p></section>'+
    (n ? '<section class="card center"><h2>Làm quen bằng puzzle</h2><p>'+n+' câu về biến thể này.</p><a class="btn" href="#/o/'+o.id+'/'+v.id+'/quiz">Làm '+n+' câu</a></section>' : '');
  mountStepper(document.getElementById('stepper'), sans, v.steps, {start:0, flip:o.side==='b'});
  document.getElementById('steptable').addEventListener('click', e=>{
    const tr = e.target.closest('tr[data-i]'); if (tr) stepperGo(+tr.dataset.i);
  });
  document.getElementById('steptable').addEventListener('keydown', e=>{
    if (e.key==='Enter'){ const tr = e.target.closest('tr[data-i]'); if (tr) stepperGo(+tr.dataset.i); }
  });
}

/* ---------- Tự đi lại biến thể ---------- */
function viewPractice(v){
  const o = OP.opening, sans = v.moves.split(' '), pos = replay(sans), n = sans.length;
  const me = o.side, meName = me==='b' ? 'Đen' : 'Trắng';
  setCrumbs([['Trang chủ','#/'],[o.name_vi,'#/o/'+o.id],[v.name_vi,'#/o/'+o.id+'/'+v.id],['Tự đi lại']]);
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">Tự đi lại · '+esc(v.eco)+'</span>'+
    '<span class="turn"><i class="'+me+'"></i>Bạn cầm '+meName+'</span></div>'+
    '<h2>'+esc(v.name_vi)+'</h2>'+
    '<p>Hãy tự đi các nước của '+meName+' trong biến thể này. Chạm quân rồi chạm ô đến, hoặc kéo quân. Máy sẽ đi các nước của bên kia.</p>'+
    '<div class="progress" aria-hidden="true"><i id="bar"></i></div>'+
    '<div class="boardbox" id="pbox"></div>'+
    '<div class="boardtools"><button class="btn ghost small" id="pHint" type="button">Gợi ý</button>'+
    '<button class="btn ghost small" id="pFlip" type="button">Xoay bàn</button>'+
    '<button class="btn ghost small" id="pAgain" type="button">Làm lại từ đầu</button><span class="cnt" id="pCnt"></span></div>'+
    '<div class="status info" id="pSay" aria-live="polite"></div>'+
    '<div class="actions" id="pEnd"></div>'+
    '</section>';
  const $ = id => document.getElementById(id);
  let k = 0, wrong = 0, hintLvl = 0, done = false, alive = true, timer = null;
  const board = new Board($('pbox'), {fen:pos[0].fen, flip:me==='b', interactive:true, canMove:c=>c===me, onMove});
  onLeave(()=>{ alive = false; clearTimeout(timer); board.destroy(); });
  const mover = i => i%2===0 ? 'w' : 'b';
  const lastOf = i => pos[i].from ? [pos[i].from, pos[i].to] : null;
  function say(kind, ico, html){
    const el = $('pSay'); el.className = 'status '+kind;
    el.innerHTML = '<span class="ico" aria-hidden="true">'+ico+'</span><div>'+html+'</div>';
  }
  function prog(){ $('bar').style.width = (k/n*100)+'%'; $('pCnt').textContent = 'Đã đi '+k+'/'+n+' nước (cả hai bên)'; $('pHint').disabled = done || mover(k)!==me; }
  function setHint(lvl){
    hintLvl = lvl; const e = pos[k+1];
    if (!e || lvl===0) board.setHint(null); else board.setHint(e.from, lvl>=2 ? e.to : null);
  }
  function opponent(){
    if (k >= n) return finish();
    prog();
    if (mover(k) === me){ board.lock(false); return; }
    board.lock(true);
    timer = setTimeout(()=>{
      if (!alive) return;
      const p = pos[k+1]; board.play(p.from, p.to, p.promo, !REDUCE); k++;
      const st = v.steps[k-1];
      say('info','♟','<p><b>'+esc(plyLabel(k-1,p.san))+'</b> <span class="who '+(st.who==='Trắng'?'w':'b')+'">'+st.who+'</span> '+esc(st.purpose)+'</p>'+(k<n?'<p>Đến lượt bạn.</p>':''));
      wrong = 0; setHint(0); opponent();
    }, k===0 ? 450 : 800);
  }
  function finish(){
    done = true; prog(); board.lock(true); board.setHint(null);
    say('ok','★','<p><b>Hoàn thành!</b> Bạn đã đi đúng cả '+Math.ceil(n/2)+' nước của '+meName+' trong biến thể này.</p><p>Thử lại một lần nữa mà không cần gợi ý, hoặc sang phần puzzle.</p>');
    const q = PUZ.filter(p=>p.var===v.id).length;
    $('pEnd').innerHTML = '<button class="btn" id="pAgain2" type="button">Làm lại</button>'+
      (q?'<a class="btn alt" href="#/o/'+o.id+'/'+v.id+'/quiz">Làm '+q+' puzzle</a>':'')+
      '<a class="btn ghost" href="#/o/'+o.id+'/'+v.id+'">Về bảng chỉ dẫn</a>';
    $('pAgain2').addEventListener('click', restart);
    $('pSay').classList.add('celebrate');
  }
  function onMove(m){
    const e = pos[k+1];
    if (m.from===e.from && m.to===e.to && m.promotion===(e.promo||undefined)){
      k++; wrong = 0; setHint(0); board.setFlash(m.to,'ok',700);
      const st = v.steps[k-1];
      say('ok','✓','<p><b>'+esc(plyLabel(k-1,m.san))+'</b> đúng rồi.</p><p>'+esc(st.purpose)+'</p>');
      opponent();
    } else {
      wrong++; board.lock(true); board.setFlash(m.to,'no',700);
      say('no','✗','<p><b>'+esc(m.san)+'</b> chưa phải nước trong biến thể này.</p><p>'+(wrong>=2 ? 'Quân cần đi đã được tô xanh.' : 'Thử nước khác nhé, hoặc bấm Gợi ý.')+'</p>');
      timer = setTimeout(()=>{
        if (!alive) return;
        board.setFen(pos[k].fen, {last:lastOf(k)});
        setHint(wrong>=3 ? 2 : wrong>=2 ? 1 : hintLvl);
        board.lock(false);
      }, 700);
    }
  }
  function restart(){
    clearTimeout(timer); k = 0; wrong = 0; done = false; $('pEnd').innerHTML = '';
    board.setFen(pos[0].fen); setHint(0);
    say('info','♟','<p>Làm lại từ đầu.</p>'); opponent();
  }
  $('pHint').addEventListener('click', ()=>{
    if (done || mover(k)!==me) return;
    setHint(Math.min(2, hintLvl+1));
    say('info','?','<p>'+(hintLvl===1?'Hãy nhìn quân đang được tô xanh. Đó là quân cần đi.':'Quân tô xanh đi tới ô được tô xanh.')+'</p>');
  });
  $('pFlip').addEventListener('click', ()=>board.setFlip(!board.flip));
  $('pAgain').addEventListener('click', restart);
  say('info','♟','<p>Bàn cờ sẵn sàng. '+(me==='b'?'Máy (Trắng) đi trước.':'Bạn đi trước.')+'</p>');
  opponent();
}

/* ---------- Puzzle: đi quân thật trên bàn cờ ---------- */
function startQuiz(list, backHref, title){
  if (!list.length){ go(backHref); return; }
  stepperGo = stepperKey = null;
  setCrumbs([['Trang chủ','#/'],[OP.opening.name_vi,'#/o/'+OP.opening.id],[title]]);
  let idx = 0, answers = [], board = null;
  onLeave(()=>{ if (board) board.destroy(); });
  const dotsEl = document.getElementById('dots');
  const $ = id => document.getElementById(id);
  const tenth = cp => (cp/100).toFixed(1).replace('.',',');
  function renderDots(){
    let h = '';
    for (let i=0;i<list.length;i++){
      const a = answers[i];
      const cls = a===undefined ? (i===idx && idx<list.length ? 'now' : '') : (a ? 'ok' : 'no');
      h += '<span class="dot '+cls+'">'+(i+1)+'</span>';
    }
    h += '<span class="score">Điểm: '+answers.filter(Boolean).length+'</span>';
    dotsEl.innerHTML = h; dotsEl.hidden = false;
  }
  function show(){
    const pz = list[idx];
    if (board){ board.destroy(); board = null; }
    renderDots();
    stage.innerHTML =
      '<section class="card">'+
        '<div class="meta"><span class="tag">Câu '+(idx+1)+'/'+list.length+' · '+esc(pz.tag)+'</span>'+
        '<span class="turn"><i class="'+pz.turn+'"></i>'+(pz.turn==='w'?'Trắng':'Đen')+' đi</span></div>'+
        '<h2>'+esc(pz.q)+'</h2>'+
        '<div class="boardbox" id="qbox"></div>'+
        '<div class="boardtools" id="tools"><button class="btn ghost small" id="hintBtn" type="button">Gợi ý</button>'+
        '<button class="btn ghost small" id="showBtn" type="button">Xem đáp án</button></div>'+
        '<div id="hint" aria-live="polite"></div>'+
        '<div class="status info" id="fb" aria-live="polite"><span class="ico" aria-hidden="true">♟</span><div><p>Chạm quân muốn đi, rồi chạm ô đến. Hoặc kéo quân tới ô đó.</p></div></div>'+
        '<div class="next" id="next"></div>'+
        '<details class="legend"><summary>Cách đọc nước đi</summary>'+
        '<p>K = Vua, Q = Hậu, R = Xe, B = Tượng, N = Mã, không có chữ = Tốt. x là ăn quân, + là chiếu, # là chiếu hết.</p></details>'+
      '</section>';
    let attempts = 0, solved = false, hintLvl = 0, afterShown = false;
    const promoFor = pz.uci.length>4 ? pz.uci[4] : undefined;
    const fb = (kind, ico, html)=>{ const el = $('fb'); el.className = 'status '+kind; el.innerHTML = '<span class="ico" aria-hidden="true">'+ico+'</span><div>'+html+'</div>'; };
    const b = new Board($('qbox'), {fen:pz.fen, flip:pz.turn==='b', interactive:true, canMove:c=>c===pz.turn, onMove});
    board = b;
    function wrongText(m, uci){
      const o = pz.opts.find(x=>x.uci===uci), loss = pz.ev[uci];
      if (pz.var==='trap') return o && o.why ? o.why : 'Chưa chiếu hết: Đen vẫn còn nước đi.';
      if (o && !o.correct && o.why) return o.why;
      if (loss===undefined) return 'Chưa phải nước theo bài.';
      if (loss<=40) return 'Nước này cũng ổn: máy chấm chỉ kém nước theo bài khoảng '+tenth(loss)+' Tốt. Nhưng bài này đang hỏi một nước khác, hãy thử nước khác.';
      if (loss<120) return 'Chơi được nhưng kém nước theo bài khoảng '+tenth(loss)+' Tốt (máy chấm).';
      return 'Nước này kém nước theo bài khoảng '+tenth(loss)+' Tốt (máy chấm).';
    }
    function finishSolved(kind){
      solved = true; afterShown = true;
      const afterFen = b.game.fen();
      b.lock(true); b.setHint(null); $('hint').innerHTML = '';
      const title = kind==='first' ? PRAISE[idx % PRAISE.length] : kind==='retry' ? 'Đúng rồi! Lần này bạn đã tìm ra.' : 'Đáp án: '+pz.san;
      fb(kind==='show' ? 'info' : 'ok', kind==='show' ? '→' : '✓',
        '<p><b>'+esc(title)+'</b></p>'+'<p>'+esc(pz.explain)+'</p><p class="tip">Mẹo: '+esc(pz.tip)+'</p>');
      if (kind!=='show') $('fb').classList.add('celebrate');
      $('tools').innerHTML = '<button class="btn ghost small" id="toggle" type="button">Xem lại thế ban đầu</button>';
      $('toggle').addEventListener('click', ()=>{
        afterShown = !afterShown;
        if (afterShown) b.play(pz.from, pz.to, promoFor, !REDUCE); else b.setFen(pz.fen);
        $('toggle').textContent = afterShown ? 'Xem lại thế ban đầu' : 'Xem sau nước đúng';
      });
      const lastQ = idx === list.length-1;
      $('next').innerHTML = '<button class="btn" id="nextBtn" type="button">'+(lastQ?'Xem kết quả':'Câu tiếp theo')+'</button>';
      $('nextBtn').addEventListener('click', ()=>{ idx++; idx<list.length ? show() : end(); window.scrollTo({top:0}); });
      $('nextBtn').focus({preventScroll:true});
    }
    function onMove(m){
      if (solved || board !== b) return;
      const uci = m.from+m.to+(m.promotion||'');
      const correct = pz.var==='trap' ? b.game.in_checkmate() : uci===pz.uci;
      if (correct){
        if (answers[idx]===undefined) answers[idx] = true;
        renderDots(); b.setFlash(m.to,'ok',900);
        finishSolved(attempts===0 ? 'first' : 'retry');
      } else {
        attempts++;
        if (answers[idx]===undefined){ answers[idx] = false; renderDots(); }
        b.lock(true); b.setFlash(m.to,'no',700);
        fb('no','✗','<p><b>'+esc(m.san)+'</b></p><p>'+esc(wrongText(m, uci))+'</p><p>'+(attempts>=2?'Bí rồi? Bấm Gợi ý hoặc Xem đáp án.':'Hãy thử nước khác.')+'</p>');
        setTimeout(()=>{
          if (board !== b || solved) return;
          b.setFen(pz.fen); if (hintLvl>=2) b.setHint(pz.from, null);
          b.lock(false);
        }, 800);
      }
    }
    $('hintBtn').addEventListener('click', ()=>{
      if (solved) return;
      hintLvl++;
      if (hintLvl===1){
        $('hint').innerHTML = '<div class="hint">'+esc(pz.hint)+'</div>';
        $('hintBtn').textContent = 'Chỉ cho tôi quân cần đi';
      } else {
        b.setHint(pz.from, null); $('hintBtn').hidden = true;
      }
    });
    $('showBtn').addEventListener('click', ()=>{
      if (solved) return;
      if (answers[idx]===undefined){ answers[idx] = false; renderDots(); }
      b.setFen(pz.fen); b.play(pz.from, pz.to, promoFor, !REDUCE);
      finishSolved('show');
    });
  }
  function end(){
    renderDots();
    const pts = answers.filter(Boolean).length, n = list.length;
    const ratio = pts/n;
    const msg = pts===n ? 'Tuyệt vời, trọn điểm!' : ratio>=0.8 ? 'Rất xuất sắc!' : ratio>=0.5 ? 'Khá lắm, luyện thêm chút nữa nhé!' : 'Đừng lo, khai cuộc cần luyện tập. Thử lại nào!';
    const stars = ratio>=0.9 ? 3 : ratio>=0.6 ? 2 : ratio>=0.3 ? 1 : 0;
    let rev = '', key = '';
    list.forEach((pz,i)=>{
      rev += '<li class="'+(answers[i]?'ok':'no')+'"><b>'+(answers[i]?'✓':'✗')+'</b><span>Câu '+(i+1)+': '+esc(pz.tag)+'</span></li>';
      key += '<tr><td>'+(i+1)+'</td><td>'+esc(pz.tag)+'</td><td class="m">'+esc(pz.san)+'</td></tr>';
    });
    let st = '';
    for (let i=0;i<3;i++) st += '<span'+(i<stars?'':' style="opacity:.3"')+'>★</span>';
    stage.innerHTML =
      '<section class="card end"><h2>'+msg+'</h2><div class="big">'+pts+'/'+n+'</div>'+
      '<div class="stars" aria-hidden="true">'+st+'</div>'+
      '<p class="muted small">Điểm chỉ tính khi bạn đi đúng ngay lần đầu.</p>'+
      '<ul class="review">'+rev+'</ul>'+
      '<div class="actions"><button class="btn" id="again" type="button">Chơi lại</button> <a class="btn ghost" href="'+backHref+'">Về bài học</a></div>'+
      '<details class="legend key"><summary>Đáp án cho giáo viên</summary><div class="tablewrap"><table><tr><th>Câu</th><th>Chủ đề</th><th>Nước đúng</th></tr>'+key+'</table></div></details>'+
      '</section>';
    $('again').addEventListener('click',()=>{ idx = 0; answers = []; show(); window.scrollTo({top:0}); });
  }
  show();
}

route();
