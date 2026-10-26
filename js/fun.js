/* Hội quân cờ: nhân vật nói chuyện khi học sinh làm bài, chuỗi ngày và thẻ nghỉ, nhắc học, danh hiệu, nhãn nước đi, thẻ tổng kết.
   Lời thoại nằm ở data/voice.js. Nạp sau js/progress.js và trước js/learn.js, js/app.js.
   Mọi hàm công khai đều bọc try/catch: nếu lỗi thì chỉ mất phần vui, không làm hỏng bài học. */
const Fun = (function(){
  const V = window.VOICE;
  const DAY = 86400000;
  const html = s => String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const reduced = () => document.documentElement.getAttribute('data-motion')==='reduce' || !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const safe = f => function(){ try { return f.apply(this, arguments); } catch(e){ try { console.warn('Fun:', e); } catch(_){} } };

  /* ---------- Cài đặt ---------- */
  function tone(){ const t = Prog.get('fun:tone', V.defaults.tone); return V.tones.some(x=>x[0]===t) ? t : V.defaults.tone; }
  function setTone(t){ Prog.set('fun:tone', t); }
  function trendKey(){ const t = Prog.get('fun:trend', V.defaults.trend); return V.trend[t]!==undefined ? t : V.defaults.trend; }
  function remindOn(){ return Prog.get('fun:remindOff', false) !== true; }

  /* ---------- Số liệu ---------- */
  const STAT0 = {solved:0, mates:0, hangs:0, hints:0, wrong:0, bestCombo:0, maxStreak:0, levels:0};
  function stats(){ return Object.assign({}, STAT0, Prog.get('fun:stats', {})); }
  function bump(k, n){ const s = stats(); s[k] = (s[k]||0) + (n===undefined ? 1 : n); Prog.set('fun:stats', s); return s[k]; }
  function setMax(k, v){ const s = stats(); if (v > s[k]){ s[k] = v; Prog.set('fun:stats', s); } }
  let sess = {t0:Date.now(), solved:0, first:0, wrong:0, hangs:0, mates:0, hints:0, combo:0, bestCombo:0, badges:[], at:Date.now()};
  let wrongRun = 0;
  function saveSess(){ sess.at = Date.now(); Prog.set('fun:sess', sess); }

  /* ---------- Chọn câu ---------- */
  const recent = {};
  function fill(s, vars){
    vars = vars || {};
    return s.replace(/\{(\w+)\}/g, (m, k)=> vars[k]!==undefined ? vars[k] : (k==='n' ? Prog.streak() : m));
  }
  function pickLine(sit){
    const S = V.L[sit]; if (!S) return null;
    const t = tone(), arr = S.all || S[t] || S.nhe; if (!arr || !arr.length) return null;
    const want = Math.random() < V.trend[trendKey()];
    let pool = arr.filter(l=>!!l[2]===want); if (!pool.length) pool = arr;
    const key = sit+t, seen = recent[key] = recent[key] || [];
    let fresh = pool.filter(l=>seen.indexOf(l[1])<0); if (!fresh.length){ seen.length = 0; fresh = pool; }
    const line = fresh[Math.floor(Math.random()*fresh.length)];
    seen.push(line[1]); if (seen.length > 6) seen.shift();
    return line;
  }
  function labelFromLoss(cp){
    cp = Math.max(0, cp||0);
    for (const l of V.labels) if (cp <= l.max) return l;
    return V.labels[V.labels.length-1];
  }
  const labelById = id => V.labels.filter(l=>l.id===id)[0];

  /* ---------- Hộp thoại ---------- */
  let box = null, timer = null, queued = [];
  function ensureBox(){
    if (box) return box;
    box = document.createElement('div');
    box.id = 'funToast'; box.className = 'funtoast'; box.setAttribute('role','status'); box.setAttribute('aria-live','polite'); box.hidden = true;
    document.body.appendChild(box);
    box.addEventListener('pointerenter', ()=>clearTimeout(timer));
    box.addEventListener('pointerleave', ()=>{ if (box.dataset.sticky!=='1') arm(2500); });
    return box;
  }
  function arm(ms){ clearTimeout(timer); timer = setTimeout(hide, ms); }
  function hide(){ if (!box) return; box.classList.remove('in'); const b = box; setTimeout(()=>{ if (!b.classList.contains('in')) b.hidden = true; }, reduced() ? 0 : 220); }
  function later(fn, ms){ const id = setTimeout(safe(fn), ms); queued.push(id); return id; }
  /* o: {spk, text, chip, chipCls, actions:[{label, primary, on}], sticky, ms} */
  function toast(o){
    const b = ensureBox(), c = V.cast[o.spk] || V.cast.N;
    let h = '<span class="fav" aria-hidden="true"><svg viewBox="0 0 45 45"><use href="#'+c.sym+'"/></svg></span><div class="fbody"><b class="fname">'+html(c.name)+
      (o.chip ? ' <span class="chip '+(o.chipCls||'')+'">'+html(o.chip)+'</span>' : '')+'</b><p>'+html(o.text)+'</p>';
    if (o.actions && o.actions.length) h += '<div class="facts">'+o.actions.map((a,i)=>'<button type="button" class="fbtn'+(a.primary?' pri':'')+'" data-i="'+i+'">'+html(a.label)+'</button>').join('')+'</div>';
    h += '</div><button type="button" class="fx" aria-label="Đóng">×</button>';
    b.innerHTML = h; b.hidden = false; b.dataset.sticky = o.sticky ? '1' : '0';
    b.querySelector('.fx').onclick = ()=>{ clearTimeout(timer); hide(); };
    b.querySelectorAll('.fbtn').forEach(btn=>btn.onclick = ()=>{ const a = o.actions[+btn.dataset.i]; clearTimeout(timer); hide(); if (a.on) a.on(); });
    void b.offsetWidth; b.classList.add('in');
    if (o.sticky) clearTimeout(timer); else arm(o.ms || 6500);
  }
  /* Nói một câu của tình huống sit. extra: {chip, chipCls, vars, actions, sticky}. */
  function say(sit, extra){
    extra = extra || {};
    if (tone()==='tat') return false;
    const line = pickLine(sit); if (!line) return false;
    const text = fill(line[1], extra.vars);
    let chip = extra.chip, cls = extra.chipCls;
    if (chip && text.toLowerCase().indexOf(chip.toLowerCase())>=0) chip = null;   // tránh nhắc hai lần
    toast({spk:line[0], text:text, chip:chip, chipCls:cls, actions:extra.actions, sticky:extra.sticky});
    return true;
  }

  /* ---------- Phát hiện lỗi cờ ---------- */
  const VAL = {p:1, n:3, b:3, r:5, q:9, k:0};
  function mateAvailable(fen){
    try {
      const g = new Chess(fen);
      return g.moves().some(m=>{ g.move(m); const r = g.in_checkmate(); g.undo(); return r; });
    } catch(e){ return false; }
  }
  /* Quân vừa đi có bị ăn lỗ không: bị ăn mà không ai bảo vệ, hoặc bị quân rẻ hơn ăn. game đang ở lượt đối thủ. */
  function hanging(game, mv){
    try {
      if (!mv || !mv.to || mv.piece==='k') return false;
      const mine = VAL[mv.piece] || 0;
      const caps = game.moves({verbose:true}).filter(m=>m.to===mv.to && m.captured);
      if (!caps.length) return false;
      const g = new Chess(game.fen());
      return caps.some(c=>{
        g.move({from:c.from, to:c.to, promotion:c.promotion});
        const recap = g.moves({verbose:true}).some(m=>m.to===mv.to && m.captured);
        g.undo();
        return !recap || (VAL[c.piece]||0) < mine;
      });
    } catch(e){ return false; }
  }

  /* ---------- Gọi từ các màn câu đố ---------- */
  const solved = safe(function(ctx){
    ctx = ctx || {};
    bump('solved'); sess.solved++; wrongRun = 0;
    if (ctx.first){ sess.first++; sess.combo++; if (sess.combo > sess.bestCombo) sess.bestCombo = sess.combo; setMax('bestCombo', sess.combo); }
    if (ctx.game && ctx.game.in_checkmate && ctx.game.in_checkmate()){ bump('mates'); sess.mates++; }
    const t = Prog.get('fun:today', null) || {}, k = Prog.dayKey();
    const n = (t.d===k ? t.n : 0) + 1;
    Prog.set('fun:today', {d:k, n:n, late:t.d===k ? t.late : false});
    if (n===3) Prog.markDay();
    let done = false;
    if (ctx.first && sess.combo>0 && sess.combo%5===0) done = say('combo');
    if (!done && isLate() && !(t.d===k && t.late)){
      Prog.set('fun:today', {d:k, n:n, late:true});
      done = say('khuya');
    }
    if (!done && Math.random() < V.praiseChance){
      const l = labelById(ctx.first ? 'best' : 'ok');
      say('dung', {chip:l.t, chipCls:l.cls});
    }
    saveSess(); badges(); recapNudge();
  });
  const wrong = safe(function(ctx){
    ctx = ctx || {};
    bump('wrong'); sess.wrong++; sess.combo = 0; wrongRun++;
    let sit = 'sai', l = null;
    if (ctx.fenBefore && mateAvailable(ctx.fenBefore)){ sit = 'bolo'; l = labelById('blunder'); }
    else if (ctx.game && hanging(ctx.game, ctx.move)){ sit = 'matquan'; l = labelById('blunder'); bump('hangs'); sess.hangs++; }
    else { l = typeof ctx.loss==='number' ? labelFromLoss(ctx.loss) : labelById('miss'); if (l.cls==='mid') sit = 'gan'; }
    if (wrongRun >= 3){ sit = 'sai3'; l = null; wrongRun = 0; }
    say(sit, l ? {chip:l.t, chipCls:l.cls} : {});
    saveSess(); badges(); recapNudge();
  });
  const hint = safe(function(){
    bump('hints'); sess.hints++;
    if (Math.random() < .7) say('hint');
    saveSess(); badges();
  });
  const lessonDone = safe(function(){
    if (typeof LEVELS==='undefined' || typeof levelProgress!=='function') return;
    const got = Prog.get('fun:levels', []);
    LEVELS.forEach(lv=>{
      const p = levelProgress(lv);
      if (p.total && p.done===p.total && got.indexOf(lv.n)<0){
        got.push(lv.n); Prog.set('fun:levels', got); bump('levels'); say('cap');
      }
    });
    badges();
  });
  function recapNudge(){
    if (tone()==='tat') return;
    if (sess.solved+sess.wrong===10){
      later(()=>toast({spk:'P', text:'Bạn đã làm 10 câu trong buổi này. Muốn xem thẻ tổng kết để khoe không?', sticky:false, ms:9000,
        actions:[{label:'Xem thẻ', primary:true, on:()=>go('#/tong-ket')}, {label:'Để sau'}]}), 7000);
    }
  }
  function isLate(){ const d = new Date(), m = d.getHours()*60+d.getMinutes(); return m >= 21*60+30 || m < 5*60; }

  /* ---------- Chuỗi ngày, thẻ nghỉ ---------- */
  function lastDay(days){ return days.length ? days.slice().sort().pop() : null; }
  function parseDay(k){ const p = k.split('-'); return new Date(+p[0], +p[1]-1, +p[2], 12); }
  function addDays(d, n){ const x = new Date(d.getTime()); x.setDate(x.getDate()+n); return x; }
  /* Mở trang: nếu hôm qua nghỉ mà còn thẻ thì dùng thẻ giữ chuỗi. */
  const tick = safe(function(){
    const days = Prog.get('days', []); if (!days.length) return;
    const last = parseDay(lastDay(days)), today = parseDay(Prog.dayKey());
    const gap = Math.round((today - last)/DAY) - 1;      // số ngày đã bỏ, không tính hôm nay
    if (gap < 1) return;
    const frozen = Prog.get('frozen', []), freezes = Prog.get('fun:freezes', 0), miss = [];
    for (let i=1;i<=gap;i++) miss.push(Prog.dayKey(addDays(last, i)));
    if (miss.every(k=>frozen.indexOf(k)>=0)) return;
    if (gap <= freezes && Prog.streak()===0 && days.length){
      // chuỗi đã đứt vì hôm nghỉ: nối lại bằng thẻ
      miss.forEach(k=>{ if (frozen.indexOf(k)<0) frozen.push(k); });
      Prog.set('frozen', frozen.slice(-60)); Prog.set('fun:freezes', freezes-gap);
      later(()=>say('theDung', {vars:{n:Prog.streak()}}), 1800);
    }
  });
  const dayMarked = safe(function(){
    const n = Prog.streak(); setMax('maxStreak', n);
    if ([3,7,14,30,50,100].indexOf(n)>=0) say('chuoi', {vars:{n:n}});
    if (n>0 && n%7===0 && Prog.get('fun:fzAt', 0) < n){
      Prog.set('fun:fzAt', n);
      Prog.set('fun:freezes', Math.min(2, Prog.get('fun:freezes', 0)+1));
      later(()=>say('theNghi'), 5000);
    }
    badges();
  });

  /* ---------- Nhắc học ---------- */
  const remind = safe(function(){
    if (tone()==='tat' || !remindOn() || isLate()) return;
    const h = (location.hash||'#/').replace(/^#\/?/, '');
    if (h && ['hoc','cau-do','cai-dat'].indexOf(h.split('/')[0])<0) return;     // không làm phiền khi đang làm bài
    const k = Prog.dayKey();
    if (Prog.get('fun:remindDay','') === k || Prog.doneToday()) return;
    const days = Prog.get('days', []); if (!days.length) return;
    const gap = Math.round((parseDay(k) - parseDay(lastDay(days)))/DAY);
    const st = Prog.streak(), t = tone();
    let sit = null;
    if (st>=1 && gap<=1) sit = 'nhac1'; else if (gap>=3) sit = 'nhac3';
    if (!sit) return;
    const line = pickLine(sit); if (!line) return;
    Prog.set('fun:remindDay', k);
    const who = V.cast[line[0]].name;
    toast({spk:line[0], text:fill(line[1], {n:st}), sticky:true, actions:[
      {label:V.remind.go[t], primary:true, on:()=>go('#/cau-do/hom-nay')},
      {label:V.remind.later[t].replace('{name}', who)},
      {label:V.remind.off, on:()=>Prog.set('fun:remindOff', true)}
    ]});
  });

  /* ---------- Danh hiệu ---------- */
  function statValue(id){ const s = stats(); if (id==='maxStreak') return Math.max(s.maxStreak, Prog.streak()); return s[id]||0; }
  const badges = safe(function(){
    const got = Prog.get('fun:badges', {}); let delay = 4500, any = false;
    V.badges.forEach(b=>{
      if (got[b.id] || statValue(b.stat) < b.need) return;
      got[b.id] = Prog.dayKey(); any = true; sess.badges.push(b.id);
      const d = delay; delay += 3200;
      later(()=>{
        say('huyhieu', {vars:{badge:'«'+b.name+'»', desc:b.desc}, chip:'Mới', chipCls:'ok'});
        if (typeof confetti==='function') confetti();
      }, d);
    });
    if (any){ Prog.set('fun:badges', got); saveSess(); }
  });

  /* ---------- Trang Tôi: thẻ Hội quân cờ ---------- */
  function avatar(sym, cls){ return '<span class="fav '+(cls||'')+'" aria-hidden="true"><svg viewBox="0 0 45 45"><use href="#'+sym+'"/></svg></span>'; }
  function settingsHTML(){
    const t = tone(), cast = Object.keys(V.cast).map(k=>{ const c = V.cast[k];
      return '<li>'+avatar(c.sym)+'<div><b>'+html(c.name)+'</b> <span class="muted small">'+html(c.trait)+'</span><div class="muted small">'+html(c.says)+'</div></div></li>'; }).join('');
    const tones = V.tones.map(x=>'<button type="button" class="sw" data-fun-tone="'+x[0]+'" aria-pressed="'+(t===x[0])+'"><span>'+html(x[1])+'<small>'+html(x[2])+'</small></span></button>').join('');
    const st = Prog.streak(), fz = Prog.get('fun:freezes', 0), got = Prog.get('fun:badges', {});
    const bd = V.badges.map(b=>{
      const have = !!got[b.id], v = Math.min(statValue(b.stat), b.need);
      return '<li class="bdg'+(have?' have':'')+'"><span class="bmark" aria-hidden="true">'+(have?'✓':'')+'</span><div><b>'+html(b.name)+'</b><div class="muted small">'+html(b.desc)+'</div>'+
        (have ? '<div class="small bok">Đã nhận ngày '+html(got[b.id])+'</div>' : '<div class="small muted">Tiến độ '+v+'/'+b.need+'</div>')+'</div></li>'; }).join('');
    const n = Object.keys(got).length;
    return '<section class="card" id="funCard"><h3>Hội quân cờ</h3>'+
      '<p class="muted small">Sáu quân cờ sẽ bình luận khi bạn làm bài. Chọn giọng bạn thích, hoặc tắt hẳn.</p>'+
      '<div class="swrow" role="group" aria-label="Giọng nói">'+tones+'</div>'+
      '<div class="actions"><button type="button" class="btn ghost small" id="funTry">Nghe thử</button></div>'+
      '<ul class="cast">'+cast+'</ul></section>'+
    '<section class="card"><h3>Chuỗi ngày</h3>'+
      '<p><b>'+st+' ngày</b> liên tiếp · Thẻ nghỉ: <b>'+fz+'/2</b></p>'+
      '<p class="muted small">Một ngày được tính khi bạn xong câu đố hôm nay, hoặc giải đúng 3 câu bất kỳ. Học đủ 7 ngày liên tiếp thì được tặng 1 thẻ nghỉ (giữ tối đa 2). Quên học một hôm, thẻ tự giữ chuỗi cho bạn.</p>'+
      '<div class="swrow" role="group" aria-label="Nhắc học"><button type="button" class="sw" data-fun-remind="1" aria-pressed="'+remindOn()+'"><span>Nhắc học trong web</span></button><button type="button" class="sw" data-fun-remind="0" aria-pressed="'+(!remindOn())+'"><span>Không nhắc</span></button></div></section>'+
    '<section class="card"><h3>Danh hiệu <span class="muted small">('+n+'/'+V.badges.length+')</span></h3><ul class="bdgs">'+bd+'</ul>'+
      '<div class="actions"><a class="btn ghost small" href="#/tong-ket">Thẻ tổng kết buổi học</a></div></section>';
  }
  function mountSettings(root){
    root.querySelectorAll('[data-fun-tone]').forEach(b=>b.addEventListener('click', ()=>{
      setTone(b.dataset.funTone);
      root.querySelectorAll('[data-fun-tone]').forEach(x=>x.setAttribute('aria-pressed', String(x===b)));
      if (b.dataset.funTone==='tat') hide(); else say('dung');
    }));
    const tr = document.getElementById('funTry');
    if (tr) tr.addEventListener('click', ()=>{
      if (tone()==='tat'){ toast({spk:'B', text:'Giọng đang tắt. Chọn một giọng khác ở trên để nghe thử.'}); return; }
      say(['dung','sai','hint','nhac1','matquan'][Math.floor(Math.random()*5)], {vars:{n:Math.max(1, Prog.streak())}});
    });
    root.querySelectorAll('[data-fun-remind]').forEach(b=>b.addEventListener('click', ()=>{
      Prog.set('fun:remindOff', b.dataset.funRemind==='0');
      root.querySelectorAll('[data-fun-remind]').forEach(x=>x.setAttribute('aria-pressed', String(x===b)));
    }));
  }

  /* ---------- Thẻ tổng kết buổi học ---------- */
  function recapLine(){
    const R = V.recap, s = sess, t = tone();
    if (t==='nhe' || t==='tat') return fill(R.nhe[0], s);
    let a = R.base;
    if (s.hangs>=2) a = R.hangs; else if (s.wrong>s.solved && s.wrong>=3) a = R.wrong; else if (s.solved>=10) a = R.many; else if (s.mates>=1) a = R.mates; else if (s.hints>=3) a = R.hints;
    return fill(a[Math.floor(Math.random()*a.length)], s);
  }
  function wrapText(c, text, x, y, w, lh){
    const words = text.split(' '); let line = '', yy = y;
    words.forEach(wd=>{ const t = line ? line+' '+wd : wd; if (c.measureText(t).width > w && line){ c.fillText(line, x, yy); line = wd; yy += lh; } else line = t; });
    if (line){ c.fillText(line, x, yy); yy += lh; }
    return yy;
  }
  function rr(c, x, y, w, h, r){ c.beginPath(); c.moveTo(x+r, y); c.arcTo(x+w, y, x+w, y+h, r); c.arcTo(x+w, y+h, x, y+h, r); c.arcTo(x, y+h, x, y, r); c.arcTo(x, y, x+w, y, r); c.closePath(); }
  function pieceImage(sym, cb){
    const el = document.getElementById(sym); if (!el){ cb(null); return; }
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="360" height="360">'+el.innerHTML+'</svg>';
    const img = new Image(); img.onload = ()=>cb(img); img.onerror = ()=>cb(null);
    img.src = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  }
  function drawRecap(cv, who, line, done){
    const W = 1080, H = 1350, c = cv.getContext('2d'); cv.width = W; cv.height = H;
    const F = '"Be Vietnam Pro","Segoe UI",system-ui,sans-serif';
    const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#6b9a40'); g.addColorStop(1, '#3f6a22'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.fillStyle = 'rgba(255,255,255,.08)';
    for (let i=0;i<8;i++) for (let j=0;j<10;j++) if ((i+j)%2===0) c.fillRect(i*135, j*135, 135, 135);
    rr(c, 60, 60, W-120, H-120, 48); c.fillStyle = '#ffffff'; c.fill();
    c.fillStyle = '#5b8c2f'; c.font = '800 34px '+F; c.textAlign = 'center'; c.fillText('THƯ VIỆN KHAI CUỘC', W/2, 140);
    c.fillStyle = '#262421'; c.font = '800 70px '+F; c.fillText(who ? 'Buổi học của '+who : 'Buổi học hôm nay', W/2, 235, W-200);
    const spk = (V.cast.N).sym;
    c.fillStyle = '#6b9a40'; c.beginPath(); c.arc(W/2, 430, 130, 0, Math.PI*2); c.fill();
    pieceImage(spk, img=>{
      if (img) c.drawImage(img, W/2-110, 430-120, 220, 220);
      c.fillStyle = '#eef1ea'; rr(c, 120, 590, W-240, 210, 32); c.fill();
      c.fillStyle = '#262421'; c.font = '700 42px '+F; c.textAlign = 'center';
      const lines = []; { let cur = ''; line.split(' ').forEach(wd=>{ const t = cur ? cur+' '+wd : wd; if (c.measureText(t).width > W-330 && cur){ lines.push(cur); cur = wd; } else cur = t; }); if (cur) lines.push(cur); }
      const y0 = 590 + 105 - (lines.length-1)*30 + 14;
      lines.slice(0,3).forEach((ln,i)=>c.fillText(ln, W/2, y0 + i*60));
      const s = sess, cells = [['Đúng ngay lần đầu', s.first], ['Lần chưa đúng', s.wrong], ['Chiếu hết', s.mates], ['Chuỗi ngày', Prog.streak()]];
      cells.forEach((cell, i)=>{
        const x = 120 + (i%2)*((W-240)/2+10), y = 840 + Math.floor(i/2)*170, w = (W-240)/2-10;
        rr(c, x, y, w, 150, 28); c.fillStyle = '#e3f2d6'; c.fill();
        c.fillStyle = '#3f7d1f'; c.font = '800 64px '+F; c.textAlign = 'center'; c.fillText(String(cell[1]), x+w/2, y+78);
        c.fillStyle = '#5f6a58'; c.font = '700 28px '+F; c.fillText(cell[0], x+w/2, y+122);
      });
      const nb = sess.badges.length ? V.badges.filter(b=>b.id===sess.badges[sess.badges.length-1])[0] : null;
      c.fillStyle = '#262421'; c.font = '800 34px '+F;
      if (nb) c.fillText('Danh hiệu mới: '+nb.name, W/2, 1215, W-200);
      c.fillStyle = '#5f6a58'; c.font = '600 28px '+F; c.fillText('vinh210a1-ship-it.github.io/co-vua-viet', W/2, 1270);
      done();
    });
  }
  function recapText(who, line){
    const s = sess;
    return (who ? 'Buổi học của '+who+'\n' : 'Buổi học hôm nay\n')+line+'\nĐúng ngay lần đầu: '+s.first+' · Chưa đúng: '+s.wrong+' · Chiếu hết: '+s.mates+' · Chuỗi: '+Prog.streak()+' ngày\nhttps://vinh210a1-ship-it.github.io/co-vua-viet/';
  }
  function viewRecap(){
    setCrumbs([['Trang chủ','#/'],['Tôi','#/cai-dat'],['Thẻ tổng kết']]);
    if (sess.solved+sess.wrong===0){
      stage.innerHTML = '<section class="card center"><h2>Chưa có gì để tổng kết</h2><p class="muted">Làm vài câu đố rồi quay lại đây, Hội quân cờ sẽ làm cho bạn một tấm thẻ.</p><div class="actions"><a class="btn" href="#/cau-do/hom-nay">Làm câu đố hôm nay</a></div></section>';
      return;
    }
    const name = Prog.get('fun:name', ''), line = recapLine();
    stage.innerHTML = '<section class="card"><h2>Thẻ tổng kết buổi học</h2>'+
      '<canvas id="recapCv" class="recapcv" role="img" aria-label="Thẻ tổng kết: '+html(line)+'"></canvas>'+
      '<label class="field"><span class="muted small">Tên hiển thị trên thẻ (không bắt buộc, chỉ lưu trên máy này)</span><input type="text" id="recapName" maxlength="20" value="'+html(name)+'" autocomplete="off"></label>'+
      '<div class="actions"><button type="button" class="btn" id="recapSave">Lưu ảnh</button> <button type="button" class="btn ghost" id="recapShare" hidden>Chia sẻ</button> <button type="button" class="btn ghost" id="recapCopy">Sao chép chữ</button></div>'+
      '<p class="muted small" id="recapMsg" aria-live="polite">Thẻ chỉ được tạo trên máy của bạn, không gửi đi đâu.</p></section>';
    const cv = document.getElementById('recapCv'), $ = id => document.getElementById(id), msg = t => { $('recapMsg').textContent = t; };
    const draw = () => { const who = $('recapName').value.trim(); drawRecap(cv, who, line, ()=>{}); };
    const go2 = () => { if (document.fonts && document.fonts.load) document.fonts.load('800 40px "Be Vietnam Pro"').then(draw, draw); else draw(); };
    go2();
    $('recapName').addEventListener('input', ()=>{ Prog.set('fun:name', $('recapName').value.trim()); draw(); });
    const blob = cb => { try { cv.toBlob(cb, 'image/png'); } catch(e){ cb(null); } };
    $('recapSave').addEventListener('click', ()=>blob(b=>{
      if (!b){ msg('Không lưu được ảnh trên trình duyệt này. Hãy chụp màn hình thẻ.'); return; }
      const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'tong-ket-co-vua.png'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(()=>URL.revokeObjectURL(a.href), 4000); msg('Đã lưu ảnh vào máy của bạn.');
    }));
    if (navigator.share && navigator.canShare){
      $('recapShare').hidden = false;
      $('recapShare').addEventListener('click', ()=>blob(b=>{
        if (!b) return;
        const f = new File([b], 'tong-ket-co-vua.png', {type:'image/png'});
        if (navigator.canShare({files:[f]})) navigator.share({files:[f], text:line}).catch(()=>{});
        else msg('Trình duyệt này chưa chia sẻ được ảnh. Hãy bấm Lưu ảnh.');
      }));
    }
    $('recapCopy').addEventListener('click', ()=>{
      const t = recapText($('recapName').value.trim(), line);
      try { navigator.clipboard.writeText(t).then(()=>msg('Đã sao chép.'), ()=>msg('Chưa sao chép được, hãy chép tay.')); } catch(e){ msg('Chưa sao chép được, hãy chép tay.'); }
    });
  }

  /* ---------- Khởi động ---------- */
  function init(){
    try {
      const s = Prog.get('fun:sess', null);
      if (s && Date.now() - s.at < 30*60000) sess = Object.assign(sess, s);
      setMax('maxStreak', Prog.streak());
      const orig = Prog.markDay;
      Prog.markDay = function(){ const before = Prog.doneToday(); orig(); if (!before) dayMarked(); };
      tick();
      setTimeout(remind, 1400);
    } catch(e){ try { console.warn('Fun.init', e); } catch(_){} }
  }
  init();
  return {solved:solved, wrong:wrong, hint:hint, lessonDone:lessonDone, say:say, labelFromLoss:labelFromLoss, settingsHTML:safe(settingsHTML), mountSettings:safe(mountSettings), viewRecap:viewRecap, tone:tone};
})();
