/* Bàn cờ tương tác: chạm quân để chọn, chạm ô để đi, hoặc kéo thả. Dùng chess.js cho luật cờ. */
const BFILES = 'abcdefgh';
class Board {
  /* opts: fen, flip, interactive, canMove(color), onMove(move), onIllegal(from,to) */
  constructor(host, opts = {}) {
    this.host = host;
    this.flip = !!opts.flip;
    this.interactive = !!opts.interactive;
    this.canMove = opts.canMove || (() => true);
    this.onMove = opts.onMove || null;
    this.onIllegal = opts.onIllegal || null;
    this.locked = false;
    this.intro = !!opts.intro;
    this.game = new Chess(opts.fen || undefined);
    this.sel = null; this.targets = new Map();
    this.last = null; this.hint = null; this.flash = null;
    this.pieces = {};
    this.drag = null;
    host.innerHTML = '<div class="board live" role="application" aria-label="Bàn cờ. Chạm một quân rồi chạm ô muốn đi, hoặc kéo quân."><div class="sqs"></div><div class="pcs"></div><div class="promo" hidden></div></div>';
    this.root = host.firstChild;
    this.root.classList.toggle('act', this.interactive);
    if (!this.interactive) { this.root.setAttribute('role', 'img'); this.root.setAttribute('aria-label', 'Bàn cờ'); }
    this.sqsEl = this.root.querySelector('.sqs');
    this.pcsEl = this.root.querySelector('.pcs');
    this.promoEl = this.root.querySelector('.promo');
    if (opts.mini) this.root.classList.add('mini');
    this.buildSquares();
    this.buildPieces();
    this.paint();
    if (this.intro) {   // quân cờ lần lượt "rơi" vào bàn
      this.root.classList.add('intro');
      setTimeout(() => this.root.classList.remove('intro'), 1200);
    }
    this._down = e => this.pointerDown(e);
    this._move = e => this.pointerMove(e);
    this._up = e => this.pointerUp(e);
    this.root.addEventListener('pointerdown', this._down);
    window.addEventListener('pointermove', this._move);
    window.addEventListener('pointerup', this._up);
    window.addEventListener('pointercancel', this._up);
  }
  destroy() {
    window.removeEventListener('pointermove', this._move);
    window.removeEventListener('pointerup', this._up);
    window.removeEventListener('pointercancel', this._up);
  }
  /* ---- toạ độ ---- */
  xy(sq) {                      // trả về cột, hàng trên màn hình (0..7)
    const f = BFILES.indexOf(sq[0]), r = +sq[1] - 1;
    return this.flip ? [7 - f, r] : [f, 7 - r];
  }
  sqAt(clientX, clientY) {
    const b = this.root.getBoundingClientRect();
    let c = Math.floor((clientX - b.left) / b.width * 8), r = Math.floor((clientY - b.top) / b.height * 8);
    if (c < 0 || c > 7 || r < 0 || r > 7) return null;
    const f = this.flip ? 7 - c : c, rank = this.flip ? r : 7 - r;
    return BFILES[f] + (rank + 1);
  }
  place(el, sq) {
    const [c, r] = this.xy(sq);
    el.style.left = (c * 12.5) + '%'; el.style.top = (r * 12.5) + '%';
  }
  /* ---- vẽ ---- */
  buildSquares() {
    let h = '';
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const file = this.flip ? 7 - c : c, rank = this.flip ? r : 7 - r;
      const name = BFILES[file] + (rank + 1);
      const dark = (file + rank) % 2 === 0;
      h += '<div class="sq ' + (dark ? 'dark' : 'light') + '" data-sq="' + name + '">' +
        (c === 0 ? '<span class="co r">' + (rank + 1) + '</span>' : '') +
        (r === 7 ? '<span class="co f">' + BFILES[file] + '</span>' : '') + '</div>';
    }
    this.sqsEl.innerHTML = h;
    this.sqEls = {};
    this.sqsEl.querySelectorAll('.sq').forEach(e => { this.sqEls[e.dataset.sq] = e; });
  }
  pieceSVG(p) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 45 45'); s.setAttribute('class', 'pc');
    const u = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    u.setAttribute('href', '#' + p.color + p.type.toUpperCase());
    s.appendChild(u); return s;
  }
  buildPieces() {
    this.pcsEl.innerHTML = ''; this.pieces = {};
    for (const row of this.game.board()) for (const p of row) {
      if (!p) continue;
    }
    for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) {
      const p = this.game.get(BFILES[f] + (r + 1));
      if (!p) continue;
      const sq = BFILES[f] + (r + 1);
      const el = this.pieceSVG(p); el.dataset.sq = sq;
      if (this.intro) el.style.animationDelay = (Object.keys(this.pieces).length * 16) + 'ms';
      this.place(el, sq); this.pcsEl.appendChild(el); this.pieces[sq] = el;
    }
  }
  kingInCheck() {
    if (!this.game.in_check()) return null;
    const t = this.game.turn();
    for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) {
      const sq = BFILES[f] + (r + 1), p = this.game.get(sq);
      if (p && p.type === 'k' && p.color === t) return sq;
    }
    return null;
  }
  paint() {
    const chk = this.kingInCheck();
    for (const sq in this.sqEls) {
      const e = this.sqEls[sq]; let cls = 'sq ' + (e.classList.contains('dark') ? 'dark' : 'light');
      if (this.last && (sq === this.last[0] || sq === this.last[1])) cls += ' hl';
      if (this.sel === sq) cls += ' sel';
      if (this.targets.has(sq)) cls += this.game.get(sq) || this.targets.get(sq) === 'ep' ? ' ring' : ' dot';
      if (chk === sq) cls += ' chk';
      if (this.hint && (sq === this.hint[0] || sq === this.hint[1])) cls += ' hint';
      if (this.flash && this.flash[0] === sq) cls += ' ' + this.flash[1];
      e.className = cls;
    }
  }
  setFlash(sq, kind, ms) {
    this.flash = [sq, kind]; this.paint();
    clearTimeout(this._ft);
    this._ft = setTimeout(() => { this.flash = null; this.paint(); }, ms || 700);
  }
  setHint(from, to) { this.hint = from ? [from, to] : null; this.paint(); }
  setLast(from, to) { this.last = from ? [from, to] : null; this.paint(); }
  setFen(fen, opts = {}) {
    this.game = new Chess(fen);
    this.sel = null; this.targets = new Map(); this.hint = null; this.flash = null; this.drag = null;
    this.promoEl.hidden = true;
    this.last = opts.last || null;
    this.buildPieces(); this.paint();
  }
  setFlip(v) {
    this.flip = !!v; this.buildSquares();
    for (const sq in this.pieces) this.place(this.pieces[sq], sq);
    this.paint();
  }
  lock(v) { this.locked = !!v; if (v) { this.sel = null; this.targets = new Map(); this.paint(); } }
  /* ---- chọn và đi ---- */
  select(sq) {
    this.sel = sq; this.targets = new Map();
    if (sq) for (const m of this.game.moves({ square: sq, verbose: true })) this.targets.set(m.to, m.flags.indexOf('e') >= 0 ? 'ep' : 'm');
    this.paint();
  }
  legalFrom(from, to) { return this.game.moves({ square: from, verbose: true }).filter(m => m.to === to); }
  /* Đi một nước đã biết là hợp lệ, có hiệu ứng trượt. promo: 'q','r','b','n' */
  play(from, to, promo, animate = true) {
    const m = this.game.move({ from, to, promotion: promo });
    if (!m) return null;
    this.sel = null; this.targets = new Map(); this.hint = null;
    this.last = [from, to];
    const el = this.pieces[from]; delete this.pieces[from];
    const flags = m.flags;
    let capSq = to;
    if (flags.indexOf('e') >= 0) capSq = to[0] + from[1];
    const cap = this.pieces[capSq];
    if (cap) { delete this.pieces[capSq]; cap.classList.add('gone'); setTimeout(() => cap.remove(), 220); }
    if (el) {
      el.classList.toggle('slide', animate); el.classList.remove('drag'); el.style.zIndex = '';
      this.place(el, to); this.pieces[to] = el; el.dataset.sq = to;
      if (m.promotion) setTimeout(() => { el.querySelector('use').setAttribute('href', '#' + m.color + m.promotion.toUpperCase()); }, animate ? 180 : 0);
    }
    if (flags.indexOf('k') >= 0 || flags.indexOf('q') >= 0) {
      const rank = from[1], k = flags.indexOf('k') >= 0;
      const rf = (k ? 'h' : 'a') + rank, rt = (k ? 'f' : 'd') + rank, re = this.pieces[rf];
      if (re) { delete this.pieces[rf]; re.classList.toggle('slide', animate); this.place(re, rt); this.pieces[rt] = re; re.dataset.sq = rt; }
    }
    this.paint();
    return m;
  }
  /* ---- chạm, kéo thả ---- */
  pointerDown(e) {
    if (!this.interactive || this.locked || !this.promoEl.hidden || e.button > 0) return;
    const sq = this.sqAt(e.clientX, e.clientY); if (!sq) return;
    if (this.sel && this.targets.has(sq)) { this.tryMove(this.sel, sq); return; }
    const p = this.game.get(sq);
    if (p && p.color === this.game.turn() && this.canMove(p.color)) {
      this.select(sq);
      const el = this.pieces[sq];
      this.drag = { sq, el, x: e.clientX, y: e.clientY, on: false, id: e.pointerId };
    } else { this.select(null); }
  }
  pointerMove(e) {
    const d = this.drag; if (!d) return;
    if (!d.on) {
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6) return;
      d.on = true; d.el.classList.remove('slide'); d.el.classList.add('drag');
    }
    const b = this.root.getBoundingClientRect(), w = b.width / 8;
    d.el.style.left = ((e.clientX - b.left - w / 2) / b.width * 100) + '%';
    d.el.style.top = ((e.clientY - b.top - w / 2) / b.height * 100) + '%';
    e.preventDefault();
  }
  pointerUp(e) {
    const d = this.drag; if (!d) return;
    this.drag = null;
    if (!d.on) return;
    const to = this.sqAt(e.clientX, e.clientY);
    d.el.classList.remove('drag');
    if (to && to !== d.sq && this.targets.has(to)) { this.tryMove(d.sq, to, true); }
    else { d.el.classList.add('slide'); this.place(d.el, d.sq); }
  }
  tryMove(from, to, dropped) {
    const cand = this.legalFrom(from, to);
    if (!cand.length) { if (this.onIllegal) this.onIllegal(from, to); return; }
    if (cand[0].promotion) { this.askPromotion(from, to, cand[0].color, dropped); return; }
    const m = this.play(from, to, undefined, !dropped);
    if (m && this.onMove) this.onMove(m);
  }
  askPromotion(from, to, color, dropped) {
    const names = { q: 'Hậu', r: 'Xe', b: 'Tượng', n: 'Mã' };
    this.promoEl.innerHTML = '<div class="promobox"><b>Phong tốt thành:</b><div>' +
      ['q', 'r', 'b', 'n'].map(t => '<button type="button" data-p="' + t + '" aria-label="' + names[t] + '"><svg viewBox="0 0 45 45"><use href="#' + color + t.toUpperCase() + '"/></svg></button>').join('') + '</div></div>';
    this.promoEl.hidden = false; this._promoAt = Date.now();
    this.promoEl.onclick = ev => {
      if (Date.now() - this._promoAt < 450) return;   // bỏ cú click đi kèm lần chạm vừa mở bảng chọn
      const b = ev.target.closest('button');
      if (!b) { this.promoEl.hidden = true; this.setFen(this.game.fen(), { last: this.last }); return; }
      this.promoEl.hidden = true;
      const m = this.play(from, to, b.dataset.p, !dropped);
      if (m && this.onMove) this.onMove(m);
    };
  }
}
