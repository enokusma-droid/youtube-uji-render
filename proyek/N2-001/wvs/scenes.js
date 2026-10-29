// FILE HASIL RAKIT (jangan diedit). Sumber: pustaka/wvs/gambar.js + templat.js + adegan.js
// ===== gambar.js =====
// Pustaka gambar whiteboard-video-skill (faceless-wb-ci).
// G.* = pembangun path murni (mengembalikan string path "d", atau objek berisi beberapa string path).
// D.* = penggambar siap pakai: langsung memanggil P()/T() dengan warna + pembagian waktu standar.
// Dipakai lewat rakit.js: scenes.js = gambar.js + templat.js + adegan.js proyek. Lihat README.md.
// Satuan: papan 1920x1080. Semua ukuran bisa diskalakan lewat parameter s / r / w.
var G = {}, D = {};
(function () {
  const rad = a => a * Math.PI / 180;
  // pembangun path halus (tanpa jitter) dengan transformasi titik X(px, py)
  function pb(X) {
    let d = '';
    const p = (px, py) => { const q = X(px, py); return `${f(q[0])} ${f(q[1])}`; };
    const o = {
      m(x, y) { d += `M ${p(x, y)} `; return o; },
      l(x, y) { d += `L ${p(x, y)} `; return o; },
      q(cx, cy, x, y) { d += `Q ${p(cx, cy)} ${p(x, y)} `; return o; },
      c(c1x, c1y, c2x, c2y, x, y) { d += `C ${p(c1x, c1y)} ${p(c2x, c2y)} ${p(x, y)} `; return o; },
      z() { d += 'Z '; return o; },
      s() { return d; },
    };
    return o;
  }
  const tf = (x, y, s, dir = 1) => (px, py) => [x + dir * px * s, y + py * s];
  const pts = (X, arr) => arr.map(a => X(a[0], a[1]));

  // ukur lebar teks Caveat (font sudah dimuat engine sebelum adegan dibangun)
  let cv = null;
  G.lebarTeks = (s, size, weight = 700) => {
    cv = cv || document.createElement('canvas').getContext('2d');
    cv.font = `${weight} ${size}px ${FONT}`;
    return cv.measureText(s).width;
  };
  // perkecil ukuran huruf sampai teks muat di lebar maks
  G.pasUkuran = (s, size, maks) => { let z = size; while (z > 30 && G.lebarTeks(s, z) > maks) z -= 2; return z; };

  // ================= TOKOH WANITA =================
  // x,y = titik kaki (lantai). s=1 tinggi ±380 px. pose: berdiri | menunjuk | berpikir | senang | pegangHp | dadah
  // arah: 1 = menghadap/menunjuk ke kanan, -1 = ke kiri.
  G.wanita = (x, y, s = 1, pose = 'berdiri', arah = 1) => {
    const X = tf(x, y, s, arah), b = pb(X);
    const hx = X(0, -300), r = 38 * s;
    const kepala = circ(hx[0], hx[1], r, r * 1.04);
    // rambut bob sebahu + poni (bentuk tertutup, diisi gelap)
    const rambut = pb(X).m(-50, -248).q(-56, -280, -48, -308).q(-36, -352, 0, -350).q(38, -352, 50, -312)
      .q(58, -280, 52, -248).q(44, -242, 36, -252).q(40, -290, 30, -312).q(6, -300, -24, -322)
      .q(-34, -300, -36, -270).q(-38, -254, -42, -246).q(-46, -244, -50, -248).z().s();
    // wajah
    let wajah = '', mata = '';
    const ey = pose === 'berpikir' ? -296 : -292, ex = pose === 'berpikir' ? 4 : 0;
    for (const sx of [-13, 13]) { const e = X(sx + ex, ey); mata += circ(e[0], e[1], 3.4 * s, 3.4 * s, 0, 365, 0); }
    if (pose === 'senang') wajah += pb(X).m(-15, -280).q(0, -262, 15, -280).q(0, -274, -15, -280).s();
    else if (pose === 'berpikir') wajah += pb(X).m(-6, -274).l(10, -276).s() + pb(X).m(-20, -308).q(-13, -312, -6, -308).s();
    else wajah += pb(X).m(-12, -279).q(0, -268, 12, -279).s();
    // pipi merona tipis (garis kecil) untuk senang
    if (pose === 'senang') wajah += pb(X).m(-28, -284).l(-22, -282).s() + pb(X).m(22, -282).l(28, -284).s();
    const leher = pb(X).m(-6, -262).l(-7, -248).s() + pb(X).m(6, -262).l(7, -248).s();
    // baju: blus + rok A-line (satu bentuk), kerah V
    const baju = poly(pts(X, [[-34, -248], [34, -248], [44, -200], [28, -165], [66, -62], [-66, -62], [-28, -165], [-44, -200]]), true, 1);
    const detail = pb(X).m(-12, -248).l(0, -228).l(12, -248).s() + pb(X).m(-28, -165).q(0, -158, 28, -165).s();
    // kaki + sepatu
    let kaki = pb(X).m(-22, -62).l(-24, -8).l(-42, -4).s() + pb(X).m(22, -62).l(24, -8).l(42, -4).s();
    // lengan (bahu di +-38,-240), tangan = lingkaran kecil
    let lengan = '', tangan = [];
    const L = (a) => { lengan += pb(X).m(a[0][0], a[0][1]).q(a[1][0], a[1][1], a[2][0], a[2][1]).s(); tangan.push(a[2]); };
    if (pose === 'menunjuk') {
      L([[38, -240], [100, -262], [150, -298]]);
      L([[-38, -240], [-74, -196], [-34, -168]]);
      lengan += pb(X).m(158, -304).l(182, -322).s();
    } else if (pose === 'berpikir') {
      L([[36, -236], [80, -170], [22, -262]]);
      L([[-36, -236], [-52, -190], [40, -192]]);
    } else if (pose === 'senang') {
      L([[38, -240], [78, -290], [96, -362]]);
      L([[-38, -240], [-78, -290], [-96, -362]]);
    } else if (pose === 'pegangHp') {
      L([[38, -240], [62, -180], [20, -206]]);
      L([[-38, -240], [-60, -190], [-50, -130]]);
    } else if (pose === 'dadah') {
      L([[38, -240], [96, -240], [112, -318]]);
      L([[-38, -240], [-60, -190], [-50, -130]]);
    } else {
      L([[38, -240], [62, -190], [58, -130]]);
      L([[-38, -240], [-62, -190], [-58, -130]]);
    }
    let tg = '';
    for (const t of tangan) { const q = X(t[0], t[1]); tg += circ(q[0], q[1], 7 * s); }
    let hp = '';
    if (pose === 'pegangHp') { const q = X(4, -238); hp = rect(q[0] - 14 * s, q[1], 28 * s, 46 * s, 1); }
    return { kepala, rambut, wajah, mata, leher, baju, detail, kaki, lengan, tangan: tg, hp, tinggi: 380 * s,
      ujungTangan: pose === 'menunjuk' ? X(182, -322) : null, kepalaAt: hx };
  };
  D.wanita = (x, y, s, pose, at, dur = .9, o = {}) => {
    const w = G.wanita(x, y, s, pose, o.arah || 1), k = dur / 9, lw = Math.max(3, 6 * s);
    P(w.kepala, at, k * 1.2, { w: lw });
    P(w.rambut, at + k * 1.2, k * 1.6, { w: lw * .8, fill: o.rambut || INK, fillOp: .85 });
    P(w.mata + w.wajah, at + k * 2.8, k * .8, { w: Math.max(2.5, 4 * s), fill: INK, fillOp: .9 });
    P(w.leher + w.baju, at + k * 3.6, k * 1.8, { w: lw, c: o.garis || INK, fill: o.baju || BLUE, fillOp: o.bajuOp ?? .35 });
    P(w.detail, at + k * 5.4, k * .5, { w: Math.max(2.5, 4 * s) });
    P(w.lengan + w.hp, at + k * 5.9, k * 1.5, { w: lw });
    P(w.tangan, at + k * 7.4, k * .3, { w: Math.max(2.5, 4 * s), fill: INK, fillOp: .9 });
    P(w.kaki, at + k * 7.7, k * 1.3, { w: lw });
    return w;
  };

  // orang sederhana (ikon kerumunan) - x,y = pusat badan
  G.orang = (x, y, s = 1) => icon.person(x, y, s);
  G.kerumunan = (x, y, n = 5, jarak = 80, s = .55) => { let d = ''; for (let i = 0; i < n; i++) d += icon.person(x + i * jarak, y + (i % 2) * 18 * s, s); return d; };

  // ================= PERANGKAT =================
  // laptop: x,y = kiri atas layar, w = lebar layar (tinggi layar = .62w)
  G.laptop = (x, y, w) => {
    const h = w * .62;
    return { bingkai: rect(x, y, w, h, 2) + rect(x + 16, y + 16, w - 32, h - 32, 1.2),
      alas: poly([[x - w * .08, y + h + 8], [x + w * 1.08, y + h + 8], [x + w * 1.15, y + h + w * .09], [x - w * .15, y + h + w * .09]], true, 1.5) +
        line(x + w * .4, y + h + w * .05, x + w * .6, y + h + w * .05, 1),
      layar: { x: x + 16, y: y + 16, w: w - 32, h: h - 32 }, h };
  };
  // isi layar: halaman web sederhana (header, hero, baris teks, tombol)
  G.web = (x, y, w, h) => {
    const hb = h * .14;
    let d = line(x, y + hb, x + w, y + hb, 1) + circ(x + hb * .5, y + hb * .5, hb * .22) + line(x + w * .62, y + hb * .5, x + w * .92, y + hb * .5, 1);
    d += rect(x + w * .05, y + hb + h * .08, w * .42, h * .55, 1.2) + line(x + w * .05, y + hb + h * .63, x + w * .47, y + hb + h * .08, 1);
    for (let i = 0; i < 3; i++) d += line(x + w * .55, y + hb + h * (.12 + i * .13), x + w * (.93 - (i % 2) * .12), y + hb + h * (.12 + i * .13), 1);
    d += rect(x + w * .55, y + hb + h * .52, w * .26, h * .14, 1);
    return d;
  };
  // HP: cx,cy pusat, h tinggi (lebar .52h)
  G.hp = (cx, cy, h) => {
    const w = h * .52, x = cx - w / 2, y = cy - h / 2;
    return { bingkai: rect(x, y, w, h, 1.5) + line(cx - w * .14, y + h * .05, cx + w * .14, y + h * .05, 1) + circ(cx, y + h * .955, h * .022),
      layar: { x: x + w * .09, y: y + h * .1, w: w * .82, h: h * .8 } };
  };
  // isi layar HP: feed media sosial (foto + hati + teks)
  G.feed = (L) => {
    const { x, y, w, h } = L;
    let d = rect(x + w * .08, y + h * .06, w * .84, h * .42, 1) + line(x + w * .08, y + h * .48, x + w * .92, y + h * .06, 1);
    d += line(x + w * .08, y + h * .6, x + w * .8, y + h * .6, 1) + line(x + w * .08, y + h * .7, x + w * .6, y + h * .7, 1);
    d += rect(x + w * .08, y + h * .8, w * .84, h * .14, 1);
    return d;
  };
  // isi layar HP: obrolan (dua balon kiri, satu kanan)
  G.obrolan = (L) => {
    const { x, y, w, h } = L;
    return rect(x + w * .06, y + h * .08, w * .6, h * .16, 1) + rect(x + w * .34, y + h * .32, w * .6, h * .16, 1) + rect(x + w * .06, y + h * .56, w * .7, h * .16, 1);
  };
  // kolom pencarian
  G.kolomCari = (x, y, w, h) => {
    const r = h * .22, cx = x + h * .5, cy = y + h * .47;
    return rect(x, y, w, h, 2) + circ(cx, cy, r) + line(cx + r * .7, cy + r * .7, cx + r * 1.6, cy + r * 1.6, 1);
  };
  // jendela browser
  G.browser = (x, y, w, h) => rect(x, y, w, h, 2) + line(x, y + 50, x + w, y + 50, 1) + circ(x + 28, y + 25, 8) + circ(x + 54, y + 25, 8) + circ(x + 80, y + 25, 8) + rect(x + 110, y + 12, w - 140, 26, 1);

  // ================= LOGO =================
  // Google "G" 4 warna: kembalikan potongan busur, gambar dengan D.google
  G.google = (cx, cy, r) => ({
    merah: arc(cx, cy, r, -40, -145), kuning: arc(cx, cy, r, -145, -215), hijau: arc(cx, cy, r, -215, -320),
    biru: arc(cx, cy, r, -320, -360) + line(cx + r, cy, cx + r * .1, cy, 1),
  });
  D.google = (cx, cy, r, at, dur = .7, o = {}) => {
    const g = G.google(cx, cy, r), k = dur / 4, w = Math.max(6, r * .3);
    P(g.merah, at, k, { c: RED, w }); P(g.kuning, at + k, k, { c: GOLD, w }); P(g.hijau, at + 2 * k, k, { c: GREEN, w }); P(g.biru, at + 3 * k, k, { c: BLUE, w });
    if (o.teks) T('Google', cx, cy + r * 1.9 + 20, o.ukuran || r * .75, at + dur, .4, { c: BLUE });
  };
  // WhatsApp: balon bulat dengan ekor + gagang telepon
  G.whatsapp = (cx, cy, r) => {
    const t0 = [cx + r * Math.cos(rad(148)), cy + r * Math.sin(rad(148))];
    const balon = arc(cx, cy, r, 148, 482) + `L ${f(cx - r * .98)} ${f(cy + r * .98)} L ${f(t0[0])} ${f(t0[1])} `;
    const X = tf(cx, cy, r / 100);
    const gagang = pb(X).m(-38, -44).q(-30, -54, -22, -46).l(-12, -26).q(-10, -18, -18, -12).q(-10, 10, 14, 22)
      .q(20, 14, 28, 16).l(46, 28).q(52, 34, 44, 44).q(30, 56, 4, 44).q(-28, 26, -44, -8).q(-50, -30, -38, -44).z().s();
    return { balon, gagang };
  };
  D.whatsapp = (cx, cy, r, at, dur = .5) => {
    const g = G.whatsapp(cx, cy, r);
    P(g.balon, at, dur * .6, { c: GREEN, w: Math.max(5, r * .1), fill: GREEN, fillOp: .15 });
    P(g.gagang, at + dur * .6, dur * .4, { c: GREEN, w: Math.max(3, r * .06), fill: GREEN, fillOp: .8 });
  };
  // Instagram, TikTok, YouTube, Facebook, LinkedIn (bentuk generik)
  G.logoIG = (cx, cy, r) => rect(cx - r, cy - r, 2 * r, 2 * r, 2) + circ(cx, cy, r * .45) + circ(cx + r * .55, cy - r * .55, r * .08);
  G.logoTikTok = (cx, cy, r) => line(cx + r * .1, cy - r, cx + r * .1, cy + r * .45, 1) + circ(cx - r * .25, cy + r * .5, r * .36) +
    pb(tf(cx, cy, r / 100)).m(10, -100).q(20, -50, 70, -45).s();
  G.logoYT = (cx, cy, r) => rect(cx - r * 1.3, cy - r * .85, r * 2.6, r * 1.7, 2) + poly([[cx - r * .35, cy - r * .45], [cx + r * .5, cy], [cx - r * .35, cy + r * .45]], true, 1);
  G.kotakLogo = (cx, cy, r) => rect(cx - r, cy - r, 2 * r, 2 * r, 2);
  D.platform = (nama, cx, cy, r, at, dur = .5) => {
    if (nama === 'ig') P(G.logoIG(cx, cy, r), at, dur, { c: RED, fill: RED, fillOp: .1 });
    else if (nama === 'tiktok') P(G.logoTikTok(cx, cy, r), at, dur, { c: INK, w: Math.max(6, r * .14), fill: INK, fillOp: .7 });
    else if (nama === 'yt') P(G.logoYT(cx, cy, r), at, dur, { c: RED, fill: RED, fillOp: .3 });
    else if (nama === 'fb') { P(G.kotakLogo(cx, cy, r), at, dur * .6, { c: BLUE, fill: BLUE, fillOp: .15 }); T('f', cx + r * .1, cy + r * .6, r * 1.6, at + dur * .6, dur * .4, { c: BLUE }); }
    else if (nama === 'in') { P(G.kotakLogo(cx, cy, r), at, dur * .6, { c: BLUE, fill: BLUE, fillOp: .15 }); T('in', cx, cy + r * .45, r * 1.3, at + dur * .6, dur * .4, { c: BLUE }); }
  };

  // ================= GRAFIK =================
  // x,y = kiri atas area, w,h ukuran. jenis: naik | turun | datar | lonjakan | naikPelan
  G.grafik = (x, y, w, h, jenis = 'naik') => {
    const sumbu = poly([[x, y], [x, y + h], [x + w, y + h]], false, 1);
    const Y = { naik: [.85, .7, .75, .5, .4, .15], turun: [.15, .3, .25, .5, .6, .85], datar: [.8, .78, .82, .79, .81, .8],
      lonjakan: [.85, .84, .1, .82, .86, .86], naikPelan: [.88, .82, .74, .6, .42, .18] }[jenis];
    const ps = Y.map((v, i) => [x + w * (.06 + i * .17), y + h * v]);
    const garis = poly(ps, false, 1.5) + (jenis === 'naik' || jenis === 'turun' || jenis === 'naikPelan' ? head(ps[4][0], ps[4][1], ps[5][0], ps[5][1], Math.max(20, w * .06)) : '');
    return { sumbu, garis, ujung: ps[5] };
  };
  D.grafik = (x, y, w, h, jenis, at, dur = .7, o = {}) => {
    const g = G.grafik(x, y, w, h, jenis);
    P(g.sumbu, at, dur * .3);
    P(g.garis, at + dur * .3, dur * .7, { c: o.c || (jenis === 'turun' || jenis === 'datar' ? RED : GREEN), w: o.w || 9 });
    return g;
  };
  // diagram batang: { sumbu, batang } supaya isi warna hanya di batang
  G.batang = (x, yDasar, nilai, bw = 60, gap = 26, hmax = 260) => {
    const m = Math.max(...nilai); let batang = '';
    nilai.forEach((v, i) => { const h = v / m * hmax; batang += rect(x + gap + i * (bw + gap), yDasar - h, bw, h, 1.5); });
    return { sumbu: poly([[x, yDasar - hmax - 30], [x, yDasar], [x + nilai.length * (bw + gap) + gap, yDasar]], false, 1), batang };
  };
  D.batang = (x, yDasar, nilai, at, dur = .6, o = {}) => {
    const g = G.batang(x, yDasar, nilai, o.bw || 60, o.gap || 26, o.hmax || 260);
    P(g.sumbu, at, dur * .3); P(g.batang, at + dur * .3, dur * .7, { c: o.c || BLUE, fill: o.c || BLUE, fillOp: .25 });
  };
  // pengukur kecepatan setengah lingkaran
  G.gauge = (cx, cy, r) => {
    let d = arc(cx, cy, r, 180, 360) + line(cx - r, cy, cx + r, cy, 1.5);
    for (let i = 0; i <= 6; i++) { const a = Math.PI + i * Math.PI / 6; d += line(cx + r * .82 * Math.cos(a), cy + r * .82 * Math.sin(a), cx + r * .97 * Math.cos(a), cy + r * .97 * Math.sin(a), 1); }
    return d;
  };

  // ================= KALENDER, JAM, CHECKLIST =================
  // kalender: x,y kiri atas, w,h. kolom 7 x baris 4
  G.kalender = (x, y, w, h, kol = 7, bar = 4) => {
    const hh = h * .2;
    let bingkai = rect(x, y, w, h, 2) + line(x, y + hh, x + w, y + hh, 1);
    for (const k of [.25, .75]) bingkai += line(x + w * k, y - 18, x + w * k, y + 16, 1);
    let grid = '';
    for (let i = 1; i < kol; i++) grid += line(x + w * i / kol, y + hh, x + w * i / kol, y + h, .6);
    for (let j = 1; j < bar; j++) grid += line(x, y + hh + (h - hh) * j / bar, x + w, y + hh + (h - hh) * j / bar, .6);
    return { bingkai, grid, header: { x: x + w / 2, y: y + hh / 2 } };
  };
  G.selKalender = (x, y, w, h, c, r, kol = 7, bar = 4) => {
    const hh = h * .2, cw = w / kol, ch = (h - hh) / bar;
    return { x: x + cw * (c + .5), y: y + hh + ch * (r + .5), w: cw, h: ch };
  };
  D.kalender = (x, y, w, h, at, dur = .7, o = {}) => {
    const k = G.kalender(x, y, w, h, o.kol || 7, o.bar || 4);
    P(k.bingkai, at, dur * .55, { c: o.c || INK, fill: o.c || RED, fillOp: 0 });
    P(k.grid, at + dur * .55, dur * .45, { w: 3, c: GRAY });
    if (o.judul) T(o.judul, k.header.x, k.header.y + h * .07, Math.min(h * .14, 48), at + dur, .3, { c: o.c || RED });
    return k;
  };
  G.jam = (cx, cy, r) => {
    let d = circ(cx, cy, r);
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; d += line(cx + r * .82 * Math.cos(a), cy + r * .82 * Math.sin(a), cx + r * .93 * Math.cos(a), cy + r * .93 * Math.sin(a), .5); }
    return d + line(cx, cy, cx, cy - r * .62, 1) + line(cx, cy, cx + r * .45, cy + r * .2, 1);
  };
  G.kotakCentang = (x, y, sz) => rect(x, y, sz, sz, 1.5);
  G.centang = (x, y, sz) => poly([[x + sz * .18, y + sz * .52], [x + sz * .42, y + sz * .8], [x + sz * .9, y + sz * .1]], false, 1);
  G.silang = (cx, cy, r) => line(cx - r, cy - r, cx + r, cy + r, 2) + line(cx + r, cy - r, cx - r, cy + r, 2);
  G.tabel = (x, y, w, h, kol = 4, bar = 5) => {
    let d = rect(x, y, w, h, 1.5);
    for (let i = 1; i < kol; i++) d += line(x + w * i / kol, y, x + w * i / kol, y + h, .6);
    for (let j = 1; j < bar; j++) d += line(x, y + h * j / bar, x + w, y + h * j / bar, .6);
    return d;
  };

  // ================= TARGET, KACA PEMBESAR, ROBOT =================
  G.target = (cx, cy, r) => circ(cx, cy, r) + circ(cx, cy, r * .66, r * .66, -90, 365, .015) + circ(cx, cy, r * .3, r * .3, -90, 365, .01);
  G.dart = (x1, y1, x2, y2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a);
    let d = line(x1, y1, x2, y2, 1) + head(x1, y1, x2, y2, 30);
    for (const k of [0, 20]) { const bx = x1 + c * k, by = y1 + s * k; d += line(bx, by, bx - c * 24 - s * 20, by - s * 24 + c * 20, 1) + line(bx, by, bx - c * 24 + s * 20, by - s * 24 - c * 20, 1); }
    return d;
  };
  D.target = (cx, cy, r, at, dur = .7, o = {}) => {
    P(circ(cx, cy, r), at, dur * .3, { c: o.c || RED, fill: o.c || RED, fillOp: .08 });
    P(circ(cx, cy, r * .66, r * .66, -90, 365, .015), at + dur * .3, dur * .2, { c: o.c || RED });
    P(circ(cx, cy, r * .3, r * .3, -90, 365, .01), at + dur * .5, dur * .2, { c: o.c || RED, fill: o.c || RED, fillOp: .5 });
    if (o.dart) P(G.dart(cx + r * 1.4, cy - r * 1.1, cx + 4, cy - 4), at + dur * .75, dur * .25, { w: 6 });
  };
  G.kacaPembesar = (cx, cy, r) => {
    const a = Math.PI / 4;
    return { lensa: circ(cx, cy, r) + circ(cx, cy, r * .84, r * .84, -90, 365, .01),
      gagang: line(cx + r * 1.05 * Math.cos(a), cy + r * 1.05 * Math.sin(a), cx + r * 1.85 * Math.cos(a), cy + r * 1.85 * Math.sin(a), 1) };
  };
  D.kacaPembesar = (cx, cy, r, at, dur = .5, o = {}) => {
    const k = G.kacaPembesar(cx, cy, r);
    P(k.lensa, at, dur * .7, { c: o.c || BLUE, w: Math.max(5, r * .06), fill: o.c || BLUE, fillOp: .06 });
    P(k.gagang, at + dur * .7, dur * .3, { c: INK, w: Math.max(10, r * .15) });
  };
  // robot laba-laba Google (perayap)
  G.spider = (cx, cy, s = 1) => {
    let d = circ(cx, cy, 70 * s, 55 * s) + circ(cx, cy - 85 * s, 40 * s);
    for (const side of [-1, 1]) for (let i = 0; i < 4; i++) {
      const y0 = cy - 30 * s + i * 22 * s;
      d += poly([[cx + side * 60 * s, y0], [cx + side * 120 * s, y0 - 45 * s + i * 12 * s], [cx + side * 160 * s, y0 + 30 * s + i * 14 * s]], false, 1);
    }
    d += circ(cx - 14 * s, cy - 90 * s, 7 * s) + circ(cx + 14 * s, cy - 90 * s, 7 * s);
    return d + line(cx, cy - 125 * s, cx, cy - 155 * s, 1) + circ(cx, cy - 162 * s, 8 * s);
  };

  // ================= PESAN, PEMASARAN =================
  G.email = (cx, cy, w) => {
    const h = w * .64, x = cx - w / 2, y = cy - h / 2;
    return rect(x, y, w, h, 1.5) + poly([[x + 4, y + 6], [cx, cy + h * .12], [x + w - 4, y + 6]], false, 1);
  };
  G.megafon = (cx, cy, s = 1) => {
    const X = tf(cx, cy, s);
    const badan = poly(pts(X, [[-70, -32], [60, -92], [60, 92], [-70, 32]]), true, 1.5) + circ(X(60, 0)[0], X(60, 0)[1], 22 * s, 92 * s) +
      rect(X(-104, -26)[0], X(-104, -26)[1], 34 * s, 52 * s, 1) + poly(pts(X, [[-40, 22], [-30, 92], [0, 92], [-8, 10]]), false, 1);
    const gelombang = arc(X(80, 0)[0], X(80, 0)[1], 60 * s, -35, 35) + arc(X(80, 0)[0], X(80, 0)[1], 100 * s, -35, 35) + arc(X(80, 0)[0], X(80, 0)[1], 140 * s, -35, 35);
    return { badan, gelombang };
  };
  D.megafon = (cx, cy, s, at, dur = .7, o = {}) => {
    const m = G.megafon(cx, cy, s);
    P(m.badan, at, dur * .65, { c: o.c || RED, fill: o.c || RED, fillOp: .2 });
    P(m.gelombang, at + dur * .65, dur * .35, { c: o.c2 || GOLD, w: 6 });
  };
  // balon kata: x,y kiri atas, ekor: kiri | kanan | bawah | bawahKanan
  G.balon = (x, y, w, h, ekor = 'kiri') => {
    let d = rect(x, y, w, h, 2);
    if (ekor === 'kiri') d += poly([[x + 24, y + h], [x + 8, y + h + 40], [x + 64, y + h]], false, 1);
    else if (ekor === 'kanan') d += poly([[x + w - 64, y + h], [x + w - 8, y + h + 40], [x + w - 24, y + h]], false, 1);
    else if (ekor === 'bawah') d += poly([[x + w / 2 - 22, y + h], [x + w / 2, y + h + 40], [x + w / 2 + 22, y + h]], false, 1);
    else if (ekor === 'kiriSamping') d += poly([[x, y + h * .35], [x - 40, y + h * .6], [x, y + h * .65]], false, 1);
    return d;
  };
  G.awanPikir = (cx, cy, rx, ry, ex, ey) => circ(cx, cy, rx, ry) + circ(ex + (cx - ex) * .45, ey + (cy - ey) * .45, 14) + circ(ex + (cx - ex) * .2, ey + (cy - ey) * .2, 8);
  G.hati = (cx, cy, r) => pb(tf(cx, cy, r / 100)).m(0, 90).c(-40, 50, -100, 20, -100, -30).c(-100, -80, -30, -90, 0, -45).c(30, -90, 100, -80, 100, -30).c(100, 20, 40, 50, 0, 90).s();
  G.bintang = (cx, cy, r) => { const p = []; for (let i = 0; i < 10; i++) { const a = rad(-90 + i * 36), rr = i % 2 ? r * .45 : r; p.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); } return poly(p, true, .8); };
  D.bintang = (cx, cy, r, n, gap, at, dur = .6) => { let d = ''; for (let i = 0; i < n; i++) d += G.bintang(cx + (i - (n - 1) / 2) * gap, cy, r); P(d, at, dur, { c: GOLD, fill: GOLD, fillOp: .5, w: 5 }); };
  G.perisai = (cx, cy, r) => pb(tf(cx, cy, r / 100)).m(0, -100).q(50, -70, 90, -75).q(95, 40, 0, 100).q(-95, 40, -90, -75).q(-50, -70, 0, -100).z().s();
  G.lampu = (cx, cy, r) => {
    let d = circ(cx, cy, r, r, 125, 290) + line(cx - r * .45, cy + r * .85, cx - r * .4, cy + r * 1.3, 1) + line(cx + r * .45, cy + r * .85, cx + r * .4, cy + r * 1.3, 1) +
      line(cx - r * .42, cy + r * 1.1, cx + r * .42, cy + r * 1.1, 1) + line(cx - r * .38, cy + r * 1.3, cx + r * .38, cy + r * 1.3, 1);
    for (const a of [-150, -115, -90, -65, -30]) d += line(cx + r * 1.25 * Math.cos(rad(a)), cy + r * 1.25 * Math.sin(rad(a)), cx + r * 1.55 * Math.cos(rad(a)), cy + r * 1.55 * Math.sin(rad(a)), .5);
    return d;
  };
  G.kamera = (cx, cy, w) => { const h = w * .62, x = cx - w / 2, y = cy - h / 2;
    return rect(x, y, w, h, 1.5) + rect(x + w * .3, y - h * .18, w * .4, h * .18, 1) + circ(cx, cy + h * .04, h * .3) + circ(cx, cy + h * .04, h * .14) + circ(x + w * .13, y + h * .17, h * .05); };
  G.hadiah = (cx, cy, w) => { const h = w * .75, x = cx - w / 2, y = cy - h / 2 + w * .12;
    return rect(x, y, w, h, 1.5) + rect(x - w * .06, y - w * .2, w * 1.12, w * .2, 1.5) + line(cx, y - w * .2, cx, y + h, 1) +
      pb(tf(cx, y - w * .2, w / 100)).m(0, 0).q(-40, -45, -28, -10).q(-20, 5, 0, 0).q(20, 5, 28, -10).q(40, -45, 0, 0).s(); };
  G.dokumen = (x, y, w, h, baris = 4) => {
    const k = Math.min(w, h) * .2;
    let d = poly([[x, y], [x + w - k, y], [x + w, y + k], [x + w, y + h], [x, y + h]], true, 1.5) + poly([[x + w - k, y], [x + w - k, y + k], [x + w, y + k]], false, 1);
    for (let i = 0; i < baris; i++) d += line(x + w * .14, y + k + 20 + i * (h - k - 40) / Math.max(1, baris - 1) * .9, x + w * (i % 2 ? .7 : .84), y + k + 20 + i * (h - k - 40) / Math.max(1, baris - 1) * .9, 1);
    return d;
  };
  G.corong = (cx, cy, w) => poly([[cx - w / 2, cy - w * .4], [cx + w / 2, cy - w * .4], [cx + w * .1, cy + w * .15], [cx + w * .1, cy + w * .45], [cx - w * .1, cy + w * .55], [cx - w * .1, cy + w * .15]], true, 1.5) +
    circ(cx, cy - w * .4, w / 2, w * .1, 0, 365, .01);
  // siklus: 3 busur panah melingkar (sistem berjalan terus)
  G.siklus = (cx, cy, r) => { let d = ''; for (let i = 0; i < 3; i++) { const a0 = -80 + i * 120, a1 = a0 + 95; d += arc(cx, cy, r, a0, a1);
    const p1 = [cx + r * Math.cos(rad(a1 - 6)), cy + r * Math.sin(rad(a1 - 6))], p2 = [cx + r * Math.cos(rad(a1)), cy + r * Math.sin(rad(a1))]; d += head(p1[0], p1[1], p2[0], p2[1], r * .2); } return d; };
  G.tangga = (x, yDasar, n = 4, sw = 90, sh = 60) => { const p = [[x, yDasar]]; for (let i = 0; i < n; i++) { p.push([x + i * sw, yDasar - (i + 1) * sh]); p.push([x + (i + 1) * sw, yDasar - (i + 1) * sh]); } p.push([x + n * sw, yDasar]); return poly(p, false, 1); };

  // ================= BANGUNAN, UANG, PRODUK =================
  // toko: cx = tengah, y = lantai, w = lebar
  G.toko = (cx, y, w) => {
    const h = w * .78, x = cx - w / 2, top = y - h, ah = w * .2;
    let tenda = poly([[x - 14, top + ah * .2], [x + w + 14, top + ah * .2]], false, 1);
    const n = 5, sw = (w + 28) / n;
    for (let i = 0; i < n; i++) tenda += arc(x - 14 + sw * (i + .5), top + ah * .2, sw / 2, 180, 0) ;
    let d = '';
    for (let i = 0; i < n; i++) d += line(x - 14 + sw * i, top + ah * .2, x - 14 + sw * i + sw * .15, top - ah * .6, 1);
    tenda = poly([[x - 14, top + ah * .2], [x + 10, top - ah * .6], [x + w - 10, top - ah * .6], [x + w + 14, top + ah * .2]], false, 1) + tenda + d;
    const bangunan = rect(x, top + ah * .2, w, h - ah * .2, 1.5) + rect(x + w * .1, top + h * .42, w * .38, h * .3, 1) + rect(x + w * .6, top + h * .4, w * .28, h * .6, 1) +
      circ(x + w * .65, top + h * .72, 5);
    return { tenda, bangunan, papan: { x: cx, y: top - ah * .9 } };
  };
  D.toko = (cx, y, w, at, dur = .8, o = {}) => {
    const t = G.toko(cx, y, w);
    P(t.bangunan, at, dur * .55);
    P(t.tenda, at + dur * .55, dur * .45, { c: o.c || RED, fill: o.c || RED, fillOp: .25 });
    if (o.nama) T(o.nama, t.papan.x, t.papan.y, o.ukuran || w * .16, at + dur, .3, { c: o.c2 || INK });
    return t;
  };
  G.rumah = (cx, y, w) => { const h = w * .7, x = cx - w / 2;
    return poly([[x - w * .1, y - h], [cx, y - h - w * .5], [x + w * 1.1, y - h]], true, 1.5) + rect(x, y - h, w, h, 1.5) + rect(cx - w * .12, y - h * .55, w * .24, h * .55, 1) + rect(x + w * .1, y - h * .8, w * .2, h * .2, 1); };
  G.kantor = (cx, y, w, h) => { const x = cx - w / 2; let d = rect(x, y - h, w, h, 1.5);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) d += rect(x + w * (.12 + i * .28), y - h + h * (.08 + j * .19), w * .2, h * .11, .6);
    return d + rect(cx - w * .12, y - h * .14, w * .24, h * .14, .8); };
  G.koin = (cx, cy, r) => icon.coin(cx, cy, r);
  D.koin = (cx, cy, r, at, dur = .4, o = {}) => { P(icon.coin(cx, cy, r), at, dur * .7, { c: GOLD, fill: GOLD, fillOp: .4 }); T(o.simbol ?? 'Rp', cx, cy + r * .28, r * .8, at + dur * .7, dur * .3, { c: INK }); };
  G.tumpukanKoin = (cx, y, n, r) => { let d = ''; for (let i = 0; i < n; i++) d += circ(cx, y - i * r * .32, r, r * .3, 0, 365, .01); return d; };
  G.uang = (cx, cy, w) => { const h = w * .48; return rect(cx - w / 2, cy - h / 2, w, h, 1.2) + circ(cx, cy, h * .28) + circ(cx - w * .36, cy, h * .06) + circ(cx + w * .36, cy, h * .06); };
  G.kantongUang = (cx, cy, s = 1) => pb(tf(cx, cy, s)).m(-30, -70).q(-90, -20, -80, 40).q(-70, 90, 0, 90).q(70, 90, 80, 40).q(90, -20, 30, -70).z().s() +
    pb(tf(cx, cy, s)).m(-30, -70).l(-44, -100).q(0, -90, 44, -100).l(30, -70).s();
  G.brankas = (cx, cy, w) => { const x = cx - w / 2, y = cy - w * .45; return rect(x, y, w, w * .9, 1.5) + rect(x + w * .08, y + w * .08, w * .84, w * .74, 1) + circ(cx, cy, w * .17) +
    line(cx, cy - w * .17, cx, cy - w * .26, .5) + line(cx + w * .3, cy - w * .1, cx + w * .3, cy + w * .1, 1) + line(x + w * .15, y + w * .9, x + w * .15, y + w, 1) + line(x + w * .85, y + w * .9, x + w * .85, y + w, 1); };
  // kue ulang tahun 2 tingkat: cx, y = alas
  G.kue = (cx, y, w) => { const x = cx - w / 2;
    return { kue: rect(x, y - w * .38, w, w * .38, 1.5) + rect(x + w * .18, y - w * .66, w * .64, w * .28, 1.5) + wave(x + 6, x + w - 6, y - w * .26, 8, w / 5) + line(x - w * .08, y, x + w * 1.08, y, 1),
      lilin: line(cx, y - w * .66, cx, y - w * .86, 1), api: pb(tf(cx, y - w * .9, w / 300)).m(0, 18).q(-14, 0, 0, -22).q(14, 0, 0, 18).z().s() }; };
  D.kue = (cx, y, w, at, dur = .6) => { const k = G.kue(cx, y, w); P(k.kue, at, dur * .7, { c: GOLD, fill: GOLD, fillOp: .25 }); P(k.lilin, at + dur * .7, dur * .12, { c: RED }); P(k.api, at + dur * .82, dur * .18, { c: RED, fill: GOLD, fillOp: .8, w: 4 }); };

  // ================= LENCANA & PENANDA =================
  // lencana angka (lingkaran emas + angka)
  D.lencana = (n, cx, cy, r, at, dur = .45, o = {}) => {
    P(circ(cx, cy, r), at, dur * .65, { c: o.c || GOLD, fill: o.c || GOLD, fillOp: o.fillOp ?? .35, w: o.w || 7 });
    T(String(n), cx, cy + r * .5, r * 1.45, at + dur * .65, dur * .35, { c: o.teks || INK });
  };
  D.centang = (cx, cy, r, at, dur = .3) => P(icon.tick(cx, cy, r), at, dur, { c: GREEN, fill: GREEN, fillOp: .2 });
  D.silang = (cx, cy, r, at, dur = .3) => P(icon.cross(cx, cy, r), at, dur, { c: RED, fill: RED, fillOp: .15 });
  // coret besar (X merah) di atas area
  D.coret = (cx, cy, r, at, dur = .3) => P(G.silang(cx, cy, r), at, dur, { c: RED, w: 10 });
  // lingkari (penanda elips)
  D.lingkari = (cx, cy, rx, ry, at, dur = .35, c) => P(circ(cx, cy, rx, ry, -120, 390, .04), at, dur, { c: c || GREEN, w: 6 });
  // garis bawah bergelombang di bawah bbox teks
  D.garisBawah = (b, at, dur = .3, c) => P(wave(b.x, b.x + b.width, b.y + b.height + 6, 5, 70), at, dur, { c: c || GOLD, w: 7 });
  // ================= TAMBAHAN (N1-001) =================
  // mobil sederhana tampak samping: cx, cy = pusat, w = lebar
  G.mobil = (cx, cy, w) => rect(cx - w / 2, cy - w * .08, w, w * .24, 1.5) + rect(cx - w * .27, cy - w * .27, w * .5, w * .2, 1.5) +
    circ(cx - w * .27, cy + w * .18, w * .075) + circ(cx + w * .27, cy + w * .18, w * .075);
  // piring + garpu + pisau: cx, cy = pusat piring, r = jari-jari piring
  G.piring = (cx, cy, r) => circ(cx, cy, r) + circ(cx, cy, r * .62) +
    line(cx - r * 1.55, cy - r * .7, cx - r * 1.55, cy + r * .8, 1) + line(cx + r * 1.55, cy - r * .7, cx + r * 1.55, cy + r * .8, 1);
})();

// ===== templat.js =====
// Templat pola adegan whiteboard-video-skill. Butuh gambar.js (G, D) dimuat lebih dulu.
// Semua templat menerima A (fungsi waktu adegan) dan objek opsi; waktu tiap unsur diatur lewat `at`.
var TPL = {};
(function () {
  // Judul papan. "3. SEO: muncul di Google" -> lencana 3 + "SEO: muncul di Google".
  // Teks lain ditulis apa adanya. Ukuran otomatis mengecil supaya muat. Mengembalikan bbox teks.
  TPL.judul = (A, judul, o = {}) => {
    const at = o.at ?? A(0, 0), y = o.y ?? 150, maks = o.maks ?? 1640;
    const m = /^(\d+)\.\s*(.+)$/.exec(judul);
    if (m) {
      const r = 50, teks = m[2], z = G.pasUkuran(teks, o.ukuran || 96, maks - 2 * r - 30);
      const wT = G.lebarTeks(teks, z), total = 2 * r + 28 + wT, x0 = 960 - total / 2;
      D.lencana(m[1], x0 + r, y - z * .3, r, at, .4);
      const b = T(teks, x0 + 2 * r + 28, y, z, at + .4, o.dur || .6, { anchor: 'start' });
      if (o.garis !== false) D.garisBawah(b, at + .4 + (o.dur || .6), .25);
      return b;
    }
    const z = G.pasUkuran(judul, o.ukuran || 104, maks);
    const b = T(judul, 960, y, z, at, o.dur || .7, { c: o.c || INK });
    if (o.garis !== false) D.garisBawah(b, at + (o.dur || .7), .25);
    return b;
  };

  // Ikon besar di tengah + label di bawahnya. gambar(cx, cy, at) menggambar ikonnya.
  TPL.ikonBesar = (A, { cx = 960, cy = 520, gambar, at, label, labelY, ukuran = 64, warna = INK, atLabel }) => {
    gambar(cx, cy, at);
    if (label) T(label, cx, labelY ?? cy + 300, ukuran, atLabel ?? at + .8, .4, { c: warna });
  };

  // Kartu: kotak + ikon di dalam + label di bawah kotak.
  TPL.kartu = (A, { x, y, w, h, gambar, label, at, warna = INK, ukuran = 52, isi = null }) => {
    P(rect(x, y, w, h, 2), at, .3, { c: warna, fill: isi || warna, fillOp: isi ? .08 : 0 });
    gambar(x + w / 2, y + h / 2, at + .3);
    if (label) { const z = G.pasUkuran(label, ukuran, w + 40); T(label, x + w / 2, y + h + z + 6, z, at + .75, .3, { c: warna }); }
  };

  // Perbandingan dua kolom. kiri/kanan: { judul, warna, at, gambar(cx, cy, at), catatan }
  TPL.duaKolom = (A, { x0 = 120, x1 = 1800, y0 = 270, y1 = 900, kiri, kanan, garis = true, vs = false, atGaris }) => {
    const mid = (x0 + x1) / 2, cl = (x0 + mid) / 2, cr = (mid + x1) / 2;
    if (garis) P(line(mid, y0 + 10, mid, y1 - 10, 2), atGaris ?? kiri.at - .2, .2, { c: GRAY, w: 4 });
    if (vs) { const a = (atGaris ?? kiri.at - .2) + .2; P(circ(mid, (y0 + y1) / 2, 44), a, .2, { c: GRAY, fill: '#fff', fillOp: 1, w: 4 }); T('vs', mid, (y0 + y1) / 2 + 14, 46, a + .2, .15, { c: GRAY }); }
    for (const [k, cx] of [[kiri, cl], [kanan, cr]]) {
      if (!k) continue;
      const z = G.pasUkuran(k.judul, k.ukuran || 64, (x1 - x0) / 2 - 60);
      T(k.judul, cx, y0 + z, z, k.at, .45, { c: k.warna || INK });
      if (k.gambar) k.gambar(cx, (y0 + z + 30 + y1) / 2, k.at + .5);
      if (k.catatan) T(k.catatan, cx, y1 - 10, 48, k.atCatatan ?? k.at + 1.1, .35, { c: k.warnaCatatan || GRAY });
    }
  };

  // Daftar langkah / checklist. items: [{ teks, at, ok }] ; gaya: centang | nomor | titik | silang ; mulai = nomor awal
  TPL.daftar = (A, { x, y, gap = 92, ukuran = 58, items, gaya = 'centang', warna = INK, maks = 900, kotak = 54, mulai = 1 }) => {
    items.forEach((it, i) => {
      const yy = y + i * gap, z = G.pasUkuran(it.teks, ukuran, maks - kotak - 30);
      if (gaya === 'nomor') D.lencana(i + mulai, x + kotak / 2, yy - z * .3, kotak / 2, it.at, .3);
      else if (gaya === 'titik') P(circ(x + kotak / 2, yy - z * .3, 10), it.at, .12, { c: warna, fill: warna, fillOp: .8 });
      else {
        P(G.kotakCentang(x, yy - z * .3 - kotak / 2, kotak), it.at, .15);
        const ok = it.ok !== false && gaya !== 'silang';
        P(ok ? G.centang(x, yy - z * .3 - kotak / 2, kotak) : G.silang(x + kotak / 2, yy - z * .3, kotak * .32), it.at + .15, .12, { c: ok ? GREEN : RED, w: 9 });
      }
      T(it.teks, x + kotak + 26, yy, z, it.at + .27, it.dur || .35, { anchor: 'start', c: it.c || warna });
    });
  };

  // Angka / statistik besar dengan lingkaran + label di bawah.
  TPL.statistik = (A, { x, y, angka, label, at, warna = GOLD, r = 110, ukuranLabel = 54 }) => {
    P(circ(x, y, r), at, .4, { c: warna, fill: warna, fillOp: .25, w: 8 });
    T(String(angka), x, y + r * .42, r * 1.25, at + .4, .3, { c: INK });
    if (label) T(label, x, y + r + 20 + ukuranLabel, ukuranLabel, at + .7, .3, { c: GRAY });
  };

  // Tokoh wanita + balon kata. Balon dibuat pas mengelilingi teks.
  // balon: { teks, x, y (tengah balon), ukuran, ekor, at, warna }
  TPL.tokohBalon = (A, { x, y, s = 1, pose = 'berdiri', arah = 1, at, baju, balon }) => {
    D.wanita(x, y, s, pose, at, .9, { arah, baju });
    if (balon) {
      const z = balon.ukuran || 54, wT = G.lebarTeks(balon.teks, z), w = wT + 56, h = z + 44;
      const bx = balon.x - w / 2, by = balon.y - h / 2;
      P(G.balon(bx, by, w, h, balon.ekor || (balon.x > x ? 'kiri' : 'kanan')), balon.at, .3, { c: balon.warna || INK, fill: balon.warna || BLUE, fillOp: .06 });
      T(balon.teks, balon.x, by + h / 2 + z * .33, z, balon.at + .3, .45, { c: balon.warna || INK });
    }
  };

  // Alur kotak berpanah kiri ke kanan. items: [{ teks, at, warna }]
  TPL.alur = (A, { x, y, w = 300, h = 110, gap = 90, items, ukuran = 50 }) => {
    items.forEach((it, i) => {
      const bx = x + i * (w + gap);
      if (i) P(arrow(bx - gap + 12, y + h / 2, bx - 12, y + h / 2), it.at - .2, .2, { c: GRAY, w: 6 });
      P(rect(bx, y, w, h, 2), it.at, .25, { c: it.warna || INK, fill: it.warna || BLUE, fillOp: .07 });
      const z = G.pasUkuran(it.teks, ukuran, w - 30);
      T(it.teks, bx + w / 2, y + h / 2 + z * .33, z, it.at + .25, .3, { c: it.warna || INK });
    });
  };
})();

// ===== adegan.js =====
// N2-001 "Toko Kelontong Ramai, Kok Uang di Laci Selalu Kurang?" 12 adegan, 16:9. Pustaka pustaka/wvs (G/D/TPL).
// Palet brand Buku Kas Juragan (config.json): RED = oranye aksen, GREEN = teal-hijau, BLUE = teal muda.
window.SCENES = {
  // 0 Toko kelontong ramai dari pagi sampai malam, kok uang di laci selalu kurang?
  // 1 Misalnya omzet sebuah toko dua juta rupiah sehari, tapi pemiliknya tetap harus menambal stok dari uang sendiri.
  // 2 Biasanya penyebabnya bukan nasib buruk, melainkan tiga angka yang tidak pernah dicatat.
  // 3 Enam menit ke depan, kita hitung satu per satu, lengkap dengan contoh angkanya.
  // 4 Di akhir, kamu akan tahu cara menutup bocornya dengan buku tulis biasa.
  pembuka(A) {
    TPL.judul(A, 'Ramai tapi uang kurang?', { c: RED });
    D.toko(300, 660, 300, A(0, .02), .8, { nama: 'TOKO' });
    P(G.kerumunan(640, 600, 4, 105, .62), A(0, .3), .5, { c: BLUE });
    P(rect(1000, 400, 380, 170, 2), A(0, .55), .3, { fill: BLUE, fillOp: .05 });
    P(rect(1030, 430, 320, 60, 1.5) + circ(1190, 515, 9), A(0, .65), .25);
    T('laci', 1190, 640, 52, A(0, .75), .2, { c: GRAY });
    T('?', 1190, 380, 110, A(0, .85), .2, { c: RED });
    P(G.uang(1700, 400, 220), A(1, .2), .35, { c: GREEN, fill: GREEN, fillOp: .1 });
    T('2 juta / hari', 1700, 520, 54, A(1, .45), .3, { c: GREEN });
    D.wanita(1700, 900, .72, 'berpikir', A(1, .5), .8, { baju: GOLD });
    D.lencana(3, 270, 800, 62, A(2, .15), .4, { c: RED });
    T('angka yang tidak dicatat', 380, 820, 56, A(2, .4), .5, { anchor: 'start', c: RED });
    P(G.jam(1160, 790, 62), A(3, .2), .4, { c: BLUE });
    T('6 menit', 1260, 815, 56, A(3, .5), .3, { anchor: 'start', c: BLUE });
    P(G.dokumen(1400, 300, 150, 190, 5), A(4, .15), .4, { fill: GOLD, fillOp: .12 });
    T('buku tulis', 1475, 540, 46, A(4, .5), .3, { c: GRAY });
  },

  // 0 Warung dan toko kelontong bukan usaha kecil yang bisa dianggap remeh.
  // 1 Menurut Kementerian Perdagangan pada Februari 2026, toko kelontong menguasai lebih dari 98 persen ekosistem ritel di Indonesia.
  // 2 Namun asosiasi pedagang memperkirakan jumlahnya tinggal sekitar 3,9 juta pada akhir 2025, turun dari 6,1 juta pada tahun 2007.
  // 3 Menteri Perdagangan membantah bahwa minimarket jadi penyebab utamanya.
  // 4 Jadi, mari kita lihat apa yang terjadi di dalam tokonya sendiri.
  fakta(A) {
    TPL.judul(A, 'Warung masih tulang punggung');
    D.toko(300, 640, 320, A(0, .1), .8, { nama: 'WARUNG' });
    T('lebih dari', 900, 335, 46, A(1, .1), .3, { c: GRAY });
    TPL.statistik(A, { x: 900, y: 490, angka: '98%', label: 'ekosistem ritel', at: A(1, .2), warna: GREEN, r: 125 });
    D.batang(1220, 740, [6.1, 3.9], A(2, .15), .8, { bw: 120, gap: 60, hmax: 300, c: RED });
    T('6,1 juta', 1340, 425, 46, A(2, .45), .3, { c: INK });
    T('3,9 juta', 1520, 533, 46, A(2, .7), .3, { c: RED });
    T('2007', 1340, 800, 46, A(2, .35), .2, { c: GRAY });
    T('2025', 1520, 800, 46, A(2, .6), .2, { c: GRAY });
    P(G.kantor(220, 890, 100, 150), A(3, .1), .4, { c: BLUE });
    T('minimarket', 340, 820, 56, A(3, .3), .4, { anchor: 'start', c: BLUE });
    D.silang(690, 800, 34, A(3, .6), .25);
    T('bukan penyebab utama', 340, 895, 44, A(3, .72), .3, { anchor: 'start', c: RED });
    D.kacaPembesar(1000, 790, 50, A(4, .3), .35);
  },

  // 0 Pertama, pisahkan dua kata yang sering dianggap sama: omzet dan untung.
  // 1 Omzet adalah semua uang yang masuk ke laci dari pembeli.
  // 2 Untung adalah sisa uang setelah kamu mengganti modal barang yang terjual dan membayar pengeluaran toko.
  // 3 Laci yang penuh membuat pemilik merasa kaya, padahal sebagian besar isinya harus kembali ke pemasok.
  // 4 Apalagi banyak barang sembako dijual dengan selisih yang kecil.
  omzet(A) {
    TPL.judul(A, 'Omzet bukan untung');
    T('omzet', 520, 395, 96, A(0, .1), .4, { c: BLUE });
    T('untung', 1240, 395, 96, A(0, .35), .4, { c: GREEN });
    D.silang(880, 365, 44, A(0, .65), .25);
    TPL.duaKolom(A, { x0: 110, x1: 1150, y0: 450, y1: 905, vs: true,
      kiri: { judul: 'semua uang masuk', warna: BLUE, at: A(1, .05), ukuran: 52,
        gambar: (cx, cy, at) => P(G.tumpukanKoin(cx, cy + 90, 8, 60), at, .6, { c: GOLD, fill: GOLD, fillOp: .3 }) },
      kanan: { judul: 'sisa setelah modal', warna: GREEN, at: A(2, .1), ukuran: 52,
        gambar: (cx, cy, at) => P(G.tumpukanKoin(cx, cy + 90, 2, 60), at, .5, { c: GOLD, fill: GOLD, fillOp: .3 }) } });
    P(G.uang(1380, 480, 200), A(3, .05), .35, { c: GREEN, fill: GREEN, fillOp: .1 });
    P(arrow(1490, 480, 1560, 480), A(3, .4), .15, { c: RED, w: 8 });
    D.toko(1690, 660, 200, A(3, .5), .6, { nama: 'PEMASOK' });
    D.grafik(1250, 730, 520, 130, 'datar', A(4, .15), .5, { c: RED });
    T('selisih tipis', 1510, 900, 54, A(4, .55), .3, { c: RED });
  },

  // 0 Mari pakai contoh. Anggap omzet harian toko dua juta rupiah.
  // 1 Misalnya modal barang yang terjual hari itu 1,76 juta rupiah.
  // 2 Sisanya, 240 ribu rupiah, adalah untung kotor per hari.
  // 3 Kalikan 30 hari, untung kotor sebulan hanya 7,2 juta rupiah, padahal omzetnya 60 juta.
  // 4 Jadi yang benar-benar tersisa dari omzet hanya sekitar 12 persen.
  modal(A) {
    TPL.judul(A, '1. Hitung modal barang');
    T('omzet harian', 150, 350, 62, A(0, .1), .4, { anchor: 'start' });
    T('2 juta', 1020, 350, 66, A(0, .5), .35, { anchor: 'end', c: BLUE });
    T('modal barang', 150, 465, 62, A(1, .1), .4, { anchor: 'start' });
    T('1,76 juta', 1020, 465, 66, A(1, .5), .35, { anchor: 'end', c: RED });
    P(line(150, 510, 1020, 510, 1), A(2, .02), .2, { w: 5 });
    T('untung kotor', 150, 600, 62, A(2, .15), .4, { anchor: 'start' });
    T('240 ribu', 1020, 600, 66, A(2, .55), .35, { anchor: 'end', c: GREEN });
    T('x 30 hari', 150, 715, 62, A(3, .08), .35, { anchor: 'start', c: GRAY });
    T('7,2 juta', 1020, 715, 66, A(3, .35), .35, { anchor: 'end', c: GREEN });
    D.batang(1150, 800, [60, 7.2], A(3, .45), .7, { bw: 150, gap: 70, hmax: 380, c: BLUE });
    T('omzet 60 juta', 1295, 855, 46, A(3, .75), .3, { c: BLUE });
    T('untung kotor', 1515, 725, 42, A(3, .85), .1, { c: GREEN });
    TPL.statistik(A, { x: 1700, y: 400, angka: '12%', label: 'tersisa', at: A(4, .15), warna: RED, r: 115 });
  },

  // 0 Dari untung kotor itu, masih ada pengeluaran yang jalan terus tiap bulan.
  // 1 Misalnya listrik dan kulkas 600 ribu rupiah, kantong plastik dan nota 300 ribu rupiah, serta gaji satu penjaga toko 1,5 juta rupiah.
  // 2 Totalnya 2,4 juta rupiah, sehingga untung bersih tinggal 4,8 juta rupiah per bulan.
  // 3 Angka 4,8 juta inilah yang aman diambil pemilik. Bukan isi laci.
  tetap(A) {
    TPL.judul(A, '2. Kurangi pengeluaran tetap');
    D.kalender(150, 290, 280, 230, A(0, .1), .8, { kol: 5, bar: 3, judul: 'BULAN', c: RED });
    TPL.daftar(A, { x: 520, y: 340, gap: 100, ukuran: 54, gaya: 'titik', maks: 900, kotak: 30,
      items: [{ teks: 'listrik dan kulkas  600 ribu', at: A(1, .12) }, { teks: 'plastik dan nota  300 ribu', at: A(1, .4) }, { teks: 'gaji penjaga  1,5 juta', at: A(1, .68) }] });
    P(line(520, 620, 1420, 620, 1), A(2, .03), .2, { w: 5 });
    T('total 2,4 juta', 520, 700, 58, A(2, .1), .4, { anchor: 'start', c: RED });
    T('untung bersih 4,8 juta', 520, 810, 66, A(2, .5), .55, { anchor: 'start', c: GREEN });
    P(G.kantongUang(1650, 520, 1.3), A(3, .1), .4, { c: GOLD, fill: GOLD, fillOp: .3 });
    D.centang(1750, 400, 30, A(3, .35), .2);
    T('aman diambil', 1650, 700, 48, A(3, .45), .3, { c: GREEN });
    T('bukan isi laci', 1650, 850, 50, A(3, .65), .3, { c: RED });
    D.silang(1480, 835, 26, A(3, .8), .15);
  },

  // 0 Sekarang bagian yang paling sering terjadi.
  // 1 Pemilik mengambil uang dari laci kapan saja: untuk jajan anak, bensin, rokok, atau makan siang.
  // 2 Misalnya rata-rata 250 ribu rupiah per hari, berarti 7,5 juta rupiah dalam sebulan.
  // 3 Padahal untung bersih toko cuma 4,8 juta rupiah.
  // 4 Tidak ada yang mencatat, jadi tidak ada yang sadar.
  laci(A) {
    TPL.judul(A, '3. Ambil dari laci');
    D.wanita(230, 900, .85, 'menunjuk', A(0, .15), .8, { baju: RED });
    P(rect(560, 300, 420, 200, 2), A(1, .05), .3, { fill: BLUE, fillOp: .05 });
    P(rect(590, 335, 360, 70, 1.5) + circ(770, 450, 10), A(1, .12), .25);
    P(arrow(1000, 400, 1110, 400), A(1, .25), .12, { c: RED, w: 8 });
    TPL.daftar(A, { x: 1140, y: 380, gap: 95, ukuran: 56, gaya: 'titik', maks: 640, kotak: 30,
      items: [{ teks: 'jajan anak', at: A(1, .35) }, { teks: 'bensin', at: A(1, .5) }, { teks: 'rokok', at: A(1, .65) }, { teks: 'makan siang', at: A(1, .8) }] });
    T('diambil 7,5 juta', 770, 640, 70, A(2, .3), .6, { c: RED });
    T('untung bersih cuma 4,8 juta', 770, 740, 54, A(3, .1), .6, { c: GREEN });
    P(G.dokumen(1400, 700, 150, 190, 4), A(4, .1), .35);
    D.coret(1475, 795, 75, A(4, .45), .25);
    T('tidak dicatat', 1590, 805, 48, A(4, .55), .3, { anchor: 'start', c: GRAY });
  },

  // 0 Selisihnya 2,7 juta rupiah tiap bulan, dan uang itu diambil dari modal barang.
  // 1 Dalam empat bulan, hilang 10,8 juta rupiah dari uang belanja stok.
  // 2 Pelan-pelan rak makin kosong, barang laris sering habis, dan pembeli pindah ke toko sebelah.
  // 3 Tokonya tetap terlihat ramai, tetapi laci tidak lagi cukup untuk kulakan.
  selisih(A) {
    TPL.judul(A, 'Selisihnya menggerus modal');
    D.batang(180, 640, [7.5, 4.8], A(0, .1), .6, { bw: 140, gap: 60, hmax: 340, c: RED });
    T('diambil', 320, 700, 44, A(0, .35), .2, { c: RED });
    T('untung bersih', 520, 700, 44, A(0, .5), .2, { c: GREEN });
    T('selisih 2,7 juta', 400, 770, 56, A(0, .7), .3, { c: RED });
    [4, 3, 2, 1].forEach((n, i) => P(G.tumpukanKoin(800 + i * 130, 600, n * 2, 48), A(1, .1 + i * .12), .3, { c: GOLD, fill: GOLD, fillOp: .3 }));
    T('4 bulan', 960, 330, 56, A(1, .1), .3, { c: GRAY });
    T('hilang 10,8 juta', 960, 700, 62, A(1, .6), .45, { c: RED });
    P(G.tabel(1330, 290, 420, 260, 3, 3), A(2, .05), .4);
    T('rak kosong', 1540, 610, 52, A(2, .3), .3, { c: RED });
    P(G.kerumunan(1400, 760, 3, 70, .5), A(2, .5), .3, { c: BLUE });
    P(arrow(1565, 760, 1625, 760), A(2, .7), .12, { c: GRAY, w: 6 });
    D.toko(1730, 880, 150, A(2, .75), .45);
    P(rect(760, 760, 340, 130, 2), A(3, .1), .3, { fill: BLUE, fillOp: .05 });
    T('laci', 930, 840, 50, A(3, .3), .2, { c: GRAY });
    T('kulakan?', 1190, 840, 60, A(3, .5), .3, { anchor: 'start', c: RED });
  },

  // 0 Ada satu lagi yang diam-diam menahan uang, yaitu bon pelanggan.
  // 1 Misalnya ada 20 pelanggan yang berutang masing-masing 50 ribu rupiah.
  // 2 Totalnya satu juta rupiah, dan uang itu tidak ada di laci meski barangnya sudah keluar.
  // 3 Barang sudah dibeli dari pemasok, tetapi uangnya belum kembali, jadi kulakan berikutnya terasa kurang.
  // 4 Catat bon di halaman terpisah, lengkap dengan nama dan tanggal, lalu ingatkan dengan sopan tiap akhir pekan.
  bon(A) {
    TPL.judul(A, 'Uang yang tertahan di bon');
    P(G.dokumen(190, 290, 200, 260, 5), A(0, .15), .5, { fill: GOLD, fillOp: .12 });
    T('BON', 290, 610, 56, A(0, .65), .3, { c: RED });
    P(G.kerumunan(560, 350, 5, 110, .55), A(1, .1), .4, { c: BLUE });
    P(G.kerumunan(560, 490, 5, 110, .55), A(1, .35), .4, { c: BLUE });
    T('20 pelanggan x 50 ribu', 790, 640, 52, A(1, .65), .45, { c: GRAY });
    T('1 juta', 1500, 450, 130, A(2, .1), .5, { c: RED });
    T('tertahan, bukan di laci', 1500, 540, 52, A(2, .5), .45, { c: RED });
    TPL.alur(A, { x: 190, y: 700, w: 420, h: 110, gap: 100, ukuran: 50, items: [
      { teks: 'barang keluar', at: A(3, .1), warna: BLUE }, { teks: 'uang belum balik', at: A(3, .4), warna: RED }, { teks: 'kulakan kurang', at: A(3, .7), warna: RED }] });
    D.centang(300, 868, 24, A(4, .15), .2);
    T('catat nama dan tanggal, ingatkan tiap pekan', 345, 885, 50, A(4, .2), .8, { anchor: 'start', c: GREEN });
  },

  // 0 Cara paling sederhana menutup bocor adalah menggaji diri sendiri.
  // 1 Saran ini juga ada di situs edukasi Otoritas Jasa Keuangan: ambil dana usaha secara teratur, seperti menerima gaji.
  // 2 Dari untung bersih 4,8 juta, misalnya tetapkan gaji pemilik 3,5 juta rupiah per bulan.
  // 3 Ambil sekali seminggu, sekitar 875 ribu rupiah, jangan tiap kali butuh.
  // 4 Sisanya 1,3 juta rupiah ditinggal di kantong toko sebagai cadangan stok.
  gaji(A) {
    TPL.judul(A, 'Gaji pemilik itu tetap');
    D.wanita(230, 900, .9, 'senang', A(0, .15), .8, { baju: GOLD });
    P(rect(520, 270, 200, 100, 2), A(1, .05), .3, { c: BLUE, fill: BLUE, fillOp: .08 });
    T('OJK', 620, 345, 70, A(1, .2), .25, { c: BLUE });
    T('saran resmi', 750, 345, 56, A(1, .3), .3, { anchor: 'start' });
    T('ambil dana usaha secara teratur', 520, 450, 52, A(1, .55), .6, { anchor: 'start', c: GRAY });
    D.batang(1330, 600, [4.8, 3.5], A(2, .15), .6, { bw: 120, gap: 60, hmax: 220, c: GREEN });
    T('4,8 juta', 1450, 365, 44, A(2, .5), .25, { c: INK });
    T('3,5 juta', 1630, 425, 44, A(2, .65), .25, { c: GREEN });
    T('untung', 1450, 655, 44, A(2, .55), .2, { c: GRAY });
    T('gaji', 1630, 655, 44, A(2, .7), .2, { c: GREEN });
    D.kalender(520, 560, 380, 260, A(3, .08), .5, { kol: 7, bar: 4, judul: 'MINGGU', c: RED });
    T('875 ribu', 1060, 650, 100, A(3, .35), .45, { c: GREEN });
    T('sekali seminggu', 1060, 730, 52, A(3, .6), .35, { c: GRAY });
    P(G.kantongUang(1400, 790, .9), A(4, .1), .35, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('1,3 juta', 1510, 775, 64, A(4, .3), .3, { anchor: 'start', c: GREEN });
    T('cadangan stok', 1510, 845, 48, A(4, .5), .3, { anchor: 'start', c: GRAY });
  },

  // 0 Lalu, catat tiga angka tiap malam sebelum menutup toko.
  // 1 Angka pertama adalah omzet hari itu dari hitungan uang di laci.
  // 2 Angka kedua adalah uang yang kamu ambil, dan angka ketiga adalah bon baru serta bon yang lunas.
  // 3 Cukup satu halaman buku tulis, tidak perlu rumus rumit.
  // 4 Bank Indonesia juga menyediakan aplikasi pencatatan bernama Si Apik untuk pelaku UMKM, bila kamu lebih suka lewat ponsel.
  // 5 Dalam seminggu pertama, selisih seperti tadi sudah terlihat, bukan setelah modal habis.
  catat(A) {
    TPL.judul(A, 'Catat tiga angka tiap malam');
    P(G.jam(230, 440, 90), A(0, .2), .5, { c: BLUE });
    T('tiap malam', 230, 610, 50, A(0, .6), .3, { c: GRAY });
    TPL.daftar(A, { x: 520, y: 400, gap: 120, ukuran: 62, gaya: 'nomor', maks: 800, kotak: 72,
      items: [{ teks: 'omzet hari itu', at: A(1, .2) }, { teks: 'uang yang diambil', at: A(2, .15) }, { teks: 'bon baru dan lunas', at: A(2, .6) }] });
    P(G.dokumen(1450, 290, 240, 320, 6), A(3, .1), .5, { fill: GOLD, fillOp: .12 });
    T('1 halaman', 1570, 670, 50, A(3, .6), .3, { c: GRAY });
    const h = G.hp(220, 800, 190);
    P(h.bingkai, A(4, .05), .3);
    P(G.feed(h.layar), A(4, .05) + .3, .25, { c: BLUE, w: 3 });
    T('aplikasi Si Apik', 340, 790, 52, A(4, .35), .4, { anchor: 'start', c: BLUE });
    T('dari Bank Indonesia', 340, 855, 44, A(4, .6), .35, { anchor: 'start', c: GRAY });
    D.kalender(1000, 720, 260, 170, A(5, .08), .5, { kol: 7, bar: 3 });
    T('1 minggu', 1420, 810, 60, A(5, .4), .3, { c: GREEN, anchor: 'start' });
    D.centang(1740, 780, 34, A(5, .6), .2);
  },

  // 0 Soal ini bukan masalah satu toko saja.
  // 1 Data pemerintah mencatat sekitar 65 juta UMKM di Indonesia, yang menyumbang sekitar 60 persen produk domestik bruto.
  // 2 Sementara survei OJK dan BPS tahun 2025 mencatat indeks literasi keuangan nasional 66,46 persen.
  // 3 Artinya masih ada ruang besar untuk belajar mengatur uang usaha, dan kamu sudah mulai hari ini.
  umkm(A) {
    TPL.judul(A, 'Kamu tidak sendirian');
    [0, 1, 2].forEach(i => D.toko(250 + i * 250, 540, 150, A(0, .1 + i * .25), .5));
    TPL.statistik(A, { x: 1130, y: 430, angka: '65', label: 'juta UMKM', at: A(1, .1), warna: BLUE, r: 125 });
    TPL.statistik(A, { x: 1590, y: 430, angka: '60%', label: 'dari PDB', at: A(1, .5), warna: GREEN, r: 125 });
    T('literasi keuangan 2025: 66,46%', 960, 735, 58, A(2, .1), .6, { c: INK });
    P(rect(520, 780, 900, 60, 2), A(2, .4), .3);
    P(rect(520, 780, 598, 60, 1), A(2, .6), .35, { c: BLUE, fill: BLUE, fillOp: .35 });
    D.wanita(220, 900, .8, 'senang', A(3, .15), .8, { baju: BLUE });
    T('mulai hari ini', 1650, 860, 54, A(3, .55), .35, { c: GREEN });
  },

  // 0 Jadi, kenapa toko kelontong yang ramai bisa tetap kurang uang di laci?
  // 1 Karena omzet dianggap untung, uang pribadi ikut keluar dari laci, dan bon menahan uang yang seharusnya berputar.
  // 2 Hitung untung bersih, tetapkan gaji pemilik, dan catat tiga angka tiap malam.
  // 3 Dengan begitu, toko yang ramai benar-benar menghasilkan, bukan sekadar sibuk.
  // 4 Buku kas satu halaman dan kalkulator HPP gratis ada di deskripsi, tinggal salin.
  // 5 Kalau video ini berguna, langganan Buku Kas Juragan, lalu lanjut ke video soal cara menghitung HPP tiap barang.
  penutup(A) {
    TPL.judul(A, 'Ringkasan', { c: GREEN });
    D.toko(300, 520, 280, A(0, .05), .7, { nama: 'RAMAI' });
    T('?', 300, 640, 110, A(0, .6), .2, { c: RED });
    TPL.daftar(A, { x: 640, y: 330, gap: 110, ukuran: 56, gaya: 'silang', maks: 1000, kotak: 52,
      items: [{ teks: 'omzet dianggap untung', at: A(1, .15) }, { teks: 'uang pribadi dari laci', at: A(1, .45) }, { teks: 'bon menahan uang', at: A(1, .75) }] });
    TPL.daftar(A, { x: 640, y: 700, gap: 90, ukuran: 56, gaya: 'centang', maks: 1000, kotak: 52,
      items: [{ teks: 'hitung untung bersih', at: A(2, .1) }, { teks: 'gaji pemilik tetap', at: A(2, .4) }, { teks: 'catat 3 angka tiap malam', at: A(2, .7) }] });
    D.grafik(110, 720, 440, 170, 'naik', A(3, .15), .7, { c: GREEN });
    P(G.dokumen(1640, 290, 150, 190, 5), A(4, .1), .4, { fill: GOLD, fillOp: .12 });
    T('buku kas gratis', 1715, 540, 40, A(4, .4), .25, { c: GRAY });
    T('+ kalkulator HPP', 1715, 590, 40, A(4, .55), .25, { c: GRAY });
    P(rect(1520, 740, 340, 110, 2), A(5, .4), .3, { c: RED, fill: RED, fillOp: .25, w: 8 });
    T('Langganan', 1690, 818, 64, A(5, .5), .3, { c: RED });
  },
};

