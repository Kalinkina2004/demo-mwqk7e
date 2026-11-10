/* MealMe — интерактив сайта. Без зависимостей. */
(function () {
  'use strict';

  /* ===== Данные (меняются здесь) ===== */
  var CONTACTS = {
    telegram: 'https://t.me/mealme_admin',
    instagram: 'https://www.instagram.com/mealme.ge/',
    direct: 'https://ig.me/m/mealme.ge'
  };
  var PLANS = {
    '1500': { goal: 'Для похудения', meals: ['breakfast', 'lunch', 'dinner'], bju: '120 / 45 / 150', price: { 1: 50, 7: 300, 30: 1150 }, img: '004' },
    '2000': { goal: 'Для поддержания формы', meals: ['breakfast', 'dessert', 'lunch', 'snack', 'dinner'], bju: '150 / 65 / 200', price: { 1: 60, 7: 350, 30: 1350 }, img: '005' },
    '2500': { goal: 'Для набора массы', meals: ['breakfast', 'dessert', 'lunch', 'lunch2', 'snack', 'dinner'], bju: '200 / 75 / 250', price: { 1: 75, 7: 450, 30: 1725 }, img: '006' }
  };
  var MEAL_NAMES = { breakfast: 'Завтрак', dessert: 'Десерт', lunch: 'Обед', lunch2: 'Второй обед', snack: 'Перекус', dinner: 'Ужин' };
  var TERM_NAMES = { 1: '1 день', 7: '7 дней', 30: '30 дней' };
  var MENU = [
    { day: 'День 1', img: '071', cap: 'Сырники со сметаной', m: { breakfast: 'Сырники с сухофруктами и сметаной', dessert: 'Морковный капкейк', lunch: 'Норвежская уха и орзотто с грибами', lunch2: 'Куриное филе в кунжуте с овощами', snack: 'Протеиновый батончик', dinner: 'Фасолевый салат с куриным филе' } },
    { day: 'День 2', img: '084', cap: 'Яйцо в цельнозерновом тосте', m: { breakfast: 'Яйцо в цельнозерновом тосте с томатами', dessert: 'Чизкейк с мандарином', lunch: 'Крем-суп из шампиньонов', lunch2: 'Курица в кунжуте с черри', snack: 'Хумус с овощными палочками', dinner: 'Салат с лососем и авокадо' } },
    { day: 'День 3', img: '078', cap: 'Пышные панкейки с ягодами', m: { breakfast: 'Пышные панкейки с клубникой и голубикой', dessert: 'Запечённая груша с орехами', lunch: 'Тефтели с картофельным пюре', lunch2: 'Паста с креветками и овощами', snack: 'Йогурт с гранолой и киви', dinner: 'Ростбиф с рукколой и сыром' } },
    { day: 'День 4', img: '097', cap: 'Рыба с лимоном и овощами', m: { breakfast: 'Блинчики с начинкой', dessert: 'Шоколадный пирог', lunch: 'Боул с булгуром и курицей', lunch2: 'Суп-пюре из тыквы', snack: 'Клубничный смузи', dinner: 'Рыба с лимоном и запечёнными овощами' } },
    { day: 'День 5', img: '030', cap: 'Паста с креветками', m: { breakfast: 'Омлет с овощами и зеленью', dessert: 'Клубника со сливочным кремом', lunch: 'Паста с креветками', lunch2: 'Говядина с булгуром', snack: 'Овощные палочки с соусом', dinner: 'Салат с курицей, яйцом и черри' } }
  ];
  var GALLERY = [
    [4, 'plans', 'Рацион 1500 ккал'], [5, 'plans', 'Рацион 2000 ккал'], [3, 'plans', 'Рацион 2500 ккал'],
    [16, 'out', 'Паста с креветками'], [17, 'pack', 'Фирменный пакет me.'], [19, 'out', 'Боул с курицей'],
    [30, 'food', 'Паста и закуски'], [10, 'pack', 'Доставка на закате'], [26, 'out', 'Осенний боул'],
    [40, 'food', 'Завтрак на всех тарелках'], [78, 'food', 'Панкейки с ягодами'], [9, 'out', 'Обед у моря'],
    [36, 'food', 'Стол на день'], [47, 'pack', 'Крафт-упаковка'], [80, 'food', 'Боулы с яйцом и кукурузой'],
    [7, 'out', 'Обед в руке'], [84, 'food', 'Яйцо в тосте'], [22, 'food', 'Рацион на неделю'],
    [77, 'food', 'Ростбиф с рукколой'], [33, 'pack', 'Пакет me. дома'], [20, 'out', 'Омлет в боксе'],
    [38, 'food', 'Йогурт с гранолой'], [97, 'food', 'Рыба с лимоном'], [27, 'out', 'Боул с авокадо'],
    [49, 'food', 'Тефтели и пюре'], [85, 'out', 'Пикник на траве'], [72, 'food', 'Салат с лососем'],
    [94, 'out', 'Булгур с овощами'], [48, 'pack', 'Боксы с подписями'], [66, 'food', 'Завтрак в контейнере'],
    [59, 'food', 'Салат с нутом'], [21, 'out', 'Салат с тунцом'], [93, 'food', 'Крем-суп'],
    [39, 'food', 'Сырники с клубникой'], [18, 'out', 'Пирог и роллы'], [96, 'food', 'Яйца в тостах']
  ];
  var ZONES = {
    center: ['ok', 'Доставляем бесплатно каждый день с 7:30 до 13:00.'],
    old: ['ok', 'Доставляем бесплатно каждый день с 7:30 до 13:00.'],
    new: ['ok', 'Доставляем бесплатно каждый день с 7:30 до 13:00.'],
    airport: ['ok', 'Доставляем бесплатно. Укажите в заявке ориентир или номер корпуса.'],
    gonio: ['maybe', 'Раньше доставляли за 7 GEL. Напишите администратору — подтвердим, возможна ли доставка сейчас.'],
    makhinjauri: ['maybe', 'Раньше доставляли за 7 GEL. Напишите администратору — подтвердим, возможна ли доставка сейчас.'],
    other: ['no', 'Пока не возим в этот район. Напишите нам — подскажем, как получить рацион.']
  };

  /* ===== Утилиты ===== */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function money(n) { return n.toLocaleString('ru-RU').replace(/ /g, ' ') + ' GEL'; }
  function fullPrice(plan, term) { return PLANS[plan].price[1] * term; }
  function freeDays(plan, term) { return Math.round((fullPrice(plan, term) - PLANS[plan].price[term]) / PLANS[plan].price[1]); }
  function img(n, small) { return 'img/' + n + (small ? '-s' : '') + '.webp'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(function () { return true; }, fallback);
    return Promise.resolve(fallback());
    function fallback() {
      var t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      t.remove(); return ok;
    }
  }
  function openDialog(d) { if (!d) return; if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', ''); document.body.classList.add('lock'); }
  function closeDialog(d) { if (!d) return; if (typeof d.close === 'function') d.close(); else d.removeAttribute('open'); }
  $$('dialog').forEach(function (d) {
    d.addEventListener('close', function () { if (!$('dialog[open]')) document.body.classList.remove('lock'); });
    d.addEventListener('click', function (e) { if (e.target === d) closeDialog(d); });
  });
  document.addEventListener('click', function (e) {
    var x = e.target.closest('[data-close]'); if (x) closeDialog(x.closest('dialog'));
  });

  /* ===== Шапка и мобильное меню ===== */
  var top = $('.top');
  function onScroll() { if (top) top.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var burger = $('.burger'), drawer = $('#drawer');
  function setMenu(open) {
    if (!burger || !drawer) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    if (open) drawer.removeAttribute('inert'); else drawer.setAttribute('inert', '');
    document.body.classList.toggle('lock', open);
  }
  if (burger) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) { setMenu(false); burger.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 1080 && drawer.classList.contains('open')) setMenu(false); });
  }

  /* ===== Лайтбокс ===== */
  var lb = $('#lb'), lbImg = lb && $('img', lb), lbCap = lb && $('figcaption', lb), lbList = [], lbIdx = 0;
  function lbShow(i) {
    lbIdx = (i + lbList.length) % lbList.length;
    var it = lbList[lbIdx];
    lbImg.src = it.src; lbImg.alt = it.cap; lbCap.textContent = it.cap + (lbList.length > 1 ? '  ·  ' + (lbIdx + 1) + ' / ' + lbList.length : '');
    $$('.round', lb).forEach(function (b) { b.hidden = lbList.length < 2; });
  }
  function lbOpen(el) {
    var group = el.getAttribute('data-lb');
    var items = $$('[data-lb="' + group + '"]').filter(function (n) { return !n.closest('[hidden]'); });
    lbList = items.map(function (n) { return { src: n.getAttribute('data-src'), cap: n.getAttribute('data-cap') || '' }; });
    lbShow(Math.max(0, items.indexOf(el)));
    openDialog(lb);
  }
  if (lb) {
    document.addEventListener('click', function (e) { var t = e.target.closest('[data-lb]'); if (t) { e.preventDefault(); lbOpen(t); } });
    $('.prev', lb).addEventListener('click', function () { lbShow(lbIdx - 1); });
    $('.next', lb).addEventListener('click', function () { lbShow(lbIdx + 1); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') lbShow(lbIdx - 1); if (e.key === 'ArrowRight') lbShow(lbIdx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') closeDialog(lb); });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) lbShow(lbIdx + (dx < 0 ? 1 : -1)); sx = null; });
  }

  /* ===== Рационы: переключатель срока ===== */
  var term = 1;
  function renderPlans() {
    $$('[data-plan-card]').forEach(function (card) {
      var p = card.getAttribute('data-plan-card'), price = PLANS[p].price[term], full = fullPrice(p, term), free = freeDays(p, term);
      $('[data-price]', card).textContent = money(price);
      var s = $('[data-old]', card); s.textContent = term > 1 ? money(full) : ''; s.hidden = term === 1;
      var tg = $('[data-gift]', card); tg.hidden = term === 1; tg.textContent = free > 0 ? '−' + money(full - price) : '';
      $('[data-note]', card).textContent = term === 1 ? 'Попробуйте один день — без подписки' : (Math.round(price / term) + ' GEL в день · ' + (term === 7 ? 'один день в подарок' : 'неделя в подарок'));
      $$('[data-plan]', card).forEach(function (b) { b.setAttribute('data-term', term); });
    });
  }
  $$('[data-term-switch] button').forEach(function (b) {
    b.addEventListener('click', function () {
      term = +b.getAttribute('data-value');
      $$('[data-term-switch] button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      renderPlans();
    });
  });
  if ($('[data-plan-card]')) renderPlans();

  /* Подробнее о рационе */
  var planDlg = $('#plan-dlg');
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-plan-info]'); if (!b || !planDlg) return;
    var p = b.getAttribute('data-plan-info'), d = PLANS[p];
    $('[data-f="title"]', planDlg).textContent = p + ' ккал — ' + d.goal.toLowerCase();
    $('[data-f="img"]', planDlg).src = img(d.img, true);
    $('[data-f="img"]', planDlg).alt = 'Рацион ' + p + ' ккал';
    $('[data-f="meals"]', planDlg).textContent = d.meals.map(function (m) { return MEAL_NAMES[m]; }).join(', ');
    $('[data-f="bju"]', planDlg).textContent = d.bju;
    $('[data-f="prices"]', planDlg).innerHTML = [1, 7, 30].map(function (t) {
      return '<li>' + TERM_NAMES[t] + ' — <b>' + money(d.price[t]) + '</b>' + (t > 1 ? ' вместо ' + money(fullPrice(p, t)) : '') + '</li>';
    }).join('');
    $('[data-f="choose"]', planDlg).setAttribute('data-plan', p);
    $('[data-f="choose"]', planDlg).setAttribute('data-term', term);
    $('[data-f="more"]', planDlg).href = 'rations.html#r' + p;
    openDialog(planDlg);
  });

  /* ===== Предзаполнение формы заявки ===== */
  var form = $('#order-form');
  function prefill(plan, t, note) {
    if (!form) return false;
    if (plan && PLANS[plan]) { var r = form.querySelector('input[name="plan"][value="' + plan + '"]'); if (r) r.checked = true; }
    if (t) { var q = form.querySelector('input[name="term"][value="' + t + '"]'); if (q) q.checked = true; }
    if (note) { var ex = form.elements.exclude; if (ex && !ex.value) ex.value = note; }
    updateSummary(); clearErr(form.querySelector('[data-for="plan"]')); clearErr(form.querySelector('[data-for="term"]'));
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-plan], button[data-plan]'); if (!a) return;
    if (!form) return; /* на внутренних страницах ссылка ведёт на index.html?plan=...#order */
    e.preventDefault();
    var d = a.closest('dialog'); if (d) closeDialog(d);
    prefill(a.getAttribute('data-plan'), a.getAttribute('data-term'));
    $('#order').scrollIntoView({ behavior: 'smooth' });
    setTimeout(function () { var f = form.elements.name; if (f) f.focus({ preventScroll: true }); }, 600);
    toast('Рацион ' + a.getAttribute('data-plan') + ' ккал выбран — осталось заполнить контакты');
  });

  /* ===== Калькулятор стоимости ===== */
  var pc = $('#price-calc');
  function renderPrice() {
    if (!pc) return;
    var p = pc.elements.pplan.value, t = +pc.elements.pterm.value, price = PLANS[p].price[t], full = fullPrice(p, t), free = freeDays(p, t);
    $('[data-pc="total"]').textContent = money(price);
    $('[data-pc="full"]').textContent = money(full);
    $('[data-pc="save"]').textContent = t === 1 ? '—' : money(full - price);
    $('[data-pc="day"]').textContent = (Math.round(price / t * 10) / 10).toString().replace('.', ',') + ' GEL';
    $('[data-pc="gift"]').textContent = t === 1 ? 'Возьмите 7 или 30 дней — получите дни в подарок' : 'Выгода — около ' + free + ' ' + (free === 1 ? 'дня' : 'дней') + ' питания бесплатно';
    var b = $('[data-pc="go"]'); b.setAttribute('data-plan', p); b.setAttribute('data-term', t);
  }
  if (pc) { pc.addEventListener('change', renderPrice); pc.addEventListener('submit', function (e) { e.preventDefault(); }); renderPrice(); }

  /* ===== Калькулятор нормы калорий ===== */
  var kc = $('#kcal-calc');
  if (kc) {
    kc.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      [['age', 14, 90], ['height', 130, 220], ['weight', 35, 250]].forEach(function (f) {
        var el = kc.elements[f[0]], v = parseFloat(String(el.value).replace(',', '.')), fld = el.closest('.field');
        var bad = !(v >= f[1] && v <= f[2]); fld.classList.toggle('invalid', bad); if (bad) ok = false;
      });
      if (!ok) { var first = $('.invalid input', kc); if (first) first.focus(); return; }
      var sex = kc.elements.sex.value, a = +kc.elements.age.value, h = +String(kc.elements.height.value).replace(',', '.'), w = +String(kc.elements.weight.value).replace(',', '.');
      var act = +kc.elements.activity.value, goal = kc.elements.goal.value;
      var bmr = 10 * w + 6.25 * h - 5 * a + (sex === 'f' ? -161 : 5);
      var norm = bmr * act, target = goal === 'lose' ? norm * 0.85 : goal === 'gain' ? norm * 1.12 : norm;
      var rec = ['1500', '2000', '2500'].reduce(function (best, p) { return Math.abs(p - target) < Math.abs(best - target) ? p : best; }, '1500');
      if (goal === 'lose' && target < 1750) rec = '1500';
      var res = $('#kcal-result');
      $('[data-k="norm"]', res).textContent = Math.round(norm / 10) * 10 + ' ккал';
      $('[data-k="target"]', res).textContent = Math.round(target / 10) * 10 + ' ккал';
      $('[data-k="plan"]', res).textContent = rec + ' ккал — ' + PLANS[rec].goal.toLowerCase();
      $('[data-k="go"]', res).setAttribute('data-plan', rec);
      $('[data-k="go"]', res).setAttribute('data-term', '7');
      res.hidden = false;
      res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    $$('input', kc).forEach(function (i) { i.addEventListener('input', function () { i.closest('.field').classList.remove('invalid'); }); });
  }

  /* ===== Пример меню ===== */
  var menuBox = $('#menu-box');
  if (menuBox) {
    var mDay = 0, mPlan = '2000';
    var tabs = $$('[role="tab"]', menuBox);
    function renderMenu() {
      var d = MENU[mDay];
      $('#menu-list').innerHTML = PLANS[mPlan].meals.map(function (k) {
        return '<li class="meal"><b>' + MEAL_NAMES[k] + '</b><span>' + d.m[k] + '</span></li>';
      }).join('');
      var pb = $('#menu-photo');
      pb.setAttribute('data-src', img(d.img)); pb.setAttribute('data-cap', d.day + ': ' + d.cap);
      var im = $('img', pb); im.src = img(d.img); im.alt = d.cap;
      $('#menu-cta').setAttribute('data-plan', mPlan);
      $('#menu-cta').textContent = 'Хочу рацион ' + mPlan;
      tabs.forEach(function (t, i) { t.setAttribute('aria-selected', String(i === mDay)); t.tabIndex = i === mDay ? 0 : -1; });
      $$('[data-menu-plan]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-menu-plan') === mPlan)); });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { mDay = i; renderMenu(); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        mDay = (mDay + (e.key === 'ArrowRight' ? 1 : -1) + MENU.length) % MENU.length; renderMenu(); tabs[mDay].focus();
      });
    });
    $$('[data-menu-plan]').forEach(function (b) { b.addEventListener('click', function () { mPlan = b.getAttribute('data-menu-plan'); renderMenu(); }); });
    renderMenu();
  }

  /* ===== Проверка зоны доставки ===== */
  var zf = $('#zone-form');
  if (zf) {
    zf.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = zf.elements.zone.value, out = $('#zone-result'), fld = zf.elements.zone.closest('.field');
      if (!v) { fld.classList.add('invalid'); zf.elements.zone.focus(); out.hidden = true; return; }
      fld.classList.remove('invalid');
      var z = ZONES[v]; out.className = 'zone-result ' + z[0]; out.hidden = false;
      out.innerHTML = z[1] + (z[0] === 'ok' ? ' <a class="link" href="#order">Оформить заявку</a>' : ' <a class="link" href="' + CONTACTS.telegram + '" target="_blank" rel="noopener">Написать в Telegram</a>');
    });
    zf.elements.zone.addEventListener('change', function () { zf.requestSubmit ? zf.requestSubmit() : zf.dispatchEvent(new Event('submit', { cancelable: true })); });
  }

  /* ===== Карусель отзывов ===== */
  $$('[data-carousel]').forEach(function (c) {
    var track = $('.track', c), items = $$('.track > *', c), prev = $('[data-car="prev"]', c), next = $('[data-car="next"]', c), dots = $('.dots', c);
    function step() { return items[1] ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth; }
    function idx() { return Math.round(track.scrollLeft / step()); }
    var dbs = [];
    function buildDots() {
      var positions = Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / step()) + 1);
      if (dbs.length === positions) return;
      dots.innerHTML = '';
      dbs = [];
      for (var k = 0; k < positions; k++) {
        var d = document.createElement('button'); d.type = 'button'; d.setAttribute('aria-label', 'Позиция ' + (k + 1) + ' из ' + positions);
        d.addEventListener('click', (function (n) { return function () { track.scrollTo({ left: n * step(), behavior: 'smooth' }); }; })(k));
        dots.appendChild(d); dbs.push(d);
      }
      dots.hidden = positions < 2;
    }
    function upd() {
      var i = idx(), max = track.scrollWidth - track.clientWidth - 4;
      prev.disabled = track.scrollLeft <= 4; next.disabled = track.scrollLeft >= max;
      dbs.forEach(function (d, k) { d.setAttribute('aria-current', String(k === Math.min(i, dbs.length - 1))); });
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(upd); }, { passive: true });
    window.addEventListener('resize', function () { buildDots(); upd(); });
    buildDots(); upd();
  });

  /* ===== Галерея ===== */
  var gal = $('#gallery');
  if (gal) {
    var gFilter = 'all', gShown = 12;
    gal.innerHTML = GALLERY.map(function (g) {
      var n = pad(g[0]); n = (g[0] < 100 ? '0' : '') + n;
      return '<button type="button" data-cat="' + g[1] + '" data-lb="gallery" data-src="' + img(n) + '" data-cap="' + g[2] + '" aria-label="Открыть фото: ' + g[2] + '"><img src="' + img(n, true) + '" alt="' + g[2] + '" loading="lazy" decoding="async"></button>';
    }).join('');
    var more = $('#gallery-more');
    function renderGal() {
      var shown = 0, total = 0;
      $$('button', gal).forEach(function (b) {
        var match = gFilter === 'all' || b.getAttribute('data-cat') === gFilter;
        if (match) total++;
        var vis = match && shown < gShown; if (vis) shown++;
        b.hidden = !vis;
      });
      more.hidden = shown >= total;
      more.textContent = 'Показать ещё ' + Math.min(12, total - shown) + ' фото';
    }
    $$('[data-gfilter]').forEach(function (b) {
      b.addEventListener('click', function () {
        gFilter = b.getAttribute('data-gfilter'); gShown = 12;
        $$('[data-gfilter]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        renderGal();
      });
    });
    more.addEventListener('click', function () { gShown += 12; renderGal(); });
    renderGal();
  }

  /* ===== FAQ ===== */
  $$('.acc-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.closest('.acc-item'), open = !item.classList.contains('open');
      item.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
      $('.acc-panel', item).setAttribute('aria-hidden', String(!open));
    });
  });

  /* ===== Форма заявки ===== */
  function clearErr(fld) { if (fld) fld.classList.remove('invalid'); }
  function updateSummary() {
    if (!form) return;
    var p = (form.querySelector('input[name="plan"]:checked') || {}).value, t = (form.querySelector('input[name="term"]:checked') || {}).value;
    var box = $('#order-sum');
    if (!p || !t) { $('b', box).textContent = '—'; $('span', box).textContent = 'Выберите рацион и срок'; return; }
    t = +t; var price = PLANS[p].price[t];
    $('b', box).textContent = money(price);
    $('span', box).textContent = p + ' ккал · ' + TERM_NAMES[t] + (t > 1 ? ' · вместо ' + money(fullPrice(p, t)) : '');
  }
  function batumiNow() { var d = new Date(Date.now() + 4 * 3600e3); return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), h: d.getUTCHours() }; }
  function isoDay(offset) { var n = batumiNow(); var d = new Date(Date.UTC(n.y, n.m, n.d + offset)); return d.toISOString().slice(0, 10); }
  function toMin(s) { var p = s.split(':'); return +p[0] * 60 + +p[1]; }
  function fmt(m) { return Math.floor(m / 60) + ':' + pad(m % 60); }

  if (form) {
    var from = form.elements.from, to = form.elements.to, date = form.elements.date;
    for (var m = toMin('7:30'); m <= toMin('12:00'); m += 30) from.insertAdjacentHTML('beforeend', '<option value="' + fmt(m) + '">' + fmt(m) + '</option>');
    function fillTo() {
      var cur = to.value, start = from.value ? toMin(from.value) : null;
      to.innerHTML = '<option value="">до…</option>';
      if (start === null) { to.disabled = true; return; }
      to.disabled = false;
      for (var m2 = start + 60; m2 <= toMin('13:00'); m2 += 30) to.insertAdjacentHTML('beforeend', '<option value="' + fmt(m2) + '">' + fmt(m2) + '</option>');
      to.value = cur && toMin(cur) >= start + 60 ? cur : fmt(Math.min(start + 60, toMin('13:00')));
    }
    from.addEventListener('change', fillTo); fillTo();
    var minOffset = batumiNow().h >= 21 ? 2 : 1;
    date.min = isoDay(minOffset); date.max = isoDay(60); date.value = date.min;
    $('#date-hint').textContent = minOffset === 2 ? 'Сейчас уже после 21:00 по Батуми — ближайшая доставка послезавтра.' : 'Заявки до 21:00 — доставим уже завтра.';

    var phone = form.elements.phone;
    phone.addEventListener('focus', function () { if (!phone.value) phone.value = '+995 '; });
    phone.addEventListener('blur', function () { if (phone.value.trim() === '+995') phone.value = ''; });

    var rules = {
      name: function () { return form.elements.name.value.trim().length >= 2 || 'Как к вам обращаться?'; },
      phone: function () { var d = phone.value.replace(/\D/g, ''); return (d.length >= 9 && d.length <= 15) || 'Проверьте номер — нужно не меньше 9 цифр'; },
      address: function () { return form.elements.address.value.trim().length >= 5 || 'Укажите улицу, дом и квартиру'; },
      plan: function () { return !!form.querySelector('input[name="plan"]:checked') || 'Выберите рацион'; },
      term: function () { return !!form.querySelector('input[name="term"]:checked') || 'Выберите срок'; },
      window: function () { return (from.value && to.value && toMin(to.value) - toMin(from.value) >= 60) || 'Выберите окно не меньше часа'; },
      date: function () { return (date.value && date.value >= date.min && date.value <= date.max) || 'Выберите дату с ' + date.min.split('-').reverse().join('.'); },
      pay: function () { return !!form.querySelector('input[name="pay"]:checked') || 'Выберите способ оплаты'; },
      consent: function () { return form.elements.consent.checked || 'Нужно согласие на обработку данных'; }
    };
    function check(key) {
      var fld = form.querySelector('[data-for="' + key + '"]'), r = rules[key]();
      if (r === true) { fld.classList.remove('invalid'); return true; }
      fld.classList.add('invalid'); $('.err', fld).textContent = r; return false;
    }
    form.addEventListener('change', function (e) {
      updateSummary();
      var fld = e.target.closest('[data-for]'); if (fld && fld.classList.contains('invalid')) check(fld.getAttribute('data-for'));
    });
    form.addEventListener('input', function (e) { var fld = e.target.closest('[data-for]'); if (fld && fld.classList.contains('invalid')) check(fld.getAttribute('data-for')); });

    var lastText = '';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = Object.keys(rules).filter(function (k) { return !check(k); });
      var fe = $('#form-err');
      if (bad.length) {
        fe.hidden = false; fe.textContent = 'Проверьте отмеченные поля (' + bad.length + ').';
        var f = form.querySelector('[data-for="' + bad[0] + '"]'); var inp = $('input, select, textarea', f);
        f.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (inp) setTimeout(function () { inp.focus({ preventScroll: true }); }, 300);
        return;
      }
      fe.hidden = true;
      var el = form.elements, p = form.querySelector('input[name="plan"]:checked').value, t = +form.querySelector('input[name="term"]:checked').value;
      var pay = form.querySelector('input[name="pay"]:checked').value;
      var id = 'MM-' + String(Math.floor(1000 + Math.random() * 9000));
      lastText = [
        'Заявка ' + id + ' с сайта MealMe',
        'Имя: ' + el.name.value.trim(),
        'Телефон: ' + phone.value.trim(),
        'Адрес: ' + el.address.value.trim(),
        'Рацион: ' + p + ' ккал',
        'Срок: ' + TERM_NAMES[t] + ' — ' + money(PLANS[p].price[t]),
        'Начать: ' + date.value.split('-').reverse().join('.'),
        'Окно доставки: ' + from.value + '–' + to.value,
        'Исключить: ' + (el.exclude.value.trim() || 'нет'),
        'Оплата: ' + pay
      ].join('\n');
      var dlg = $('#ok-dlg');
      $('[data-f="id"]', dlg).textContent = id;
      $('pre', dlg).textContent = lastText;
      openDialog(dlg);
      form.reset(); date.value = date.min; fillTo(); updateSummary();
    });
    form.addEventListener('reset', function () { setTimeout(function () { $$('.invalid', form).forEach(clearErr); $('#form-err').hidden = true; updateSummary(); }, 0); });

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-send]'); if (!b) return;
      var where = b.getAttribute('data-send');
      copy(lastText).then(function (ok) {
        toast(ok ? 'Текст заявки скопирован — вставьте его в чат' : 'Скопируйте текст заявки вручную');
      });
      /* ссылка откроется штатно (href + target=_blank) */
      void where;
    });

    /* предзаполнение из ссылки ?plan=2000&term=7 */
    var qs = new URLSearchParams(location.search);
    if (qs.get('plan') || qs.get('term')) prefill(qs.get('plan'), qs.get('term'));
    updateSummary();
  }

  /* ===== Копирование контактов ===== */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (!b) return;
    copy(b.getAttribute('data-copy')).then(function (ok) { toast(ok ? 'Скопировано: ' + b.getAttribute('data-copy') : 'Скопируйте вручную: ' + b.getAttribute('data-copy')); });
  });

  /* ===== Наверх ===== */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-top]')) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });

  $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
})();
