// N1-002 "Your Life If You Start Saving $200 a Month at 25" (Money in the Margin). 13 adegan, 16:9, semua teks layar bahasa Inggris.
// Memakai pustaka/wvs (G, D, TPL). scenes.js dibuat oleh pustaka/wvs/rakit.js. A(baris, fraksi) = waktu dalam baris narasi.
// Kurva tabungan $200/bulan pada 7%/tahun (majemuk bulanan), dinormalkan ke saldo tahun ke-40.
const _bal = (k) => { const i = .07 / 12; return (Math.pow(1 + i, 12 * k) - 1) / i; };
const _kurva = (x0, yDasar, w, h, k0 = 0, k1 = 40) => {
  const pts = [];
  for (let k = k0; k <= k1; k++) pts.push([x0 + (k / 40) * w, yDasar - (_bal(k) / _bal(40)) * h]);
  return pts;
};

window.SCENES = {
  // 0 Two hundred dollars a month, starting at age 25.
  // 1 Over forty years, that habit could grow to more than half a million dollars.
  // 2 Start the very same habit ten years later, and the result drops by more than half.
  // 3 In the next six minutes, I will show you the math, the catch, and what to do with your own numbers.
  hook(A) {
    TPL.judul(A, 'Two hundred dollars a month', { c: GREEN });
    D.koin(210, 380, 62, A(0, .1), .4, { simbol: '$' });
    T('$200 a month', 340, 400, 100, A(0, .25), .6, { anchor: 'start', c: GREEN });
    T('starting at age 25', 340, 475, 52, A(0, .6), .5, { anchor: 'start', c: GRAY });
    P(line(200, 660, 1720, 660, 1), A(1, .05), .5, { c: INK, w: 8 });
    T('25', 200, 610, 54, A(1, .1), .2, { c: INK });
    T('65', 1720, 610, 54, A(1, .15), .2, { c: INK });
    T('40 years', 960, 610, 50, A(1, .25), .3, { c: GRAY });
    P(arrow(1720, 650, 1720, 540), A(1, .45), .3, { c: GREEN, w: 10 });
    T('more than $500,000', 1380, 540, 66, A(1, .55), .6, { c: GREEN });
    P(line(960, 790, 1720, 790, 1), A(2, .05), .4, { c: RED, w: 8 });
    T('start at 35', 960, 740, 46, A(2, .15), .3, { c: RED });
    T('less than half', 1340, 740, 56, A(2, .45), .4, { c: RED });
    TPL.daftar(A, { x: 130, y: 770, gap: 62, ukuran: 44, gaya: 'nomor', maks: 600, kotak: 42,
      items: [{ teks: 'the math', at: A(3, .2) }, { teks: 'the catch', at: A(3, .45) }, { teks: 'your own numbers', at: A(3, .7) }] });
  },

  // 0 First, the rules of this thought experiment.
  // 1 You save two hundred dollars every month, which adds up to $2,400 a year.
  // 2 We assume the money earns 7 percent a year, and we ignore taxes and fees.
  // 3 Real returns change from year to year, and they can be negative, so treat every number here as an illustration.
  // 4 The point is to see the shape of the curve, not to predict your future.
  aturan(A) {
    TPL.judul(A, 'The rules of the example');
    T('the rules', 960, 290, 54, A(0, .2), .5, { c: GRAY });
    D.koin(170, 400, 48, A(1, .1), .4, { simbol: '$' });
    T('$200 x 12 = $2,400 a year', 260, 415, 60, A(1, .3), .7, { anchor: 'start', c: GREEN });
    T('assume 7% a year', 130, 560, 70, A(2, .1), .5, { anchor: 'start', c: INK });
    T('no taxes, no fees', 130, 640, 52, A(2, .55), .4, { anchor: 'start', c: GRAY });
    D.grafik(1020, 450, 760, 260, 'lonjakan', A(3, .08), .8, { c: RED });
    T('real returns go up and down', 1400, 760, 50, A(3, .45), .5, { c: RED });
    T('(and can be negative)', 1400, 815, 42, A(3, .75), .4, { c: GRAY });
    const b = T('an illustration, not a prediction', 560, 880, 58, A(4, .25), .8, { c: INK });
    D.garisBawah(b, A(4, .25) + .8, .25, GREEN);
  },

  // 0 Before the math, let's see where young adults stand today.
  // 1 In 2025, the Federal Reserve asked people who are not retired whether their retirement saving was on track.
  // 2 Overall, 35 percent said yes.
  // 3 Among adults aged 18 to 29, only 22 percent said yes, and 38 percent had a tax-preferred retirement account.
  // 4 Starting early is still uncommon, which is a big reason it matters.
  realita(A) {
    TPL.judul(A, '1. Where young adults stand');
    T('Federal Reserve survey, 2025', 960, 285, 48, A(1, .1), .5, { c: GRAY });
    T('"Is your retirement saving on track?"', 960, 355, 56, A(1, .45), .8, { c: INK });
    T('all adults', 130, 495, 50, A(2, .0), .3, { anchor: 'start' });
    P(rect(560, 430, 1100, 90, 2), A(2, .05), .35);
    P(rect(560, 430, 385, 90, 2), A(2, .25), .4, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('35% yes', 975, 495, 70, A(2, .5), .35, { anchor: 'start', c: GREEN });
    T('ages 18 to 29', 130, 645, 50, A(3, .0), .3, { anchor: 'start' });
    P(rect(560, 580, 1100, 90, 2), A(3, .08), .35);
    P(rect(560, 580, 242, 90, 2), A(3, .2), .4, { c: RED, fill: RED, fillOp: .3 });
    T('22% yes', 832, 645, 70, A(3, .4), .35, { anchor: 'start', c: RED });
    T('and 38% have a retirement account', 960, 780, 52, A(3, .7), .6, { c: GRAY });
    const b = T('starting early is uncommon', 960, 890, 66, A(4, .2), .7, { c: GREEN });
    D.garisBawah(b, A(4, .2) + .7, .2, GREEN);
  },

  // 0 Now imagine you keep that $200 in an ordinary savings account.
  // 1 The FDIC reported a national average savings rate of 0.38 percent in October 2026.
  // 2 If that rate never changed, forty years of deposits would grow to about $103,700, and $96,000 of it is simply your own money.
  // 3 That is a fine place for emergency cash.
  // 4 But it shows why the rate you earn matters almost as much as the amount you save.
  bank(A) {
    TPL.judul(A, '2. Cash in a savings account');
    P(G.brankas(330, 480, 270), A(0, .1), .7, { c: INK, fill: GOLD, fillOp: .15 });
    T('$200 a month', 330, 730, 54, A(0, .6), .4, { c: GREEN });
    T('0.38%', 1180, 440, 150, A(1, .2), .6, { c: GRAY });
    T('national average savings rate', 1180, 515, 48, A(1, .55), .5, { c: INK });
    T('(FDIC, October 2026)', 1180, 570, 40, A(1, .8), .3, { c: GRAY });
    T('40 years: about $103,700', 1050, 660, 54, A(2, .08), .6, { c: INK });
    P(rect(700, 690, 1100, 80, 2), A(2, .3), .35);
    P(rect(700, 690, 1018, 80, 2), A(2, .45), .4, { c: INK, fill: GOLD, fillOp: .3 });
    T('your deposits $96,000', 1209, 745, 44, A(2, .55), .4);
    P(rect(1718, 690, 82, 80, 2), A(2, .75), .25, { c: GREEN, fill: GREEN, fillOp: .35 });
    T('~$7,700 interest', 1630, 825, 42, A(2, .85), .3, { c: GREEN });
    T('good for emergency cash', 330, 835, 48, A(3, .2), .5, { c: GREEN });
    const b = T('the rate matters almost as much as the amount', 960, 895, 52, A(4, .1), .9, { c: RED });
  },

  // 0 So how can the same $200 grow so much more?
  // 1 The CFPB describes compound interest as earning interest on your savings and on the interest you already earned.
  // 2 Its example is $1,000 at 5 percent.
  // 3 After year one you have $1,050, and after year two you have $1,102.50.
  // 4 That extra $2.50 is interest earning interest, and over decades it snowballs.
  bunga(A) {
    TPL.judul(A, '3. How compounding works');
    T('how can $200 grow so much more?', 960, 290, 54, A(0, .1), .8, { c: GRAY });
    P(rect(150, 340, 640, 90, 2), A(1, .1), .35, { c: INK, fill: GOLD, fillOp: .2 });
    T('interest on your savings', 470, 400, 44, A(1, .25), .5);
    T('+', 960, 405, 80, A(1, .55), .2, { c: GREEN });
    P(rect(1130, 340, 640, 90, 2), A(1, .65), .35, { c: GREEN, fill: GREEN, fillOp: .15 });
    T('interest on past interest', 1450, 400, 44, A(1, .8), .5, { c: GREEN });
    T('$1,000 at 5% a year', 960, 495, 50, A(2, .15), .5, { c: GRAY });
    P(circ(400, 650, 90), A(2, .5), .45, { c: INK, fill: GOLD, fillOp: .2 });
    T('$1,000', 400, 667, 46, A(2, .75), .3);
    P(arrow(510, 650, 760, 650), A(3, .0), .2, { c: GRAY, w: 6 });
    P(circ(900, 650, 105), A(3, .1), .45, { c: GREEN, fill: GREEN, fillOp: .2 });
    T('$1,050', 900, 667, 50, A(3, .3), .3, { c: GREEN });
    T('year 1', 900, 810, 40, A(3, .4), .2, { c: GRAY });
    P(arrow(1025, 650, 1275, 650), A(3, .5), .2, { c: GRAY, w: 6 });
    P(circ(1450, 650, 120), A(3, .6), .45, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('$1,102.50', 1450, 667, 50, A(3, .8), .3, { c: GREEN });
    T('year 2', 1450, 830, 40, A(3, .9), .2, { c: GRAY });
    const b = T('+$2.50 = interest earning interest', 960, 895, 56, A(4, .2), .8, { c: RED });
    D.garisBawah(b, A(4, .2) + .8, .2, RED);
  },

  // 0 Now run our plan from age 25 to age 65.
  // 1 You would deposit $96,000 over forty years.
  // 2 At an assumed 7 percent, the balance would be roughly $525,000.
  // 3 That means about $429,000 came from growth, not from your paycheck.
  // 4 Notice that most of that growth arrives in the final decade.
  mulai25(A) {
    TPL.judul(A, '4. Starting at 25');
    P(poly([[160, 330], [160, 800], [1100, 800]], false, 1), A(0, .1), .4);
    T('25', 160, 860, 48, A(0, .35), .2);
    T('65', 1100, 860, 48, A(0, .45), .2);
    P(poly(_kurva(160, 800, 940, 450), false, 1.2), A(0, .5), .9, { c: GREEN, w: 9 });
    P(rect(1300, 718, 160, 82, 2), A(1, .15), .4, { c: INK, fill: GOLD, fillOp: .35 });
    T('deposits $96,000', 1490, 770, 44, A(1, .4), .4, { anchor: 'start' });
    P(rect(1300, 350, 160, 450, 2), A(2, .05), .4);
    T('$525,000', 1380, 325, 56, A(2, .35), .4, { c: INK });
    P(rect(1300, 350, 160, 368, 2), A(3, .08), .5, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('growth $429,000', 1490, 540, 46, A(3, .45), .4, { anchor: 'start', c: GREEN });
    P(poly(_kurva(160, 800, 940, 450, 30, 40), false, 1.2), A(4, .1), .6, { c: RED, w: 13 });
    T('final decade', 600, 430, 50, A(4, .35), .4, { c: RED });
    P(arrow(780, 450, 960, 540), A(4, .65), .3, { c: RED, w: 7 });
  },

  // 0 Now suppose you wait until 35 and save the same $200 a month for thirty years.
  // 1 You would deposit $72,000, which is only $24,000 less.
  // 2 But the balance would be roughly $244,000.
  // 3 Waiting ten years cost about $281,000 in this example, even though you skipped just $24,000 of deposits.
  // 4 Time in the account did the heavy lifting, not the size of the monthly payment.
  mulai35(A) {
    TPL.judul(A, '5. Waiting ten years');
    T('start at 25', 130, 405, 52, A(0, .0), .3, { anchor: 'start', c: GREEN });
    P(rect(560, 340, 900, 100, 2), A(0, .05), .4, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('$525,000', 1490, 405, 56, A(0, .2), .3, { anchor: 'start', c: GREEN });
    T('start at 35', 130, 645, 52, A(0, .35), .3, { anchor: 'start', c: RED });
    P(rect(560, 580, 418, 100, 2), A(0, .55), .5, { c: RED, fill: RED, fillOp: .25 });
    T('$24,000 less in deposits', 960, 520, 48, A(1, .2), .5, { c: GRAY });
    T('$244,000', 1010, 645, 56, A(2, .2), .3, { anchor: 'start', c: RED });
    P(line(978, 740, 1460, 740, 1), A(3, .05), .3, { c: RED, w: 7 });
    P(arrow(978, 740, 1000, 740), A(3, .1), .1, { c: RED, w: 7 });
    T('the gap: about $281,000', 1220, 815, 62, A(3, .3), .6, { c: RED });
    const b = T('time did the heavy lifting', 960, 895, 56, A(4, .15), .7, { c: INK });
    D.garisBawah(b, A(4, .15) + .7, .2, GREEN);
  },

  // 0 Wait until 45, and twenty years of saving would give you about $104,000.
  // 1 To reach the same $525,000 from age 45, you would need to save about $1,000 a month.
  // 2 Late starters are not doomed, but they have to save much more to close the gap.
  mulai45(A) {
    TPL.judul(A, '6. Waiting twenty years');
    const base = 800, bars = [[150, 330, GREEN, 'age 25', '$525k'], [350, 153, RED, 'age 35', '$244k'], [550, 66, BLUE, 'age 45', '$104k']];
    bars.forEach(([x, h, c, lab, val], i) => {
      const at = i === 2 ? A(0, .15) : A(0, .02 + i * .04);
      P(rect(x, base - h, 140, h, 2), at, .5, { c, fill: c, fillOp: .3 });
      T(lab, x + 70, base + 55, 40, at + .2, .2, { c: GRAY });
      T(val, x + 70, base - h - 20, 40, at + .4, .25, { c });
    });
    T('to match $525,000 from 45:', 1280, 400, 50, A(1, .1), .5, { c: GRAY });
    T('save about', 1280, 480, 54, A(1, .35), .3);
    T('$1,000', 1280, 600, 130, A(1, .5), .5, { c: RED });
    T('a month, not $200', 1280, 680, 52, A(1, .8), .4, { c: GRAY });
    T('late starters are not doomed,', 1280, 780, 52, A(2, .1), .6, { c: GREEN });
    T('but the gap costs more to close', 1280, 850, 52, A(2, .55), .6, { c: INK });
  },

  // 0 Here is the catch, and it is a human one.
  // 1 In the first five years, you would deposit $12,000, and the balance would be about $14,300.
  // 2 Only around $2,300 of that is growth, which can feel like nothing.
  // 3 Many people lose motivation in the part of the curve that looks the flattest.
  // 4 The curve only bends upward after you have been patient for a decade or two.
  sabar(A) {
    TPL.judul(A, '7. The boring first years');
    T('after 5 years', 130, 300, 54, A(0, .3), .5, { anchor: 'start', c: GRAY });
    P(rect(130, 340, 503, 80, 2), A(1, .1), .4, { c: INK, fill: GOLD, fillOp: .3 });
    T('you put in $12,000', 160, 395, 40, A(1, .35), .4, { anchor: 'start' });
    P(rect(130, 450, 600, 80, 2), A(1, .55), .4, { c: INK, fill: GOLD, fillOp: .15 });
    T('balance $14,300', 160, 505, 40, A(1, .75), .4, { anchor: 'start' });
    P(rect(633, 450, 97, 80, 2), A(2, .1), .3, { c: RED, fill: RED, fillOp: .4 });
    T('growth: only $2,300', 430, 590, 46, A(2, .35), .5, { c: RED });
    P(poly([[960, 330], [960, 800], [1780, 800]], false, 1), A(3, .0), .35);
    P(poly(_kurva(960, 800, 820, 450), false, 1.2), A(3, .1), .8, { c: GREEN, w: 8 });
    D.lingkari(1010, 790, 70, 40, A(3, .55), .3, RED);
    T('this is where many quit', 430, 740, 54, A(3, .5), .5, { c: RED });
    P(arrow(740, 735, 930, 770), A(3, .8), .2, { c: RED, w: 7 });
    T('it bends up after a decade or two', 1370, 890, 50, A(4, .2), .8, { c: GREEN });
  },

  // 0 So where could this money live?
  // 1 In the United States, a traditional or Roth IRA is a tax-preferred retirement account.
  // 2 The IRS says that for people under 50, the contribution limit is $7,500 in 2026, up from $7,000 in 2025.
  // 3 Our $2,400 a year fits well inside that limit.
  // 4 If your employer offers a 401(k), ask whether it comes with a match.
  tempat(A) {
    TPL.judul(A, '8. Where the money can live');
    T('where could it live?', 960, 290, 54, A(0, .15), .6, { c: GRAY });
    TPL.kartu(A, { x: 130, y: 350, w: 360, h: 280, label: 'IRA (Traditional or Roth)', ukuran: 40, at: A(1, .1),
      gambar: (cx, cy, at) => P(G.brankas(cx, cy, 190), at, .5, { c: INK, fill: GOLD, fillOp: .2 }) });
    T('tax-preferred', 310, 740, 46, A(1, .65), .35, { c: GREEN });
    P(rect(700, 380, 1100, 90, 2), A(2, .08), .4);
    T('2026 limit: $7,500', 1250, 360, 54, A(2, .3), .5, { c: INK });
    P(line(1026, 360, 1026, 490, 1), A(2, .65), .2, { c: GRAY, w: 6 });
    T('2025: $7,000', 1026, 540, 44, A(2, .75), .3, { c: GRAY });
    P(rect(700, 380, 352, 90, 2), A(3, .08), .4, { c: GREEN, fill: GREEN, fillOp: .35 });
    T('$2,400', 876, 445, 50, A(3, .3), .3, { c: GREEN });
    T('fits well inside', 1400, 445, 50, A(3, .5), .4, { c: GREEN });
    D.koin(760, 750, 45, A(4, .1), .4, { simbol: '$' });
    T('401(k) at work? ask about a match', 850, 765, 52, A(4, .3), .9, { anchor: 'start', c: BLUE });
  },

  // 0 One warning before you invest every spare dollar.
  // 1 The Fed found that 55 percent of adults had set aside three months of expenses in a rainy day fund.
  // 2 For adults aged 18 to 29, the number was 37 percent.
  // 3 Without a cushion, a surprise bill can force you to pull money out early and break the chain.
  // 4 So many people build a small emergency fund first, and then add the long-term habit.
  bantal(A) {
    TPL.judul(A, '9. Build a cushion too');
    T('3 months of expenses saved', 450, 285, 50, A(0, .4), .6, { c: GRAY });
    P(rect(250, 400, 180, 420, 2), A(1, .1), .4);
    P(rect(250, 820 - 231, 180, 231, 2), A(1, .3), .5, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('55%', 340, 360, 62, A(1, .6), .3, { c: GREEN });
    T('all adults', 340, 875, 42, A(1, .8), .2, { c: GRAY });
    P(rect(560, 400, 180, 420, 2), A(2, .1), .4);
    P(rect(560, 820 - 155, 180, 155, 2), A(2, .3), .5, { c: RED, fill: RED, fillOp: .3 });
    T('37%', 650, 360, 62, A(2, .6), .3, { c: RED });
    T('ages 18-29', 650, 875, 42, A(2, .8), .2, { c: GRAY });
    T('surprise bill', 1400, 330, 56, A(3, .05), .4, { c: RED });
    P(arrow(1400, 350, 1400, 470), A(3, .15), .25, { c: RED, w: 8 });
    [1100, 1300, 1500, 1700].forEach((x, i) => P(circ(x, 560, 55), A(3, .1 + i * .08), .3, { c: BLUE, w: 8 }));
    P(line(1155, 560, 1245, 560, 1), A(3, .3), .15, { c: BLUE, w: 8 });
    P(line(1555, 560, 1645, 560, 1), A(3, .4), .15, { c: BLUE, w: 8 });
    D.silang(1400, 560, 42, A(3, .7), .25);
    T('the chain breaks', 1400, 690, 50, A(3, .85), .3, { c: RED });
    T('emergency fund first', 1400, 780, 56, A(4, .15), .5, { c: GREEN });
    T('then the long-term habit', 1400, 855, 52, A(4, .55), .5, { c: BLUE });
  },

  // 0 Maybe $200 is not realistic for you right now, and that is fine.
  // 1 The Fed found that only 7 percent of non-retirees with family income under $25,000 felt on track, compared with 59 percent at $100,000 or more.
  // 2 Income matters, so be honest about your budget.
  // 3 The math scales: $50 a month from age 25 would become roughly a quarter of our result, about $131,000.
  // 4 Start with an amount you can keep, and raise it whenever your pay goes up.
  ukuran(A) {
    TPL.judul(A, '10. Make it fit your life');
    T('$200 not realistic yet? fine.', 960, 290, 54, A(0, .15), .8, { c: GRAY });
    T('"retirement saving on track"', 600, 370, 44, A(1, .0), .4, { c: GRAY });
    TPL.statistik(A, { x: 300, y: 530, angka: '7%', label: 'income under $25,000', at: A(1, .2), warna: RED, ukuranLabel: 42 });
    TPL.statistik(A, { x: 900, y: 530, angka: '59%', label: 'income $100,000+', at: A(1, .6), warna: GREEN, ukuranLabel: 42 });
    T('be honest about your budget', 600, 860, 52, A(2, .15), .6, { c: INK });
    T('$50 a month', 1480, 420, 70, A(3, .1), .5, { c: GREEN });
    P(arrow(1480, 450, 1480, 540), A(3, .4), .25, { c: GREEN, w: 8 });
    T('about $131,000', 1480, 630, 74, A(3, .5), .5, { c: GREEN });
    T('a quarter of $525,000', 1480, 695, 42, A(3, .8), .3, { c: GRAY });
    T('start small, raise it later', 1480, 820, 54, A(4, .2), .6, { c: BLUE });
  },

  // 0 So what did two hundred dollars a month actually buy?
  // 1 Starting at 25, it turned $96,000 of deposits into roughly $525,000 in our illustration.
  // 2 At 35, the same monthly habit reached about $244,000, and at 45, about $104,000.
  // 3 The lesson is simple: the earlier the first deposit, the more years do the work for you.
  // 4 Real returns will differ, so use these numbers as a map, not a promise.
  // 5 This video is for education only and is not personal financial advice. Talk to a licensed professional before big decisions.
  // 6 If this helped, follow the channel, and watch the next video about money lessons you were never taught.
  penutup(A) {
    TPL.judul(A, 'What the money bought');
    T('what did $200 a month buy?', 960, 290, 54, A(0, .15), .8, { c: GRAY });
    TPL.alur(A, { x: 280, y: 350, w: 380, h: 120, gap: 110, ukuran: 46, items: [
      { teks: 'at 25: $525,000', at: A(1, .1), warna: GREEN },
      { teks: 'at 35: $244,000', at: A(2, .08), warna: RED },
      { teks: 'at 45: $104,000', at: A(2, .55), warna: BLUE }] });
    const b = T('earlier first deposit = more years working', 960, 590, 58, A(3, .1), .9, { c: GREEN });
    D.garisBawah(b, A(3, .1) + .9, .2, GREEN);
    T('a map, not a promise', 960, 680, 56, A(4, .15), .5, { c: GRAY });
    P(rect(460, 730, 1000, 90, 2), A(5, .05), .4, { c: INK, fill: INK, fillOp: .03 });
    T('For education only, not financial advice', 960, 790, 44, A(5, .2), .8, { c: INK });
    T('Follow, and watch the next video', 960, 890, 52, A(6, .2), .7, { c: BLUE });
  },
};
