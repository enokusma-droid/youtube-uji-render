// N1-001 "The Lifestyle Inflation Trap, Explained" (Money in the Margin). 13 adegan, 16:9, semua teks layar bahasa Inggris.
// Memakai pustaka/wvs (G, D, TPL). scenes.js dibuat oleh pustaka/wvs/rakit.js. Komentar = kalimat narasi (indeks baris untuk A(baris, fraksi)).
window.SCENES = {
  // 0 Why does a bigger paycheck so often leave you feeling just as broke?
  // 1 You get a raise, you feel great for a month, and then the money seems to vanish again.
  // 2 That pattern has a name: lifestyle inflation, sometimes called lifestyle creep.
  // 3 In six minutes, I will show you how it works, why it is so hard to notice, and three simple ways to push back.
  hook(A) {
    TPL.judul(A, 'Bigger paycheck, still broke?', { c: RED });
    P(G.dokumen(140, 290, 240, 300), A(0, .08), .5, { c: INK, fill: GREEN, fillOp: .12 });
    T('$$$', 260, 470, 96, A(0, .3), .3, { c: GREEN });
    P(arrow(450, 570, 450, 320), A(0, .45), .3, { c: GREEN, w: 10 });
    T('bigger paycheck', 300, 680, 54, A(0, .6), .4);
    D.wanita(830, 900, .85, 'berpikir', A(0, .55), .9, { baju: BLUE });
    T('?', 930, 560, 130, A(0, .85), .2, { c: RED });
    D.grafik(1130, 290, 600, 260, 'lonjakan', A(1, .15), .7, { c: RED });
    T('the raise vanishes', 1430, 640, 54, A(1, .6), .4, { c: RED });
    const b = T('Lifestyle inflation', 1430, 790, 80, A(2, .3), .6, { c: INK });
    D.garisBawah(b, A(2, .3) + .6, .25);
    TPL.daftar(A, { x: 130, y: 745, gap: 72, ukuran: 46, gaya: 'nomor', maks: 600, kotak: 48,
      items: [{ teks: 'how it works', at: A(3, .25) }, { teks: 'why we miss it', at: A(3, .5) }, { teks: '3 ways to push back', at: A(3, .75) }] });
  },

  // 0 Lifestyle inflation means your spending rises every time your income rises.
  // 1 It rarely looks like one big mistake.
  // 2 It looks like a slightly nicer apartment, a newer car, or one more dinner out each week.
  // 3 Each upgrade feels small and reasonable on its own.
  // 4 The trap is that the upgrades add up, and they quietly become your new normal.
  definisi(A) {
    TPL.judul(A, 'What is lifestyle inflation?');
    D.batang(150, 780, [3, 4, 5, 6], A(0, .1), .7, { bw: 70, gap: 30, hmax: 300, c: GREEN });
    T('income', 365, 850, 56, A(0, .5), .3, { c: GREEN });
    D.batang(680, 780, [3, 4, 5, 6], A(0, .5), .7, { bw: 70, gap: 30, hmax: 300, c: RED });
    T('spending', 895, 850, 56, A(0, .8), .3, { c: RED });
    T('no single big mistake', 1480, 830, 52, A(1, .1), .4, { c: GRAY });
    const ic = [
      ['nicer apartment', (cx, cy, at) => P(G.rumah(cx, cy + 45, 120), at, .4, { c: GREEN, fill: GREEN, fillOp: .1 })],
      ['newer car', (cx, cy, at) => P(G.mobil(cx, cy, 130), at, .4, { c: BLUE, fill: BLUE, fillOp: .1 })],
      ['dinner out', (cx, cy, at) => P(G.piring(cx, cy, 42), at, .4, { c: GOLD, w: 6 })],
    ];
    ic.forEach(([lab, g], i) => TPL.kartu(A, { x: 1160 + i * 220, y: 290, w: 190, h: 160, gambar: g, label: lab, at: A(2, [.25, .5, .75][i]), ukuran: 36 }));
    T('each one feels small', 1480, 600, 56, A(3, .2), .4, { c: INK });
    const b = T('= your new normal', 1480, 720, 68, A(4, .45), .5, { c: RED });
    D.garisBawah(b, A(4, .45) + .5, .25, RED);
  },

  // 0 Let's start with real numbers.
  // 1 The U.S. Bureau of Labor Statistics reports that the average household spent $78,535 in 2024.
  // 2 That was up 1.8 percent from the year before.
  // 3 Average income before taxes rose 2.4 percent over the same period, to $104,207.
  // 4 Averages hide a lot, and they do not prove anything about one person, but they show two numbers climbing together.
  angka(A) {
    TPL.judul(A, '1. The numbers');
    T('average U.S. household, 2024', 960, 270, 50, A(0, .2), .5, { c: GRAY });
    P(rect(130, 330, 770, 340, 2), A(1, .02), .4, { c: RED, fill: RED, fillOp: .04 });
    T('spending', 515, 405, 52, A(1, .15), .3, { c: GRAY });
    T('$78,535', 515, 540, 130, A(1, .35), .6, { c: INK });
    T('+1.8%', 515, 640, 84, A(2, .1), .4, { c: RED });
    P(arrow(680, 640, 760, 580), A(2, .45), .2, { c: RED, w: 8 });
    P(rect(1020, 330, 770, 340, 2), A(3, .02), .4, { c: GREEN, fill: GREEN, fillOp: .04 });
    T('income before taxes', 1405, 405, 52, A(3, .1), .35, { c: GRAY });
    T('$104,207', 1405, 540, 130, A(3, .3), .6, { c: INK });
    T('+2.4%', 1405, 640, 84, A(3, .65), .35, { c: GREEN });
    P(arrow(1570, 640, 1650, 580), A(3, .85), .15, { c: GREEN, w: 8 });
    T('averages, not proof about one person', 960, 770, 46, A(4, .05), .6, { c: GRAY });
    const b = T('two numbers climbing together', 960, 870, 70, A(4, .55), .7, { c: GREEN });
    D.garisBawah(b, A(4, .55) + .7, .2, GREEN);
  },

  // 0 So where does the money go?
  // 1 The same survey found that housing took 33.4 percent of spending, and transportation took 17.0 percent.
  // 2 Together, that is more than half of the average household budget.
  // 3 These are also the upgrades that are hardest to undo.
  // 4 A bigger lease or a car payment is a commitment that can run for months or years.
  tetap(A) {
    TPL.judul(A, '2. The big two');
    T('where does the money go?', 960, 300, 62, A(0, .1), .6, { c: INK });
    P(rect(210, 450, 1500, 150, 2), A(0, .55), .5);
    P(rect(210, 450, 501, 150, 2), A(1, .05), .4, { c: GREEN, fill: GREEN, fillOp: .22 });
    P(G.rumah(460, 585, 110), A(1, .2), .35, { c: GREEN });
    T('housing', 460, 655, 46, A(1, .3), .25);
    T('33.4%', 460, 725, 70, A(1, .4), .3, { c: GREEN });
    P(rect(711, 450, 255, 150, 2), A(1, .55), .4, { c: BLUE, fill: BLUE, fillOp: .22 });
    P(G.mobil(838, 525, 140), A(1, .7), .35, { c: BLUE });
    T('transportation', 838, 655, 46, A(1, .78), .3);
    T('17.0%', 838, 725, 70, A(1, .88), .3, { c: BLUE });
    T('everything else', 1338, 540, 52, A(1, .92), .3, { c: GRAY });
    P(line(210, 415, 966, 415, 1), A(2, .1), .3, { c: RED, w: 8 });
    T('more than half', 588, 395, 56, A(2, .35), .4, { c: RED });
    T('hardest to undo', 600, 830, 64, A(3, .2), .5, { c: RED });
    D.kalender(1380, 690, 240, 170, A(4, .1), .5, { kol: 4, bar: 2 });
    T('months or years', 1500, 900, 52, A(4, .55), .4, { c: GRAY });
    T('lease or car loan', 860, 900, 46, A(4, .15), .4, { c: GRAY });
  },

  // 0 So why do we keep upgrading?
  // 1 Part of the answer is adaptation.
  // 2 In a famous 1978 study, psychologists Philip Brickman, Dan Coates, and Ronnie Janoff-Bulman compared 22 lottery winners with a control group.
  // 3 Their finding was that happiness mostly drifted back to ordinary levels after the first excitement.
  // 4 Later research shows the picture is more complicated, and people adapt to some changes more than others.
  // 5 Still, the idea is useful: a new upgrade thrills you at first, and then it fades into the background.
  // 6 Once the thrill fades, the next upgrade starts to look tempting.
  adaptasi(A) {
    TPL.judul(A, '3. Why upgrades fade');
    T('why keep upgrading?', 160, 320, 54, A(0, .2), .5, { anchor: 'start', c: GRAY });
    T('adaptation', 1400, 330, 92, A(1, .15), .5, { c: BLUE });
    P(G.dokumen(1130, 420, 150, 200), A(2, .1), .4, { c: INK, fill: GOLD, fillOp: .15 });
    T('1978', 1205, 670, 50, A(2, .35), .3, { c: GRAY });
    D.koin(1460, 450, 45, A(2, .45), .4, { simbol: '$' });
    T('22 lottery winners', 1560, 560, 54, A(2, .6), .45, { c: INK });
    T('vs. a control group', 1560, 625, 50, A(2, .85), .3, { c: GRAY });
    T('happiness drifted back', 1500, 745, 58, A(3, .15), .5, { c: BLUE });
    T('(it is more complicated)', 1500, 810, 44, A(4, .2), .45, { c: GRAY });
    // kurva rasa senang: lonjakan lalu turun ke "normal baru"
    P(poly([[170, 450], [170, 860], [900, 860]], false, 1), A(5, .02), .3);
    P(poly([[170, 800], [250, 780], [340, 520], [420, 480], [500, 560], [610, 680], [740, 740], [880, 750]], false, 1.5), A(5, .2), .9, { c: GREEN, w: 9 });
    P(line(170, 750, 900, 750, .5), A(5, .6), .3, { c: GRAY, w: 3 });
    T('thrill', 420, 450, 50, A(5, .4), .25, { c: GREEN });
    T('new normal', 700, 810, 46, A(5, .75), .3, { c: GRAY });
    const b = T('next upgrade?', 1500, 900, 68, A(6, .3), .45, { c: RED });
    D.lingkari(1500, 880, 250, 55, A(6, .3) + .45, .35, RED);
  },

  // 0 Here is what that cycle can cost.
  // 1 The Federal Reserve asks adults whether they could cover a $400 emergency expense using cash or its equivalent.
  // 2 In 2025, 63 percent said yes.
  // 3 That leaves about 37 percent who would need another way to pay, such as borrowing or selling something.
  // 4 The share was 68 percent in 2021, so it has slipped since then.
  // 5 A thin cushion is what makes every surprise feel like a crisis, no matter how big the paycheck is.
  bantalan(A) {
    TPL.judul(A, '4. The cost: a thin cushion');
    P(G.kantongUang(250, 470, 1.25), A(1, .1), .5, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('$400', 250, 690, 100, A(1, .45), .4, { c: INK });
    T('emergency bill', 250, 760, 46, A(1, .65), .3, { c: GRAY });
    T('in cash', 250, 815, 46, A(1, .8), .25, { c: GRAY });
    P(rect(600, 420, 1200, 120, 2), A(2, .02), .4);
    P(rect(600, 420, 756, 120, 2), A(2, .2), .4, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('63%', 978, 505, 90, A(2, .45), .35, { c: INK });
    T('could cover it in 2025', 978, 610, 48, A(2, .65), .35, { c: GREEN });
    P(rect(1356, 420, 444, 120, 2), A(3, .15), .4, { c: RED, fill: RED, fillOp: .18 });
    T('37%', 1578, 505, 90, A(3, .4), .35, { c: RED });
    T('need another way to pay', 1578, 610, 44, A(3, .6), .4, { c: RED });
    P(line(1416, 385, 1416, 575, 1), A(4, .1), .3, { c: GRAY, w: 6 });
    T('68% in 2021', 1416, 365, 46, A(4, .3), .35, { c: GRAY });
    P(arrow(1416, 690, 1350, 690), A(4, .6), .25, { c: RED, w: 8 });
    T('slipped', 1500, 705, 46, A(4, .7), .25, { c: RED });
    const b = T('thin cushion = every surprise is a crisis', 960, 880, 64, A(5, .1), .9, { c: INK });
    D.garisBawah(b, A(5, .1) + .9, .25, RED);
  },

  // 0 Now let's make this concrete.
  // 1 Imagine you get a raise of $500 a month after taxes.
  // 2 Option one: the raise becomes a nicer apartment and more dinners out, and your savings do not change.
  // 3 Option two: you keep living on your old income and send the full $500 to savings.
  // 4 Over one year, that is $6,000.
  hitung(A) {
    TPL.judul(A, '5. A simple example');
    D.koin(210, 300, 48, A(1, .1), .4, { simbol: '$' });
    T('raise: +$500 a month', 290, 315, 60, A(1, .3), .6, { anchor: 'start', c: GREEN });
    const b = T('x 12 = $6,000 a year', 1010, 315, 66, A(4, .15), .7, { anchor: 'start', c: GREEN });
    D.garisBawah(b, A(4, .15) + .7, .2, GREEN);
    TPL.duaKolom(A, { x0: 120, x1: 1800, y0: 420, y1: 905, vs: true,
      kiri: { judul: 'Option 1: upgrade', warna: RED, at: A(2, .08), ukuran: 54,
        gambar: (cx, cy, at) => P(G.rumah(cx, cy + 50, 230), at, .5, { c: RED, fill: RED, fillOp: .1 }),
        catatan: 'savings do not change', atCatatan: A(2, .6) },
      kanan: { judul: 'Option 2: save it', warna: GREEN, at: A(3, .08), ukuran: 54,
        gambar: (cx, cy, at) => D.batang(cx - 185, cy + 110, [1, 2, 3, 4, 5], at, .6, { bw: 50, gap: 20, hmax: 200, c: GREEN }),
        catatan: '+$500 saved every month', atCatatan: A(3, .6) } });
  },

  // 0 Here is where time matters.
  // 1 The Consumer Financial Protection Bureau explains compound interest as earning interest on your savings and on the interest you already earned.
  // 2 Its example: $1,000 at 5 percent becomes $1,050 after one year, and $1,102.50 after two.
  // 3 Now take our $6,000 a year, and assume an average return of 7 percent, which is only an illustration and not a prediction.
  // 4 After 20 years, that adds up to about $246,000.
  // 5 Roughly half of that is your own money, and the rest is growth, which is never certain.
  bunga(A) {
    TPL.judul(A, '6. Time does the heavy lifting');
    T('interest on interest', 960, 262, 50, A(1, .1), .5, { c: GRAY });
    TPL.alur(A, { x: 140, y: 290, w: 260, h: 100, gap: 120, ukuran: 54, items: [
      { teks: '$1,000', at: A(2, .08), warna: INK }, { teks: '$1,050', at: A(2, .4), warna: GREEN }, { teks: '$1,102.50', at: A(2, .7), warna: GREEN }] });
    ['start', 'year 1', 'year 2'].forEach((s, i) => T(s, 270 + i * 380, 435, 40, A(2, [.2, .5, .8][i]), .2, { c: GRAY }));
    T('at 5% a year', 1250, 355, 52, A(2, .5), .4, { anchor: 'start', c: GRAY });
    T('$6,000 a year', 130, 560, 70, A(3, .1), .5, { anchor: 'start', c: GREEN });
    T('assume 7% a year', 130, 640, 56, A(3, .45), .45, { anchor: 'start' });
    T('(illustration, not a prediction)', 130, 705, 42, A(3, .7), .45, { anchor: 'start', c: GRAY });
    D.grafik(1000, 500, 800, 250, 'naikPelan', A(4, .1), .8);
    T('20 years: about $246,000', 1400, 475, 60, A(4, .5), .7, { c: GREEN });
    P(rect(360, 800, 1200, 90, 2), A(5, .05), .3);
    P(rect(360, 800, 585, 90, 2), A(5, .15), .3, { c: INK, fill: GOLD, fillOp: .25 });
    T('your money $120,000', 652, 860, 44, A(5, .3), .35);
    P(rect(945, 800, 615, 90, 2), A(5, .5), .3, { c: GREEN, fill: GREEN, fillOp: .2 });
    T('growth (never certain)', 1252, 860, 44, A(5, .65), .4, { c: GREEN });
  },

  // 0 Why is this so hard to notice?
  // 1 Because nothing bad happens on the day you upgrade.
  // 2 The bill arrives later, and it arrives slowly.
  // 3 Your friends and coworkers are upgrading too, so your new normal looks normal.
  // 4 And because the raise really did arrive, spending it feels earned, not careless.
  // 5 None of this means you are bad with money. It is a very common habit.
  sulit(A) {
    TPL.judul(A, 'Why it is hard to notice');
    D.wanita(240, 905, .55, 'berpikir', A(0, .2), .8, { baju: BLUE });
    T('?', 340, 780, 100, A(0, .75), .2, { c: RED });
    const ic = [
      ['upgrade day: all good', (cx, cy, at) => { D.kalender(cx - 70, cy - 70, 140, 120, at, .35, { kol: 4, bar: 2 }); D.centang(cx + 50, cy + 55, 28, at + .35); }],
      ['bills arrive slowly', (cx, cy, at) => { P(G.dokumen(cx - 90, cy - 80, 90, 120), at, .35); P(G.jam(cx + 55, cy + 15, 42), at + .35, .3, { c: GREEN }); }],
      ['everyone upgrades too', (cx, cy, at) => { P(G.kerumunan(cx - 95, cy + 10, 3, 85, .6), at, .35, { c: BLUE }); P(arrow(cx, cy - 15, cx, cy - 85), at + .35, .2, { c: GREEN, w: 8 }); }],
      ['the raise feels earned', (cx, cy, at) => D.bintang(cx, cy, 30, 3, 80, at, .5)],
    ];
    ic.forEach(([lab, g], i) => TPL.kartu(A, { x: 130 + i * 430, y: 270, w: 370, h: 250, gambar: g, label: lab, at: A(i + 1, .12), ukuran: 46 }));
    T('a very common habit', 1180, 800, 74, A(5, .45), .6, { c: GREEN });
    T('not a character flaw', 1180, 880, 50, A(5, .1), .4, { c: GRAY });
  },

  // 0 So what can you do about it?
  // 1 Step one: decide what the raise is for before it lands in your account.
  // 2 One simple approach is a split, where half of every raise goes to savings or debt payoff, and half goes to enjoying life.
  // 3 You still get to enjoy the raise, and your savings grow at the same time.
  // 4 Automate the savings half, so it moves on payday before you can spend it.
  bagi(A) {
    TPL.judul(A, 'Fix 1: Split the raise');
    T('step one: decide first', 1250, 290, 54, A(1, .15), .6, { c: GRAY });
    P(rect(150, 420, 330, 170, 2), A(1, .3), .4, { c: INK, fill: GREEN, fillOp: .1 });
    T('the raise', 315, 520, 70, A(1, .55), .35, { c: GREEN });
    P(arrow(480, 460, 780, 400), A(2, .1), .25, { c: GREEN, w: 8 });
    P(arrow(480, 550, 780, 700), A(2, .5), .25, { c: GREEN, w: 8 });
    P(G.kantongUang(880, 410, .8), A(2, .2), .4, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('50%', 1080, 440, 100, A(2, .35), .3, { anchor: 'start', c: GREEN });
    T('savings or debt payoff', 1080, 510, 52, A(2, .45), .35, { anchor: 'start', c: GRAY });
    D.wanita(880, 905, .5, 'senang', A(2, .6), .7, { baju: GOLD });
    T('50%', 1080, 780, 100, A(2, .8), .3, { anchor: 'start', c: BLUE });
    T('enjoying life', 1080, 850, 52, A(2, .9), .3, { anchor: 'start', c: GRAY });
    T('both win', 1560, 640, 66, A(3, .3), .4, { c: GREEN });
    D.centang(1560, 710, 36, A(3, .65));
    P(G.jam(230, 800, 78), A(4, .1), .4, { c: INK });
    T('payday: auto-save', 340, 815, 50, A(4, .45), .4, { anchor: 'start', c: GREEN });
  },

  // 0 Step two: slow down the big upgrades that are hard to undo.
  // 1 Before you sign a bigger lease or a longer car loan, wait thirty days.
  // 2 Write down the new monthly cost, and ask what you would give up to pay it for five years.
  // 3 If it still feels fine after a month, you can decide with a clear head.
  tunda(A) {
    TPL.judul(A, 'Fix 2: Wait 30 days');
    T('slow down the big ones', 1290, 320, 62, A(0, .1), .55, { c: RED });
    D.kalender(140, 330, 520, 420, A(1, .2), .8, { kol: 6, bar: 5, judul: '30 DAYS' });
    T('bigger lease or longer car loan', 400, 840, 46, A(1, .05), .5, { c: GRAY });
    T('write it down:', 780, 470, 52, A(2, .05), .3, { anchor: 'start', c: GRAY });
    T('new monthly cost x 60 months', 780, 550, 60, A(2, .25), .6, { anchor: 'start' });
    T('what would you give up?', 780, 640, 58, A(2, .65), .45, { anchor: 'start', c: RED });
    T('still fine after a month?', 780, 750, 56, A(3, .1), .45, { anchor: 'start', c: GRAY });
    D.centang(800, 825, 30, A(3, .55));
    T('decide with a clear head', 860, 840, 60, A(3, .6), .5, { anchor: 'start', c: GREEN });
  },

  // 0 Step three: look at the share of income you keep, not just the size of your paycheck.
  // 1 If your income grows and that share stays the same or climbs, you are building a cushion.
  // 2 If the share keeps shrinking, that is a signal to take a closer look at your spending.
  ukur(A) {
    TPL.judul(A, 'Fix 3: Watch the share you keep');
    T('today', 130, 380, 52, A(0, .1), .25, { anchor: 'start' });
    P(rect(620, 320, 400, 90, 2), A(0, .2), .3);
    P(rect(620, 320, 80, 90, 2), A(0, .45), .3, { c: GREEN, fill: GREEN, fillOp: .4 });
    T('share kept', 1080, 380, 46, A(0, .7), .3, { anchor: 'start', c: GREEN });
    T('raise, same share', 130, 580, 52, A(1, .05), .3, { anchor: 'start' });
    P(rect(620, 520, 800, 90, 2), A(1, .15), .35);
    P(rect(620, 520, 160, 90, 2), A(1, .4), .3, { c: GREEN, fill: GREEN, fillOp: .4 });
    D.centang(1490, 565, 32, A(1, .65));
    T('cushion grows', 1560, 580, 52, A(1, .75), .3, { anchor: 'start', c: GREEN });
    T('raise, smaller share', 130, 780, 52, A(2, .05), .3, { anchor: 'start' });
    P(rect(620, 720, 800, 90, 2), A(2, .15), .35);
    P(rect(620, 720, 60, 90, 2), A(2, .4), .3, { c: RED, fill: RED, fillOp: .4 });
    D.lingkari(650, 765, 80, 70, A(2, .6), .3, RED);
    T('take a closer look', 1480, 780, 52, A(2, .75), .3, { anchor: 'start', c: RED });
  },

  // 0 Lifestyle inflation is not about never enjoying your money.
  // 1 It is about noticing when each raise disappears without leaving anything behind.
  // 2 A bigger paycheck feels good, but the gap between what you earn and what you spend is what keeps you from feeling broke.
  // 3 This video is for education only and is not personal financial advice. Check your own numbers, and talk to a licensed professional before big decisions.
  // 4 If this helped, follow the channel, and watch the next video about the credit card minimum payment trap.
  penutup(A) {
    TPL.judul(A, 'Notice the gap');
    D.wanita(190, 905, .8, 'senang', A(0, .15), .9, { baju: GOLD });
    T('enjoy it', 190, 580, 56, A(0, .7), .3, { c: GREEN });
    P(poly([[470, 300], [470, 800], [1200, 800]], false, 1), A(1, .1), .35);
    P(poly([[520, 700], [700, 620], [900, 520], [1100, 400]], false, 1.5), A(1, .35), .6, { c: GREEN, w: 9 });
    T('income', 1130, 395, 44, A(1, .75), .2, { anchor: 'start', c: GREEN });
    P(poly([[520, 730], [700, 700], [900, 670], [1100, 630]], false, 1.5), A(1, .55), .5, { c: RED, w: 9 });
    T('spending', 1130, 640, 44, A(1, .85), .2, { anchor: 'start', c: RED });
    P(poly([[520, 700], [700, 620], [900, 520], [1100, 400], [1100, 630], [900, 670], [700, 700], [520, 730]], true, 1), A(2, .1), .5, { c: GREEN, w: 3, fill: GREEN, fillOp: .2 });
    T('the gap', 850, 605, 54, A(2, .35), .3, { c: INK });
    T('keeps you from feeling broke', 840, 880, 54, A(2, .6), .7, { c: GREEN });
    P(rect(1340, 290, 460, 300, 2), A(3, .05), .4, { c: INK, fill: INK, fillOp: .03 });
    T('For education only', 1570, 390, 50, A(3, .2), .35, { c: INK });
    T('not personal', 1570, 460, 50, A(3, .35), .3, { c: INK });
    T('financial advice', 1570, 530, 50, A(3, .5), .3, { c: INK });
    T('Next:', 1570, 700, 56, A(4, .15), .25, { c: GRAY });
    T('Credit Card', 1570, 775, 60, A(4, .35), .3, { c: RED });
    T('Minimum Payment Trap', 1570, 845, 52, A(4, .55), .45, { c: RED });
  },
};
