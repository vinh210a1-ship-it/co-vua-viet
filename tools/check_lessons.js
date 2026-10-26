/* Kiểm bài học Cấp 0 đến 5 và bài xếp lớp (data/level0.js ... level5.js, placement.js):
   - mọi thế cờ nạp được, bên không đến lượt không bị chiếu (thế cờ hợp lệ);
   - nước đáp án (answer) hợp lệ, nước mate:true có ít nhất một nước chiếu hết, want có ít nhất một nước đúng kiểu;
   - các nước trong demo đi được liên tiếp; các nước trong wrong là nước hợp lệ;
   - câu hỏi quiz có đáp án trong phạm vi; bài kiểm tra/xếp lớp có from và lv đúng;
   - các thế "mate" (Hậu/Xe chống Vua) được đưa sang tools/check_mates.py để Stockfish xác nhận chiếu hết trong giới hạn nước.
   Chạy từ thư mục gốc của kho:  node tools/check_lessons.js */
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'js/chess.js'), 'utf8').replace(/window\.Chess=Chess;/, 'globalThis.Chess=Chess;');
const ctx = {}; vm.createContext(ctx); vm.runInContext(src, ctx);
const VARS = {level0:'LV0', level1:'LV1', level2:'LV2', level3:'LV3', level4:'LV4', level5:'LV5', placement:'PLACEMENT'};
for (const f of Object.keys(VARS)) {
  const file = path.join(root, 'data/' + f + '.js');
  if (!fs.existsSync(file)) continue;
  vm.runInContext(fs.readFileSync(file, 'utf8') + ';globalThis.' + VARS[f] + '=' + VARS[f] + ';', ctx);
}
const Chess = ctx.Chess;
const BANK = Object.assign({}, ctx.LV0, ctx.LV1, ctx.LV2, ctx.LV3, ctx.LV4, ctx.LV5, {'xep-lop': ctx.PLACEMENT});
const THEMES = fs.readFileSync(path.join(root, 'data/puz/index.js'), 'utf8').match(/"id": "(\w+)"/g).map(s => s.slice(7, -1));
let bad = 0, nfind = 0, nmate = 0;
const fail = (where, msg) => { bad++; console.log('SAI', where, msg); };
const uciOf = m => m.from + m.to + (m.promotion || '');
const kindOf = m => m.captured ? 'capture' : m.piece === 'k' ? 'king' : 'block';
function loadFen(where, fen) {
  const c = new Chess();
  if (!c.load(fen)) { fail(where, 'FEN không nạp được: ' + fen); return null; }
  const f = fen.split(' '); f[1] = f[1] === 'w' ? 'b' : 'w'; f[3] = '-';
  const o = new Chess(); o.load(f.join(' '));
  const kn = fen.split(' ')[0].replace(/[^kK]/g, '').length;
  if (kn === 2 && o.in_check()) fail(where, 'thế cờ không hợp lệ (bên không đến lượt đang bị chiếu): ' + fen);
  return c;
}
const mates = [], finds = [];
for (const [id, L] of Object.entries(BANK)) {
  if (!L.title || !Array.isArray(L.steps) || !L.steps.length) fail(id, 'thiếu title hoặc steps');
  if (!id.startsWith('kiem-tra') && id !== 'xep-lop' && !L.intro) fail(id, 'thiếu intro');
  if (L.test && L.level === undefined) fail(id, 'bài kiểm tra thiếu level');
  L.steps.forEach((s, i) => {
    const w = id + ' bước ' + (i + 1) + ' (' + s.type + ')';
    if ((L.test || L.placement) && !s.from) fail(w, 'thiếu from');
    if (s.from && !BANK[s.from] && s.from !== 'khai-cuoc') fail(w, 'from không có bài: ' + s.from);
    if (L.placement && !(s.lv >= 0 && s.lv <= 3)) fail(w, 'thiếu lv');
    const needFen = ['show', 'demo', 'explore', 'reach', 'capture', 'find', 'mate'].indexOf(s.type) >= 0;
    if (needFen && !s.fen) return fail(w, 'thiếu fen');
    const c = s.fen ? loadFen(w, s.fen) : null;
    if (s.fen && !c) return;
    if (s.type === 'quiz') {
      if (!(s.correct >= 0 && s.correct < s.opts.length) || s.opts.length < 2) fail(w, 'quiz sai đáp án');
      if (!s.why || !s.q) fail(w, 'quiz thiếu why/q');
    }
    if (s.type === 'demo') {
      const d = new Chess(s.fen);
      s.moves.forEach((m, k) => { if (!d.move({from: m.m.slice(0, 2), to: m.m.slice(2, 4), promotion: m.m[4]})) fail(w, 'nước ' + (k + 1) + ' không hợp lệ: ' + m.m); if (!m.t) fail(w, 'nước ' + (k + 1) + ' thiếu lời giải thích'); });
      if (id === 'chieu-het-hau-xe' || id === 'chieu-het-1-2') { if (!d.in_checkmate()) fail(w, 'demo không kết thúc bằng chiếu hết'); }
    }
    if (s.type === 'tap') s.squares.forEach(q => { if (!/^[a-h][1-8]$/.test(q)) fail(w, 'ô sai ' + q); });
    if (s.type === 'find') {
      nfind++;
      const ms = c.moves({verbose: true}), us = ms.map(uciOf);
      if (!ms.length) return fail(w, 'không có nước nào');
      if (s.answer) {
        s.answer.forEach(a => { if (us.indexOf(a) < 0) fail(w, 'answer không hợp lệ: ' + a); });
        finds.push({fen: s.fen, answer: s.answer, wrong: Object.keys(s.wrong || {}), where: w, rule: ['nhap-thanh', 'qua-duong'].indexOf(id) >= 0 || ['nhap-thanh', 'qua-duong'].indexOf(s.from) >= 0});
      } else if (s.mate) {
        const mm = ms.filter(m => { const d = new Chess(s.fen); d.move(m); return d.in_checkmate(); });
        if (!mm.length) fail(w, 'không có nước chiếu hết');
        else finds.push({fen: s.fen, answer: mm.map(uciOf), wrong: Object.keys(s.wrong || {}), where: w, mate: true});
        if (mm.length > 2) console.log('  lưu ý', w, 'có', mm.length, 'nước chiếu hết:', mm.map(m => m.san).join(' '));
        // nước gây bế tắc: báo để biết bẫy có thật
        const st = ms.filter(m => { const d = new Chess(s.fen); d.move(m); return d.in_stalemate(); });
        if (id === 'hoa-co' && !st.length) fail(w, 'bài về bế tắc nhưng không có nước nào gây bế tắc');
      } else if (s.want) {
        if (!c.in_check()) fail(w, 'bài thoát chiếu nhưng Vua không bị chiếu');
        const kinds = {}; ms.forEach(m => kinds[kindOf(m)] = (kinds[kindOf(m)] || 0) + 1);
        if (!kinds[s.want]) fail(w, 'không có nước kiểu ' + s.want + ' (có: ' + JSON.stringify(kinds) + ')');
        if (!L.test && !L.placement && Object.keys(kinds).length > 1 && s.want !== 'king') console.log('  lưu ý', w, 'các kiểu thoát chiếu có:', JSON.stringify(kinds));
      }
      Object.keys(s.wrong || {}).forEach(k => { if (us.indexOf(k) < 0) fail(w, 'wrong không hợp lệ: ' + k); if (s.answer && s.answer.indexOf(k) >= 0) fail(w, 'wrong trùng answer: ' + k); });
      if (!L.test && !L.placement && !s.hint) fail(w, 'thiếu hint');
      if (!s.why) fail(w, 'thiếu why');
    }
    if (s.type === 'mate') {
      nmate++;
      const kings = c.board().flat().filter(p => p && p.type === 'k').length;
      if (kings !== 2) fail(w, 'thế mate cần đủ 2 Vua');
      if (c.in_check() || c.in_checkmate() || c.in_stalemate()) fail(w, 'thế mate bắt đầu đã bị chiếu hoặc kết thúc');
      mates.push({fen: s.fen, max: s.max, where: w});
    }
    if (s.type === 'run') {
      const specs = s.mixed || [{theme: s.theme}];
      specs.forEach(sp => { if (THEMES.indexOf(sp.theme) < 0) fail(w, 'chủ đề không có: ' + sp.theme); });
    }
    if (s.type === 'explore' || s.type === 'reach' || s.type === 'capture') { /* đã kiểm bằng check_level0.js hoặc chỉ cần nạp được */ }
  });
  if (L.take && L.take > L.steps.length) fail(id, 'take lớn hơn số câu');
  if (L.test) {
    const tot = L.take || L.steps.reduce((a, s) => a + (s.type === 'run' ? s.n : 1), 0);
    console.log(id + ': tổng', tot, 'câu, cần', Math.ceil(tot * (L.pass || 0.8)), 'để qua');
    const m = (L.intro || []).join(' ').match(/có (\d+) câu/), m2 = (L.intro || []).join(' ').match(/ít nhất (\d+) câu trong (\d+)/);
    if (m && +m[1] !== tot) fail(id, 'intro ghi ' + m[1] + ' câu nhưng bài có ' + tot);
    if (m2 && (+m2[1] !== Math.ceil(tot * (L.pass || 0.8)) || +m2[2] !== tot)) fail(id, 'intro ghi ngưỡng ' + m2[1] + '/' + m2[2] + ' nhưng cần ' + Math.ceil(tot * (L.pass || 0.8)) + '/' + tot);
  }
}
console.log('Đã kiểm', Object.keys(BANK).length, 'bài, ' + nfind + ' câu tìm nước, ' + nmate + ' thế chiếu hết.');
fs.writeFileSync(path.join(process.env.TMPDIR || '/tmp', 'lessons_check.json'), JSON.stringify({mates: mates, finds: finds}));
if (process.argv.indexOf('--engine') >= 0) {
  try {
    const out = cp.execFileSync('python3', ['-I', path.join(__dirname, 'check_mates.py'), path.join(process.env.TMPDIR || '/tmp', 'lessons_check.json')], {encoding: 'utf8', timeout: 300000});
    process.stdout.write(out); if (/^SAI/m.test(out)) bad++;
  } catch (e) { console.log('Không chạy được Stockfish:', e.message.split('\n')[0]); }
}
console.log(bad ? bad + ' lỗi' : 'Không lỗi');
process.exit(bad ? 1 : 0);
