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
