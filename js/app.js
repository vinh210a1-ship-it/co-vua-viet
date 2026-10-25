/* Thư Viện Khai Cuộc: bản mẫu. Dữ liệu: OP (bài học), PUZ (puzzle), ALL (bảng khai cuộc Lichess). */
const PRAISE = ['Chính xác!','Quá đỉnh!','Hay lắm!','Đúng rồi, giỏi quá!'];
const OOPS = ['Chưa đúng rồi.','Tiếc quá!','Chưa phải nước này.'];
const VN = {K:'Vua',Q:'Hậu',R:'Xe',B:'Tượng',N:'Mã',P:'Tốt'};
const FILES = 'abcdefgh';
const stage = document.getElementById('stage');
const crumbs = document.getElementById('crumbs');

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
function boardHTML(fen, flip, hl, moved){
  const g = parseBoard(fen);
  let h = '<div class="board" role="img" aria-label="'+esc(describe(fen))+'">';
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
    out.push({fen:c.fen(), from:m.from, to:m.to, san:m.san});
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
  const o = OP.opening;
  return '<a class="lesson" href="#/o/'+o.id+'"><div><span class="badge">Có bài học đầy đủ</span>'+
    '<h2>'+esc(o.name_vi)+'</h2><p class="muted">'+esc(o.name_en)+' · '+esc(o.eco)+' · '+esc(o.first_moves)+'</p>'+
    '<p>'+esc(o.tagline)+'</p></div><span class="go" aria-hidden="true">›</span></a>';
}
function resultItem(i){
  const r = ALL[i], sans = r[2].split(' ');
  return '<li><a class="item" href="#/line/'+i+'"><b>'+esc(r[1])+'</b><span class="muted">'+esc(r[0])+' · '+esc(movesText(sans, Math.min(sans.length,8)))+(sans.length>8?' …':'')+'</span></a></li>';
}
function viewHome(){
  setCrumbs([['Trang chủ']]);
  const fam = {};
  ALL.forEach(r=>{ const f = r[1].split(':')[0]; fam[f] = (fam[f]||0)+1; });
  const chips = POPULAR.filter(f=>fam[f]).map(f=>'<button type="button" class="chip" data-q="'+esc(f)+'">'+esc(f)+' <small>'+fam[f]+'</small></button>').join('');
  stage.innerHTML =
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
function mountStepper(el, sans, steps, opt){
  const pos = replay(sans);
  let i = opt.start || 0, flip = !!opt.flip;
  function draw(){
    const p = pos[i];
    const hl = p.from ? [p.from, p.to] : null;
    let info = '';
    if (i===0) info = '<p class="curmove muted">Thế ban đầu. Bấm ▶ để đi nước đầu tiên.</p>';
    else {
      const st = steps ? steps[i-1] : null;
      info = '<p class="curmove"><b>'+esc(plyLabel(i-1, pos[i].san))+'</b>'+(st?' <span class="who '+(st.who==='Trắng'?'w':'b')+'">'+st.who+'</span>':'')+'</p>'+
        (st?'<p class="why">'+esc(st.purpose)+'</p>':'');
    }
    el.innerHTML =
      '<div class="boardbox">'+boardHTML(p.fen, flip, hl, i>0)+'</div>'+
      '<div class="ctl"><button class="btn ghost small" data-a="first" aria-label="Về đầu" '+(i===0?'disabled':'')+'>⏮</button>'+
      '<button class="btn small" data-a="prev" aria-label="Lùi một nước" '+(i===0?'disabled':'')+'>◀</button>'+
      '<span class="cnt">'+i+'/'+(pos.length-1)+'</span>'+
      '<button class="btn small" data-a="next" aria-label="Đi tiếp một nước" '+(i===pos.length-1?'disabled':'')+'>▶</button>'+
      '<button class="btn ghost small" data-a="last" aria-label="Đến cuối" '+(i===pos.length-1?'disabled':'')+'>⏭</button>'+
      '<button class="btn ghost small" data-a="flip">Xoay bàn</button></div>'+
      '<div class="stepinfo" aria-live="polite">'+info+'</div>';
    const tbl = document.getElementById('steptable');
    if (tbl) tbl.querySelectorAll('tr[data-i]').forEach(tr=>tr.classList.toggle('cur', +tr.dataset.i===i));
  }
  el.onclick = e=>{
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    const a = b.dataset.a;
    if (a==='first') i = 0; else if (a==='prev') i = Math.max(0,i-1);
    else if (a==='next') i = Math.min(pos.length-1,i+1); else if (a==='last') i = pos.length-1;
    else if (a==='flip') flip = !flip;
    draw();
  };
  stepperGo = n=>{ i = Math.max(0,Math.min(pos.length-1,n)); draw(); };
  stepperKey = k=>{ if (k==='ArrowRight') { i = Math.min(pos.length-1,i+1); draw(); } else if (k==='ArrowLeft'){ i = Math.max(0,i-1); draw(); } };
  draw();
}
let stepperGo = null, stepperKey = null;
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
  OP.variations.forEach(v=>{
    cards += '<a class="vcard" href="#/o/'+o.id+'/'+v.id+'"><div><span class="tag">'+esc(v.eco)+' · '+esc(v.name_en)+'</span>'+
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
    '<h2>'+esc(v.name_vi)+'</h2><p>'+esc(v.idea)+'</p><div id="stepper"></div></section>'+
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

/* ---------- Puzzle ---------- */
function startQuiz(list, backHref, title){
  if (!list.length){ go(backHref); return; }
  stepperGo = stepperKey = null;
  setCrumbs([['Trang chủ','#/'],[OP.opening.name_vi,'#/o/'+OP.opening.id],[title]]);
  let idx = 0, answers = [], locked = false, showAfter = false;
  const dotsEl = document.getElementById('dots');
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
    locked = false; showAfter = false;
    renderDots();
    stage.innerHTML =
      '<section class="card" aria-live="polite">'+
        '<div class="meta"><span class="tag">Câu '+(idx+1)+'/'+list.length+' · '+esc(pz.tag)+'</span>'+
        '<span class="turn"><i class="'+pz.turn+'"></i>'+(pz.turn==='w'?'Trắng':'Đen')+' đi</span></div>'+
        '<h2>'+esc(pz.q)+'</h2>'+
        '<div class="boardbox" id="boardbox">'+boardHTML(pz.board,pz.turn==='b',null,false)+'</div>'+
        '<div class="boardtools" id="tools"><button class="btn ghost small" id="hintBtn" type="button">Gợi ý</button></div>'+
        '<div id="hint"></div><div class="opts" id="opts"></div><div id="fb"></div><div class="next" id="next"></div>'+
        '<details class="legend"><summary>Cách đọc nước đi</summary>'+
        '<p>K = Vua, Q = Hậu, R = Xe, B = Tượng, N = Mã, không có chữ = Tốt. x là ăn quân, + là chiếu, # là chiếu hết.</p></details>'+
      '</section>';
    const opts = document.getElementById('opts');
    pz.opts.forEach((o,i)=>{
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'opt'; b.innerHTML = '<span>'+esc(o.label)+'</span>';
      b.addEventListener('click',()=>choose(i));
      opts.appendChild(b);
    });
    document.getElementById('hintBtn').addEventListener('click',()=>{
      document.getElementById('hint').innerHTML = '<div class="hint">'+esc(pz.hint)+'</div>';
      document.getElementById('hintBtn').hidden = true;
    });
  }
  function drawBoard(animate){
    const pz = list[idx];
    document.getElementById('boardbox').innerHTML =
      boardHTML(showAfter ? pz.after : pz.board, pz.turn==='b', showAfter ? [pz.from, pz.to] : null, animate);
    const t = document.getElementById('toggle');
    if (t) t.textContent = showAfter ? 'Xem lại thế ban đầu' : 'Xem sau nước đúng';
  }
  function choose(i){
    if (locked) return; locked = true;
    const pz = list[idx], pick = pz.opts[i], ok = pick.correct;
    answers[idx] = ok; renderDots();
    document.querySelectorAll('#opts .opt').forEach((b,j)=>{
      b.disabled = true; const o = pz.opts[j];
      if (o.correct){ b.classList.add('right'); b.innerHTML = '<span>'+esc(o.label)+'</span><span aria-hidden="true">&#10003;</span>'; }
      else if (j===i){ b.classList.add('wrong'); b.innerHTML = '<span>'+esc(o.label)+'</span><span aria-hidden="true">&#10007;</span>'; }
      else b.classList.add('dim');
    });
    const right = pz.opts.find(o=>o.correct);
    const title = ok ? PRAISE[idx % PRAISE.length] : OOPS[idx % OOPS.length];
    document.getElementById('hint').innerHTML = '';
    document.getElementById('fb').innerHTML =
      '<div class="fb '+(ok?'ok':'no')+'"><h3>'+title+'</h3>'+
      (ok ? '' : '<p>'+esc(pick.label)+': '+esc(pick.why)+'</p><p><b>Đáp án đúng: '+esc(right.label)+'</b></p>')+
      '<p>'+esc(pz.explain)+'</p><p class="tip">Mẹo: '+esc(pz.tip)+'</p></div>';
    showAfter = true; drawBoard(true);
    document.getElementById('tools').innerHTML = '<button class="btn ghost small" id="toggle" type="button">Xem lại thế ban đầu</button>';
    document.getElementById('toggle').addEventListener('click',()=>{ showAfter = !showAfter; drawBoard(false); });
    const last = idx === list.length-1;
    document.getElementById('next').innerHTML = '<button class="btn" id="nextBtn" type="button">'+(last?'Xem kết quả':'Câu tiếp theo')+'</button>';
    const nb = document.getElementById('nextBtn');
    nb.addEventListener('click',()=>{ idx++; idx<list.length ? show() : end(); window.scrollTo({top:0}); });
    nb.focus({preventScroll:true});
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
      key += '<tr><td>'+(i+1)+'</td><td>'+esc(pz.tag)+'</td><td class="m">'+esc(pz.opts.find(o=>o.correct).label)+'</td></tr>';
    });
    stage.innerHTML =
      '<section class="card end"><h2>'+msg+'</h2><div class="big">'+pts+'/'+n+'</div>'+
      '<div class="stars" aria-hidden="true">'+'★'.repeat(stars)+'<span style="opacity:.3">'+'★'.repeat(3-stars)+'</span></div>'+
      '<ul class="review">'+rev+'</ul>'+
      '<button class="btn" id="again" type="button">Chơi lại</button> <a class="btn ghost" href="'+backHref+'">Về bài học</a>'+
      '<details class="legend key"><summary>Đáp án cho giáo viên</summary><div class="tablewrap"><table><tr><th>Câu</th><th>Chủ đề</th><th>Nước đúng</th></tr>'+key+'</table></div></details>'+
      '</section>';
    document.getElementById('again').addEventListener('click',()=>{ idx = 0; answers = []; show(); window.scrollTo({top:0}); });
  }
  show();
}

route();
