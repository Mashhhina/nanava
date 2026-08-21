/* Рендер каталога, главной и карточки из data/items.js (window.NNV_DATA). */
(function () {
  var D = window.NNV_DATA;
  var byId = {};
  D.items.forEach(function (it) { byId[it.id] = it; });

  var SAVE_SVG =
    '<svg width="14" height="17" viewBox="0 0 14 17" fill="none" stroke="currentColor" stroke-width="1.2">' +
    '<path d="M1 1h12v15l-6-4.5L1 16V1z"/></svg>';

  function cardHTML(it) {
    return (
      '<article class="card">' +
        '<button class="save" data-save aria-label="В избранное">' + SAVE_SVG + '</button>' +
        '<a class="ph" href="product.html?id=' + it.id + '">' +
          '<img src="' + it.image + '" alt="' + it.title + '" loading="lazy">' +
          '<span class="dots"><i></i><i></i><i></i></span>' +
        '</a>' +
        '<a class="info" href="product.html?id=' + it.id + '">' +
          '<div class="t">' + it.title + '</div>' +
          '<div class="p">' + it.price + '</div>' +
          '<div class="sw" style="background:' + it.color + '"></div>' +
        '</a>' +
      '</article>'
    );
  }

  function renderGrid(el, items) {
    el.innerHTML = items.map(cardHTML).join("");
  }

  // избранное — просто визуальный тумблер
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-save]");
    if (b) { b.classList.toggle("on"); e.preventDefault(); }
  });

  /* ---- каталог ---- */
  var grid = document.querySelector("[data-catalog]");
  if (grid) {
    var countEl = document.querySelector("[data-count]");
    var params = new URLSearchParams(location.search);
    var cat = params.get("cat") || "all";

    function apply(slug) {
      cat = slug;
      var items = D.items.filter(function (it) { return slug === "all" || it.category === slug; });
      renderGrid(grid, items);
      if (countEl) countEl.textContent = items.length + " " + plural(items.length);
      document.querySelectorAll("[data-cat]").forEach(function (b) {
        b.classList.toggle("on", b.getAttribute("data-cat") === slug);
      });
      history.replaceState(null, "", slug === "all" ? "catalog.html" : "catalog.html?cat=" + slug);
    }
    function plural(n) {
      var m10 = n % 10, m100 = n % 100;
      if (m10 === 1 && m100 !== 11) return "вещь";
      if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "вещи";
      return "вещей";
    }
    document.querySelectorAll("[data-cat]").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-cat")); });
    });
    apply(cat);
  }

  /* ---- главная ---- */
  var newRow = document.querySelector("[data-new]");
  if (newRow) {
    renderGrid(newRow, ["sweater-rider", "bag-nanava", "hoodie-horns", "bag-frill"].map(function (id) { return byId[id]; }));
  }

  /* ---- карточка ---- */
  var pdp = document.querySelector("[data-pdp]");
  if (pdp) {
    var id = new URLSearchParams(location.search).get("id");
    var it = byId[id] || D.items[0];
    document.title = it.title + " — " + D.brand;

    document.querySelector("[data-g-main]").src = it.image;
    document.querySelector("[data-g-main]").alt = it.title;
    document.querySelector("[data-g-zoom]").src = it.image;
    document.querySelector("[data-title]").textContent = it.title;
    document.querySelector("[data-price]").textContent = it.price;
    document.querySelector("[data-lead]").textContent = it.lead;
    document.querySelector("[data-sku]").textContent = "Артикул: " + it.sku;
    document.querySelector("[data-desc]").textContent = it.desc;

    var buy = document.querySelector("[data-buy]");
    var needSize = it.category === "clothes";
    var picked = !needSize;
    var sizesWrap = document.querySelector("[data-sizes]");
    if (!needSize) sizesWrap.style.display = "none";
    buy.textContent = needSize ? "ВЫБЕРИТЕ РАЗМЕР" : "ДОБАВИТЬ В КОРЗИНУ";
    buy.setAttribute("data-need-size", needSize ? "1" : "0");

    document.querySelectorAll("[data-size]").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("[data-size]").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        picked = true;
        buy.textContent = "ДОБАВИТЬ В КОРЗИНУ";
        buy.setAttribute("data-need-size", "0");
      });
    });

    var veil = document.querySelector("[data-veil]");
    buy.addEventListener("click", function () {
      if (!picked) return;
      veil.classList.add("open");
    });
    veil.addEventListener("click", function (e) {
      if (e.target === veil || e.target.closest("[data-close]")) veil.classList.remove("open");
    });

    // смотрите также: та же категория, затем добор из остальных
    var also = D.items.filter(function (x) { return x.id !== it.id && x.category === it.category; });
    D.items.forEach(function (x) {
      if (also.length < 4 && x.id !== it.id && also.indexOf(x) === -1) also.push(x);
    });
    renderGrid(document.querySelector("[data-also]"), also.slice(0, 4));
  }
})();
