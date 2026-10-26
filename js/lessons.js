/* Danh sách khai cuộc có bài học và cách nạp từng bài khi cần.
   Mỗi bài là một file data/lessons/<id>.js, đặt vào window.LESSONS[id]. Danh sách chung ở window.LESSON_INDEX.
   Caro-Kann là bản mẫu đầu tiên (data/caro-kann.js, định dạng cũ) nên được chuyển sang định dạng chung ngay đây. */
(function(){
  const L = window.LESSONS = window.LESSONS || {};
  if (typeof OP !== 'undefined' && !L['caro-kann']){
    const trap = Object.assign({finish:'Nd6#', by:'w'}, OP.trap);
    L['caro-kann'] = {
      opening: Object.assign({group:'Đáp lại 1.e4', level:1, reviewed:false}, OP.opening),
      variations: OP.variations, trap: trap, traps: [trap],
      puzzles: PUZ.map(p=>p.var==='trap' ? Object.assign({trap_id:OP.trap.id}, p) : p)
    };
  }
  const list = (window.LESSON_INDEX || []).slice();
  if (L['caro-kann']){
    const o = L['caro-kann'].opening;
    const meta = {id:o.id, name_vi:o.name_vi, name_en:o.name_en, eco:o.eco, side:o.side, first_moves:o.first_moves, tagline:o.tagline, group:o.group, level:o.level,
      variations:L['caro-kann'].variations.length, puzzles:L['caro-kann'].puzzles.length, reviewed:false};
    const at = list.findIndex(m=>m.id==='scandinavian');
    list.splice(at>=0 ? at+1 : list.length, 0, meta);
  }
  window.LESSON_LIST = list.sort((a,b)=>a.level-b.level);   // sort ổn định: giữ thứ tự gốc trong cùng mức
})();
function lessonMeta(id){ return window.LESSON_LIST.find(m=>m.id===id) || null; }
function loadLesson(id, cb){
  if (window.LESSONS[id]) return cb(window.LESSONS[id]);
  if (!lessonMeta(id)) return cb(null);
  const s = document.createElement('script'); s.src = 'data/lessons/'+id+'.js';
  s.onload = ()=>cb(window.LESSONS[id] || null); s.onerror = ()=>cb(null);
  document.head.appendChild(s);
}
