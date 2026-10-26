/* Đánh với máy: chọn mức (8 mức) và màu quân, rồi đánh một ván đầy đủ. Dùng js/engine.js. */
function mayStats(n){ return Prog.get('may:'+n, {w:0, l:0, d:0}); }

function viewMachine(){
  setCrumbs([['Trang chủ','#/'],['Đánh với máy']]);
  let colour = 'w';
  const cards = ENGINE_LEVELS.map(lv=>{
    const st = mayStats(lv.n), stars = st.w ? '★' : '☆';
    return '<button class="lvpick" type="button" data-n="'+lv.n+'"><span class="vnum" aria-hidden="true">'+lv.n+'</span>'+
      '<span class="lvt"><b>'+esc(lv.name)+'</b><span class="muted">'+esc(lv.desc)+'</span></span>'+
      '<span class="lvs" aria-label="'+(st.w ? 'Đã thắng '+st.w+' ván' : 'Chưa thắng')+'">'+stars+(st.w ? ' '+st.w : '')+'</span></button>';
  }).join('');
  stage.innerHTML =
    '<section class="card"><h2>Đánh với máy</h2>'+
    '<p>Chọn màu quân, rồi chọn mức. Mức 1 rất dễ, mức 8 rất khó. Thắng một ván thì mức đó được ★.</p>'+
    '<div class="seg" role="radiogroup" aria-label="Màu quân">'+
      '<button type="button" role="radio" aria-checked="true" data-c="w" class="on">Cầm Trắng</button>'+
      '<button type="button" role="radio" aria-checked="false" data-c="b">Cầm Đen</button>'+
      '<button type="button" role="radio" aria-checked="false" data-c="r">Ngẫu nhiên</button></div>'+
    '<div class="lvlist">'+cards+'</div>'+
    '<p class="muted small">Máy cờ chạy ngay trên điện thoại hoặc máy tính của bạn (Stockfish). Mức càng cao máy nghĩ càng lâu. Tên mức do web đặt, chưa quy đổi ra điểm Elo.</p></section>';
  const seg = stage.querySelector('.seg');
  seg.addEventListener('click', e=>{
    const b = e.target.closest('button'); if (!b) return;
    colour = b.dataset.c;
    seg.querySelectorAll('button').forEach(x=>{ const on = x===b; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); });
  });
  stage.querySelector('.lvlist').addEventListener('click', e=>{
    const b = e.target.closest('.lvpick'); if (b) go('#/may/'+b.dataset.n+'/'+colour);
  });
}

function viewGame(n, col){
  const lv = ENGINE_LEVELS.find(x=>x.n===+n);
  if (!lv){ viewMachine(); return; }
  const me = col==='b' ? 'b' : col==='w' ? 'w' : (Math.random()<.5 ? 'w' : 'b'), meName = me==='w' ? 'Trắng' : 'Đen';
  setCrumbs([['Trang chủ','#/'],['Đánh với máy','#/may'],['Mức '+lv.n+': '+lv.name]]);
  stage.innerHTML =
    '<section class="card"><div class="meta"><span class="tag">Mức '+lv.n+' · '+esc(lv.name)+'</span><span class="turn"><i class="'+me+'"></i>Bạn cầm '+meName+'</span></div>'+
    '<div class="boardbox" id="gbox"></div>'+
    '<div class="status info" id="gs" aria-live="polite"></div>'+
    '<div class="boardtools"><button class="btn ghost small" id="gUndo" type="button">Đi lại</button>'+
    '<button class="btn ghost small" id="gFlip" type="button">Xoay bàn</button>'+
    '<button class="btn ghost small" id="gResign" type="button">Bỏ cuộc</button></div>'+
    '<div class="movelist" id="gMoves" aria-label="Các nước đã đi"></div>'+
    '<details class="three"><summary>3 câu hỏi trước khi đi</summary><ol><li>Quân nào của mình đang bị đe dọa?</li><li>Nước này có để hở quân nào không?</li><li>Đối thủ vừa đi nước đó để làm gì?</li></ol></details>'+
    '<div class="actions" id="gEnd"></div></section>';
  const $ = id => document.getElementById(id);
  const g = new Chess();
  const board = new Board($('gbox'), {fen:g.fen(), flip:me==='b', interactive:true, intro:true, canMove:c=>c===me, onMove:onMine});
  let alive = true, over = false, thinking = false, undoLeft = 3;
  onLeave(()=>{ alive = false; board.destroy(); engine.stop(); });
  engine.newGame(); engine.start();   // nạp máy cờ sớm trong lúc bạn nghĩ nước đầu
  function say(kind, ico, html){ const el = $('gs'); el.className = 'status '+kind; el.innerHTML = '<span class="ico" aria-hidden="true">'+ico+'</span><div>'+html+'</div>'; }
  function list(){
    const h = g.history(); let out = '';
    for (let i=0;i<h.length;i+=2) out += '<span class="mv"><i>'+(i/2+1)+'.</i> '+esc(h[i])+(h[i+1] ? ' '+esc(h[i+1]) : '')+'</span> ';
    $('gMoves').innerHTML = out; $('gMoves').scrollLeft = 1e5;
    $('gUndo').disabled = over || thinking || undoLeft<=0 || h.length < (me==='w' ? 2 : 3);
    $('gUndo').textContent = 'Đi lại ('+undoLeft+')';
  }
  function turnText(){
    if (g.in_check()) return '<p><b>Đang bị chiếu!</b> '+(g.turn()===me ? 'Hãy thoát chiếu.' : 'Máy đang bị chiếu.')+'</p>';
    return '';
  }
  function checkEnd(){
    if (g.in_checkmate()){ return finish(g.turn()===me ? 'lose' : 'win', 'Chiếu hết!'); }
    if (g.in_stalemate()) return finish('draw', 'Bế tắc: bên đi không còn nước hợp lệ nhưng chưa bị chiếu, nên ván hòa.');
    if (g.insufficient_material()) return finish('draw', 'Không đủ quân để chiếu hết, ván hòa.');
    if (g.in_threefold_repetition()) return finish('draw', 'Thế cờ lặp lại 3 lần, ván hòa.');
    if (g.in_draw()) return finish('draw', '50 nước không ăn quân cũng không đi Tốt, ván hòa.');
    return false;
  }
  function finish(result, why){
    over = true; board.lock(true); list();
    const st = mayStats(lv.n); st[result==='win'?'w':result==='lose'?'l':'d']++; Prog.set('may:'+lv.n, st);
    const title = result==='win' ? 'Bạn thắng rồi!' : result==='lose' ? 'Máy thắng ván này' : 'Hòa';
    const more = result==='win' ? (lv.n<8 ? 'Giỏi quá! Thử mức '+(lv.n+1)+' nhé.' : 'Bạn đã thắng mức cao nhất!') : result==='lose' ? 'Không sao, thua là cách học nhanh nhất. Chơi lại nào.' : 'Hòa cũng là kết quả tốt khi máy mạnh.';
    say(result==='win'?'ok':result==='lose'?'no':'info', result==='win'?'★':result==='lose'?'✗':'=', '<p><b>'+title+'</b> '+esc(why)+'</p><p>'+more+'</p>');
    if (result==='win'){ $('gs').classList.add('celebrate'); confetti(); }
    $('gEnd').innerHTML = '<a class="btn" href="#/may/'+lv.n+'/'+col+'">Chơi lại</a>'+
      (result==='win' && lv.n<8 ? '<a class="btn alt" href="#/may/'+(lv.n+1)+'/'+col+'">Mức '+(lv.n+1)+'</a>' : '')+
      '<a class="btn ghost" href="#/may">Chọn mức khác</a>';
    $('gUndo').disabled = $('gResign').disabled = true;
    return true;
  }
  async function machine(){
    if (over || !alive) return;
    thinking = true; board.lock(true); list();
    say('info','…','<p>Máy đang nghĩ...</p>'+turnText());
    const t0 = Date.now();
    const uci = await engine.move(g, lv);
    const wait = Math.max(0, 450 - (Date.now()-t0));   // đi quá nhanh thì bạn không kịp nhìn
    await new Promise(r=>setTimeout(r, wait));
    thinking = false;
    if (!alive || over) return;
    if (!uci){ checkEnd(); return; }
    const m = g.move({from:uci.slice(0,2), to:uci.slice(2,4), promotion:uci[4]});
    board.play(m.from, m.to, m.promotion, !REDUCE);
    list();
    if (checkEnd()) return;
    board.lock(false);
    say('info','♟','<p>Máy đi <b>'+esc(m.san)+'</b>. Đến lượt bạn.</p>'+turnText());
  }
  function onMine(m){
    if (over) return;
    g.move({from:m.from, to:m.to, promotion:m.promotion});
    list();
    if (checkEnd()) return;
    machine();
  }
  $('gFlip').addEventListener('click', ()=>board.setFlip(!board.flip));
  $('gResign').addEventListener('click', ()=>{
    if (over) return;
    if (!confirmResign){ confirmResign = true; $('gResign').textContent = 'Bấm lần nữa để bỏ cuộc'; setTimeout(()=>{ confirmResign = false; if (!over) $('gResign').textContent = 'Bỏ cuộc'; }, 3000); return; }
    finish('lose', 'Bạn đã bỏ cuộc.');
  });
  let confirmResign = false;
  $('gUndo').addEventListener('click', ()=>{
    if (over || thinking || undoLeft<=0) return;
    g.undo(); g.undo(); undoLeft--;
    board.setFen(g.fen(), {last:(function(){ const h = g.history({verbose:true}); const l = h[h.length-1]; return l ? [l.from, l.to] : null; })()});
    list(); say('info','↶','<p>Đã đi lại. Đến lượt bạn.</p>');
  });
  list();
  if (me==='w') say('info','♟','<p>Bạn đi trước. Chạm quân muốn đi rồi chạm ô đến, hoặc kéo quân.</p>');
  else machine();
}
