/* Раскладка кадров на странице товара по макету из Figma (врап «Section 1»,
   node 3287:2 файла «РЕФЕРЕНСЫ И ВИЗУАЛИЗАЦИЯ», 22.09).
   Данные — data/layouts.js: координаты кадров в пикселях макета шириной 1440,
   y считается от верха страницы (вместе с шапкой), как в Figma.

   Два эффекта при скролле:
   1. Параллакс — у кадров, которые в макете наезжают на другие: меньший кадр
      едет быстрее большого, поэтому слои расходятся.
   2. Стопка (как на openai.com/index/introducing-chatgpt-images-2-5) — у
      колонок из ≥3 кадров одной ширины, стоящих друг под другом. Примерно
      в трети таких колонок (детерминированно по id вещи) первая половина
      листается обычно, а следующие кадры прилипают к низу экрана и ложатся
      друг на друга. */
(function () {
  var L = window.NNV_LAYOUTS || {};
  var W = 1440;
  var MOBILE = 760;
  var par = [];          // [{el, k}] — кадры с параллаксом
  var canvas = null;
  var raf = 0;

  function vw(px) { return (px / W * 100).toFixed(4) + "vw"; }

  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function overlap(a, b) {
    var ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    var iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (ix <= 0 || iy <= 0) return 0;
    return ix * iy / Math.min(a.w * a.h, b.w * b.h);
  }

  /* колонки одинаковой ширины: одинаковые x и w (±2%), стоят столбиком
     без наложений друг на друга и на соседей */
  function columns(imgs) {
    var used = {}, out = [];
    var tol = W * 0.02;
    imgs.forEach(function (a, i) {
      if (used[i]) return;
      var g = [i];
      imgs.forEach(function (b, j) {
        if (j !== i && !used[j] && Math.abs(a.x - b.x) < tol && Math.abs(a.w - b.w) < tol) g.push(j);
      });
      if (g.length < 3) return;
      g.sort(function (p, q) { return imgs[p].y - imgs[q].y; });
      for (var k = 1; k < g.length; k++) {
        var p = imgs[g[k - 1]], q = imgs[g[k]];
        if (q.y < p.y + p.h - 2) return;                 // внутри колонки наложение — это не столбик
      }
      for (var m = 0; m < imgs.length; m++) {
        if (g.indexOf(m) >= 0) continue;
        for (var n = 0; n < g.length; n++) if (overlap(imgs[m], imgs[g[n]]) > 0.02) return;
      }
      g.forEach(function (j) { used[j] = 1; });
      out.push(g);
    });
    return out;
  }

  function img(o, cls) {
    return '<img class="' + cls + '" src="' + o.src + '" alt="" loading="lazy" decoding="async">';
  }

  function build(id) {
    var d = L[id];
    var imgs = d.imgs;
    var html = [];
    var inStack = {};

    // стопки
    columns(imgs).forEach(function (g, gi) {
      if (!window.NNV_LAY_ALL && hash(id + ":" + gi) % 3 !== 0) return;   // ~33% колонок (NNV_LAY_ALL — показать все, для проверки)
      var first = imgs[g[0]], last = imgs[g[g.length - 1]];
      var half = Math.floor(g.length / 2);
      var box = '<div class="lay-stack" style="left:' + vw(first.x) + ";top:" + vw(first.y) +
                ";width:" + vw(first.w) + ";height:" + vw(last.y + last.h - first.y) + '">';
      var prevEnd = first.y;
      g.forEach(function (j, k) {
        var o = imgs[j];
        inStack[j] = 1;
        var st = "margin-top:" + vw(o.y - prevEnd) + ";height:" + vw(o.h);
        var cls = "lay-card";
        if (k >= half) {
          cls += " is-stuck";
          st += ";top:calc(100vh - " + vw(o.h) + " - 48px)";
          var rot = [1, -2, 2, -1][k % 4];
          st += ";--rot:" + rot + "deg";
        }
        box += '<div class="' + cls + '" style="' + st + '">' + img(o, "") + "</div>";
        prevEnd = o.y + o.h;
      });
      html.push(box + "</div>");
    });

    // остальные кадры — абсолютом, параллакс тем, кто наезжает на соседа
    var maxA = 0;
    imgs.forEach(function (o) { maxA = Math.max(maxA, o.w * o.h); });
    imgs.forEach(function (o, i) {
      if (inStack[i]) return;
      var k = 0;
      imgs.forEach(function (b, j) {
        if (j === i || inStack[j]) return;
        // двигается тот, кто меньше: крупный кадр — «задник»
        if (overlap(o, b) > 0.02 && o.w * o.h <= b.w * b.h) k = Math.max(k, 0.06 + 0.14 * (1 - o.w * o.h / (b.w * b.h)));
      });
      var st = "left:" + vw(o.x) + ";top:" + vw(o.y) + ";width:" + vw(o.w) + ";height:" + vw(o.h) + ";z-index:" + (i + 1);
      html.push('<div class="lay-im' + (k ? " is-par" : "") + '" data-k="' + k.toFixed(3) + '" style="' + st + '">' +
                img(o, "") + "</div>");
    });
    return html.join("");
  }

  function tick() {
    raf = 0;
    var mid = innerHeight / 2;
    for (var i = 0; i < par.length; i++) {
      var p = par[i], r = p.el.getBoundingClientRect();
      if (r.bottom < -innerHeight || r.top > innerHeight * 2) continue;
      // на своём месте из макета кадр стоит, когда его центр — в центре экрана
      var c = r.top - p.dy + r.height / 2;
      p.dy = (mid - c) * p.k;
      p.el.style.transform = "translate3d(0," + p.dy.toFixed(1) + "px,0)";
    }
  }
  function onScroll() { if (!raf) raf = requestAnimationFrame(tick); }

  function sizePage(d) {
    var pdp = document.querySelector("[data-pdp]");
    if (!pdp || !canvas) return;
    var h = d.h / W * innerWidth;
    var top = pdp.getBoundingClientRect().top + scrollY;
    pdp.style.minHeight = Math.max(0, h - top) + "px";
  }

  function mobile(d) {
    // на телефоне макет не влезает — кадры столбиком в порядке сверху вниз
    var list = d.imgs.slice().sort(function (a, b) { return a.y - b.y; });
    return list.map(function (o) {
      return '<div class="fr lay-m"><img src="' + o.src + '" alt="" loading="lazy"></div>';
    }).join("");
  }

  /* вызывается из gallery() в app.js; true — кадры вещи отрисованы здесь */
  window.NNV_LAYOUT = {
    has: function (id) { return !!L[id]; },
    render: function (it) {
      var d = L[it.id];
      if (!d) return false;
      var gal = document.querySelector("[data-gallery]");
      if (innerWidth <= MOBILE) {
        gal.innerHTML = mobile(d);
        return true;
      }
      gal.innerHTML = "";
      document.body.classList.add("has-lay");
      if (!canvas) {
        canvas = document.createElement("div");
        canvas.className = "lay";
        document.body.insertBefore(canvas, document.body.firstChild);
      }
      canvas.style.height = vw(d.h);
      canvas.innerHTML = build(it.id);
      par = [].map.call(canvas.querySelectorAll(".is-par"), function (el) {
        return { el: el, k: +el.getAttribute("data-k"), dy: 0 };
      });
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) par = [];
      sizePage(d);
      if (!window.__layBound) {
        window.__layBound = 1;
        addEventListener("scroll", onScroll, { passive: true });
        addEventListener("resize", function () { sizePage(d); onScroll(); });
      }
      tick();
      return true;
    }
  };
})();
