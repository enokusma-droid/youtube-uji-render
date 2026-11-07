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
// N2-002 "Warung Makan Ramai Tapi Bangkrut: 4 Biang Keroknya" 13 adegan, 16:9. Pustaka pustaka/wvs (G/D/TPL).
// Beda dari N2-001: tokoh + balon, kartu, ikon besar, alur, gauge, tangga, siklus, brankas; tanpa daftar centang berderet.
window.SCENES = {
  // 0 Jam makan siang, kursi penuh, piring tidak berhenti keluar dari dapur.
  // 1 Tapi akhir bulan, pemiliknya malah menjual motor untuk menutup belanja bahan.
  // 2 Kenapa warung makan yang ramai bisa bangkrut?
  // 3 Ada empat biang kerok, dan semuanya bisa kamu hitung sendiri hari ini.
  // 4 Kita pakai contoh sepiring nasi ayam, lengkap dengan angkanya, lalu di akhir kamu bisa memeriksa warungmu sendiri.
  pembuka(A) {
    TPL.judul(A, 'Ramai tapi bangkrut?', { c: RED });
    [0, 1, 2].forEach(i => {
      const x = 130 + i * 290;
      P(rect(x, 400, 200, 40, 2), A(0, .05 + i * .12), .3, { fill: GOLD, fillOp: .2 });
      P(line(x + 25, 440, x + 25, 520, 1) + line(x + 175, 440, x + 175, 520, 1), A(0, .1 + i * .12), .2);
      P(G.piring(x + 100, 385, 20), A(0, .2 + i * .12), .2, { c: BLUE });
    });
    P(G.kerumunan(220, 340, 3, 290, .55), A(0, .5), .5, { c: BLUE });
    T('meja penuh', 520, 600, 56, A(0, .75), .3, { c: GRAY });
    P(G.mobil(1380, 520, 380), A(1, .08), .7, { c: BLUE, fill: BLUE, fillOp: .08 });
    T('DIJUAL', 1380, 700, 66, A(1, .6), .3, { c: RED });
    TPL.tokohBalon(A, { x: 250, y: 905, s: .62, pose: 'berpikir', at: A(2, .02), baju: GOLD,
      balon: { teks: 'Kenapa bisa bangkrut?', x: 760, y: 800, ukuran: 54, at: A(2, .25), warna: RED } });
    [1, 2, 3, 4].forEach((n, i) => D.lencana(n, 1130 + i * 150, 790, 52, A(3, .1 + i * .15), .3, { c: RED }));
    T('empat biang kerok', 1430, 900, 54, A(3, .65), .3, { c: RED });
    P(G.piring(1700, 440, 95), A(4, .1), .6, { c: GOLD, w: 6, fill: GOLD, fillOp: .12 });
    T('nasi ayam', 1700, 620, 54, A(4, .5), .3, { c: INK });
  },

  // 0 Biang kerok pertama adalah harga jual yang ditentukan dengan menebak, bukan dengan menghitung.
  // 1 Harga pokok penjualan, disingkat HPP, adalah modal barang yang benar-benar terpakai untuk menjual sesuatu.
  // 2 Rumusnya, menurut sebuah artikel edukasi wirausaha: persediaan awal ditambah pembelian bersih, lalu dikurangi persediaan akhir.
  // 3 Artikel itu mengingatkan, harga jual tidak boleh asal-asalan supaya bisnis terhindar dari kerugian.
  // 4 Di dapur warung, artinya semua bahan satu piring harus ikut dihitung, bukan hanya ayamnya.
  hpp(A) {
    TPL.judul(A, '1. Harga jual asal tebak');
    P(G.awanPikir(480, 480, 190, 110, 380, 640), A(0, .1), .5, { c: GRAY });
    T('Rp ?', 480, 515, 100, A(0, .5), .35, { c: RED });
    D.silang(920, 480, 46, A(0, .85), .2);
    T('HPP', 1330, 400, 120, A(1, .1), .4, { c: BLUE });
    T('modal barang yang terpakai', 1330, 490, 52, A(1, .45), .5, { c: GRAY });
    TPL.alur(A, { x: 130, y: 740, w: 360, h: 110, gap: 90, ukuran: 46, items: [
      { teks: 'stok awal', at: A(2, .05), warna: BLUE }, { teks: '+ pembelian', at: A(2, .3), warna: BLUE },
      { teks: '- stok akhir', at: A(2, .55), warna: RED }, { teks: '= HPP', at: A(2, .8), warna: GREEN }] });
    P(G.perisai(1330, 640, 80), A(3, .2), .4, { c: GREEN, fill: GREEN, fillOp: .12 });
    T('hindari rugi', 1330, 800, 46, A(3, .5), .3, { c: GREEN });
    P(G.piring(1730, 400, 70), A(4, .1), .4, { c: GOLD, w: 6 });
    T('semua bahan', 1730, 540, 44, A(4, .4), .3, { c: GRAY });
  },

  // 0 Mari pakai contoh. Misalnya sepiring nasi ayam dijual 15 ribu rupiah.
  // 1 Ayamnya 6 ribu, beras 1.500, sayur dan sambal 1.500, jadi bahan makanan 9 ribu rupiah, ditambah minyak dan gas 1.500.
  // 2 Bahan makanan saja sudah 60 persen dari harga jual.
  // 3 Sebagai pembanding, perangkat lunak akuntansi Accurate menulis bahwa sebagian besar pengelola restoran menjaga biaya makanan antara 28 dan 35 persen dari pendapatan.
  // 4 Setelah minyak dan gas, modal satu piring 10.500 rupiah, sehingga sisanya cuma 4.500 rupiah untuk sewa, listrik, gaji, dan untung.
  piring(A) {
    TPL.judul(A, 'Hitung sepiring nasi ayam');
    P(G.piring(300, 560, 150), A(0, .1), .8, { c: GOLD, w: 7, fill: GOLD, fillOp: .12 });
    T('Rp 15.000', 300, 790, 84, A(0, .55), .4, { c: GREEN });
    const baris = [['ayam', '6.000'], ['beras', '1.500'], ['sayur + sambal', '1.500'], ['minyak + gas', '1.500']];
    baris.forEach(([k, v], i) => {
      T(k, 700, 360 + i * 88, 56, A(1, .08 + i * .2), .3, { anchor: 'start', c: INK });
      T(v, 1180, 360 + i * 88, 56, A(1, .14 + i * .2), .3, { anchor: 'end', c: RED });
    });
    TPL.statistik(A, { x: 1580, y: 430, angka: '60%', label: 'bahan makanan', at: A(2, .1), warna: RED, r: 120 });
    const gx = 1580, gy = 800;
    P(G.gauge(gx, gy, 160), A(3, .1), .6, { c: GRAY, w: 6 });
    P(rect(gx - 160 + 160 * .38 * 1.0, gy - 40, 100, 40, 1), A(3, .5), .3, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('28 - 35%', gx, gy + 70, 52, A(3, .55), .3, { c: GREEN });
    T('pembanding restoran', gx, gy + 125, 42, A(3, .7), .3, { c: GRAY });
    P(arrow(gx + 120, gy - 20, gx + 20, gy - 110), A(3, .8), .15, { c: RED, w: 7 });
    T('modal 10.500', 700, 785, 62, A(4, .1), .4, { anchor: 'start', c: RED });
    T('sisa 4.500', 700, 880, 62, A(4, .45), .4, { anchor: 'start', c: GREEN });
  },

  // 0 Sekarang kalikan. Anggap warung ini menjual 80 piring sehari.
  // 1 Omzet sehari 1,2 juta rupiah, dan sisa setelah modal piring 360 ribu rupiah.
  // 2 Dalam 30 hari, sisa itu 10,8 juta rupiah, padahal omzet sebulannya 36 juta rupiah.
  // 3 Dari 10,8 juta itu masih harus dibayar sewa, listrik, dan gaji pegawai. Misalnya 9 juta rupiah, sehingga tinggal 1,8 juta rupiah, dan angka itu belum memuat biaya kecil maupun gaji pemilik.
  // 4 Warung tampak ramai, tetapi hitungannya sudah mepet sejak harga ditetapkan.
  kalikan(A) {
    TPL.judul(A, 'Kalikan satu bulan');
    P(G.kerumunan(250, 420, 4, 110, .6), A(0, .1), .5, { c: BLUE });
    T('80 piring / hari', 500, 600, 64, A(0, .5), .4, { c: BLUE });
    TPL.kartu(A, { x: 150, y: 680, w: 340, h: 180, at: A(1, .05), warna: BLUE, isi: BLUE, label: '',
      gambar: (cx, cy, at) => { T('omzet 1,2 juta', cx, cy - 5, 54, at, .3, { c: BLUE }); T('per hari', cx, cy + 55, 44, at + .2, .2, { c: GRAY }); } });
    TPL.kartu(A, { x: 600, y: 680, w: 340, h: 180, at: A(1, .45), warna: GREEN, isi: GREEN, label: '',
      gambar: (cx, cy, at) => { T('sisa 360 ribu', cx, cy - 5, 54, at, .3, { c: GREEN }); T('per hari', cx, cy + 55, 44, at + .2, .2, { c: GRAY }); } });
    P(G.kalender(1130, 290, 380, 270, 7, 4), A(2, .08), .5);
    T('30 hari', 1320, 620, 54, A(2, .35), .3, { c: GRAY });
    D.batang(1560, 600, [36, 10.8], A(2, .45), .6, { bw: 110, gap: 40, hmax: 300, c: BLUE });
    T('36 juta', 1615, 305, 46, A(2, .75), .2, { c: BLUE });
    T('10,8', 1765, 515, 46, A(2, .85), .2, { c: GREEN });
    T('- 9 juta', 1130, 740, 58, A(3, .15), .3, { anchor: 'start', c: RED });
    T('sewa, listrik, gaji', 1130, 800, 42, A(3, .2), .3, { anchor: 'start', c: GRAY });
    T('= 1,8 juta', 1130, 885, 66, A(3, .55), .4, { anchor: 'start', c: GREEN });
    D.grafik(1530, 880, 330, 100, 'datar', A(4, .15), .5, { c: RED });
  },

  // 0 Biang kerok kedua adalah porsi yang tidak seragam.
  // 1 Satu piring dapat ayam besar, piring lain dapat nasi segunung, tergantung siapa yang menyendok.
  // 2 Misalnya setiap piring kelebihan nasi dan sayur senilai seribu rupiah.
  // 3 Dikali 80 piring dan 30 hari, bocornya 2,4 juta rupiah sebulan.
  // 4 Solusinya sederhana: tentukan satu porsi standar sekali saja, lalu pakai gayung atau cetakan yang sama setiap hari.
  porsi(A) {
    TPL.judul(A, '2. Porsi tidak seragam');
    T('porsi', 960, 330, 50, A(0, .2), .3, { c: GRAY });
    [0, 1, 2].forEach(i => {
      const r = [70, 110, 85][i], cx = 330 + i * 380;
      P(G.piring(cx, 480, r), A(1, .05 + i * .25), .5, { c: GOLD, w: 6, fill: GOLD, fillOp: .1 + i * .06 });
    });
    T('kecil', 330, 640, 46, A(1, .45), .2, { c: GRAY });
    T('segunung', 710, 640, 46, A(1, .65), .2, { c: RED });
    T('sedang', 1090, 640, 46, A(1, .85), .2, { c: GRAY });
    P(G.koin(1500, 460, 70), A(2, .1), .4, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('+ Rp 1.000', 1500, 610, 62, A(2, .45), .4, { c: RED });
    T('x 80 x 30', 330, 800, 60, A(3, .1), .35, { anchor: 'start', c: GRAY });
    T('= 2,4 juta bocor', 800, 800, 70, A(3, .45), .5, { anchor: 'start', c: RED });
    P(G.perisai(1730, 440, 70), A(4, .1), .4, { c: GREEN, fill: GREEN, fillOp: .12 });
    D.centang(1730, 440, 28, A(4, .45), .2);
    T('1 porsi standar', 1500, 880, 56, A(4, .35), .5, { c: GREEN });
  },

  // 0 Masih di biang kerok kedua, yaitu masakan yang terbuang.
  // 1 Kajian Bappenas yang dikutip Katadata mencatat sampah makanan sisa konsumsi di Indonesia antara 5 dan 19 juta ton per tahun selama 2000 sampai 2019.
  // 2 Dapur warung punya versi kecilnya: nasi sisa, sayur layu, dan ayam yang tidak laku sampai malam.
  // 3 Misalnya tiap hari terbuang bahan senilai 50 ribu rupiah, itu 1,5 juta rupiah sebulan.
  // 4 Masak bertahap, catat sisa tiap malam, dan jual menu sisa lebih awal dengan harga promo.
  sisa(A) {
    TPL.judul(A, 'Masakan yang terbuang');
    P(G.corong(300, 500, 260), A(0, .1), .6, { c: GRAY });
    P(G.piring(300, 380, 60), A(0, .5), .3, { c: GOLD });
    P(arrow(300, 640, 300, 760), A(0, .75), .15, { c: RED, w: 8 });
    T('sampah', 300, 830, 52, A(0, .85), .1, { c: RED });
    TPL.statistik(A, { x: 900, y: 460, angka: '5-19', label: 'juta ton / tahun', at: A(1, .15), warna: RED, r: 125 });
    T('sisa konsumsi 2000-2019', 900, 735, 46, A(1, .6), .3, { c: GRAY });
    T('sumber: Bappenas via Katadata', 900, 800, 40, A(1, .75), .2, { c: GRAY });
    TPL.kartu(A, { x: 1330, y: 300, w: 220, h: 200, at: A(2, .1), warna: BLUE, label: 'nasi sisa', ukuran: 42,
      gambar: (cx, cy, at) => P(G.piring(cx, cy, 55), at, .3, { c: BLUE }) });
    TPL.kartu(A, { x: 1600, y: 300, w: 220, h: 200, at: A(2, .45), warna: GREEN, label: 'sayur layu', ukuran: 42,
      gambar: (cx, cy, at) => P(G.hati(cx, cy, 45), at, .3, { c: GREEN }) });
    T('50 ribu x 30 = 1,5 juta', 1460, 740, 54, A(3, .2), .5, { c: RED });
    P(G.jam(1460, 860, 38), A(4, .1), .3, { c: BLUE });
    T('masak bertahap', 1590, 880, 46, A(4, .35), .3, { anchor: 'start', c: GREEN });
  },

  // 0 Biang kerok ketiga: harga bahan naik turun, tetapi harga menu tidak pernah disesuaikan.
  // 1 Panel Harga Badan Pangan Nasional, yang dilansir Antara, mencatat cabai rawit merah di tingkat konsumen Rp67.171 per kilogram pada 15 Juli 2025.
  // 2 Pada 22 Agustus 2025, harganya turun menjadi Rp43.148 per kilogram, selisih lebih dari 24 ribu rupiah dalam kurang dari enam minggu.
  // 3 Misalnya warung memakai 2 kilogram cabai sehari, selisih itu mengubah modal harian sampai 48 ribu rupiah.
  // 4 Jadi cek harga bahan utama tiap minggu, dan hitung ulang HPP bila selisihnya sudah terasa.
  cabai(A) {
    TPL.judul(A, '3. Harga bahan naik turun');
    TPL.duaKolom(A, { x0: 110, x1: 1300, y0: 270, y1: 760, vs: false,
      kiri: { judul: '15 Juli 2025', warna: RED, at: A(1, .05), ukuran: 56, catatan: 'Rp67.171 / kg', warnaCatatan: RED, atCatatan: A(1, .5),
        gambar: (cx, cy, at) => P(G.hati(cx, cy, 70), at, .4, { c: RED, fill: RED, fillOp: .25 }) },
      kanan: { judul: '22 Agustus 2025', warna: GREEN, at: A(2, .05), ukuran: 56, catatan: 'Rp43.148 / kg', warnaCatatan: GREEN, atCatatan: A(2, .4),
        gambar: (cx, cy, at) => P(G.hati(cx, cy, 70), at, .4, { c: GREEN, fill: GREEN, fillOp: .15 }) } });
    T('cabai rawit merah', 705, 840, 50, A(1, .75), .4, { c: GRAY });
    D.grafik(1380, 700, 440, 260, 'turun', A(2, .45), .6, { c: RED });
    T('- 24 ribu', 1600, 330, 76, A(2, .7), .3, { c: RED });
    T('2 kg x 24 ribu', 1600, 480, 54, A(3, .15), .4, { c: GRAY });
    T('= 48 ribu / hari', 1600, 560, 60, A(3, .5), .4, { c: RED });
    P(G.kalender(1380, 790, 200, 120, 7, 2), A(4, .1), .4, { c: BLUE });
    T('cek tiap minggu', 1720, 860, 46, A(4, .35), .3, { c: GREEN });
  },

  // 0 Biang kerok keempat adalah biaya kecil yang tidak pernah masuk hitungan.
  // 1 Plastik pembungkus, es batu, sabun cuci piring, parkir pasar, dan air galon, semuanya terasa kecil.
  // 2 Misalnya totalnya 80 ribu rupiah sehari, atau 2,4 juta rupiah sebulan.
  // 3 Catat tiap pengeluaran sekecil apa pun di satu halaman buku, lalu jumlahkan tiap minggu.
  kecil(A) {
    TPL.judul(A, '4. Biaya kecil yang lolos');
    P(G.brankas(380, 560, 330), A(0, .1), .8, { c: GOLD, fill: GOLD, fillOp: .1 });
    P(G.kerumunan(720, 520, 3, 90, .45), A(0, .6), .3, { c: GRAY });
    T('tak terlihat', 380, 800, 52, A(0, .75), .3, { c: GRAY });
    const it = ['plastik', 'es batu', 'sabun', 'parkir', 'galon'];
    it.forEach((t, i) => {
      const x = 880 + (i % 3) * 330, y = 330 + Math.floor(i / 3) * 190;
      P(rect(x, y, 280, 120, 2), A(1, .04 + i * .17), .25, { c: BLUE, fill: BLUE, fillOp: .07 });
      T(t, x + 140, y + 78, 54, A(1, .1 + i * .17), .25, { c: BLUE });
    });
    T('80 ribu / hari', 1100, 800, 66, A(2, .1), .4, { c: RED });
    T('= 2,4 juta / bulan', 1100, 890, 56, A(2, .5), .4, { c: RED });
    P(G.dokumen(1560, 640, 200, 250, 5), A(3, .1), .5, { fill: GOLD, fillOp: .12 });
    D.centang(1660, 800, 30, A(3, .5), .2);
    T('catat semua', 1660, 600, 46, A(3, .65), .3, { c: GREEN });
  },

  // 0 Sekarang kita perbaiki harga piring tadi.
  // 1 Modal 10.500 rupiah, ditambah biaya kecil 80 ribu rupiah sehari dibagi 80 piring, yaitu seribu rupiah per piring.
  // 2 Lalu sewa, listrik, dan gaji 9 juta rupiah sebulan dibagi 2.400 piring, sekitar 3.750 rupiah per piring.
  // 3 Total modal sebenarnya 15.250 rupiah per piring, lebih mahal dari harga jualnya.
  // 4 Dengan target untung 20 persen dari harga jual, harga idealnya sekitar 19 ribu rupiah.
  // 5 Naik 4 ribu rupiah terasa berat, jadi pilih langkah bertahap: kecilkan porsi nasi, cari bagian ayam yang lebih murah, atau naikkan harga sedikit demi sedikit.
  harga(A) {
    TPL.judul(A, 'Perbaiki harga sepiring');
    P(G.tangga(130, 770, 4, 190, 100), A(0, .3), .8, { c: GRAY });
    T('10.500', 225, 650, 50, A(1, .1), .3, { c: INK });
    T('+ 1.000', 415, 550, 50, A(1, .5), .3, { c: RED });
    T('+ 3.750', 605, 450, 50, A(2, .5), .3, { c: RED });
    T('15.250', 795, 350, 56, A(3, .1), .4, { c: RED });
    TPL.statistik(A, { x: 1300, y: 460, angka: '15.250', label: 'modal sebenarnya', at: A(3, .2), warna: RED, r: 135 });
    P(G.piring(1300, 810, 55), A(3, .55), .3, { c: GOLD });
    T('dijual 15.000 = rugi', 1480, 825, 50, A(3, .65), .3, { anchor: 'start', c: RED });
    D.target(1720, 440, 90, A(4, .1), .6, { dart: true });
    T('19 ribu', 1720, 640, 72, A(4, .5), .4, { c: GREEN });
    T('untung 20%', 1720, 710, 44, A(4, .65), .2, { c: GRAY });
    TPL.alur(A, { x: 130, y: 920 - 70, w: 400, h: 90, gap: 90, ukuran: 40, items: [
      { teks: 'porsi lebih kecil', at: A(5, .05), warna: BLUE }, { teks: 'ayam lebih murah', at: A(5, .35), warna: BLUE }, { teks: 'naik bertahap', at: A(5, .65), warna: GREEN }] });
  },

  // 0 Ada satu jebakan yang membuat biang kerok pertama makin parah: menu terlaris belum tentu paling menguntungkan.
  // 1 Misalnya nasi ayam laku 50 piring sehari dengan sisa 4.500 rupiah per piring, atau 225 ribu rupiah.
  // 2 Sementara nasi telur dadar, dijual 10 ribu rupiah dengan modal 4 ribu rupiah, menyisakan 6 ribu rupiah per piring.
  // 3 Kalau 30 pembeli yang tadinya memesan ayam beralih ke telur, sisa sehari naik dari 135 ribu menjadi 180 ribu rupiah.
  // 4 Taruh menu hemat yang untungnya lebih besar di urutan atas papan menu.
  // 5 Jadi lihat untung per piring, bukan hanya jumlah piring yang keluar.
  menu(A) {
    TPL.judul(A, 'Menu laris belum tentu untung');
    TPL.kartu(A, { x: 150, y: 290, w: 520, h: 330, at: A(1, .05), warna: BLUE, isi: BLUE, label: '',
      gambar: (cx, cy, at) => { T('nasi ayam', cx, cy - 90, 60, at, .3, { c: BLUE }); T('50 piring', cx, cy - 10, 56, at + .15, .3, { c: INK }); T('sisa 4.500', cx, cy + 70, 58, at + .3, .3, { c: GREEN }); } });
    T('= 225 ribu', 410, 700, 60, A(1, .6), .3, { c: GREEN });
    TPL.kartu(A, { x: 800, y: 290, w: 520, h: 330, at: A(2, .05), warna: GOLD, isi: GOLD, label: '',
      gambar: (cx, cy, at) => { T('telur dadar', cx, cy - 90, 60, at, .3, { c: INK }); T('Rp 10.000', cx, cy - 10, 56, at + .15, .3, { c: INK }); T('sisa 6.000', cx, cy + 70, 58, at + .3, .3, { c: GREEN }); } });
    P(arrow(1340, 700, 1040, 700), A(3, .05), .2, { c: RED, w: 8 });
    T('30 pembeli pindah', 1100, 790, 54, A(3, .1), .4, { c: GRAY });
    T('135 ribu', 800, 880, 60, A(3, .35), .3, { anchor: 'start', c: RED });
    P(arrow(1060, 855, 1200, 855), A(3, .6), .15, { c: GRAY, w: 7 });
    T('180 ribu', 1230, 880, 66, A(3, .7), .3, { anchor: 'start', c: GREEN });
    P(G.web(1450, 300, 380, 400), A(4, .1), .5, { c: INK });
    T('MENU', 1640, 360, 50, A(4, .35), .2, { c: RED });
    T('hemat', 1640, 450, 52, A(4, .5), .3, { c: GREEN });
    D.lingkari(1640, 440, 110, 50, A(4, .7), .25, GREEN);
    D.kacaPembesar(1690, 790, 62, A(5, .2), .4);
    T('untung per piring', 1690, 910, 44, A(5, .5), .3, { c: GREEN });
  },

  // 0 Sebagian pemilik warung takut membuka catatan karena khawatir soal pajak.
  // 1 Direktorat Jenderal Pajak menjelaskan bahwa bagian peredaran bruto sampai 500 juta rupiah dalam satu tahun tidak dikenai PPh.
  // 2 Dengan tarif PPh final sebesar 0,5 persen untuk bagian di atasnya, menurut Peraturan Pemerintah Nomor 20 Tahun 2026.
  // 3 Dalam contoh kita, omzet setahun 432 juta rupiah, jadi masih di bawah batas itu.
  // 4 Ketentuan usahamu bisa berbeda, jadi tanyakan ke kantor pajak, tetapi catatan yang rapi justru memudahkan semuanya.
  pajak(A) {
    TPL.judul(A, 'Pajak bukan momok');
    TPL.tokohBalon(A, { x: 250, y: 905, s: .8, pose: 'berdiri', at: A(0, .05), baju: BLUE,
      balon: { teks: 'Takut pajak...', x: 700, y: 410, ukuran: 56, at: A(0, .45), warna: GRAY } });
    P(G.kantor(1150, 520, 220, 280), A(1, .08), .6, { c: BLUE });
    T('DJP', 1150, 590, 56, A(1, .5), .2, { c: BLUE });
    T('0 - 500 juta', 1560, 400, 80, A(1, .4), .4, { c: GREEN });
    T('tidak dikenai PPh', 1560, 480, 52, A(1, .75), .3, { c: GREEN });
    T('di atasnya 0,5%', 1560, 640, 66, A(2, .15), .4, { c: RED });
    T('PP 20/2026', 1560, 710, 46, A(2, .6), .3, { c: GRAY });
    P(rect(560, 760, 1300, 50, 2), A(3, .05), .3);
    P(rect(560, 760, 1300 * 432 / 1000 * 1.0, 50, 1), A(3, .2), .4, { c: GREEN, fill: GREEN, fillOp: .35 });
    T('432 juta', 560 + 1300 * .432 / 2 + 150, 870, 50, A(3, .55), .3, { c: GREEN });
    P(G.dokumen(1700, 800, 110, 140, 4), A(4, .15), .4, { fill: GOLD, fillOp: .12 });
    T('tanya kantor pajak', 1330, 920, 44, A(4, .4), .3, { c: GRAY });
  },

  // 0 Sekarang, cara memeriksa warungmu dalam satu malam.
  // 1 Pertama, hitung modal tiap menu, termasuk minyak, gas, dan plastik, lalu bagi dengan harga jualnya.
  // 2 Kedua, tentukan satu porsi standar dan catat sisa masakan tiap malam.
  // 3 Ketiga, bagi semua biaya bulanan dengan jumlah piring terjual, lalu tambahkan ke modal per piring.
  // 4 Keempat, bandingkan dengan harga jual, dan ulangi tiap kali harga cabai atau ayam berubah.
  cek(A) {
    TPL.judul(A, 'Periksa warungmu malam ini');
    P(G.siklus(300, 600, 140), A(0, .2), .6, { c: GREEN, w: 7 });
    T('1 malam', 300, 800, 52, A(0, .6), .3, { c: GRAY });
    [
      ['modal tiap menu / harga jual', A(1, .1)],
      ['1 porsi standar + catat sisa', A(2, .1)],
      ['biaya bulanan / jumlah piring', A(3, .1)],
      ['bandingkan, ulangi tiap harga berubah', A(4, .1)],
    ].forEach(([teks, at], i) => {
      const y = 330 + i * 150;
      P(rect(560, y, 1250, 105, 2), at, .3, { c: i === 3 ? GREEN : BLUE, fill: i === 3 ? GREEN : BLUE, fillOp: .07 });
      D.lencana(i + 1, 630, y + 52, 36, at + .1, .3);
      T(teks, 700, y + 70, G.pasUkuran(teks, 52, 1050), at + .3, .5, { anchor: 'start', c: INK });
    });
  },

  // 0 Jadi, kenapa warung makan yang ramai bisa tetap bangkrut?
  // 1 Karena harga ditebak, porsi dan sisa masakan bocor, harga bahan berubah, dan biaya kecil tidak pernah dihitung.
  // 2 Hitung modal tiap piring, standarkan porsi, cek harga bahan tiap minggu, dan catat semua biaya.
  // 3 Dengan begitu, warung yang ramai benar-benar menghasilkan, bukan sekadar sibuk menjual rugi.
  // 4 Buku kas warung satu halaman dan kalkulator HPP gratis ada di deskripsi, tinggal salin.
  // 5 Kalau video ini berguna, langganan Buku Kas Juragan, lalu lanjut ke video soal cara menghitung HPP tiap menu.
  penutup(A) {
    TPL.judul(A, 'Ringkasan', { c: GREEN });
    D.toko(260, 520, 260, A(0, .05), .7, { nama: 'RAMAI' });
    T('?', 260, 640, 110, A(0, .6), .2, { c: RED });
    ['harga ditebak', 'porsi bocor', 'bahan berubah', 'biaya kecil lolos'].forEach((t, i) => {
      const x = 560 + (i % 2) * 380, y = 300 + Math.floor(i / 2) * 140;
      P(rect(x, y, 340, 100, 2), A(1, .1 + i * .2), .25, { c: RED, fill: RED, fillOp: .08 });
      T(t, x + 170, y + 66, G.pasUkuran(t, 50, 310), A(1, .15 + i * .2), .25, { c: RED });
    });
    P(arrow(1360, 400, 1450, 400), A(2, .05), .15, { c: GRAY, w: 7 });
    P(G.lampu(1640, 400, 80), A(2, .15), .4, { c: GOLD, w: 7 });
    T('hitung, standarkan, cek, catat', 1640, 580, 46, A(2, .45), .5, { c: GREEN });
    D.grafik(560, 800, 520, 200, 'naik', A(3, .1), .7, { c: GREEN });
    T('benar-benar menghasilkan', 1330, 780, 54, A(3, .5), .4, { c: GREEN });
    P(G.dokumen(1700, 680, 150, 190, 5), A(4, .1), .4, { fill: GOLD, fillOp: .12 });
    T('buku kas + kalkulator HPP', 1330, 880, 46, A(4, .4), .3, { c: GRAY });
    P(rect(1100, 690, 340, 110, 2), A(5, .4), .3, { c: RED, fill: RED, fillOp: .25, w: 8 });
    T('Langganan', 1270, 768, 64, A(5, .5), .3, { c: RED });
  },
};

