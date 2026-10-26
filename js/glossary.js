/* Trang Từ điển: #/tu-dien và #/tu-dien/<id>. Dữ liệu ở data/glossary.js.
   Dùng setCrumbs, stage, esc của app.js. Nạp trước js/app.js (app.js gọi route() ở cuối). */

/* Bỏ dấu để gõ "xien" vẫn tìm ra "Xiên". */
function plainText(s){ return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase(); }
const GLOSS_INDEX = GLOSSARY.map(x=>({x:x, key:plainText(x.t+' '+x.en+' '+x.m)}));

/* Gắn nhãn ngắn cho nhóm và cấp ở mỗi mục. */
function glossEntry(x, hot){
  return '<article class="gloss'+(hot?' hot':'')+'" id="g-'+x.id+'"><div class="gloss-head"><h3>'+esc(x.t)+'</h3><span class="pill">Cấp '+x.lv+'</span></div>'+
    '<p class="muted small">'+esc(x.en)+' · '+esc(GLOSSARY_GROUPS[x.g])+'</p>'+
    '<p>'+esc(x.m)+'</p>'+(x.e ? '<p class="gloss-eg"><b>Ví dụ:</b> '+esc(x.e)+'</p>' : '')+'</article>';
}

function viewGlossary(id){
  const focus = id ? GLOSSARY.find(x=>x.id===id) : null;
  setCrumbs(focus ? [['Trang chủ','#/'],['Từ điển','#/tu-dien'],[focus.t]] : [['Trang chủ','#/'],['Từ điển']]);
  let group = focus ? focus.g : '', q = '';
  stage.innerHTML =
    '<section class="card"><h2>Từ điển cờ vua</h2>'+
    '<p class="muted">'+GLOSSARY.length+' từ hay gặp, giải thích bằng lời dễ hiểu. Mỗi từ ghi cấp học mà bạn bắt đầu gặp nó. Gõ không dấu cũng tìm được.</p>'+
    '<input class="search" id="glossQ" type="search" placeholder="Gõ để tìm, ví dụ: ghim, xiên, zugzwang" aria-label="Tìm trong từ điển" autocomplete="off">'+
    '<div class="chips" id="glossChips" role="group" aria-label="Lọc theo nhóm"></div></section>'+
    '<div id="glossList"></div>';
  const qEl = document.getElementById('glossQ'), chipsEl = document.getElementById('glossChips'), listEl = document.getElementById('glossList');
  function draw(){
    const k = plainText(q.trim());
    const rows = GLOSS_INDEX.filter(r=>(!group || r.x.g===group) && (!k || r.key.indexOf(k)>=0));
    chipsEl.innerHTML = '<button class="chip" type="button" data-g=""'+(group?'':' aria-pressed="true" style="border-color:var(--accent)"')+'>Tất cả <small>'+GLOSSARY.length+'</small></button>'+
      Object.keys(GLOSSARY_GROUPS).map(g=>'<button class="chip" type="button" data-g="'+g+'"'+(group===g?' aria-pressed="true" style="border-color:var(--accent)"':'')+'>'+esc(GLOSSARY_GROUPS[g])+' <small>'+GLOSSARY.filter(x=>x.g===g).length+'</small></button>').join('');
    listEl.innerHTML = rows.length
      ? '<section class="card"><div class="glosslist">'+rows.map(r=>glossEntry(r.x, focus && r.x===focus)).join('')+'</div></section>'
      : '<section class="card"><p>Không thấy từ nào khớp. Thử gõ ngắn hơn, hoặc bỏ lọc nhóm.</p></section>';
  }
  qEl.addEventListener('input', ()=>{ q = qEl.value; draw(); });
  chipsEl.addEventListener('click', e=>{ const b = e.target.closest('button[data-g]'); if (!b) return; group = b.getAttribute('data-g'); draw(); });
  draw();
  if (focus){ const el = document.getElementById('g-'+focus.id); if (el) el.scrollIntoView({block:'center'}); }
}
