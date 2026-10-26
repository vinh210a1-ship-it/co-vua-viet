/* Thư Viện Khai Cuộc. Dữ liệu: LS (bài học khai cuộc đang mở, nạp từ data/lessons), ALL (bảng khai cuộc Lichess). */
let LS = null, routeTok = 0;
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
function replay(sans, fen){
  const c = fen ? new Chess(fen) : new Chess();
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
/* Vài nước cuối của dòng, ví dụ "… 5. O-O b5 6. Bb3 d6" (dùng cho chú thích ảnh động). */
function tailText(sans, k){
  if (k<=0) return '';
  const from = Math.max(0, k-4), parts = [];
  for (let i=from;i<k;i++) parts.push(i%2===0 ? (Math.floor(i/2)+1)+'. '+sans[i] : (i===from ? (Math.floor(i/2)+1)+'... ' : '')+sans[i]);
  return (from>0?'… ':'')+parts.join(' ');
}
/* Bàn cờ tự chạy: lần lượt đi hết các nước của từng thế cờ, dừng một lúc, rồi sang thế tiếp theo.
   scenes: [{sans:[...], flip}]. Dừng khi cuộn khỏi màn hình. Trả về {stop}. */
function autoBoard(host, scenes, o){
  o = o || {};
  const delay = o.delay || 950, hold = o.hold || 2200;
  let si = 0, k = 0, t = null, alive = true, visible = true, b = null, pos = null, sc = null;
  let io = null;
  if ('IntersectionObserver' in window){ io = new IntersectionObserver(es=>{ visible = es[es.length-1].isIntersecting; }); io.observe(host); }
  function load(){
    sc = scenes[si % scenes.length]; pos = replay(sc.sans, sc.fen); k = 0;
    if (!b) b = new Board(host, {fen:pos[0].fen, flip:!!sc.flip, mini:!!o.mini});
    else { b.setFlip(!!sc.flip); b.setFen(pos[0].fen); }
    if (o.label) b.root.setAttribute('aria-label', o.label(sc));
    if (o.onScene) o.onScene(sc, si % scenes.length);
    if (REDUCE){ const p = pos[pos.length-1]; b.setFen(p.fen, {last:[p.from,p.to]}); if (o.onMove) o.onMove(sc, pos.length-1, p); return; }
    t = setTimeout(step, o.start || 700);
  }
  function step(){
    if (!alive) return;
    if (!visible){ t = setTimeout(step, 400); return; }
    if (k >= pos.length-1){ t = setTimeout(()=>{ si++; load(); }, hold); return; }
    k++; const p = pos[k];
    b.play(p.from, p.to, p.promo, true);
    if (o.onMove) o.onMove(sc, k, p);
    t = setTimeout(step, delay);
  }
  load();
  return { stop(){ alive = false; clearTimeout(t); if (io) io.disconnect(); if (b) b.destroy(); } };
}
/* Ảnh nhỏ tự đi nước trong các thẻ: <span class="thumb" data-sans="e4 c6 ..." data-flip="1">. */
function mountThumbs(root){
  const stops = [];
  root.querySelectorAll('.thumb[data-sans]').forEach((el,n)=>{
    stops.push(autoBoard(el, [{sans:el.dataset.sans.split(' '), fen:el.dataset.fen||undefined, flip:el.dataset.flip==='1'}], {delay:800, hold:1500, start:500+n*350, mini:true}).stop);
  });
  return ()=>stops.forEach(f=>f());
}
/* Pháo hoa quân cờ khi làm tốt. */
function confetti(){
  if (REDUCE) return;
  const wrap = document.createElement('div'); wrap.className = 'confetti'; wrap.setAttribute('aria-hidden','true');
  const g = ['♞','♜','♝','♛','♚','♟']; let h = '';
  for (let i=0;i<26;i++) h += '<span style="left:'+(2+i*3.7)+'%;animation-delay:'+((i*97)%900)+'ms;animation-duration:'+(2200+(i*131)%1400)+'ms;font-size:'+(20+(i*7)%18)+'px">'+g[i%6]+'︎</span>';
  wrap.innerHTML = h; document.body.appendChild(wrap);
  const rm = ()=>wrap.remove(); setTimeout(rm, 4200); onLeave(rm);
}

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
  cleanup(); routeTok++;
  document.getElementById('dots').hidden = true;
  stepperGo = stepperKey = null;
  const h = CUR.slice(2).split('/').filter(Boolean);
  window.scrollTo({top:0});
  if (h.length===0) return viewHome();
  if (h[0]==='khai-cuoc') return viewOpenings();
  if (h[0]==='cau-do'){
    if (!h[1]) return viewPuzzleHub();
    if (h[1]==='hom-nay') return viewDaily();
    if (h[1]==='tan-cuoc') return viewEndgameQuiz();
    if (h[1]==='chu-de') return !h[2] ? viewThemes() : !h[3] ? viewTheme(h[2]) : viewThemeRun(h[2], h[3]);
  }
  if (h[0]==='hoc') return h[1] ? viewLesson(h[1]) : viewRoadmap();
  if (h[0]==='tu-dien') return viewGlossary(h[1]);
  if (h[0]==='may' || h[0]==='tam-nhin' || h[0]==='lop') return viewSoon(h[0]);
  if (h[0]==='o' && h[1]) return openingRoute(h);
  if (h[0]==='line' && ALL[+h[1]]) return viewLine(+h[1]);
  viewHome();
}
/* Trang của một khai cuộc: nạp bài học (nếu chưa có) rồi vẽ đúng màn hình theo đường dẫn. */
const quizSetId = id => id==='caro-kann' ? 'ck-all' : 'op:'+id;
const trapsOf = ls => ls.traps || (ls.trap ? [ls.trap] : []);
function openingRoute(h){
  const tok = routeTok, id = h[1];
  stage.innerHTML = '<section class="card center"><p class="muted">Đang tải bài học...</p></section>';
  loadLesson(id, ls=>{
    if (tok !== routeTok) return;
    if (!ls){ stage.innerHTML = '<section class="card center"><p>Không tìm thấy bài học này, hoặc mạng bị lỗi.</p><a class="btn" href="#/khai-cuoc">Về danh sách khai cuộc</a></section>'; return; }
    LS = ls; drawOpening(h);
  });
}
function drawOpening(h){
  const o = LS.opening, base = '#/o/'+o.id;
  if (!h[2]) return viewOpening();
  if (h[2]==='quiz') return startQuiz(LS.puzzles, base, 'Luyện tập '+o.name_vi, {setId:quizSetId(o.id)});
  if (h[2]==='trap'){
    const t = trapsOf(LS).find(x=>x.id===h[3]) || trapsOf(LS)[0];
    if (!t) return viewOpening();
    if (h[4]==='quiz' || h[3]==='quiz'){
      const pz = trapPuzzle(t);
      if (pz) return startQuiz([pz], base+'/trap/'+t.id, 'Bẫy: '+t.name_vi);
    }
    return viewTrap(t);
  }
  const v = LS.variations.find(x=>x.id===h[2]);
  if (v){
    if (h[3]==='quiz'){
      const list = LS.puzzles.filter(p=>p.var===v.id);
      return startQuiz(list, base+'/'+v.id, 'Luyện biến thể '+v.name_vi);
    }
    if (h[3]==='practice') return viewPractice(v);
    return viewVariation(v);
  }
  viewOpening();
}
function trapPuzzle(t){ return LS.puzzles.find(p=>p.var==='trap' && (!p.trap_id || p.trap_id===t.id)); }
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
function lessonMatches(m, q){
  const t = norm(q).trim(); if (!t) return true;
  const hay = norm(m.name_vi+' '+m.name_en+' '+m.eco+' '+m.first_moves+' '+m.group+(m.id==='caro-kann'?' caro kann':''));
  return t.split(/\s+/).every(w=>hay.includes(w) || (ALIAS[w] && hay.includes(ALIAS[w])));
}
/* Dòng nước đi cho ảnh động của mỗi khai cuộc trong danh sách: lấy các nước ghi ở first_moves, rồi nối dài bằng
   dòng dài nhất (tối đa 10 nước) trong bảng Lichess bắt đầu bằng đúng các nước đó. Không đọc được thì dùng ván Scholar để minh hoạ. */
const OPEN_DEMO = 'e4 e5 Bc4 Nc6 Qh5 Nf6 Qxf7'.split(' ');
const openSansCache = {};
function openSans(m){
  if (openSansCache[m.id]) return openSansCache[m.id];
  const c = new Chess(), base = [];
  for (const x of m.first_moves.replace(/\d+\.(\.\.)?/g,' ').split(/\s+/).filter(Boolean)){ const r = c.move(x); if (!r) break; base.push(r.san); }
  let out = base;
  if (base.length >= 2){
    for (const r of ALL){
      if (r[1].indexOf(m.name_en) !== 0) continue;
      const sans = r[2].split(' ');
      if (sans.length <= 10 && sans.length > out.length && base.every((x,i)=>sans[i]===x)) out = sans;
    }
  } else out = OPEN_DEMO;
  return openSansCache[m.id] = out;
}
const LEVEL_NAMES = {1:'Mức 1: dễ học, hợp người mới', 2:'Mức 2: tiếp theo', 3:'Mức 3: nâng cao'};
function lessonCard(m){
  return '<a class="lesson" href="#/o/'+m.id+'"><span class="thumb" data-sans="'+esc(openSans(m).join(' '))+'" data-flip="'+(m.side==='b'?1:0)+'"></span>'+
    '<div><span class="badge side-'+m.side+'">Cầm '+(m.side==='b'?'Đen':'Trắng')+'</span>'+
    '<h3>'+esc(m.name_vi)+'</h3><p class="muted">'+esc(m.name_en)+' · '+esc(m.eco)+' · '+esc(m.first_moves)+'</p>'+
    '<p>'+esc(m.tagline)+'</p><p class="muted small">'+m.variations+' biến thể · '+m.puzzles+' câu đố</p></div><span class="go" aria-hidden="true">›</span></a>';
}
function resultItem(i){
  const r = ALL[i], sans = r[2].split(' '), rp = replay(sans), lp = rp[rp.length-1];
  return '<li><a class="item" href="#/line/'+i+'"><span class="thumb s">'+boardHTML(lp.fen, false, lp.from?[lp.from,lp.to]:null, false, 'mini')+'</span><span class="txt"><b>'+esc(r[1])+'</b><span class="muted">'+esc(r[0])+' · '+esc(movesText(sans, Math.min(sans.length,8)))+(sans.length>8?' …':'')+'</span></span></a></li>';
}
/* Bàn cờ minh hoạ ở trang chủ: lần lượt đi vài khai cuộc nổi tiếng và một cái bẫy chiếu hết. */
const HERO_LINES = [
  ['Sicilian Defense: Najdorf Variation','e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6'],
  ['Ruy Lopez: Morphy Defense','e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O b5 Bb3 d6'],
  ["Queen's Gambit Declined",'d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7'],
  ['French Defense: Advance Variation','e4 e6 d4 d5 e5 c5 c3 Nc6']
];
function heroScenes(){
  const CK = window.LESSONS['caro-kann'], o = CK.opening, out = [];
  out.push({name:o.name_vi+': '+CK.variations[0].name_vi, sans:CK.variations[0].moves.split(' '), flip:o.side==='b', href:'#/o/'+o.id+'/'+CK.variations[0].id});
  HERO_LINES.forEach(h=>{
    const i = ALL.findIndex(r=>r[1]===h[0] && r[2]===h[1]);
    if (i>=0) out.push({name:h[0], sans:h[1].split(' '), flip:false, href:'#/line/'+i});
  });
  out.push({name:CK.trap.name_vi, sans:CK.trap.moves.split(' ').concat([CK.trap.finish]), flip:false, href:'#/o/'+o.id+'/trap/'+CK.trap.id});
  return out;
}
function animateHero(host){
  const cap = document.getElementById('heroCap'), nm = document.getElementById('heroName'), mv = document.getElementById('heroMoves');
  const a = autoBoard(host, heroScenes(), {
    delay:800, hold:2000,
    label: sc=>'Minh hoạ: '+sc.name,
    onScene: sc=>{ nm.textContent = sc.name; mv.textContent = ''; cap.setAttribute('href', sc.href); },
    onMove: (sc,k)=>{ mv.textContent = tailText(sc.sans, k); }
  });
  onLeave(a.stop);
}
function viewOpenings(){
  setCrumbs([['Trang chủ','#/'],['Khai cuộc']]);
  const fam = {};
  ALL.forEach(r=>{ const f = r[1].split(':')[0]; fam[f] = (fam[f]||0)+1; });
  const chips = POPULAR.filter(f=>fam[f]).map(f=>'<button type="button" class="chip" data-q="'+esc(f)+'">'+esc(f)+' <small>'+fam[f]+'</small></button>').join('');
  stage.innerHTML =
    '<section class="card">'+
      '<h2>Khai cuộc</h2>'+
      '<p class="muted">Tìm một khai cuộc, xem mục đích của từng nước, tự đi lại trên bàn cờ, rồi luyện puzzle.</p>'+
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
    const ls = window.LESSON_LIST.filter(m=>lessonMatches(m, val));
    if (ls.length){
      if (val) h += '<h3 class="sec">Bài học đầy đủ ('+ls.length+')</h3><div class="vlist">'+ls.map(lessonCard).join('')+'</div>';
      else [1,2,3].forEach(lv=>{ const g = ls.filter(m=>m.level===lv); if (g.length) h += '<h3 class="sec">'+LEVEL_NAMES[lv]+' ('+g.length+')</h3><div class="vlist">'+g.map(lessonCard).join('')+'</div>'; });
    }
    if (!val){
      h += '<p class="muted">Gõ tên để tìm trong '+window.LESSON_LIST.length+' bài học và '+ALL.length.toLocaleString('vi-VN')+' dòng khai cuộc. Dòng nào chưa có bài học thì chỉ xem được nước đi.</p>';
    } else {
      const ids = matchQuery(val), shown = ids.slice(0,40);
      h += '<h3 class="sec">Các dòng khai cuộc ('+ids.length+')</h3>';
      if (!ids.length) h += '<p class="muted">Không tìm thấy. Thử gõ tên tiếng Anh, ví dụ Sicilian, French, Italian.</p>';
      else h += '<ul class="list">'+shown.map(resultItem).join('')+'</ul>'+(ids.length>shown.length?'<p class="muted">Đang hiện '+shown.length+' dòng đầu. Gõ thêm để lọc kỹ hơn.</p>':'');
    }
    stopThumbs(); document.getElementById('results').innerHTML = h;
    stopThumbs = mountThumbs(document.getElementById('results'));
  }
  let stopThumbs = ()=>{};
  onLeave(()=>stopThumbs());
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
  setCrumbs([['Trang chủ','#/'],['Khai cuộc','#/khai-cuoc'],[r[1]]]);
  const lm = window.LESSON_LIST.find(m=>r[1].indexOf(m.name_en)===0);
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">'+esc(r[0])+'</span></div><h2>'+esc(r[1])+'</h2>'+
    '<p class="muted">'+esc(movesText(sans, sans.length))+'</p>'+
    '<div class="note">'+(lm ? 'Dòng này thuộc '+esc(lm.name_vi)+'. <a href="#/o/'+lm.id+'">Xem bài học đầy đủ</a>.' : 'Dòng này mới có tên và nước đi (từ bảng khai cuộc Lichess). Chưa có bảng mục đích từng nước và puzzle.')+'</div>'+
    '<div id="stepper"></div></section>';
  mountStepper(document.getElementById('stepper'), sans, null, {start:0, autoplay:true});
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
    '<button class="btn small" data-a="play">▶ Tự chạy</button>'+
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
  /* Tự chạy: cứ mỗi nhịp đi một nước, bấm gì khác thì dừng. */
  let timer = null, kick = null;
  function stop(){ clearTimeout(kick); if (timer){ clearInterval(timer); timer = null; } btn('play').textContent = '▶ Tự chạy'; }
  function start(){
    stop(); if (i>=last) goTo(0);
    btn('play').textContent = '⏸ Dừng';
    timer = setInterval(()=>{ if (i>=last){ stop(); return; } goTo(i+1); if (i>=last) stop(); }, opt.speed || 1100);
  }
  onLeave(stop);
  el.onclick = e=>{
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    const a = b.dataset.a;
    if (a==='play'){ if (timer) stop(); else start(); return; }
    stop();
    if (a==='first') goTo(0); else if (a==='prev') goTo(i-1);
    else if (a==='next') goTo(i+1); else if (a==='last') goTo(last);
    else if (a==='flip'){ flip = !flip; board.setFlip(flip); }
  };
  stepperGo = n=>{ stop(); goTo(n); };
  stepperKey = k=>{ stop(); if (k==='ArrowRight') goTo(i+1); else if (k==='ArrowLeft') goTo(i-1); };
  ui();
  if (opt.autoplay && !REDUCE) kick = setTimeout(start, 900);
}
document.addEventListener('keydown', e=>{
  if (!stepperKey || /INPUT|TEXTAREA/.test((e.target||{}).tagName||'')) return;
  if (e.key==='ArrowRight'||e.key==='ArrowLeft'){ stepperKey(e.key); }
});

/* ---------- Trang khai cuộc có bài học ---------- */
function proCon(strengths, weaknesses, side){
  return '<div class="pc2"><div class="pro"><h3>Điểm mạnh</h3><ul>'+strengths.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul></div>'+
    '<div class="con"><h3>Điểm yếu</h3><ul>'+weaknesses.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul></div></div>'+
    '<p class="muted small">Nhận định theo nguyên lý khai cuộc phổ biến, chưa phải chứng minh bằng máy. Điểm mạnh và điểm yếu tính cho bên cầm '+(side==='b'?'Đen':'Trắng')+', người chơi khai cuộc này.</p>';
}
function viewOpening(){
  const o = LS.opening;
  setCrumbs([['Trang chủ','#/'],['Khai cuộc','#/khai-cuoc'],[o.name_vi]]);
  let cards = '';
  LS.variations.forEach((v,vi)=>{
    cards += '<a class="vcard" href="#/o/'+o.id+'/'+v.id+'"><span class="thumb" data-sans="'+esc(v.moves)+'" data-flip="'+(o.side==='b'?1:0)+'"></span><div><span class="tag">'+esc(v.eco)+' · '+esc(v.name_en)+'</span>'+
      '<h3>'+esc(v.name_vi)+'</h3><p class="muted">'+esc(movesText(v.moves.split(' '), 8))+' …</p><p>'+esc(v.idea)+'</p></div><span class="go" aria-hidden="true">›</span></a>';
  });
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">'+esc(o.eco)+' · '+esc(o.name_en)+'</span>'+(o.reviewed===false?'<span class="pill soon">Chờ thầy duyệt nội dung</span>':'')+'</div>'+
    '<h2>'+esc(o.name_vi)+'</h2>'+
    '<div class="herobox tour"><div class="boardbox" id="tourBoard"></div><a class="herocap" id="tourCap" href="#/o/'+o.id+'"><b id="tourName"></b><span id="tourMoves"></span></a></div>'+
    '<p class="muted center">'+esc(o.first_moves)+'. Đen đi sau nên bàn được xoay cho Đen ở dưới. Bàn cờ trên tự đi lần lượt từng biến thể, bấm tên bên dưới để vào học.</p>'+
    o.idea.map(t=>'<p>'+esc(t)+'</p>').join('')+
    proCon(o.strengths, o.weaknesses, o.side)+'</section>'+
    '<section class="card"><h2>Chọn một biến thể để học</h2><div class="vlist">'+cards+'</div></section>'+
    (trapsOf(LS).length ? '<section class="card"><h2>Bẫy cần biết</h2><div class="vlist">'+trapsOf(LS).map(t=>'<a class="vcard" href="#/o/'+o.id+'/trap/'+t.id+'"><div><h3>'+esc(t.name_vi)+'</h3><p class="muted">'+esc(t.by==='b' ? 'Đen thắng nhanh nếu Trắng sơ ý.' : 'Trắng thắng nhanh nếu Đen sơ ý.')+'</p></div><span class="go" aria-hidden="true">›</span></a>').join('')+'</div></section>' : '')+
    '<section class="card center"><h2>Luyện tập</h2><p>'+LS.puzzles.length+' câu puzzle về '+esc(o.name_vi)+', từ dễ đến khó. Mỗi câu có gợi ý và giải thích.</p>'+
    '<a class="btn" href="#/o/'+o.id+'/quiz">Làm '+LS.puzzles.length+' câu</a></section>';
  const tour = autoBoard(document.getElementById('tourBoard'),
    LS.variations.map(v=>({name:v.name_vi, sans:v.moves.split(' '), flip:o.side==='b', href:'#/o/'+o.id+'/'+v.id})),
    {delay:850, hold:1800, label:sc=>'Minh hoạ: '+sc.name,
     onScene:sc=>{ document.getElementById('tourName').textContent = sc.name; document.getElementById('tourMoves').textContent = ''; document.getElementById('tourCap').setAttribute('href', sc.href); },
     onMove:(sc,k)=>{ document.getElementById('tourMoves').textContent = tailText(sc.sans, k); }});
  const thumbs = mountThumbs(stage);
  onLeave(()=>{ tour.stop(); thumbs(); });
}
function viewTrap(t){
  const o = LS.opening, sans = t.moves.split(' ').concat(t.finish ? [t.finish] : []);
  setCrumbs([['Trang chủ','#/'],['Khai cuộc','#/khai-cuoc'],[o.name_vi,'#/o/'+o.id],[t.name_vi]]);
  const tp = trapPuzzle(t);
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">Bẫy</span></div><h2>'+esc(t.name_vi)+'</h2>'+
    '<p class="muted">'+esc(movesText(sans, sans.length))+'</p><p>'+esc(t.text)+'</p><div id="stepper"></div>'+
    (tp ? '<div class="center"><a class="btn" href="#/o/'+o.id+'/trap/'+t.id+'/quiz">Thử tìm nước chiếu hết</a></div>' : '')+'</section>';
  mountStepper(document.getElementById('stepper'), sans, null, {start:0, autoplay:true, speed:1300, flip:t.by==='b' && false});
}

/* ---------- Biến thể: bảng chỉ dẫn từng nước ---------- */
function viewVariation(v){
  const o = LS.opening, sans = v.moves.split(' ');
  setCrumbs([['Trang chủ','#/'],['Khai cuộc','#/khai-cuoc'],[o.name_vi,'#/o/'+o.id],[v.name_vi]]);
  const n = LS.puzzles.filter(p=>p.var===v.id).length;
  const rows = v.steps.map((s,i)=>'<tr data-i="'+(i+1)+'" tabindex="0"><td class="m">'+esc(plyLabel(i,s.san))+'</td><td><span class="who '+(s.who==='Trắng'?'w':'b')+'">'+s.who+'</span></td><td>'+esc(s.purpose)+'</td></tr>').join('');
  const evalNote = Math.abs(v.eval_cp)<=50 ? 'cân bằng' : (v.eval_cp>0?'Trắng nhỉnh hơn':'Đen nhỉnh hơn');
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">'+esc(v.eco)+' · '+esc(v.lichess_name)+'</span></div>'+
    '<h2>'+esc(v.name_vi)+'</h2><p>'+esc(v.idea)+'</p><div id="stepper"></div>'+
    '<div class="actions"><a class="btn" href="#/o/'+o.id+'/'+v.id+'/practice">Tự đi lại bên '+(o.side==='b'?'Đen':'Trắng')+'</a>'+(n?'<a class="btn alt" href="#/o/'+o.id+'/'+v.id+'/quiz">Làm '+n+' puzzle</a>':'')+'</div></section>'+
    '<section class="card"><h2>Bảng chỉ dẫn từng nước</h2><p class="muted small">Bấm vào một dòng để xem thế cờ lúc đó.</p>'+
    '<div class="tablewrap"><table class="steps" id="steptable"><thead><tr><th>Nước</th><th>Bên</th><th>Mục đích</th></tr></thead><tbody>'+rows+'</tbody></table></div></section>'+
    '<section class="card"><h2>Điểm mạnh và điểm yếu</h2>'+proCon(v.strengths, v.weaknesses, o.side)+
    '<h3 class="sec">Kế hoạch</h3><p><b>Trắng:</b> '+esc(v.plan_w)+'</p><p><b>Đen:</b> '+esc(v.plan_b)+'</p>'+
    '<p class="tipbox">Mẹo: '+esc(v.tip)+'</p>'+
    '<p class="muted small">Máy (Stockfish) chấm thế cuối dòng này: '+evalNote+'.</p></section>'+
    (n ? '<section class="card center"><h2>Làm quen bằng puzzle</h2><p>'+n+' câu về biến thể này.</p><a class="btn" href="#/o/'+o.id+'/'+v.id+'/quiz">Làm '+n+' câu</a></section>' : '');
  mountStepper(document.getElementById('stepper'), sans, v.steps, {start:0, flip:o.side==='b', autoplay:true, speed:1500});
  document.getElementById('steptable').addEventListener('click', e=>{
    const tr = e.target.closest('tr[data-i]'); if (tr) stepperGo(+tr.dataset.i);
  });
  document.getElementById('steptable').addEventListener('keydown', e=>{
    if (e.key==='Enter'){ const tr = e.target.closest('tr[data-i]'); if (tr) stepperGo(+tr.dataset.i); }
  });
}

/* ---------- Tự đi lại biến thể ---------- */
function viewPractice(v){
  const o = LS.opening, sans = v.moves.split(' '), pos = replay(sans), n = sans.length;
  const me = o.side, meName = me==='b' ? 'Đen' : 'Trắng';
  setCrumbs([['Trang chủ','#/'],['Khai cuộc','#/khai-cuoc'],[o.name_vi,'#/o/'+o.id],[v.name_vi,'#/o/'+o.id+'/'+v.id],['Tự đi lại']]);
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
  const board = new Board($('pbox'), {fen:pos[0].fen, flip:me==='b', interactive:true, intro:true, canMove:c=>c===me, onMove});
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
    const q = LS.puzzles.filter(p=>p.var===v.id).length;
    $('pEnd').innerHTML = '<button class="btn" id="pAgain2" type="button">Làm lại</button>'+
      (q?'<a class="btn alt" href="#/o/'+o.id+'/'+v.id+'/quiz">Làm '+q+' puzzle</a>':'')+
      '<a class="btn ghost" href="#/o/'+o.id+'/'+v.id+'">Về bảng chỉ dẫn</a>';
    $('pAgain2').addEventListener('click', restart);
    $('pSay').classList.add('celebrate'); confetti();
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
function startQuiz(list, backHref, title, qo){
  qo = qo || {};
  if (!list.length){ go(backHref); return; }
  stepperGo = stepperKey = null;
  setCrumbs(qo.crumbs || [['Trang chủ','#/'],['Khai cuộc','#/khai-cuoc'],[LS.opening.name_vi,'#/o/'+LS.opening.id],[title]]);
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
    const b = new Board($('qbox'), {fen:pz.fen, flip:pz.turn==='b', interactive:true, intro:true, canMove:c=>c===pz.turn, onMove});
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
    if (qo.setId) Prog.setBest(qo.setId, pts, n);
    if (qo.onEnd) qo.onEnd(pts, n);
    const msg = qo.single ? (pts ? 'Xong câu đố hôm nay, đúng ngay lần đầu!' : 'Xong câu đố hôm nay!') : pts===n ? 'Tuyệt vời, trọn điểm!' : ratio>=0.8 ? 'Rất xuất sắc!' : ratio>=0.5 ? 'Khá lắm, luyện thêm chút nữa nhé!' : 'Đừng lo, khai cuộc cần luyện tập. Thử lại nào!';
    const stars = ratio>=0.9 ? 3 : ratio>=0.6 ? 2 : ratio>=0.3 ? 1 : 0;
    let rev = '', key = '';
    list.forEach((pz,i)=>{
      rev += '<li class="'+(answers[i]?'ok':'no')+'"><b>'+(answers[i]?'✓':'✗')+'</b><span>Câu '+(i+1)+': '+esc(pz.tag)+'</span></li>';
      key += '<tr><td>'+(i+1)+'</td><td>'+esc(pz.tag)+'</td><td class="m">'+esc(pz.san)+'</td></tr>';
    });
    let st = '';
    for (let i=0;i<3;i++) st += '<span'+(i<stars?'':' style="opacity:.3"')+'>★</span>';
    stage.innerHTML =
      '<section class="card end"><h2>'+msg+'</h2>'+(qo.single ? '' : '<div class="big">'+pts+'/'+n+'</div><div class="stars" aria-hidden="true">'+st+'</div><p class="muted small">Điểm chỉ tính khi bạn đi đúng ngay lần đầu.</p>')+(qo.endHTML ? qo.endHTML() : '')+
      '<ul class="review">'+rev+'</ul>'+
      '<div class="actions"><button class="btn" id="again" type="button">Chơi lại</button> <a class="btn ghost" href="'+backHref+'">'+esc(qo.backText || 'Về bài học')+'</a></div>'+
      '<details class="legend key"><summary>Đáp án cho giáo viên</summary><div class="tablewrap"><table><tr><th>Câu</th><th>Chủ đề</th><th>Nước đúng</th></tr>'+key+'</table></div></details>'+
      '</section>';
    $('again').addEventListener('click',()=>{ idx = 0; answers = []; show(); window.scrollTo({top:0}); });
    if (ratio>=0.6) confetti();
  }
  show();
}

route();
