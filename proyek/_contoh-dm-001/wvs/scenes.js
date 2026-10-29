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
  D.koin = (cx, cy, r, at, dur = .4) => { P(icon.coin(cx, cy, r), at, dur * .7, { c: GOLD, fill: GOLD, fillOp: .4 }); T('Rp', cx, cy + r * .28, r * .8, at + dur * .7, dur * .3, { c: INK }); };
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
// dm-001 "7 langkah digital marketing untuk bisnis kecil". 11 adegan, 16:9.
// Memakai pustaka/wvs (G = gambar, D = penggambar, TPL = templat). scenes.js dibuat oleh pustaka/wvs/rakit.js.
// Komentar tiap adegan = kalimat narasi (indeks baris dipakai di A(baris, fraksi)).
window.SCENES = {
  // 0 Banyak bisnis kecil sudah punya akun media sosial, tapi penjualannya tetap sepi.
  // 1 Masalahnya sering bukan di produk, tapi di cara memasarkannya secara digital.
  // 2 Di video ini, ada tujuh langkah digital marketing yang bisa langsung kamu terapkan.
  pembuka(A) {
    TPL.judul(A, 'Penjualan tetap sepi?', { c: RED });
    D.toko(290, 560, 270, A(0, .08), .7, { nama: 'TOKO' });
    const h = G.hp(565, 440, 250);
    P(h.bingkai, A(0, .38), .3);
    P(G.feed(h.layar), A(0, .38) + .3, .25, { c: BLUE, w: 4 });
    P(G.hati(660, 330, 26), A(0, .5), .15, { c: RED, fill: RED, fillOp: .5, w: 5 });
    D.grafik(170, 640, 460, 190, 'datar', A(0, .68), .5);
    T('penjualan sepi', 400, 900, 54, A(0, .8), .3, { c: RED });
    // produk oke, cara memasarkan yang bermasalah
    D.kue(980, 470, 210, A(1, .12), .5);
    T('produk', 960, 545, 56, A(1, .27), .25);
    D.centang(1085, 527, 28, A(1, .35));
    D.megafon(950, 735, .7, A(1, .55), .5);
    T('?', 1175, 780, 130, A(1, .7), .2, { c: RED });
    T('cara memasarkan', 975, 895, 52, A(1, .78), .35);
    // tujuh langkah
    D.wanita(1330, 900, .95, 'menunjuk', A(2, 0), .9, { baju: GREEN });
    D.lencana(7, 1690, 390, 100, A(2, .42), .45);
    T('langkah', 1690, 570, 66, A(2, .55), .3);
    T('digital marketing', 1660, 660, 50, A(2, .68), .35, { c: BLUE });
  },

  // 0 Langkah pertama, tentukan siapa target pelangganmu.
  // 1 Bukan semua orang, tapi satu kelompok yang jelas: umur, lokasi, pekerjaan, dan masalah yang mereka hadapi.
  // 2 Semakin jelas targetnya, semakin mudah kamu membuat pesan yang tepat.
  // 3 Contohnya, toko kue rumahan bisa menargetkan ibu bekerja di sekitar kota yang butuh kue untuk acara keluarga.
  target(A) {
    TPL.judul(A, '1. Tentukan target pelanggan');
    D.target(330, 450, 150, A(0, .4), .75, { dart: true });
    T('semua orang', 345, 680, 50, A(1, 0), .3, { c: GRAY });
    P(G.kerumunan(160, 790, 5, 92, .55), A(1, .05), .4);
    D.coret(345, 800, 80, A(1, .17), .25);
    // kartu persona
    P(rect(760, 270, 560, 540, 2), A(1, .27), .3, { fill: BLUE, fillOp: .04 });
    T('kelompok jelas', 1040, 340, 58, A(1, .33), .3, { c: BLUE });
    TPL.daftar(A, { x: 800, y: 450, gap: 95, ukuran: 56, gaya: 'titik', maks: 360, kotak: 30,
      items: [{ teks: 'umur', at: A(1, .55) }, { teks: 'lokasi', at: A(1, .64) }, { teks: 'pekerjaan', at: A(1, .73) }, { teks: 'masalah', at: A(1, .85) }] });
    D.wanita(1215, 790, .6, 'berpikir', A(1, .4), .7, { baju: GOLD });
    // pesan tepat
    P(arrow(1340, 450, 1405, 450), A(2, .35), .2, { c: GREEN, w: 8 });
    P(G.balon(1460, 380, 370, 130, 'kiriSamping'), A(2, .5), .3, { c: GREEN, fill: GREEN, fillOp: .08 });
    T('pesan tepat', 1645, 467, 64, A(2, .68), .35, { c: GREEN });
    // contoh: toko kue rumahan -> ibu bekerja
    D.kue(1470, 880, 150, A(3, .18), .45);
    T('toko kue', 1470, 700, 46, A(3, .3), .25, { c: GRAY });
    P(arrow(1570, 800, 1655, 800), A(3, .45), .15, { c: GRAY, w: 6 });
    D.wanita(1750, 900, .58, 'berdiri', A(3, .5), .6, { baju: RED });
    T('ibu bekerja', 1740, 650, 46, A(3, .66), .25, { c: RED });
  },

  // 0 Langkah kedua, punya rumah digital sendiri, yaitu website.
  // 1 Aturan media sosial bisa berubah kapan saja, tapi website sepenuhnya milikmu.
  // 2 Website juga membuat bisnismu terlihat lebih terpercaya di mata calon pelanggan.
  // 3 Cukup mulai dari halaman sederhana: siapa kamu, apa yang kamu jual, bukti dari pelanggan, dan tombol untuk menghubungi.
  website(A) {
    TPL.judul(A, '2. Punya website sendiri');
    P(G.rumah(260, 560, 210), A(0, .3), .45, { c: GREEN, fill: GREEN, fillOp: .12 });
    T('rumah digital', 260, 635, 54, A(0, .45), .3, { c: GREEN });
    P(arrow(400, 440, 500, 440), A(0, .6), .15, { c: GRAY, w: 6 });
    const l = G.laptop(560, 280, 460);
    P(l.bingkai + l.alas, A(0, .66), .45);
    P(G.web(l.layar.x, l.layar.y, l.layar.w, l.layar.h), A(0, .66) + .45, .4, { c: BLUE, w: 4 });
    // aturan medsos berubah vs milikmu
    const h = G.hp(240, 795, 190);
    P(h.bingkai, A(1, .05), .25);
    P(G.feed(h.layar), A(1, .05) + .25, .2, { c: BLUE, w: 3 });
    T('aturan bisa berubah', 350, 790, 50, A(1, .25), .4, { anchor: 'start', c: RED });
    D.silang(750, 772, 24, A(1, .45));
    T('milikmu', 800, 705, 64, A(1, .7), .3, { c: GREEN });
    D.centang(940, 685, 30, A(1, .8));
    // terpercaya
    P(G.perisai(1220, 390, 95), A(2, .35), .35, { c: GREEN, fill: GREEN, fillOp: .15 });
    P(G.centang(1180, 345, 80), A(2, .35) + .35, .15, { c: GREEN, w: 10 });
    D.bintang(1560, 350, 36, 5, 82, A(2, .55), .4);
    T('terpercaya', 1560, 460, 62, A(2, .7), .3, { c: GREEN });
    // halaman sederhana
    TPL.daftar(A, { x: 1130, y: 600, gap: 86, ukuran: 54, maks: 680, kotak: 48,
      items: [{ teks: 'siapa kamu', at: A(3, .3) }, { teks: 'apa yang kamu jual', at: A(3, .45) },
        { teks: 'bukti dari pelanggan', at: A(3, .62) }, { teks: 'tombol hubungi', at: A(3, .78) }] });
  },

  // 0 Langkah ketiga, optimalkan website untuk Google dengan SEO.
  // 1 Tulis artikel yang menjawab pertanyaan calon pelanggan, dengan kata kunci yang benar-benar mereka cari.
  // 2 Hasilnya memang tidak instan, tapi pengunjung dari Google datang terus setiap hari.
  // 3 Satu artikel yang bagus bisa mendatangkan calon pelanggan selama bertahun-tahun, tanpa perlu kamu promosikan ulang.
  seo(A) {
    TPL.judul(A, '3. SEO: muncul di Google');
    D.google(240, 370, 90, A(0, .42), .55);
    P(G.kolomCari(400, 320, 980, 100), A(0, .62), .4, { fill: BLUE, fillOp: .04 });
    T('SEO', 1600, 405, 120, A(0, .82), .35, { c: BLUE });
    // artikel + pertanyaan + kata kunci
    P(G.dokumen(140, 520, 200, 260), A(1, .08), .4, { fill: GOLD, fillOp: .1 });
    T('artikel', 240, 850, 56, A(1, .18), .25);
    D.wanita(520, 890, .82, 'berpikir', A(1, .26), .7, { baju: BLUE });
    P(G.awanPikir(670, 500, 62, 46, 570, 580), A(1, .45), .25);
    T('?', 670, 528, 80, A(1, .5), .15, { c: RED });
    T('kue ulang tahun terdekat', 490, 392, 56, A(1, .68), .6, { anchor: 'start', c: BLUE });
    // tidak instan, tapi datang terus
    D.grafik(830, 540, 460, 270, 'naikPelan', A(2, .1), .7);
    T('tidak instan', 980, 580, 48, A(2, .3), .3, { c: RED });
    P(G.kerumunan(1320, 690, 3, 58, .42), A(2, .55), .35, { c: GREEN });
    T('pengunjung tiap hari', 1080, 885, 52, A(2, .72), .4, { c: GREEN });
    // bertahun-tahun
    ['2026', '2027', '2028'].forEach((y, i) => { D.kalender(1500 + i * 120, 580, 100, 100, A(3, .4 + i * .08), .25, { kol: 4, bar: 2 }); T(y, 1550 + i * 120, 730, 42, A(3, .4 + i * .08) + .25, .1, { c: GRAY }); });
    T('bertahun-tahun', 1660, 810, 54, A(3, .7), .3, { c: GREEN });
  },

  // 0 Langkah keempat, buat konten secara konsisten.
  // 1 Pilih dua atau tiga jenis konten, misalnya tips, cerita pelanggan, dan di balik layar.
  // 2 Lebih baik tiga konten seminggu tapi rutin, daripada sepuluh konten lalu berhenti sebulan.
  // 3 Buat jadwal sederhana, misalnya Senin tips, Rabu cerita pelanggan, dan Jumat di balik layar.
  konten(A) {
    TPL.judul(A, '4. Konten yang konsisten');
    const h = G.hp(240, 420, 250);
    P(h.bingkai, A(0, .35), .3);
    P(G.feed(h.layar), A(0, .35) + .3, .25, { c: BLUE, w: 4 });
    P(G.siklus(240, 420, 168), A(0, .65), .35, { c: GREEN, w: 6 });
    const ik = [
      ['tips', (cx, cy, at) => P(G.lampu(cx, cy - 10, 40), at, .35, { c: GOLD, w: 6 })],
      ['cerita', (cx, cy, at) => { P(G.balon(cx - 60, cy - 50, 120, 70, 'kiri'), at, .2, { c: BLUE, w: 5 }); D.bintang(cx, cy - 15, 14, 3, 34, at + .2, .15); }],
      ['balik layar', (cx, cy, at) => P(G.kamera(cx, cy, 120), at, .35, { w: 6 })],
    ];
    ik.forEach(([lab, g], i) => TPL.kartu(A, { x: 470 + i * 230, y: 280, w: 190, h: 160, gambar: g, label: lab, at: A(1, [.4, .58, .8][i]), ukuran: 46 }));
    // 3 rutin vs 10 lalu berhenti
    TPL.duaKolom(A, { x0: 110, x1: 1130, y0: 600, y1: 905, vs: true,
      kiri: { judul: '3 seminggu, rutin', warna: GREEN, at: A(2, .08), ukuran: 54,
        gambar: (cx, cy, at) => D.batang(cx - 175, cy + 95, [3, 3, 3, 3, 3], at, .45, { bw: 44, gap: 20, hmax: 110, c: GREEN }) },
      kanan: { judul: '10 lalu berhenti', warna: RED, at: A(2, .55), ukuran: 54,
        gambar: (cx, cy, at) => D.batang(cx - 175, cy + 95, [10, .3, .3, .3, .3], at, .45, { bw: 44, gap: 20, hmax: 110, c: RED }) } });
    // jadwal
    const kx = 1230, ky = 300, kw = 590, kh = 470;
    D.kalender(kx, ky, kw, kh, A(3, .05), .55, { judul: 'JADWAL' });
    ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].forEach((d, i) => { const c = G.selKalender(kx, ky, kw, kh, i, 0); T(d, c.x, c.y + 14, 40, A(3, .2) + i * .05, .05, { c: [0, 2, 4].includes(i) ? INK : GRAY }); });
    const sel = c => G.selKalender(kx, ky, kw, kh, c, 1);
    let c = sel(0); P(G.lampu(c.x, c.y - 8, 24), A(3, .45), .25, { c: GOLD, w: 5 });
    c = sel(2); P(G.balon(c.x - 32, c.y - 26, 64, 40, 'kiri'), A(3, .66), .2, { c: BLUE, w: 5 });
    c = sel(4); P(G.kamera(c.x, c.y, 64), A(3, .84), .2, { w: 5 });
    for (const k of [0, 2, 4]) for (const r of [2, 3]) { const q = G.selKalender(kx, ky, kw, kh, k, r); P(icon.tick(q.x, q.y, 22), A(3, .55) + k * .04 + r * .03, .08, { c: GREEN, w: 5 }); }
  },

  // 0 Langkah kelima, pilih platform media sosial yang tepat.
  // 1 Tidak perlu ada di semua platform. Cari tahu di mana target pelangganmu paling sering berkumpul.
  // 2 Fokus di satu atau dua platform dulu, lalu kuasai dengan baik.
  // 3 Bisnis untuk anak muda mungkin cocok di TikTok, sedangkan jasa untuk perusahaan lebih cocok di LinkedIn.
  platform(A) {
    TPL.judul(A, '5. Pilih platform yang tepat');
    const xs = [360, 660, 960, 1260, 1560], nm = ['ig', 'fb', 'yt', 'tiktok', 'in'];
    nm.forEach((n, i) => D.platform(n, xs[i], 350, 70, A(0, .3 + i * .1), .3));
    [0, 1, 2].forEach(i => D.silang(xs[i], 480, 26, A(1, .12 + i * .06), .2));
    // cari tahu tempat berkumpul
    D.wanita(960, 900, .8, 'menunjuk', A(1, .4), .7, { arah: -1, baju: RED });
    D.kacaPembesar(762, 594, 40, A(1, .55), .3);
    P(G.kerumunan(1205, 520, 3, 55, .4), A(1, .72), .3, { c: GREEN });
    P(G.kerumunan(1505, 520, 3, 55, .4), A(1, .82), .3, { c: GREEN });
    // fokus 1-2
    D.lingkari(1260, 350, 112, 100, A(2, .2), .35);
    D.lingkari(1560, 350, 112, 100, A(2, .32), .35);
    T('fokus 1 atau 2', 1410, 635, 56, A(2, .55), .4, { c: GREEN });
    // anak muda -> TikTok ; perusahaan -> LinkedIn
    P(G.kerumunan(170, 790, 3, 72, .5), A(3, .08), .35);
    T('anak muda', 245, 905, 48, A(3, .18), .25);
    P(arrow(390, 790, 470, 790), A(3, .3), .15, { c: GRAY, w: 6 });
    D.platform('tiktok', 545, 790, 55, A(3, .36), .3);
    P(G.kantor(1340, 845, 110, 165), A(3, .6), .35, { c: BLUE });
    T('perusahaan', 1340, 900, 44, A(3, .67), .2, { c: BLUE });
    P(arrow(1430, 780, 1520, 780), A(3, .75), .15, { c: GRAY, w: 6 });
    D.platform('in', 1600, 780, 55, A(3, .8), .3);
  },

  // 0 Langkah keenam, kumpulkan kontak calon pelanggan.
  // 1 Tawarkan sesuatu yang bermanfaat, misalnya panduan gratis, sebagai ganti nomor WhatsApp atau email mereka.
  // 2 Kontak ini adalah aset yang bisa kamu hubungi kapan saja, tanpa bergantung pada algoritma.
  // 3 Kirim pesan yang bermanfaat secara rutin, bukan hanya promosi, supaya mereka tetap ingat dengan bisnismu.
  kontak(A) {
    TPL.judul(A, '6. Kumpulkan kontak');
    D.wanita(210, 900, 1, 'pegangHp', A(0, .3), .8, { baju: BLUE });
    P(rect(350, 290, 290, 330, 2), A(0, .55), .25, { fill: GOLD, fillOp: .08 });
    let rows = ''; [360, 450, 540].forEach(y => { rows += circ(392, y, 22) + line(430, y - 8, 600, y - 8, 1) + line(430, y + 14, 560, y + 14, 1); });
    P(rows, A(0, .55) + .25, .45, { w: 5 });
    // panduan gratis <-> WhatsApp / email
    P(G.hadiah(800, 410, 150), A(1, .3), .35, { c: RED, fill: RED, fillOp: .15 });
    T('panduan gratis', 800, 590, 50, A(1, .4), .3, { c: RED });
    P(arrow(905, 380, 1000, 380), A(1, .53), .12, { c: GREEN, w: 7 });
    P(arrow(1000, 450, 905, 450), A(1, .58), .12, { c: GRAY, w: 7 });
    D.whatsapp(1085, 410, 58, A(1, .66), .35);
    P(G.email(1250, 410, 140), A(1, .82), .25, { c: BLUE, fill: BLUE, fillOp: .08 });
    // aset, kapan saja, tanpa algoritma
    P(G.jam(1420, 330, 48), A(2, .55), .3, { c: BLUE });
    P(G.brankas(1620, 390, 200), A(2, .15), .4, { c: GOLD, fill: GOLD, fillOp: .1 });
    T('aset', 1620, 560, 66, A(2, .3), .25, { c: GOLD });
    const b = T('algoritma', 1600, 640, 52, A(2, .78), .25, { c: GRAY });
    P(line(b.x - 8, b.y + b.height * .55, b.x + b.width + 8, b.y + b.height * .55, 1), A(2, .78) + .25, .12, { c: RED, w: 7 });
    // pesan rutin, bukan hanya promosi
    const bl = [['tips', GREEN, 720, A(3, .12)], ['cerita', BLUE, 1010, A(3, .3)], ['promo', GRAY, 1300, A(3, .62)]];
    bl.forEach(([t, c, x, at]) => {
      P(G.balon(x, 720, 250, 100, 'kiri'), at, .25, { c, fill: c, fillOp: .08 });
      T(t, x + 125, 790, 58, at + .25, .2, { c });
    });
    D.centang(970, 718, 22, A(3, .2), .15);
    D.centang(1260, 718, 22, A(3, .38), .15);
    P(G.hati(1700, 770, 48), A(3, .8), .25, { c: RED, fill: RED, fillOp: .45 });
  },

  // 0 Langkah ketujuh, gunakan iklan berbayar dengan bijak.
  // 1 Mulai dari anggaran kecil, uji beberapa versi iklan, lalu lihat mana yang paling banyak menghasilkan pesan masuk.
  // 2 Iklan yang terbukti berhasil, baru kamu besarkan anggarannya.
  // 3 Jangan langsung menghabiskan anggaran besar di hari pertama, karena kamu belum tahu iklan mana yang benar-benar bekerja.
  iklan(A) {
    TPL.judul(A, '7. Iklan yang terukur');
    D.megafon(290, 400, .85, A(0, .35), .55);
    D.koin(210, 580, 42, A(0, .62), .3);
    D.koin(320, 580, 42, A(0, .7), .3);
    // anggaran kecil, uji A B C, lihat pesan masuk
    D.koin(620, 330, 34, A(1, .1), .25);
    T('kecil', 620, 420, 46, A(1, .16), .2, { c: GRAY });
    ['A', 'B', 'C'].forEach((k, i) => {
      const x = 760 + i * 200, at = A(1, .32 + i * .07);
      P(rect(x, 280, 160, 190, 2), at, .2, { c: BLUE, fill: BLUE, fillOp: .05 });
      T(k, x + 80, 410, 110, at + .2, .15, { c: BLUE });
    });
    let bars = ''; [70, 210, 40].forEach((hh, i) => { bars += rect(800 + i * 200, 760 - hh, 80, hh, 1.5); });
    P(line(740, 760, 1340, 760, 1), A(1, .62), .1);
    P(bars, A(1, .62) + .1, .35, { c: GREEN, fill: GREEN, fillOp: .3 });
    D.whatsapp(1300, 600, 36, A(1, .8), .3);
    T('pesan masuk', 1040, 830, 50, A(1, .86), .3, { c: GREEN });
    // terbukti -> besarkan anggaran
    D.lingkari(1040, 375, 112, 120, A(2, .18), .3);
    D.centang(1120, 268, 28, A(2, .3), .2);
    [2, 4, 7].forEach((n, i) => P(G.tumpukanKoin(1480 + i * 130, 760, n, 46), A(2, .45 + i * .08), .25, { c: GOLD, fill: GOLD, fillOp: .3 }));
    P(arrow(1440, 560, 1760, 340), A(2, .7), .2, { c: GREEN, w: 9 });
    T('besarkan anggaran', 1610, 850, 52, A(2, .78), .3, { c: GREEN });
    // jangan habiskan di hari pertama
    P(G.kantongUang(240, 800, .9), A(3, .2), .3, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('Rp', 240, 830, 56, A(3, .2) + .3, .1);
    D.kalender(400, 690, 190, 170, A(3, .4), .35, { kol: 4, bar: 2 });
    T('HARI 1', 495, 805, 52, A(3, .48), .2, { c: RED });
    D.coret(400, 780, 115, A(3, .58), .25);
    T('?', 650, 850, 120, A(3, .8), .2, { c: RED });
  },

  // 0 Setelah semua berjalan, jangan lupa ukur hasilnya.
  // 1 Pantau angka penting seperti jumlah pengunjung, pesan masuk, dan penjualan setiap minggu.
  // 2 Dari data inilah kamu tahu langkah mana yang perlu ditambah, dan mana yang perlu dihentikan.
  // 3 Tidak perlu alat yang rumit. Satu lembar tabel sederhana yang diisi setiap minggu sudah cukup untuk memulai.
  ukur(A) {
    TPL.judul(A, 'Ukur hasilnya');
    D.wanita(240, 900, 1, 'menunjuk', A(0, .35), .8, { baju: GREEN });
    const kartu = [
      ['pengunjung', (cx, cy, at) => P(G.kerumunan(cx - 70, cy + 10, 3, 70, .5), at, .3)],
      ['pesan masuk', (cx, cy, at) => D.whatsapp(cx, cy, 52, at, .3)],
      ['penjualan', (cx, cy, at) => D.koin(cx, cy, 55, at, .3)],
    ];
    kartu.forEach(([lab, g], i) => TPL.kartu(A, { x: 560 + i * 430, y: 270, w: 300, h: 200, gambar: g, label: lab, at: A(1, [.4, .58, .76][i]), ukuran: 54 }));
    // ditambah vs dihentikan
    TPL.duaKolom(A, { x0: 520, x1: 1140, y0: 620, y1: 905,
      kiri: { judul: 'tambah', warna: GREEN, at: A(2, .45), gambar: (cx, cy, at) => P(arrow(cx, cy + 75, cx, cy - 55), at, .2, { c: GREEN, w: 14 }) },
      kanan: { judul: 'hentikan', warna: RED, at: A(2, .78), gambar: (cx, cy, at) => D.silang(cx, cy + 10, 55, at, .2) } });
    // tabel sederhana
    P(G.tabel(1230, 640, 570, 250, 4, 4), A(3, .45), .45);
    let isi = '';
    for (let r = 1; r < 4; r++) for (let c = 0; c < 4; c++) { const x = 1230 + c * 142.5 + 28, y = 640 + r * 62.5 + 31; isi += line(x, y, x + 60 + ((r + c) % 3) * 15, y, 1.5); }
    P(isi, A(3, .68), .35, { c: BLUE, w: 5 });
    T('Minggu', 1301, 690, 40, A(3, .62), .1, { c: GRAY });
  },

  // 0 Jadi, tujuh langkahnya adalah: target yang jelas, website, SEO, konten yang konsisten, platform yang tepat, kumpulkan kontak, dan iklan yang terukur.
  // 1 Jalankan satu per satu, jangan sekaligus.
  ringkas(A) {
    TPL.judul(A, '7 langkah');
    const it = ['Target jelas', 'Website', 'SEO', 'Konten konsisten', 'Platform tepat', 'Kumpulkan kontak', 'Iklan terukur'];
    const fr = [.2, .3, .36, .43, .58, .72, .86];
    TPL.daftar(A, { x: 140, y: 330, gap: 140, ukuran: 62, gaya: 'nomor', maks: 580, kotak: 76, items: it.slice(0, 4).map((t, i) => ({ teks: t, at: A(0, fr[i]) })) });
    TPL.daftar(A, { x: 760, y: 330, gap: 140, ukuran: 62, gaya: 'nomor', maks: 600, kotak: 76, mulai: 5, items: it.slice(4).map((t, i) => ({ teks: t, at: A(0, fr[i + 4]) })) });
    // satu per satu
    P(G.tangga(1400, 880, 4, 100, 105), A(1, .02), .35);
    D.wanita(1450, 775, .6, 'senang', A(1, .15), .7, { baju: GOLD });
    T('satu per satu', 1620, 330, 62, A(1, .55), .3, { c: GREEN });
  },

  // 0 Digital marketing bukan soal viral sekali, tapi soal sistem yang berjalan terus.
  // 1 Kalau video ini bermanfaat, ikuti channel ini untuk tips digital marketing berikutnya.
  penutup(A) {
    TPL.judul(A, 'Bangun sistemnya');
    D.grafik(150, 300, 430, 260, 'lonjakan', A(0, .2), .5, { c: RED });
    T('viral sekali', 365, 640, 58, A(0, .36), .3, { c: RED });
    D.silang(560, 300, 30, A(0, .45), .2);
    P(G.siklus(1000, 460, 170), A(0, .58), .4, { c: GREEN, w: 8 });
    T('sistem', 1000, 482, 66, A(0, .7), .25, { c: GREEN });
    D.google(1000, 290, 28, A(0, .78), .25);
    D.whatsapp(1150, 540, 28, A(0, .84), .2);
    D.koin(850, 540, 28, A(0, .9), .2);
    T('berjalan terus', 1000, 720, 56, A(0, .95), .3, { c: GREEN });
    // ikuti
    D.wanita(1710, 880, .95, 'senang', A(1, .05), .8, { baju: RED });
    P(rect(1220, 700, 330, 120, 2), A(1, .5), .25, { c: RED, fill: RED, fillOp: .25, w: 8 });
    T('Ikuti', 1385, 790, 92, A(1, .5) + .25, .2, { c: RED });
    T('tips digital marketing', 1400, 900, 50, A(1, .72), .3, { c: GRAY });
  },
};

