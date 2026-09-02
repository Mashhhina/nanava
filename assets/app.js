/* NANAVA: i18n (EN/BY), корзина (localStorage), каталог (категории/цвет/
   сортировка), карточка, кукис. Данные — data/items.js. */
(function () {
  var D = window.NNV_DATA;
  var byId = {};
  D.items.forEach(function (it) { byId[it.id] = it; });

  /* ---------- i18n ---------- */
  var STR = {
    en: {
      collections: "Collections",
      help: "Help", bag: "Bag", catalog: "Catalog",
      all: "All", clothes: "Clothing", bags: "Bags", accessories: "Accessories", objects: "Objects",
      categories: "Categories", designer: "Designer", sort: "Sort", color: "Color",
      model: "Model", all_models: "Everyone", no_frames: "no frames yet",
      empty_model: "No pieces shot with this one yet.", no_model: "Not cast",
      "sort.new": "New in", "sort.priceAsc": "Price low–high", "sort.priceDesc": "Price high–low",
      items: "items", new_in: "New", view_all: "View all",
      shop_look: "Shop by Look", season: "Garderobe Fall Winter 26/27", explore: "Explore the collection",
      season_short: "FW 26/27", new_caps: "NEW", shop_now: "Shop now",
      objects_caps: "OBJECTS", clothes_caps: "CLOTHING", bags_caps: "BAGS",
      jewellery_caps: "JEWELLERY", prints_caps: "PRINTS", shop_look_caps: "SHOP THE LOOK",
      our_world: "OUR WORLD", about_caps: "THE PROJECT", read_more: "Read more",
      dresses: "DRESSES", knitwear: "KNITWEAR", tees: "T-SHIRTS", skirts: "SKIRTS",
      jewellery: "JEWELLERY",
      add_bag: "Add to bag", added: "Added to bag",
      details: "Details & care", shipping: "Shipping & payment", about_pr: "About the project", need_help: "Need help?",
      details_bd: "Composition is specified per piece. Delicate wash at 30°, iron inside out, do not bleach printed pieces. Satin and lace — dry clean only.",
      shipping_bd: "The collection has not entered production yet — shipping and payment will open with the first run. Leave your email and we will write first.",
      about_bd: "NANAVA is an independent project. All prints and shapes are original works by Alya Chlaba — graphics, embroidery and objects translated into wearable pieces.",
      help_bd: "Write to hello@nanava.store — we reply within a day.",
      also_like: "You may also like",
      process_caps: "DESIGN PROCESS",
      process_note: "Working sheets from the studio — the sketches, notes and fabric marks this piece grew from.",
      process_home: "PROCESS", process_home_note: "How the season was drawn.",
      shopping_bag: "Shopping bag", item: "Item", total: "Total",
      shipping_est: "Shipping estimate", calc_checkout: "Calculated at checkout",
      duties: "Duties and taxes", included: "Included", order_total: "Order total",
      remove: "Remove", size: "Size", bag_empty: "Your bag is empty.",
      checkout: "Checkout", checkout_p: "Enter your email to login or continue to checkout as a guest.",
      email: "Email address", proceed: "Proceed to checkout",
      notice_p: "These pieces are not on sale yet.\nWe are preparing the first run — leave your email and you will be the first to know about the launch.",
      leave_email: "Leave email", close: "Close",
      news: "Newsletter", news_p: "New pieces and launch dates — first.", subscribe: "Subscribe",
      about: "About", brand_history: "Brand history", contacts: "Contacts",
      customers: "For customers", payment: "Payment", delivery: "Delivery",
      loyalty: "Loyalty program", faq: "FAQ",
      address: "Minsk — Warsaw", rights: "All rights reserved",
      cookies_t: "This site uses cookies to make browsing comfortable. By staying here you agree to the essential ones only.",
      ok: "OK"
    },
    be: {
      collections: "Калекцыі",
      help: "Дапамога", bag: "Кошык", catalog: "Каталог",
      all: "Усе", clothes: "Адзенне", bags: "Сумкі", accessories: "Аксесуары", objects: "Аб'екты",
      categories: "Катэгорыі", designer: "Дызайнер", sort: "Сартаваць", color: "Колер",
      model: "Мадэль", all_models: "Усе", no_frames: "кадраў яшчэ няма",
      empty_model: "З гэтым яшчэ нічога не здымалі.", no_model: "Без мадэлі",
      "sort.new": "Спачатку новае", "sort.priceAsc": "Кошт: ад меншага", "sort.priceDesc": "Кошт: ад большага",
      items: "рэчаў", new_in: "Новае", view_all: "Усе рэчы",
      shop_look: "Shop by Look", season: "Гардэроб восень-зіма 26/27", explore: "Глядзець калекцыю",
      season_short: "ВЗ 26/27", new_caps: "НОВАЕ", shop_now: "Глядзець",
      objects_caps: "АБ'ЕКТЫ", clothes_caps: "АДЗЕННЕ", bags_caps: "СУМКІ",
      jewellery_caps: "УПРЫГОЖАННІ", prints_caps: "ПРЫНТЫ", shop_look_caps: "SHOP THE LOOK",
      our_world: "НАШ СВЕТ", about_caps: "ПРА ПРАЕКТ", read_more: "Чытаць далей",
      dresses: "СУКЕНКІ", knitwear: "ТРЫКАТАЖ", tees: "ФУТБОЛКІ", skirts: "СПАДНІЦЫ",
      jewellery: "УПРЫГОЖАННІ",
      add_bag: "Дадаць у кошык", added: "Дададзена ў кошык",
      details: "Склад і догляд", shipping: "Дастаўка і аплата", about_pr: "Пра праект", need_help: "Патрэбна дапамога?",
      details_bd: "Склад удакладняецца для кожнай рэчы. Далікатнае мыццё пры 30°, прасаваць з адваротнага боку, рэчы з прынтам не адбельваць. Атлас і карункі — толькі хімчыстка.",
      shipping_bd: "Калекцыя яшчэ не запушчана ў вытворчасць — дастаўка і аплата з'явяцца з першым тыражом. Пакіньце пошту, і мы напішам першымі.",
      about_bd: "NANAVA — незалежны праект. Усе прынты і формы — аўтарскія працы Алі Члабы: графіка, вышыўка і аб'екты, пераведзеныя ў рэчы.",
      help_bd: "Пішыце на hello@nanava.store — адкажам на працягу дня.",
      also_like: "Вам таксама спадабаецца",
      process_caps: "ПРАЦЭС", 
      process_note: "Рабочыя лісты са студыі — накіды, паметкі і адзнакі тканіны, з якіх вырасла рэч.",
      process_home: "ПРАЦЭС", process_home_note: "Як маляваўся сезон.",
      shopping_bag: "Кошык", item: "Тавар", total: "Разам",
      shipping_est: "Кошт дастаўкі", calc_checkout: "Разлічваецца пры афармленні",
      duties: "Пошліны і падаткі", included: "Уключаны", order_total: "Разам да аплаты",
      remove: "Выдаліць", size: "Памер", bag_empty: "Ваш кошык пусты.",
      checkout: "Афармленне", checkout_p: "Увядзіце пошту, каб увайсці або аформіць заказ як госць.",
      email: "Электронная пошта", proceed: "Аформіць заказ",
      notice_p: "Гэтыя рэчы пакуль не ў продажы.\nМы рыхтуем першы тыраж — пакіньце пошту, і вы даведаецеся пра запуск першымі.",
      leave_email: "Пакінуць пошту", close: "Зачыніць",
      news: "Рассылка", news_p: "Новыя рэчы і даты запуску — першымі.", subscribe: "Падпісацца",
      about: "Пра кампанію", brand_history: "Гісторыя брэнда", contacts: "Кантакты",
      customers: "Пакупнікам", payment: "Аплата", delivery: "Дастаўка",
      loyalty: "Праграма лаяльнасці", faq: "Пытанне-адказ",
      address: "Мінск — Варшава", rights: "Усе правы абаронены",
      cookies_t: "Гэты сайт выкарыстоўвае cookies, каб праглядаць было зручна. Застаючыся тут, вы згаджаецеся толькі на неабходныя.",
      ok: "ОК"
    }
  };
  var lang = localStorage.getItem("nnv_lang") || "en";
  function t(k) { return (STR[lang] && STR[lang][k]) || STR.en[k] || k; }
  function applyI18n() {
    document.documentElement.lang = lang === "be" ? "be" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-ph"));
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-lang") === lang);
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (b) { lang = b.getAttribute("data-lang"); localStorage.setItem("nnv_lang", lang); render(); }
  });

  /* ---------- корзина ---------- */
  function getBag() { try { return JSON.parse(localStorage.getItem("nnv_bag")) || []; } catch (e) { return []; } }
  function setBag(bag) { localStorage.setItem("nnv_bag", JSON.stringify(bag)); updateBagCount(); }
  function addToBag(id, size) {
    var bag = getBag();
    bag.push({ id: id, size: size });
    setBag(bag);
  }
  function updateBagCount() {
    var n = getBag().length;
    document.querySelectorAll("[data-bag-count]").forEach(function (el) {
      el.textContent = n > 0 ? "(" + n + ")" : "(0)";
    });
  }
  function eur(n) { return "€" + n; }

  /* ---------- карточка сетки ----------
     У вещи с расцветками (it.colors) под ценой — ряд квадратиков: клик прямо
     в сетке меняет кадр плитки и запоминается в ссылке (?color=…), чтобы
     карточка товара открылась на выбранном цвете. Внутри <a> кнопок нет:
     квадратики — это span'ы, клик по ним перехватывается делегатом ниже. */
  function swatchHTML(it) {
    var cs = it.colors || [];
    if (cs.length < 2) return "";
    return '<span class="sw">' + cs.map(function (c, i) {
      var own = c.item ? c.item === it.id : i === 0;
      return '<span class="sw__b' + (own ? " on" : "") + '" data-sw="' + i + '" role="button" tabindex="0" ' +
             'title="' + c.label + '" aria-label="' + c.label + '" style="background:' + c.swatch + '"></span>';
    }).join("") + '</span>';
  }
  function cardHTML(it) {
    return (
      '<a class="card" href="product.html?id=' + it.id + '" data-card="' + it.id + '">' +
        '<span class="ph"><img src="' + it.image + '" alt="' + it.title + '" loading="lazy"></span>' +
        '<span class="info"><span class="t">' + it.title + '</span>' +
        '<span class="p" style="display:block">' + eur(it.price) + '</span>' +
        swatchHTML(it) + '</span>' +
      '</a>'
    );
  }
  function renderInto(el, items) { el.innerHTML = items.map(cardHTML).join(""); }

  /* Клик по квадратику в сетке: не уходим по ссылке, а показываем этот цвет. */
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-sw]") : null;
    if (!b) return;
    var card = b.closest("[data-card]");
    if (!card) return;
    e.preventDefault();
    var it = byId[card.dataset.card], c = (it && it.colors || [])[+b.dataset.sw];
    if (!c) return;
    var img = card.querySelector(".ph img");
    if (img) img.src = c.image;
    card.querySelectorAll("[data-sw]").forEach(function (x) { x.classList.remove("on"); });
    b.classList.add("on");
    // расцветка живёт своей карточкой (c.item) — ссылка ведёт туда
    card.setAttribute("href", "product.html?id=" + (c.item || it.id) + "&color=" + c.id);
  });

  /* ---------- каталог ---------- */
  var state = { cat: "all", color: "all", sort: "new", model: "all" };

  /* ---------- фильтр по моделям (лица над сеткой) ----------
     Данные — data/faces.js (собирается scripts/build_models.py из ростера
     refs/models/registry.json + usage.json). В выпадашке весь ростер, включая
     Булочку и тех, по кому ещё ничего не сгенерено — по счётчику видно, что
     кадров нет (PLAYBOOK, «Фильтр по моделям»). */
  var FACES = (window.NNV_FACES && window.NNV_FACES.models) || [];
  var modelOf = {};                       // id вещи → имена моделей в кадре
  FACES.forEach(function (m) {
    (m.items || []).forEach(function (id) {
      (modelOf[id] = modelOf[id] || []).push(m.name);
    });
  });
  var unassigned = D.items.filter(function (it) {
    var names = modelOf[it.id] || [];
    return !names.some(function (n) {
      var m = modelById(n); return m && m.kind !== "dog";
    });
  }).map(function (it) { return it.id; });
  function modelById(name) {
    for (var i = 0; i < FACES.length; i++) if (FACES[i].name === name) return FACES[i];
    return null;
  }
  function shotCount(m) {
    return (m.items || []).filter(function (id) { return !!byId[id]; }).length;
  }
  function faceHTML(m, cls) {
    return m.face
      ? '<span class="' + cls + '"><img src="' + m.face + '" alt="" loading="lazy"></span>'
      : '<span class="' + cls + ' none"></span>';
  }
  function renderModelFilter() {
    var box = document.querySelector("[data-model-filter]");
    if (!box || !FACES.length) { if (box) box.hidden = true; return; }
    var btn = box.querySelector("[data-model-btn]");
    var pop = box.querySelector("[data-model-pop]");
    var cur = state.model === "all" ? null : modelById(state.model);
    btn.innerHTML = cur ? faceHTML(cur, "mf-face") + "<span>" + cur.label + "</span>"
      : '<span>' + t(state.model === "none" ? "no_model" : "all_models") + "</span>";
    pop.innerHTML =
      '<button class="mf-item all' + (state.model === "all" ? " on" : "") +
        '" data-pick-model="all">' + t("all_models") + "</button>" +
      FACES.map(function (m) {
        var n = shotCount(m);
        return '<button class="mf-item' + (state.model === m.name ? " on" : "") +
          (n ? "" : " empty") + '" data-pick-model="' + m.name + '">' +
          faceHTML(m, "mf-face") +
          '<span class="nm">' + m.label + "</span>" +
          '<span class="ct">' + (n ? n : t("no_frames")) + "</span></button>";
      }).join("") +
      (unassigned.length                     // вещи, на которые ещё не выбрана модель
        ? '<button class="mf-item' + (state.model === "none" ? " on" : "") +
          '" data-pick-model="none"><span class="mf-face none"></span>' +
          '<span class="nm">' + t("no_model") + "</span>" +
          '<span class="ct">' + unassigned.length + "</span></button>"
        : "");
  }
  function setModel(name) {
    state.model = name;
    var q = [];
    if (state.cat !== "all") q.push("cat=" + state.cat);
    if (state.model !== "all") q.push("model=" + state.model);
    history.replaceState(null, "", "catalog.html" + (q.length ? "?" + q.join("&") : ""));
    renderCatalog();
  }
  function initModelFilter() {
    var box = document.querySelector("[data-model-filter]");
    if (!box) return;
    var pop = box.querySelector("[data-model-pop]");
    box.addEventListener("click", function (e) {
      if (e.target.closest("[data-model-btn]")) { pop.hidden = !pop.hidden; return; }
      var pick = e.target.closest("[data-pick-model]");
      if (!pick) return;
      pop.hidden = true;
      setModel(pick.getAttribute("data-pick-model"));
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest("[data-model-filter]")) pop.hidden = true;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") pop.hidden = true;
    });
  }
  function renderCatalog() {
    var grid = document.querySelector("[data-catalog]");
    if (!grid) return;
    var items = D.items.filter(function (it) {
      return (state.cat === "all" || it.category === state.cat) &&
             (state.color === "all" || it.colorGroup === state.color) &&
             (state.model === "all" ||
              (state.model === "none" ? unassigned.indexOf(it.id) >= 0
                                      : (modelOf[it.id] || []).indexOf(state.model) >= 0));
    });
    if (state.sort === "priceAsc") items = items.slice().sort(function (a, b) { return a.price - b.price; });
    if (state.sort === "priceDesc") items = items.slice().sort(function (a, b) { return b.price - a.price; });
    renderInto(grid, items);
    if (!items.length && state.model !== "all")
      grid.innerHTML = '<p class="cat-empty">' + t("empty_model") + "</p>";
    var c = document.querySelector("[data-count]");
    if (c) c.textContent = items.length + " " + t("items");
    renderModelFilter();
    document.querySelectorAll("[data-cat]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-cat") === state.cat);
    });
  }
  function initCatalog() {
    var grid = document.querySelector("[data-catalog]");
    if (!grid) return;
    var params = new URLSearchParams(location.search);
    state.cat = params.get("cat") || "all";
    state.model = params.get("model") || "all";
    if (state.model !== "all" && state.model !== "none" && !modelById(state.model))
      state.model = "all";
    document.querySelectorAll("[data-cat]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.cat = b.getAttribute("data-cat");
        var q = state.model === "all" ? "" : "?model=" + state.model;
        if (state.cat !== "all") q = (q ? q + "&" : "?") + "cat=" + state.cat;
        history.replaceState(null, "", "catalog.html" + q);
        renderCatalog();
      });
    });
    initModelFilter();
    var colorSel = document.querySelector("[data-color]");
    if (colorSel) {
      var groups = [];
      D.items.forEach(function (it) { if (groups.indexOf(it.colorGroup) < 0) groups.push(it.colorGroup); });
      colorSel.innerHTML = '<option value="all">—</option>' + groups.map(function (g) {
        return '<option value="' + g + '">' + g + "</option>";
      }).join("");
      colorSel.addEventListener("change", function () { state.color = colorSel.value; renderCatalog(); });
    }
    var sortSel = document.querySelector("[data-sort]");
    if (sortSel) sortSel.addEventListener("change", function () { state.sort = sortSel.value; renderCatalog(); });
  }

  /* ---------- главная (композиция bimba y lola) ---------- */
  function renderHome() {
    var H = window.NNV_HOME;
    var cats = document.querySelector("[data-cat-rail]");
    if (!H || !cats) return;

    cats.innerHTML = H.tiles.map(function (tile) {
      return '<a class="tile" href="' + tile.href + '">' +
        '<img src="' + tile.img + '" alt="" loading="lazy">' +
        '<span class="lb">' + t(tile.key).toUpperCase() + "</span></a>";
    }).join("");

    var looks = document.querySelector("[data-look-rail]");
    looks.innerHTML = H.looks.map(function (l, i) {
      return '<a class="fig" href="product.html?id=' + l.id + '">' +
        '<img src="' + l.img + '" width="' + l.w + '" height="' + l.h + '"' +
        ' alt="" loading="' + (i < 3 ? "eager" : "lazy") + '"></a>';
    }).join("");

    var world = document.querySelector("[data-world-rail]");
    world.innerHTML = H.world.map(function (id) {
      var it = byId[id]; if (!it) return "";
      var t = (H.tileById && H.tileById[id]) || { src: it.image, w: 3, h: 4 };
      return '<a class="fig" href="product.html?id=' + it.id + '">' +
        '<img src="' + t.src + '" width="' + t.w + '" height="' + t.h + '"' +
        ' alt="' + it.title + '" loading="lazy"></a>';
    }).join("");

    initSliders();
  }

  /* индикатор прокрутки лент (тонкая полоса под лентой, как у bimba) */
  function initSliders() {
    document.querySelectorAll(".hm-slider").forEach(function (sl) {
      var items = sl.querySelector(".hm-slider__items");
      var bar = sl.querySelector(".hm-bar");
      if (!items || !bar || bar.dataset.on) return;
      bar.dataset.on = "1";
      var knob = bar.querySelector("span");
      function upd() {
        var max = items.scrollWidth - items.clientWidth;
        var w = bar.clientWidth;
        var kw = max > 0 ? Math.max(28, w * items.clientWidth / items.scrollWidth) : w;
        knob.style.width = kw + "px";
        knob.style.transform = "translateX(" + (max > 0 ? (w - kw) * items.scrollLeft / max : 0) + "px)";
      }
      items.addEventListener("scroll", upd, { passive: true });
      window.addEventListener("resize", upd);
      setTimeout(upd, 60);
      upd();
    });
  }

  /* ---------- карточка товара ---------- */
  var pickedSize = "M"; // размер предвыбран — кнопка всегда активна (созвон 21.08)
  function renderProduct() {
    var pdp = document.querySelector("[data-pdp]");
    if (!pdp) return;
    var id = new URLSearchParams(location.search).get("id");
    var it = byId[id] || D.items[0];
    document.title = it.title + " — " + D.brand;
    /* Галерея. Если у вещи есть разновидности цвета (it.colors), кадры берём
       у выбранной: сама вещь одна, карточка одна, меняется только расцветка. */
    function gallery(main, rest) {
      var frames = [main].concat(rest || []);
      document.querySelector("[data-gallery]").innerHTML = frames.map(function (src, i) {
        // без пролёток: второй кадр — автозум-деталь из эталона
        return '<div class="fr"><img src="' + src + '" alt="' + (i ? "" : it.title) + '" loading="lazy"></div>';
      }).join("") + (frames.length === 1 ? '<div class="fr zoom"><img src="' + main + '" alt="" aria-hidden="true"></div>' : "");
    }
    gallery(it.image, it.images);

    var colors = it.colors || [], cw = document.querySelector("[data-colors]");
    if (cw) {
      cw.hidden = colors.length < 2;
      if (!cw.hidden) {
        cw.innerHTML = colors.map(function (c, i) {
          return '<button type="button" data-color="' + i + '" title="' + c.label + '" aria-label="' + c.label +
                 '"><i style="background:' + c.swatch + '"></i></button>';
        }).join("") + '<span class="pdp-colors__name"></span>';
        var name = cw.querySelector(".pdp-colors__name");
        var btns = cw.querySelectorAll("[data-color]");
        function show(i) {                                  // показать расцветку этой же вещи
          var c = colors[i];
          btns.forEach(function (x) { x.classList.remove("on"); });
          btns[i].classList.add("on");
          name.textContent = c.label;
          // свои кадры у расцветки заданы полем images (пустое — значит кадр один);
          // если поля нет, расцветка снята кадрами самой вещи
          gallery(c.image || it.image, "images" in c ? c.images : it.images);
        }
        btns.forEach(function (b, i) {
          b.onclick = function () {
            var c = colors[i];
            // расцветка снята отдельной карточкой (своя цена и свой артикул) —
            // уходим на неё; иначе просто меняем кадры здесь
            if (c.item && c.item !== it.id) {
              location.href = "product.html?id=" + c.item + "&color=" + c.id;
              return;
            }
            show(i);
          };
        });
        var want = new URLSearchParams(location.search).get("color");
        var start = 0;
        colors.forEach(function (c, i) {                    // сначала — расцветка этой вещи
          if (c.item === it.id) start = i;
        });
        colors.forEach(function (c, i) {                    // затем — то, что просили ссылкой
          if (c.id === want && (!c.item || c.item === it.id)) start = i;
        });
        show(start);
      }
    }
    document.querySelector("[data-title]").textContent = it.title;
    document.querySelector("[data-price]").textContent = eur(it.price);
    document.querySelector("[data-lead]").textContent = it.lead;
    document.querySelector("[data-sku]").textContent = it.sku;
    document.querySelector("[data-desc]").textContent = it.desc;

    var sizes = document.querySelector("[data-sizes]");
    if (it.category !== "clothes") { sizes.style.display = "none"; }
    document.querySelectorAll("[data-size]").forEach(function (b) {
      b.classList.toggle("on", b.textContent.trim() === pickedSize);
      b.onclick = function () {
        pickedSize = b.textContent.trim();
        document.querySelectorAll("[data-size]").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
      };
    });
    var buy = document.querySelector("[data-buy]");
    buy.onclick = function () {
      addToBag(it.id, it.category === "clothes" ? pickedSize : "-");
      var ok = document.querySelector("[data-added]");
      ok.classList.add("show");
      setTimeout(function () { ok.classList.remove("show"); }, 1800);
    };

    renderProcess(it);

    var also = D.items.filter(function (x) { return x.id !== it.id && x.category === it.category; });
    D.items.forEach(function (x) {
      if (also.length < 8 && x.id !== it.id && also.indexOf(x) === -1) also.push(x);
    });
    renderInto(document.querySelector("[data-also]"), also.slice(0, 8));
  }

  /* «процесс работы»: листы вещи целиком, без кропа (PLAYBOOK, тип 4) */
  function renderProcess(it) {
    var sect = document.querySelector("[data-process]");
    if (!sect) return;
    var list = it.process || [];
    sect.hidden = !list.length;
    if (!list.length) return;
    document.querySelector("[data-process-list]").innerHTML = list.map(function (p) {
      return '<figure class="proc-fig">' +
        '<img src="' + p.src + '" alt="" loading="lazy">' +
        '<figcaption>' + p.cap + "</figcaption></figure>";
    }).join("");
  }

  /* ---------- страница корзины ---------- */
  function renderBag() {
    var list = document.querySelector("[data-bag-items]");
    if (!list) return;
    var bag = getBag();
    if (!bag.length) {
      list.innerHTML = '<div class="bag-empty">' + t("bag_empty") + "</div>";
      document.querySelector("[data-bag-tot]").innerHTML = "";
      return;
    }
    var total = 0;
    list.innerHTML = bag.map(function (row, i) {
      var it = byId[row.id]; if (!it) return "";
      total += it.price;
      return (
        '<div class="bag-item">' +
          '<a class="im" href="product.html?id=' + it.id + '"><img src="' + it.image + '" alt=""></a>' +
          '<div><div class="nm">' + D.brand + "</div>" +
            '<div>' + it.title + "</div>" +
            '<div class="meta">' + t("size") + ": " + row.size + "</div>" +
            '<button class="rm" data-rm="' + i + '">' + t("remove") + "</button></div>" +
          '<div class="pr">' + eur(it.price) + "</div>" +
        "</div>"
      );
    }).join("");
    document.querySelector("[data-bag-tot]").innerHTML =
      '<div class="row"><span>' + t("total") + "</span><span>" + eur(total) + "</span></div>" +
      '<div class="row"><span>' + t("shipping_est") + "</span><span>" + t("calc_checkout") + "</span></div>" +
      '<div class="row"><span>' + t("duties") + "</span><span>" + t("included") + "</span></div>" +
      '<div class="row grand"><span>' + t("order_total") + "</span><span>" + eur(total) + "</span></div>";
    list.querySelectorAll("[data-rm]").forEach(function (b) {
      b.addEventListener("click", function () {
        var bag2 = getBag();
        bag2.splice(parseInt(b.getAttribute("data-rm"), 10), 1);
        setBag(bag2); renderBag();
      });
    });
  }

  /* ---------- модалка «не в продаже» ---------- */
  function initNotice() {
    var veil = document.querySelector("[data-veil]");
    if (!veil) return;
    document.querySelectorAll("[data-open-notice]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); veil.classList.add("open"); });
    });
    veil.addEventListener("click", function (e) {
      if (e.target === veil || e.target.closest("[data-close]")) veil.classList.remove("open");
    });
  }

  /* ---------- кукис ---------- */
  function initCookies() {
    var c = document.querySelector("[data-cookies]");
    if (!c) return;
    if (!localStorage.getItem("nnv_cookies")) c.classList.add("show");
    c.querySelector("button").addEventListener("click", function () {
      localStorage.setItem("nnv_cookies", "essential");
      c.classList.remove("show");
    });
  }

  function render() {
    applyI18n();
    updateBagCount();
    renderCatalog();
    renderHome();
    renderProduct();
    renderBag();
  }

  initCatalog();
  initNotice();
  initCookies();
  render();
})();
