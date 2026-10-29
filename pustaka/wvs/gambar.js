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
