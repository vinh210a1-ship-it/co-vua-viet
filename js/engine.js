/* Máy cờ cho phần "Đánh với máy". Chạy ngay trong trình duyệt của học sinh, không cần máy chủ.
   Dùng Stockfish 10 (vendor/stockfish/stockfish.js, GPL-3.0) trong một Web Worker. Nếu worker không chạy được
   (trình duyệt cũ, bị chặn) thì dùng máy dự phòng tự viết: tìm 2 nước theo vật chất, yếu hơn nhưng luôn đi được. */
const ENGINE_LEVELS = [
  {n:1, name:'Bé Tập Sự',  desc:'Hay đi sai và nhường quân. Hợp ván đầu tiên.', skill:0,  depth:1,  rand:0.55, fb:0},
  {n:2, name:'Tập Sự',     desc:'Còn đi sai khá nhiều.',                         skill:1,  depth:1,  rand:0.30, fb:0},
  {n:3, name:'Học Trò',    desc:'Biết ăn quân treo, đôi khi bỏ quên quân mình.',  skill:3,  depth:2,  rand:0.12, fb:1},
  {n:4, name:'Khá',        desc:'Ít khi nhả quân, nhưng chưa biết kế hoạch dài.', skill:6,  depth:3,  rand:0,    fb:1},
  {n:5, name:'Giỏi',       desc:'Nhìn trước vài nước, bắt đầu tính đòn đôi.',     skill:9,  depth:5,  rand:0,    fb:2},
  {n:6, name:'Cao Thủ',    desc:'Chơi chắc, ít để bạn có cơ hội.',                skill:13, depth:8,  rand:0,    fb:2},
  {n:7, name:'Kỳ Thủ',     desc:'Mạnh. Cần chơi thật cẩn thận.',                  skill:17, depth:11, rand:0,    fb:2},
  {n:8, name:'Bậc Thầy',   desc:'Mức cao nhất của máy trên web này.',             skill:20, depth:14, rand:0,    fb:2}
];
const VAL = {p:1, n:3, b:3, r:5, q:9, k:0};

class Engine {
  constructor(){ this.w = null; this.state = 'new'; this.waiters = []; this.skill = null; }
  /* Mở worker. Trả về Promise<true/false>: true nếu Stockfish sẵn sàng. */
  start(){
    if (this.state === 'ready') return Promise.resolve(true);
    if (this.state === 'failed') return Promise.resolve(false);
    if (this.starting) return this.starting;
    this.starting = new Promise(res=>{
      let done = false;
      const fin = ok=>{ if (done) return; done = true; this.state = ok ? 'ready' : 'failed'; res(ok); };
      try {
        const inline = document.getElementById('sf-src');   // bản xem thử gói sẵn mã máy cờ trong trang
        const url = inline ? URL.createObjectURL(new Blob([inline.textContent], {type:'text/javascript'})) : 'vendor/stockfish/stockfish.js';
        this.w = new Worker(url);
        this.w.onerror = ()=>fin(false);
        this.w.onmessage = e=>{
          const t = String(e.data);
          if (t === 'readyok') fin(true);
          const w = this.waiters[0];
          if (w && t.indexOf('bestmove') === 0){ this.waiters.shift(); w(t.split(' ')[1]); }
        };
        this.w.postMessage('uci'); this.w.postMessage('isready');
        setTimeout(()=>fin(false), 20000);
      } catch(e){ fin(false); }
    });
    return this.starting;
  }
  newGame(){ if (this.w) this.w.postMessage('ucinewgame'); this.skill = null; }
  /* Trả về nước đi dạng "e2e4" (hoặc "e7e8q"), hoặc null nếu ván đã hết. */
  async move(game, lv){
    const legal = game.moves({verbose:true});
    if (!legal.length) return null;
    if (Math.random() < lv.rand){ const m = legal[Math.floor(Math.random()*legal.length)]; return m.from + m.to + (m.promotion||''); }
    const ok = await this.start();
    if (ok){
      const uci = await this.ask(game.fen(), lv);
      if (uci && uci !== '(none)' && legal.some(m=>m.from+m.to+(m.promotion||'') === uci)) return uci;
    }
    return fallbackMove(game, lv);
  }
  ask(fen, lv){
    return new Promise(res=>{
      let done = false;
      const fin = v=>{ if (done) return; done = true; clearTimeout(t); res(v); };
      const t = setTimeout(()=>{ const i = this.waiters.indexOf(fin); if (i >= 0) this.waiters.splice(i,1); try { this.w.postMessage('stop'); } catch(e){} fin(null); }, 25000);
      this.waiters.push(fin);
      if (this.skill !== lv.skill){ this.w.postMessage('setoption name Skill Level value '+lv.skill); this.skill = lv.skill; }
      this.w.postMessage('position fen '+fen);
      this.w.postMessage('go depth '+lv.depth+(lv.n >= 7 ? ' movetime 1500' : ''));
    });
  }
  stop(){ if (this.w){ try { this.w.postMessage('stop'); } catch(e){} } }
}
const engine = new Engine();

/* Máy dự phòng: chấm vật chất sau 1 hoặc 2 nước, chọn ngẫu nhiên trong các nước gần tốt nhất. */
function materialOf(g){
  let s = 0;
  for (const row of g.board()) for (const p of row) if (p) s += (p.color==='w'?1:-1) * VAL[p.type];
  return s;
}
function fallbackMove(game, lv){
  const g = new Chess(game.fen()), me = g.turn(), sign = me==='w' ? 1 : -1;
  const ms = g.moves({verbose:true}), scored = [];
  for (const m of ms){
    g.move(m);
    let sc;
    if (g.in_checkmate()) sc = 1000;
    else if (g.in_draw() || g.in_stalemate()) sc = 0;
    else {
      sc = sign * materialOf(g);
      if (lv.fb >= 1){   // trả lời tốt nhất của đối thủ
        let worst = 1e9;
        for (const r of g.moves({verbose:true})){
          g.move(r);
          const v = g.in_checkmate() ? -1000 : sign * materialOf(g);
          if (v < worst) worst = v;
          g.undo();
        }
        sc = worst;
      }
    }
    g.undo(); scored.push({m:m, sc:sc + Math.random()*0.6});
  }
  scored.sort((a,b)=>b.sc - a.sc);
  const pick = scored[Math.floor(Math.random() * Math.min(lv.fb >= 2 ? 1 : 3, scored.length))].m;
  return pick.from + pick.to + (pick.promotion||'');
}
