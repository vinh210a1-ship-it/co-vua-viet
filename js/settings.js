/* Cài đặt giao diện: màu bàn cờ, màu quân, cỡ chữ, giảm chuyển động. Lưu ngay trên máy (localStorage), không cần tài khoản.
   Nạp trong <head> để áp dụng trước khi vẽ trang, nên không bị nháy màu. Trang #/cai-dat (viewSettings) chỉ chạy khi route() gọi. */
const UI = (function(){
  const KEY = 'tvkc:ui';
  const BOARDS = {
    la:{n:'Xanh lá', note:'mặc định', l:'#f1f1ee', d:'#6b9a40'},
    go:{n:'Gỗ', l:'#ecd7b0', d:'#a9764a'},
    bi:{n:'Xanh biển', l:'#e6eef2', d:'#5b8fb0'},
    ng:{n:'Gạch bông', l:'#f1f6f4', d:'#2f8f8a'},
    ke:{n:'Kẹo', l:'#fff0f4', d:'#ee86a8'},
    de:{n:'Đêm', l:'#8d96ab', d:'#3b4358'}
  };
  const PIECES = {
    cd:{n:'Cổ điển', note:'mặc định', w:'#ffffff', b:'#000000'},
    tk:{n:'Kem và than', w:'#fff4d9', b:'#2b2833'},
    vl:{n:'Vàng và lam', w:'#ffdf80', b:'#2a4fa8'},
    hx:{n:'Hồng và xanh', w:'#ffd0e0', b:'#32507f'}
  };
  const SIZES = {s:{n:'Nhỏ', v:.94}, m:{n:'Vừa', note:'mặc định', v:1}, l:{n:'Lớn', v:1.14}, x:{n:'Rất lớn', v:1.3}};
  const MOTION = {auto:{n:'Theo máy của bạn', note:'mặc định'}, reduce:{n:'Luôn giảm chuyển động'}};
  const DEF = {board:'la', piece:'cd', size:'m', motion:'auto'};
  let st = Object.assign({}, DEF);
  try { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); if (s && typeof s==='object') Object.keys(DEF).forEach(k=>{ if (typeof s[k]==='string') st[k] = s[k]; }); } catch(e){}
  if (!BOARDS[st.board]) st.board = DEF.board;
  if (!PIECES[st.piece]) st.piece = DEF.piece;
  if (!SIZES[st.size]) st.size = DEF.size;
  if (!MOTION[st.motion]) st.motion = DEF.motion;

  function apply(){
    const r = document.documentElement, set = (k,v)=>{ if (v==null) r.style.removeProperty(k); else r.style.setProperty(k, v); };
    const B = BOARDS[st.board], P = PIECES[st.piece], S = SIZES[st.size];
    set('--sq-light', st.board===DEF.board ? null : B.l); set('--sq-dark', st.board===DEF.board ? null : B.d);
    set('--wp', st.piece===DEF.piece ? null : P.w); set('--bp', st.piece===DEF.piece ? null : P.b);
    set('--fs', st.size===DEF.size ? null : String(S.v));
    if (st.motion==='reduce') r.setAttribute('data-motion','reduce'); else r.removeAttribute('data-motion');
  }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){} }
  apply();
  return {
    BOARDS:BOARDS, PIECES:PIECES, SIZES:SIZES, MOTION:MOTION, DEF:DEF,
    get(k){ return st[k]; },
    set(k, v){ st[k] = v; apply(); save(); },
    reset(){ st = Object.assign({}, DEF); apply(); save(); }
  };
})();

/* Thanh điều hướng chính: đánh dấu mục đang mở theo địa chỉ. */
(function(){
  function sect(){
    const h = (location.hash || '#/').slice(2).split('/')[0];
    if (h==='o' || h==='line') return 'khai-cuoc';
    if (h==='cau-do' || h==='hoc' || h==='khai-cuoc' || h==='cai-dat') return h;
    return '';
  }
  function mark(){
    const nav = document.getElementById('mainnav'); if (!nav) return;
    const cur = sect();
    nav.querySelectorAll('a').forEach(a=>{ if (a.dataset.nav===cur) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    mark();
    const st = document.getElementById('stage');
    if (st && window.MutationObserver) new MutationObserver(mark).observe(st, {childList:true});
  });
})();

/* ---------- Trang "Tôi": giao diện ---------- */
function viewSettings(){
  setCrumbs([['Trang chủ','#/'],['Tôi']]);
  const sw = (grp, id, o, inner) => '<button type="button" class="sw" data-g="'+grp+'" data-id="'+id+'" aria-pressed="'+(UI.get(grp)===id)+'">'+inner+'<span>'+esc(o.n)+(o.note?' <small>('+esc(o.note)+')</small>':'')+'</span></button>';
  const boards = Object.keys(UI.BOARDS).map(id=>{ const b = UI.BOARDS[id];
    return sw('board', id, b, '<i class="swb"><s style="background:'+b.l+'"></s><s style="background:'+b.d+'"></s><s style="background:'+b.d+'"></s><s style="background:'+b.l+'"></s></i>'); }).join('');
  const pieces = Object.keys(UI.PIECES).map(id=>{ const p = UI.PIECES[id];
    return sw('piece', id, p, '<i class="swp"><u style="background:'+p.w+'"></u><u style="background:'+p.b+'"></u></i>'); }).join('');
  const sizes = Object.keys(UI.SIZES).map(id=>{ const s = UI.SIZES[id];
    return sw('size', id, s, '<i class="sws" style="font-size:'+(0.8*s.v+0.2).toFixed(2)+'rem">A</i>'); }).join('');
  const motion = Object.keys(UI.MOTION).map(id=>sw('motion', id, UI.MOTION[id], '')).join('');
  stage.innerHTML =
    '<section class="card"><h2>Giao diện của bạn</h2>'+
      '<p class="muted">Chọn màu bàn cờ, màu quân và cỡ chữ cho dễ nhìn. Lựa chọn được lưu ngay trên máy này, không cần tài khoản.</p>'+
      '<div class="setprev"><span class="thumb" data-sans="e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6" data-flip="0"></span></div>'+
    '</section>'+
    '<section class="card"><h3>Bàn cờ</h3><div class="swrow" role="group" aria-label="Màu bàn cờ">'+boards+'</div></section>'+
    '<section class="card"><h3>Màu quân</h3><div class="swrow" role="group" aria-label="Màu quân cờ">'+pieces+'</div></section>'+
    '<section class="card"><h3>Cỡ chữ</h3><div class="swrow" role="group" aria-label="Cỡ chữ">'+sizes+'</div></section>'+
    '<section class="card"><h3>Chuyển động</h3><p class="muted small">Tắt hiệu ứng trượt, nảy và pháo giấy nếu bạn thấy chóng mặt hoặc máy chạy chậm.</p><div class="swrow" role="group" aria-label="Chuyển động">'+motion+'</div></section>'+
    '<div class="actions"><button type="button" class="btn ghost" id="uiReset">Về mặc định</button></div>';
  onLeave(mountThumbs(stage));
  stage.querySelectorAll('.sw').forEach(b=>b.addEventListener('click', ()=>{
    UI.set(b.dataset.g, b.dataset.id);
    stage.querySelectorAll('.sw[data-g="'+b.dataset.g+'"]').forEach(x=>x.setAttribute('aria-pressed', String(x===b)));
  }));
  document.getElementById('uiReset').addEventListener('click', ()=>{
    UI.reset(); stage.querySelectorAll('.sw').forEach(x=>x.setAttribute('aria-pressed', String(UI.get(x.dataset.g)===x.dataset.id)));
  });
}
