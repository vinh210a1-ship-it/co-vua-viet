/* Tiến độ học: lưu ngay trên máy của học sinh (localStorage). Không cần tài khoản.
   Nếu trình duyệt không cho lưu thì vẫn chạy bình thường, chỉ là mất khi tải lại trang. */
const Prog = (function(){
  const KEY = 'tvkc:v1';
  let mem = {};
  try { const s = localStorage.getItem(KEY); if (s) mem = JSON.parse(s) || {}; } catch(e){}
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch(e){} }
  const pad = n => String(n).padStart(2,'0');
  function dayKey(d){ d = d || new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
  return {
    get(k, d){ return Object.prototype.hasOwnProperty.call(mem,k) ? mem[k] : d; },
    set(k, v){ mem[k] = v; save(); },
    /* Điểm cao nhất của một bộ câu đố: {pts, n}. */
    best(id){ return mem['quiz:'+id] || null; },
    setBest(id, pts, n){ const b = mem['quiz:'+id]; if (!b || pts > b.pts) { mem['quiz:'+id] = {pts:pts, n:n}; save(); } else if (b.n !== n) { mem['quiz:'+id] = {pts:pts, n:n}; save(); } },
    /* Bài học: true khi đã xong, kèm điểm nếu là bài kiểm tra. */
    lesson(id){ return mem['les:'+id] || null; },
    setLesson(id, info){ mem['les:'+id] = info || {done:true}; save(); },
    dayKey: dayKey,
    /* Cổng qua cấp: {passed, pts, n}. Cấp được tính là đã qua khi bài kiểm tra cuối cấp đạt 80%. */
    level(n){ return mem['lvl:'+n] || null; },
    setLevel(n, info){ mem['lvl:'+n] = info; save(); },
    /* Cấp bắt đầu do bài xếp lớp gợi ý (null nếu chưa làm). */
    placed(){ return Object.prototype.hasOwnProperty.call(mem,'placed') ? mem.placed : null; },
    setPlaced(n){ mem.placed = n; save(); },
    /* Ôn lặp ngắt quãng: mỗi câu có hộp 0 đến 3. Đúng thì lùi lại 3, 7, 21 ngày; sai thì ôn lại ngay hôm sau. */
    reviewResult(key, ok){
      const rev = mem.rev || (mem.rev = {}), today = dayKey(), it = rev[key];
      if (ok && it && it.d > today) return;   // chưa đến hạn thì làm đúng cũng không tính thêm
      const box = ok ? Math.min(3, (it ? it.b : 0) + 1) : 0, gap = ok ? [3, 7, 21][box-1] : 1;
      const d = new Date(); d.setDate(d.getDate() + gap);
      rev[key] = {b:box, d:dayKey(d)}; save();
    },
    reviewDue(limit){
      const rev = mem.rev || {}, today = dayKey();
      return Object.keys(rev).filter(k=>rev[k].d <= today).sort((a,b)=>rev[a].d < rev[b].d ? -1 : 1).slice(0, limit || 10);
    },
    reviewCount(){ return Object.keys(mem.rev || {}).length; },
    /* Câu đố mỗi ngày: ghi lại ngày đã làm xong, tính chuỗi ngày liên tiếp. */
    markDay(){ const k = dayKey(), days = mem.days || []; if (days.indexOf(k) < 0) { days.push(k); mem.days = days.slice(-400); save(); } },
    doneToday(){ return (mem.days || []).indexOf(dayKey()) >= 0; },
    streak(){
      const days = mem.days || []; if (!days.length) return 0;
      const d = new Date(); if (days.indexOf(dayKey(d)) < 0) d.setDate(d.getDate()-1);
      let n = 0; while (days.indexOf(dayKey(d)) >= 0) { n++; d.setDate(d.getDate()-1); }
      return n;
    }
  };
})();
