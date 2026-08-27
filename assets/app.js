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
      "sort.new": "New in", "sort.priceAsc": "Price low–high", "sort.priceDesc": "Price high–low",
      items: "items", new_in: "New in", view_all: "View all",
      shop_look: "Shop by Look", season: "Garderobe Fall Winter 26/27", explore: "Explore the collection",
      add_bag: "Add to bag", added: "Added to bag",
      details: "Details & care", shipping: "Shipping & payment", about_pr: "About the project", need_help: "Need help?",
      details_bd: "Composition is specified per piece. Delicate wash at 30°, iron inside out, do not bleach printed pieces. Satin and lace — dry clean only.",
      shipping_bd: "The collection has not entered production yet — shipping and payment will open with the first run. Leave your email and we will write first.",
      about_bd: "NANAVA is an independent project. All prints and shapes are original works by Alya Chlaba — graphics, embroidery and objects translated into wearable pieces.",
      help_bd: "Write to hello@nanava.store — we reply within a day.",
      also_like: "You may also like",
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
      "sort.new": "Спачатку новае", "sort.priceAsc": "Кошт: ад меншага", "sort.priceDesc": "Кошт: ад большага",
      items: "рэчаў", new_in: "Новае", view_all: "Усе рэчы",
      shop_look: "Shop by Look", season: "Гардэроб восень-зіма 26/27", explore: "Глядзець калекцыю",
      add_bag: "Дадаць у кошык", added: "Дададзена ў кошык",
      details: "Склад і догляд", shipping: "Дастаўка і аплата", about_pr: "Пра праект", need_help: "Патрэбна дапамога?",
      details_bd: "Склад удакладняецца для кожнай рэчы. Далікатнае мыццё пры 30°, прасаваць з адваротнага боку, рэчы з прынтам не адбельваць. Атлас і карункі — толькі хімчыстка.",
      shipping_bd: "Калекцыя яшчэ не запушчана ў вытворчасць — дастаўка і аплата з'явяцца з першым тыражом. Пакіньце пошту, і мы напішам першымі.",
      about_bd: "NANAVA — незалежны праект. Усе прынты і формы — аўтарскія працы Алі Члабы: графіка, вышыўка і аб'екты, пераведзеныя ў рэчы.",
      help_bd: "Пішыце на hello@nanava.store — адкажам на працягу дня.",
      also_like: "Вам таксама спадабаецца",
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

  /* ---------- карточка сетки ---------- */
  function cardHTML(it) {
    return (
      '<a class="card" href="product.html?id=' + it.id + '">' +
        '<span class="ph"><img src="' + it.image + '" alt="' + it.title + '" loading="lazy"></span>' +
        '<span class="info"><span class="t">' + it.title + '</span>' +
        '<span class="p" style="display:block">' + eur(it.price) + '</span></span>' +
      '</a>'
    );
  }
  function renderInto(el, items) { el.innerHTML = items.map(cardHTML).join(""); }

  /* ---------- каталог ---------- */
  var state = { cat: "all", color: "all", sort: "new" };
  function renderCatalog() {
    var grid = document.querySelector("[data-catalog]");
    if (!grid) return;
    var items = D.items.filter(function (it) {
      return (state.cat === "all" || it.category === state.cat) &&
             (state.color === "all" || it.colorGroup === state.color);
    });
    if (state.sort === "priceAsc") items = items.slice().sort(function (a, b) { return a.price - b.price; });
    if (state.sort === "priceDesc") items = items.slice().sort(function (a, b) { return b.price - a.price; });
    renderInto(grid, items);
    var c = document.querySelector("[data-count]");
    if (c) c.textContent = items.length + " " + t("items");
    document.querySelectorAll("[data-cat]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-cat") === state.cat);
    });
  }
  function initCatalog() {
    var grid = document.querySelector("[data-catalog]");
    if (!grid) return;
    var params = new URLSearchParams(location.search);
    state.cat = params.get("cat") || "all";
    document.querySelectorAll("[data-cat]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.cat = b.getAttribute("data-cat");
        history.replaceState(null, "", state.cat === "all" ? "catalog.html" : "catalog.html?cat=" + state.cat);
        renderCatalog();
      });
    });
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

  /* ---------- главная ---------- */
  function renderHome() {
    var newRow = document.querySelector("[data-new]");
    if (!newRow) return;
    renderInto(newRow, ["belt-holster", "longsleeve-smile", "dress-feather", "sweater-rider", "bag-nanava", "hoodie-horns"].map(function (id) { return byId[id]; }));
  }

  /* ---------- карточка товара ---------- */
  var pickedSize = "M"; // размер предвыбран — кнопка всегда активна (созвон 21.08)
  function renderProduct() {
    var pdp = document.querySelector("[data-pdp]");
    if (!pdp) return;
    var id = new URLSearchParams(location.search).get("id");
    var it = byId[id] || D.items[0];
    document.title = it.title + " — " + D.brand;
    var frames = [it.image].concat(it.images || []);
    document.querySelector("[data-gallery]").innerHTML = frames.map(function (src, i) {
      // без пролёток: второй кадр — автозум-деталь из эталона
      return '<div class="fr"><img src="' + src + '" alt="' + (i ? "" : it.title) + '" loading="lazy"></div>';
    }).join("") + (frames.length === 1 ? '<div class="fr zoom"><img src="' + it.image + '" alt="" aria-hidden="true"></div>' : "");
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

    var also = D.items.filter(function (x) { return x.id !== it.id && x.category === it.category; });
    D.items.forEach(function (x) {
      if (also.length < 8 && x.id !== it.id && also.indexOf(x) === -1) also.push(x);
    });
    renderInto(document.querySelector("[data-also]"), also.slice(0, 8));
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
