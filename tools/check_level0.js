/* Kiểm các bài tập của Cấp 0 (data/level0.js): mỗi bài "reach" và "capture" phải giải được,
   và số nước ngắn nhất (tìm bằng duyệt rộng) phải đúng bằng trường best.
   Chạy từ thư mục gốc của kho:  node tools/check_level0.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'js/chess.js'), 'utf8').replace(/window\.Chess=Chess;/, 'globalThis.Chess=Chess;');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(src, ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'data/level0.js'), 'utf8') + ';globalThis.LV0=LV0;globalThis.START_FEN=START_FEN;', ctx);
const Chess = ctx.Chess, LV0 = ctx.LV0;
/* Sau mỗi nước của người chơi, bên kia bị "bỏ qua lượt" (giống chế độ solo của bàn cờ). */
const keep = (c, color) => { const f = c.fen().split(' '); f[1] = color; f[3] = '-'; c.load(f.join(' ')); };
function solve(step) {
  const start = new Chess(step.fen), color = start.turn();
  const seen = new Set([start.fen()]); let frontier = [start.fen()], depth = 0;
  while (frontier.length && depth < 8) {
    depth++; const next = [];
    for (const fen of frontier) {
      const c = new Chess(fen);
      for (const m of c.moves({ verbose: true })) {
        const d = new Chess(fen); d.move(m); const to = m.to;
        if (step.type === 'reach' && to === step.target) return depth;
        keep(d, color);
        if (step.type === 'capture' && !d.board().flat().some(p => p && p.color !== color)) return depth;
        const f = d.fen(); if (!seen.has(f)) { seen.add(f); next.push(f); }
      }
    }
    frontier = next;
  }
  return null;
}
let bad = 0, n = 0;
for (const [id, L] of Object.entries(LV0)) L.steps.forEach((s, i) => {
  if (s.type === 'reach' || s.type === 'capture') {
    n++; const got = solve(s);
    if (got !== s.best) { bad++; console.log('SAI', id, 'bước', i + 1, s.type, 'best =', s.best, 'tìm được =', got); }
  }
  if (s.type === 'tap') s.squares.forEach(q => { if (!/^[a-h][1-8]$/.test(q)) { bad++; console.log('SAI ô', q); } });
  if (s.type === 'quiz' && !(s.correct >= 0 && s.correct < s.opts.length)) { bad++; console.log('SAI quiz', id, i + 1); }
  try { if (s.fen) new Chess(s.fen); } catch (e) { bad++; console.log('FEN lỗi', id, i + 1); }
});
console.log(n + ' bài tập đi quân đã kiểm,', bad ? bad + ' lỗi' : 'không lỗi');
process.exit(bad ? 1 : 0);
