/* NANAVA — редактор картинок на живом сайте. Открыт всем, кто зашёл: навёл
   на картинку → карандаш → обвёл зону → написал, что поменять → «Сохранить».
   Спрятать карандаши в своём браузере: nanava.store/?nnv-studio=0 , вернуть — =1.

   Генерация и запись идут через студийный прокси (proxy/worker.js): ключ
   Google и токен GitHub лежат на нём, в браузер не попадают, гостю вставлять
   нечего. Общий ключ в самом файле сайта не зашит намеренно — файл публичный.
   Свои ключи (кнопка «Ключи») — запасной путь, если прокси недоступен.

   Зона правки настоящая: её координаты уходят в модель и словами, и кадром
   с розовой обводкой, а ответ вклеивается только внутрь зоны — вне её кадр
   остаётся прежним. Каждая генерация ложится в архив браузера и, после
   «Сохранить», в img/<вещь>/_gen/ — это галерея версий кадра. */
(function () {
  var CFG = {
    param: "nnv-studio",
    /* Адрес прокси студии (proxy/worker.js). Пока он пуст, править может
       только тот, кто вставил свои ключи кнопкой «Ключи». Как задеплоите
       воркер — впишите сюда его адрес, и генерация с сохранением заработают
       у любого гостя, без ключей. */
    proxy: "https://nnv-studio.zakharevich-alexey.workers.dev",
    repo: "Mashhhina/nanava",
    branch: "main",
    api: "https://generativelanguage.googleapis.com/v1beta/interactions",
    model: "gemini-3.1-flash-image",
    price: { "1K": 0.039, "2K": 0.101 },
    aspects: ["21:9", "16:9", "3:2", "4:3", "5:4", "1:1", "4:5", "3:4", "2:3", "9:16"],
    cropLimit: 0.30, cropPad: 0.45, minImg: 80
  };

  /* ---------- админский режим ---------- */
  var KEY = "nnv_admin";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function keep() { localStorage.setItem(KEY, JSON.stringify(A)); }
  var A = load();

  var q = new URLSearchParams(location.search).get(CFG.param);
  if (q === "0") { A.off = true; keep(); }            // спрятать карандаши в этом браузере
  if (q === "1") { A.off = false; keep(); }
  if (q !== null) history.replaceState(null, "", location.pathname + location.hash);
  if (A.off) return;

  var LOCAL = false;                                  // рядом локальный сервер? тогда пишем в файл
  /* Ответ ping ждём промисом: генерация не должна успеть решить, что канала
     нет, пока сервер ещё отвечает. */
  var PROBE = fetch("/api/ping").then(function (r) { LOCAL = r.ok; }).catch(function () {});

  /* ---------- мелочи ---------- */
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function cv(w, h) { var c = el("canvas"); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
  function copy(src) { var c = cv(src.width, src.height); c.getContext("2d").drawImage(src, 0, 0); return c; }
  function part(x) {
    var u = typeof x === "string" ? x : x.toDataURL("image/jpeg", .95);
    return { type: "image", mime_type: (u.match(/^data:([^;,]+)/) || [0, "image/jpeg"])[1],
             data: u.replace(/^data:[^,]*,/, "") };
  }
  function loadImg(url) {
    return new Promise(function (ok, no) {
      var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { no(new Error("картинка не открылась")); };
      i.src = url;
    });
  }
  function arVal(a) { var p = a.split(":"); return p[0] / p[1]; }
  function arOf(w, h) {
    var r = w / h;
    return CFG.aspects.reduce(function (b, a) {
      return Math.abs(r - arVal(a)) < Math.abs(r - arVal(b)) ? a : b;
    });
  }

  /* ---------- запрос в Nano Banana ---------- */
  function dig(o) {
    if (!o || typeof o !== "object") return null;
    if (typeof o.data === "string" && o.data.length > 1000) return o.data;
    for (var k in o) { var x = dig(o[k]); if (x) return x; }
    return null;
  }
  function proxy() { return (A.proxy || CFG.proxy || "").replace(/\/+$/, ""); }
  function phdr() {
    var h = { "Content-Type": "application/json" };
    if (A.pass) h["X-NNV-Pass"] = A.pass;
    return h;
  }
  async function viaProxy(url, payload) {
    var r = await fetch(url, { method: "POST", headers: phdr(), body: JSON.stringify(payload) });
    var txt = await r.text(), js;
    try { js = JSON.parse(txt); } catch (e) { throw new Error("студия ответила не JSON: " + txt.slice(0, 160)); }
    if (!r.ok) throw new Error(js.error || ("студия: " + r.status));
    return js;
  }

  async function ask(prompt, parts, aspect, size) {
    var P = proxy(), body = { prompt: prompt, parts: parts, aspect: aspect, size: size };
    if (LOCAL) {                                      // локальный сервер: ключ у питона, из .env
      return loadImg("data:image/jpeg;base64," + (await viaProxy("/api/img/gen", body)).data);
    }
    if (!A.gemini && P) {                             // общий канал: гость ничего не вставляет
      return loadImg("data:image/jpeg;base64," + (await viaProxy(P + "/gen", body)).data);
    }
    if (!A.gemini) throw new Error("студия не подключена: нужен прокси (proxy/README.md) или свой ключ Google — кнопка «Ключи»");
    var r = await fetch(CFG.api, {
      method: "POST",
      headers: { "x-goog-api-key": A.gemini, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: CFG.model,
        input: [{ type: "text", text: prompt }].concat(parts),
        response_format: { type: "image", mime_type: "image/jpeg",
                           aspect_ratio: aspect, image_size: size }
      })
    });
    var txt = await r.text(), js;
    try { js = JSON.parse(txt); } catch (e) { throw new Error("Google ответил не JSON: " + txt.slice(0, 200)); }
    if (!r.ok) throw new Error("Google " + r.status + ": " +
      ((js[0] && js[0].error && js[0].error.message) || (js.error && js.error.message) || txt.slice(0, 200)));
    var b64 = dig(js);
    if (!b64) throw new Error("в ответе нет картинки");
    return loadImg("data:image/jpeg;base64," + b64);
  }

  /* ---------- маски, обводка, вклейка ---------- */
  function zoneMask(z, W, H) {
    var c = cv(W, H), x = c.getContext("2d");
    if (z.mask) x.drawImage(z.mask, 0, 0, W, H);
    else { x.fillStyle = "#fff"; x.fillRect(z.rect[0] * W, z.rect[1] * H, z.rect[2] * W, z.rect[3] * H); }
    return c;
  }
  function unionMask(zones, W, H) {
    var c = cv(W, H), x = c.getContext("2d");
    zones.forEach(function (z) { x.drawImage(zoneMask(z, W, H), 0, 0); });
    return c;
  }
  function maskBox(m) {                               // границы непрозрачного
    var d = m.getContext("2d").getImageData(0, 0, m.width, m.height).data;
    var s = Math.max(1, Math.round(m.width / 600));
    var x0 = m.width, y0 = m.height, x1 = -1, y1 = -1;
    for (var y = 0; y < m.height; y += s) for (var x = 0; x < m.width; x += s) {
      if (d[(y * m.width + x) * 4 + 3] > 40) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
    return x1 < 0 ? null : [x0, y0, x1 - x0 + s, y1 - y0 + s];
  }
  function cropBox(box, W, H) {
    /* зона + запас контекста, подогнанный под разрешённое соотношение
       сторон — тогда модель ничего не растягивает */
    var bw = box[2] * (1 + 2 * CFG.cropPad), bh = box[3] * (1 + 2 * CFG.cropPad);
    var cx = box[0] + box[2] / 2, cy = box[1] + box[3] / 2;
    var ar = arVal(arOf(bw, bh));
    if (bw / bh > ar) bh = bw / ar; else bw = bh * ar;
    bw = Math.min(bw, W); bh = Math.min(bh, H);
    return [Math.round(Math.min(Math.max(cx - bw / 2, 0), W - bw)),
            Math.round(Math.min(Math.max(cy - bh / 2, 0), H - bh)),
            Math.round(bw), Math.round(bh)];
  }
  function sub(src, box) {
    var c = cv(box[2], box[3]);
    c.getContext("2d").drawImage(src, box[0], box[1], box[2], box[3], 0, 0, box[2], box[3]);
    return c;
  }
  function blurred(m, r) {
    var c = cv(m.width, m.height), x = c.getContext("2d");
    x.filter = "blur(" + r + "px)"; x.drawImage(m, 0, 0); return c;
  }
  function markup(base, m) {
    /* копия кадра с розовой обводкой зоны — вторая картинка в запросе:
       по ней модель понимает, где именно правим */
    var c = copy(base), x = c.getContext("2d");
    var tint = cv(c.width, c.height), tx = tint.getContext("2d");
    tx.fillStyle = "#f0f"; tx.fillRect(0, 0, c.width, c.height);
    tx.globalCompositeOperation = "destination-in"; tx.drawImage(m, 0, 0);
    x.globalAlpha = .22; x.drawImage(tint, 0, 0); x.globalAlpha = 1;
    var r = Math.max(2, Math.round(.005 * Math.min(c.width, c.height)));
    var b = blurred(m, r).getContext("2d").getImageData(0, 0, c.width, c.height).data;
    var ring = x.createImageData(c.width, c.height);
    for (var i = 0; i < b.length; i += 4) {
      var a = b[i + 3];
      if (a > 60 && a < 200) { ring.data[i] = 255; ring.data[i + 2] = 255; ring.data[i + 3] = 255; }
    }
    var rc = cv(c.width, c.height); rc.getContext("2d").putImageData(ring, 0, 0);
    x.drawImage(rc, 0, 0);
    return c;
  }
  function fit(im, w, h) {                            // ответ модели ровно в размер
    var c = cv(w, h), k = Math.max(w / im.width, h / im.height);
    var dw = im.width * k, dh = im.height * k;
    c.getContext("2d").drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
    return c;
  }
  function toneMatch(got, base, m) {
    /* модель иногда уводит общий тон, и вклейка читается прямоугольником.
       Опора — пиксели ВНЕ маски: там ответ обязан совпадать с оригиналом,
       значит их разница и есть увод. Сдвигаем на неё весь патч. */
    var w = got.width, h = got.height;
    var g = got.getContext("2d").getImageData(0, 0, w, h);
    var b = base.getContext("2d").getImageData(0, 0, w, h).data;
    var k = m.getContext("2d").getImageData(0, 0, w, h).data;
    var s = [0, 0, 0], n = 0;
    for (var i = 0; i < g.data.length; i += 28) {
      if (k[i + 3] > 40) continue;
      s[0] += b[i] - g.data[i]; s[1] += b[i + 1] - g.data[i + 1]; s[2] += b[i + 2] - g.data[i + 2];
      n++;
    }
    if (n < 300) return got;
    var d = s.map(function (v) { return Math.max(-20, Math.min(20, v / n)); });
    if (Math.max(Math.abs(d[0]), Math.abs(d[1]), Math.abs(d[2])) < .7) return got;
    for (var j = 0; j < g.data.length; j += 4) {
      g.data[j] += d[0]; g.data[j + 1] += d[1]; g.data[j + 2] += d[2];
    }
    got.getContext("2d").putImageData(g, 0, 0);
    return got;
  }
  function paste(full, patch, m, box) {               // вклейка по маске с растушёвкой
    var soft = blurred(m, Math.max(2, Math.round(.01 * Math.min(patch.width, patch.height))));
    var cut = copy(patch), x = cut.getContext("2d");
    x.globalCompositeOperation = "destination-in"; x.drawImage(soft, 0, 0);
    full.getContext("2d").drawImage(cut, box[0], box[1]);
    return full;
  }

  /* ---------- промпты ---------- */
  var HEAD = "You are editing an existing studio photograph from a fashion e-commerce catalogue. Image 1 is the photo to edit. ";
  var KEEP = "Preserve everything outside the target area pixel-for-pixel: same framing, same crop, same pose, same person and face, same garment, same lighting, same colours, same plain #F1F1EF studio background, same grain and lens look. ";
  var TAIL = "Photorealistic result, identical photographic style to the original. No text, no labels, no watermarks, no added borders.";

  function zonePrompt(task, r, n) {
    var p = HEAD + "Image 2 is the same photo with the target area marked in magenta. " +
      "Edit ONLY what is inside that marked area. " + KEEP +
      "Target area in normalised coordinates, origin top-left: x " + r[0].toFixed(2) + "–" +
      (r[0] + r[2]).toFixed(2) + ", y " + r[1].toFixed(2) + "–" + (r[1] + r[3]).toFixed(2) +
      " (width " + r[2].toFixed(2) + ", height " + r[3].toFixed(2) + " of the frame). " +
      "The magenta marking is guidance only and must NOT appear in the result. " +
      "Task inside the area: " + task + ". " +
      "The background inside the area must continue the surrounding background seamlessly: " +
      "no panel, no frame, no box, no gradient patch, no visible rectangle, no tone shift at " +
      "the edges of the area. Anything you add stands on the same floor and casts the same " +
      "soft shadow as the rest of the scene. ";
    if (n) p += "Image" + (n > 1 ? "s" : "") + " 3+ show what must appear inside the area: use " +
      (n > 1 ? "them" : "it") + " as the reference, matching perspective, scale, light direction and shadows. ";
    return p + TAIL;
  }
  function wholePrompt(task, n) {
    var p = HEAD + "Task: " + task + ". Keep the framing, the crop, the person's identity and the " +
      "photographic style of the original; change only what the task asks for. ";
    if (n) p += "Image 2+ " + (n > 1 ? "are" : "is") + " the reference for what must appear in the photo. ";
    return p + TAIL;
  }

  /* ---------- один проход и вся правка ---------- */
  async function pass(full, m, task, refs, mode, size, log) {
    var W = full.width, H = full.height;
    if (!m) {
      var whole = await ask(wholePrompt(task, refs.length),
                            [part(full)].concat(refs.map(part)), arOf(W, H),
                            size === "auto" ? "2K" : size);
      return fit(whole, W, H);
    }
    var bx = maskBox(m);
    if (!bx) throw new Error("зона пустая");
    var area = (bx[2] / W) * (bx[3] / H);
    var crop = mode === "crop" || (mode === "auto" && area < CFG.cropLimit);
    var box = crop ? cropBox(bx, W, H) : [0, 0, W, H];
    log("зона " + Math.round(area * 100) + "% кадра → " +
        (crop ? "режим crop, окно " + box[2] + "×" + box[3] : "весь кадр в контексте"));
    var base = crop ? sub(full, box) : full, mm = crop ? sub(m, box) : m;
    if (size === "auto") size = autoSize(base.width, base.height);
    var r = maskBox(mm);
    var rn = [r[0] / base.width, r[1] / base.height, r[2] / base.width, r[3] / base.height];
    var im = await ask(zonePrompt(task, rn, refs.length),
                       [part(base), part(markup(base, mm))].concat(refs.map(part)),
                       arOf(base.width, base.height), size);
    var got = toneMatch(fit(im, base.width, base.height), base, mm);
    return paste(crop ? full : copy(full), got, mm, box);
  }

  function plan(zones, prompt, refs) {
    var own = zones.filter(function (z) { return z.prompt.trim() || z.refs.length; });
    var common = zones.filter(function (z) { return own.indexOf(z) < 0; });
    var jobs = [];
    if (!zones.length) jobs.push({ zones: [], task: prompt, refs: refs });
    if (common.length) jobs.push({ zones: common, task: prompt, refs: refs });
    own.forEach(function (z) {
      jobs.push({ zones: [z], task: z.prompt.trim() || prompt, refs: z.refs.length ? z.refs : refs });
    });
    jobs.forEach(function (j) {
      if (!j.task.trim() && !j.refs.length)
        throw new Error("не сказано, что менять: напишите текст или приложите картинку");
    });
    return jobs;
  }

  async function edit(img, zones, prompt, refs, mode, size, log) {
    var W = img.naturalWidth, H = img.naturalHeight;
    var full = cv(W, H); full.getContext("2d").drawImage(img, 0, 0);
    var jobs = plan(zones, prompt, refs);
    jobs.forEach(function (j) { j.mask = j.zones.length ? unionMask(j.zones, W, H) : null; });
    for (var i = 0; i < jobs.length; i++) {
      log("проход " + (i + 1) + "/" + jobs.length + "…");
      full = await pass(full, jobs[i].mask, jobs[i].task, jobs[i].refs, mode, size, log);
    }
    return full;
  }

  /* ---------- сохранение: GitHub (прод) или файл (локальный сервер) ---------- */
  function toBlob(canvas, q) {
    return new Promise(function (ok, no) {
      canvas.toBlob(function (b) {
        b ? ok(b) : no(new Error("браузер не умеет webp — нужен Chrome"));
      }, "image/webp", q);
    });
  }
  function toWebp(canvas, q) {
    return new Promise(function (ok, no) {
      canvas.toBlob(function (b) {
        if (!b || b.type !== "image/webp") return no(new Error("браузер не умеет webp — нужен Chrome"));
        var r = new FileReader();
        r.onload = function () { ok(r.result); };
        r.readAsDataURL(b);
      }, "image/webp", q);
    });
  }
  function quality(rel) {
    return /(^|\/)(main|hero|p\d+)\.webp$/.test(rel) || rel.indexOf("img/home/") === 0 ? .88 : .78;
  }
  async function gh(path, method, body) {
    var r = await fetch("https://api.github.com/repos/" + CFG.repo + path, {
      method: method,
      headers: { Authorization: "Bearer " + A.github, Accept: "application/vnd.github+json" },
      body: body ? JSON.stringify(body) : undefined
    });
    var js = await r.json().catch(function () { return {}; });
    if (!r.ok) throw new Error("GitHub " + r.status + ": " + (js.message || ""));
    return js;
  }
  async function put(rel, dataUrl, message) {
    if (LOCAL) {
      var r = await fetch("/api/img/put", { method: "POST", body: JSON.stringify({ src: rel, data: dataUrl }) });
      var j = await r.json();
      if (j.error) throw new Error(j.error);
      return "записано в файл, прежняя версия в refs/edits/";
    }
    var P = proxy();
    if (!A.github && P) {                             // сохранение общим каналом
      await viaProxy(P + "/save", { path: rel, content: dataUrl, message: message });
      return "залито на сайт, обновится за минуту";
    }
    if (!A.github) throw new Error("студия не подключена: нужен прокси (proxy/README.md) или свой токен GitHub — кнопка «Ключи»");
    var sha = null;
    try { sha = (await gh("/contents/" + rel + "?ref=" + CFG.branch, "GET")).sha; }
    catch (e) { sha = null; }                         // нет файла — создаём новый
    var body = { message: message, branch: CFG.branch,
                 content: dataUrl.replace(/^data:[^,]*,/, "") };
    if (sha) body.sha = sha;
    await gh("/contents/" + rel, "PUT", body);
    return "залито в " + CFG.repo + ", прод пересоберётся за минуту";
  }

  /* ---------- кнопка на ховере ---------- */
  var btn = el("button", "nnv-ed-btn"); btn.textContent = "✎";
  btn.title = "Править картинку";
  function mount() { if (document.body && !btn.parentNode) document.body.appendChild(btn); }
  mount(); document.addEventListener("DOMContentLoaded", mount);

  var hot = null;
  function eligible(img) {
    if (!img || img.tagName !== "IMG" || img.closest(".nnv-ed")) return false;
    var u = img.currentSrc || img.src || "";
    if (u.indexOf(location.origin) !== 0 || u.indexOf("/img/") < 0) return false;
    var r = img.getBoundingClientRect();
    return r.width >= CFG.minImg && r.height >= CFG.minImg;
  }
  function place() {
    if (!hot) return;
    var r = hot.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return hide();
    btn.style.top = Math.max(8, r.top + 10) + "px";
    btn.style.left = (r.right - btn.offsetWidth - 10) + "px";
  }
  function show(img) { hot = img; btn.classList.add("on"); place(); }
  function hide() { hot = null; btn.classList.remove("on"); }
  document.addEventListener("mouseover", function (e) {
    if (e.target === btn) return;
    var img = e.target.tagName === "IMG" ? e.target : null;
    if (eligible(img)) show(img); else hide();
  }, true);
  addEventListener("scroll", place, true);
  addEventListener("resize", place);
  btn.addEventListener("click", function (e) {
    e.preventDefault(); e.stopPropagation();
    if (hot) open(hot);
  });

  /* ---------- состояние редактора ---------- */
  var S = null, ui = null;
  function relSrc(img) { return new URL(img.currentSrc || img.src, location.href).pathname.replace(/^\//, ""); }

  function open(img) {
    hide();
    S = { img: img, src: relSrc(img), zones: [], sel: null, refs: [], vars: [],
          pick: null, tool: "rect", brush: 44, busy: false, n: 0 };
    if (!ui) build();
    ui.root.hidden = false;
    ui.base.onload = fitCanvas;
    ui.base.src = "/" + S.src + "?t=" + Date.now();
    if (ui.base.complete) fitCanvas();
    ui.after.removeAttribute("src"); ui.after.hidden = true;
    ui.split.hidden = true; ui.tagA.hidden = ui.tagB.hidden = true;
    ui.cv.classList.remove("hide");
    ui.path.textContent = S.src;
    ui.size.textContent = img.naturalWidth + "×" + img.naturalHeight;
    ui.prompt.value = ""; say(""); ui.vars.innerHTML = ""; ui.varsBox.hidden = true;
    paintRefs(); paintZones(); cost(); loadGallery();
  }
  function close() { ui.root.hidden = true; S = null; }

  /* ---------- разметка ---------- */
  function build() {
    var root = el("div", "nnv-ed");
    root.innerHTML =
      '<div class="nnv-ed__stage">' +
        '<div class="nnv-ed__wrap">' +
          '<img class="nnv-ed__base" alt="">' +
          '<img class="nnv-ed__after" alt="" hidden>' +
          '<div class="nnv-ed__split" hidden></div>' +
          '<span class="nnv-ed__tag" style="left:8px" hidden>было</span>' +
          '<span class="nnv-ed__tag" style="right:8px" hidden>стало</span>' +
          '<canvas class="nnv-ed__cv"></canvas>' +
        '</div>' +
        '<div class="nnv-ed__tools">' +
          '<button data-tool="rect" class="on">Прямоугольник</button>' +
          '<button data-tool="brush">Кисть</button>' +
          '<button data-tool="erase">Стереть</button>' +
          '<button data-act="clear">Сбросить зоны</button>' +
          '<span class="hint">зон не выбрано — правим весь кадр</span>' +
        '</div>' +
      '</div>' +
      '<aside class="nnv-ed__panel">' +
        '<div class="nnv-ed__head"><b>Правка кадра</b><span class="nnv-ed__size"></span></div>' +
        '<div class="nnv-ed__head"><span class="nnv-ed__path"></span>' +
          '<button class="nnv-ed__keysbtn">Ключи</button></div>' +
        '<div><h4>Что поменять</h4>' +
          '<textarea rows="3" class="nnv-ed__prompt" placeholder="напр.: убрать блик на плече, ткань оставить как есть"></textarea></div>' +
        '<div><h4>Картинки-референсы</h4>' +
          '<div class="nnv-ed__drop" data-drop="all">перетащите, вставьте (⌘V) или нажмите</div>' +
          '<div class="nnv-ed__thumbs" data-thumbs="all"></div></div>' +
        '<div class="nnv-ed__zones"></div>' +
        '<button class="nnv-ed__go">Сгенерировать</button>' +
        '<button class="nnv-ed__erase muted">Убрать из кадра</button>' +
        '<div class="nnv-ed__cost"></div>' +
        '<div class="nnv-ed__spend"></div>' +
        '<div class="nnv-ed__log"></div>' +
        '<div class="nnv-ed__varsbox" hidden>' +
          '<div class="nnv-ed__vars"></div>' +
          '<div class="nnv-ed__row" style="margin-top:8px">' +
            '<button class="nnv-ed__apply">Применить</button>' +
            '<button class="nnv-ed__save muted">Скачать</button>' +
            '<button class="nnv-ed__again muted">Ещё раз</button></div></div>' +
        '<div class="nnv-ed__galbox" hidden><h4>Версии этого кадра</h4>' +
          '<div class="nnv-ed__gal"></div>' +
          '<button class="nnv-ed__use muted" hidden>Поставить на сайт</button></div>' +
        '<div class="nnv-ed__foot">' +
          '<button class="nnv-ed__keep">Сохранить</button>' +
          '<button class="nnv-ed__close muted">Закрыть (Esc)</button></div>' +
      '</aside>';
    document.body.appendChild(root);
    var g = function (s) { return root.querySelector(s); };
    ui = { root: root, wrap: g(".nnv-ed__wrap"), base: g(".nnv-ed__base"), after: g(".nnv-ed__after"),
           split: g(".nnv-ed__split"), tagA: root.querySelectorAll(".nnv-ed__tag")[0],
           tagB: root.querySelectorAll(".nnv-ed__tag")[1], cv: g(".nnv-ed__cv"),
           tools: g(".nnv-ed__tools"), path: g(".nnv-ed__path"), size: g(".nnv-ed__size"),
           prompt: g(".nnv-ed__prompt"), zones: g(".nnv-ed__zones"), go: g(".nnv-ed__go"),
           erase: g(".nnv-ed__erase"),
           cost: g(".nnv-ed__cost"), spend: g(".nnv-ed__spend"),
           log: g(".nnv-ed__log"), varsBox: g(".nnv-ed__varsbox"),
           vars: g(".nnv-ed__vars"), apply: g(".nnv-ed__apply"), again: g(".nnv-ed__again"),
           down: g(".nnv-ed__save"),
           keys: g(".nnv-ed__keysbtn"), hint: g(".nnv-ed__tools .hint"),
           galBox: g(".nnv-ed__galbox"), gal: g(".nnv-ed__gal"), use: g(".nnv-ed__use"),
           keep: g(".nnv-ed__keep") };
    ui.ctx = ui.cv.getContext("2d");
    wire();
  }

  /* ---------- зоны на холсте ---------- */
  function fitCanvas() {
    if (!S) return;
    var r = ui.base.getBoundingClientRect();
    ui.cv.width = Math.round(r.width); ui.cv.height = Math.round(r.height);
    render();
  }
  addEventListener("resize", function () { if (S) fitCanvas(); });

  function maskCanvas() {
    var w = ui.base.naturalWidth, h = ui.base.naturalHeight, k = Math.min(1, 1024 / Math.max(w, h));
    return cv(Math.max(64, w * k), Math.max(64, h * k));
  }
  function addZone(z) {
    if (!z.rect.every(isFinite)) return null;         // без размеров холста координат нет
    z.id = ++S.n; z.prompt = ""; z.refs = [];
    S.zones.push(z); S.sel = z; paintZones(); render(); cost();
    return z;
  }
  function pt(e) {
    var r = ui.cv.getBoundingClientRect();
    if (!r.width || !r.height) return null;           // холст ещё без размеров
    return { x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
             y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) };
  }

  var drag = null;
  function down(e) {
    if (!S || S.pick) return;
    var p = pt(e);
    if (!p) return fitCanvas();
    try { ui.cv.setPointerCapture(e.pointerId); } catch (x) {}
    if (S.tool === "rect") drag = { a: p, b: p };
    else {
      var z = S.sel && S.sel.mask ? S.sel : null;
      if (S.tool === "erase" && !z) return;
      if (!z) z = addZone({ mask: maskCanvas(), rect: [p.x, p.y, 0, 0] });
      if (!z) return;
      drag = { paint: z, last: p };
      stroke(z, p, p);
    }
    render();
  }
  function move(e) {
    if (!drag) return;
    var p = pt(e);
    if (!p) return;
    if (drag.paint) { stroke(drag.paint, drag.last, p); drag.last = p; }
    else drag.b = p;
    render();
  }
  function up() {
    if (!drag) return;
    if (drag.paint) { bboxFromMask(drag.paint); paintZones(); }
    else {
      var a = drag.a, b = drag.b;
      var r = [Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(a.x - b.x), Math.abs(a.y - b.y)];
      if (r[2] < .015 || r[3] < .015) {              // клик, а не рамка — выбрать зону
        S.sel = S.zones.slice().reverse().find(function (z) {
          return a.x >= z.rect[0] && a.x <= z.rect[0] + z.rect[2] &&
                 a.y >= z.rect[1] && a.y <= z.rect[1] + z.rect[3];
        }) || null;
        paintZones();
      } else addZone({ mask: null, rect: r });
    }
    drag = null; render(); cost();
  }
  function stroke(z, a, b) {
    var c = z.mask, x = c.getContext("2d");
    var rad = (S.brush / 2) / (ui.cv.width || 1);
    x.strokeStyle = "#fff"; x.lineCap = x.lineJoin = "round";
    x.globalCompositeOperation = S.tool === "erase" ? "destination-out" : "source-over";
    x.lineWidth = Math.max(2, rad * 2 * c.width);
    x.beginPath(); x.moveTo(a.x * c.width, a.y * c.height); x.lineTo(b.x * c.width, b.y * c.height); x.stroke();
    x.globalCompositeOperation = "source-over";
  }
  function bboxFromMask(z) {
    var b = maskBox(z.mask);
    if (!b) { S.zones = S.zones.filter(function (t) { return t !== z; }); S.sel = null; return; }
    z.rect = [b[0] / z.mask.width, b[1] / z.mask.height, b[2] / z.mask.width, b[3] / z.mask.height];
  }

  function render() {
    if (!S) return;
    var x = ui.ctx, W = ui.cv.width, H = ui.cv.height;
    x.clearRect(0, 0, W, H);
    if (S.pick) return;
    if (S.zones.length) {
      x.fillStyle = "rgba(8,8,8,.5)"; x.fillRect(0, 0, W, H);
      x.globalCompositeOperation = "destination-out";
      S.zones.forEach(function (z) {
        if (z.mask) x.drawImage(z.mask, 0, 0, W, H);
        else x.fillRect(z.rect[0] * W, z.rect[1] * H, z.rect[2] * W, z.rect[3] * H);
      });
      x.globalCompositeOperation = "source-over";
    }
    S.zones.forEach(function (z, i) {
      var r = z.rect, on = z === S.sel;
      x.strokeStyle = on ? "#fff" : "#d36ad3"; x.lineWidth = on ? 2 : 1.5;
      x.setLineDash(z.mask ? [5, 4] : []);
      x.strokeRect(r[0] * W, r[1] * H, r[2] * W, r[3] * H);
      x.setLineDash([]);
      x.fillStyle = on ? "#fff" : "#d36ad3";
      x.fillRect(r[0] * W, r[1] * H - 15, 17, 15);
      x.fillStyle = "#111"; x.font = "11px ui-sans-serif, system-ui";
      x.fillText(i + 1, r[0] * W + 5, r[1] * H - 4);
    });
    if (drag && !drag.paint) {
      x.strokeStyle = "#fff"; x.lineWidth = 1.5; x.setLineDash([4, 3]);
      x.strokeRect(Math.min(drag.a.x, drag.b.x) * W, Math.min(drag.a.y, drag.b.y) * H,
                   Math.abs(drag.a.x - drag.b.x) * W, Math.abs(drag.a.y - drag.b.y) * H);
      x.setLineDash([]);
    }
    ui.hint.textContent = S.zones.length
      ? S.zones.length + " зон(ы) — правим только внутри"
      : "зон не выбрано — правим весь кадр";
  }

  /* ---------- панель ---------- */
  function paintZones() {
    ui.zones.innerHTML = "";
    if (!S.zones.length) return;
    ui.zones.appendChild(el("h4", null, "Зоны"));
    S.zones.forEach(function (z, i) {
      var box = el("div", "nnv-ed__zone" + (z === S.sel ? " on" : ""));
      box.innerHTML =
        '<header><b>Зона ' + (i + 1) + '</b><span>' +
          Math.round(z.rect[2] * 100) + '×' + Math.round(z.rect[3] * 100) + '% кадра' +
        '</span><button title="удалить">✕</button></header>' +
        '<input type="text" placeholder="что тут поменять (необязательно)">' +
        '<div class="nnv-ed__drop" style="margin-top:6px">картинка в эту зону</div>' +
        '<div class="nnv-ed__thumbs"></div>';
      box.onclick = function () { S.sel = z; paintZones(); render(); };
      box.querySelector("button").onclick = function (e) {
        e.stopPropagation();
        S.zones = S.zones.filter(function (t) { return t !== z; });
        if (S.sel === z) S.sel = null;
        paintZones(); render(); cost();
      };
      var inp = box.querySelector("input");
      inp.value = z.prompt;
      inp.oninput = function () { z.prompt = inp.value; cost(); };
      inp.onclick = function (e) { e.stopPropagation(); };
      dropzone(box.querySelector(".nnv-ed__drop"), z.refs, box.querySelector(".nnv-ed__thumbs"));
      ui.zones.appendChild(box);
    });
  }
  function paintRefs() {
    dropzone(ui.root.querySelector('[data-drop="all"]'), S.refs, ui.root.querySelector('[data-thumbs="all"]'));
  }
  function dropzone(zone, list, thumbs) {
    function draw() {
      thumbs.innerHTML = "";
      list.forEach(function (d, i) {
        var f = el("figure");
        f.innerHTML = '<img src="' + d + '"><button>✕</button>';
        f.querySelector("button").onclick = function (e) { e.stopPropagation(); list.splice(i, 1); draw(); cost(); };
        thumbs.appendChild(f);
      });
    }
    zone.ondragover = function (e) { e.preventDefault(); zone.classList.add("over"); };
    zone.ondragleave = function () { zone.classList.remove("over"); };
    zone.ondrop = function (e) {
      e.preventDefault(); e.stopPropagation(); zone.classList.remove("over");
      files(e.dataTransfer.files, list, draw);
    };
    zone.onclick = function (e) {
      e.stopPropagation();
      var i = el("input"); i.type = "file"; i.accept = "image/*"; i.multiple = true;
      i.onchange = function () { files(i.files, list, draw); };
      i.click();
    };
    zone.__paste = function (items) { files(items, list, draw); };
    draw();
  }
  function files(fs, list, done) {
    Array.prototype.slice.call(fs || []).forEach(function (f) {
      if (!f || !/^image\//.test(f.type)) return;
      var r = new FileReader();
      r.onload = function () { list.push(r.result); done(); cost(); };
      r.readAsDataURL(f);
    });
  }

  function passes() {
    try { return plan(S.zones, ui.prompt.value, S.refs).length; } catch (e) { return 1; }
  }

  /* Размер генерации под конкретную зону. Смысл «авто»: маленькой зоне 2K
     не нужен — её всё равно вклеивают в кадр в её собственный размер, так
     что платим за 1K и получаем то же самое. 2K берём, только когда окно
     правки реально больше 1400 px. */
  function autoSize(w, h) { return Math.max(w, h) <= 1400 ? "1K" : "2K"; }

  function planSize() {
    if (!S.zones.length) return "2K";                 // правим весь кадр — не мельчим
    var W = S.img.naturalWidth, H = S.img.naturalHeight;
    var x0 = 1, y0 = 1, x1 = 0, y1 = 0;
    S.zones.forEach(function (z) {
      x0 = Math.min(x0, z.rect[0]); y0 = Math.min(y0, z.rect[1]);
      x1 = Math.max(x1, z.rect[0] + z.rect[2]); y1 = Math.max(y1, z.rect[1] + z.rect[3]);
    });
    var b = [x0 * W, y0 * H, (x1 - x0) * W, (y1 - y0) * H];
    var area = (b[2] / W) * (b[3] / H);
    if (area >= CFG.cropLimit) return "2K";        // зона почти во весь кадр
    var box = cropBox(b, W, H);
    return autoSize(box[2], box[3]);
  }

  function cost() {
    if (!S) return;
    var p = passes(), n = 1, size = planSize();
    ui.cost.textContent = "~$" + (p * n * CFG.price[size]).toFixed(2) + " · " + p +
      (p === 1 ? " проход" : " прохода") + " × " + n + " вар. · " + size;
    paintSpend();
  }

  /* ---------- расход ----------
     Считаем по прайсу Nano Banana и держим в браузере: видно, во сколько
     обошёлся конкретный кадр и сколько ушло всего. */
  var SPEND = "nnv_spend";
  function spend() {
    try { return JSON.parse(localStorage.getItem(SPEND)) || { total: 0, img: {} }; }
    catch (e) { return { total: 0, img: {} }; }
  }
  function addSpend(rel, usd) {
    var s = spend();
    s.total = (s.total || 0) + usd;
    s.img[rel] = (s.img[rel] || 0) + usd;
    try { localStorage.setItem(SPEND, JSON.stringify(s)); } catch (e) {}
    paintSpend();
  }
  function paintSpend() {
    if (!S || !ui.spend) return;
    var s = spend();
    ui.spend.textContent = "потрачено: этот кадр $" + (s.img[S.src] || 0).toFixed(2) +
                           " · всего $" + (s.total || 0).toFixed(2);
  }

  function say(t, err) {
    ui.log.textContent = t || "";
    ui.log.className = "nnv-ed__log" + (err ? " err" : "");
  }
  function busy(on, msg) {
    S.busy = on;
    ui.go.disabled = ui.apply.disabled = ui.again.disabled = ui.down.disabled =
      ui.erase.disabled = ui.keep.disabled = ui.use.disabled = on;
    ui.go.textContent = on ? (msg || "Генерим…") : "Сгенерировать";
  }

  /* ---------- генерация ---------- */
  /* «Убрать» — самая частая правка: обвели лишнее (блик, складку, предмет,
     чужой логотип) и стёрли, а модель достраивает то, что было за ним.
     Тексты зон и референсы в этом режиме не участвуют. */
  var ERASE = "Remove completely everything inside the marked area and reconstruct " +
    "what is behind it: continue the background, the floor, the fabric or the body " +
    "that the removed thing was covering. No trace of it, no ghost outline, no blur, " +
    "no smudge, no flat patch of colour — the area must look like the object was " +
    "never there.";

  function erase() {
    if (!S.zones.length) return say("сначала обведите то, что убрать", true);
    generate(S.zones.map(function (z) {
      return { mask: z.mask, rect: z.rect, prompt: "", refs: [] };   // только геометрия
    }), ERASE, []);
  }

  async function generate(zonesArg, taskArg, refsArg) {
    if (S.busy) return;
    var zones = zonesArg || S.zones;
    var task = taskArg != null ? taskArg : ui.prompt.value;
    var refs = refsArg || S.refs;
    S.last = [zones, task, refs];                     // «Ещё варианты» повторяет то же
    var lines = [];
    function log(s) { lines.push(s); say(lines.slice(-3).join("\n")); }
    try { plan(zones, task, refs); }
    catch (e) { return say(e.message, true); }
    await PROBE;
    /* Окно ключей само не лезет: нажали «Сгенерировать» — идёт генерация.
       Если канала нет вовсе — только строка в статусе, окно открывается
       кнопкой «Ключи» в шапке. */
    if (!LOCAL && !A.gemini && !proxy()) return say("нет канала генерации: прокси или свой ключ Google — кнопка «Ключи»", true);
    busy(true);
    var t0 = Date.now(), n = 1, made = [];        // всегда один вариант, так дешевле
    var usedSize = planSize(), jobs = plan(zones, task, refs).length;   // для счётчика расхода
    try {
      for (var v = 1; v <= n; v++) {
        log("вариант " + v + "/" + n);
        made.push(await edit(S.img, zones, task, refs,
                             zones.length ? "crop" : "auto", "auto", log));
      }
    } catch (e) {
      busy(false);
      return say((made.length ? "часть вариантов готова. " : "") + e.message, !made.length);
    }
    busy(false);
    S.vars = made;
    for (var k = 0; k < made.length; k++) {           // в архив браузера — сразу
      try { await dbAdd(S.src, await toBlob(made[k], quality(S.src))); } catch (e) {}
    }
    loadGallery();
    var spent = jobs * made.length * CFG.price[usedSize];
    addSpend(S.src, spent);
    say("готово за " + Math.round((Date.now() - t0) / 1000) + " с · $" + spent.toFixed(2) +
        " (" + usedSize + ")");
    ui.varsBox.hidden = false;
    ui.vars.innerHTML = "";
    made.forEach(function (c, i) {
      var im = el("img"); im.src = c.toDataURL("image/jpeg", .7);
      im.onclick = function () { preview(i); };
      ui.vars.appendChild(im);
    });
    preview(0);
  }

  function preview(i) {
    S.pick = i;
    Array.prototype.forEach.call(ui.vars.children, function (im, j) { im.classList.toggle("on", i === j); });
    ui.after.src = S.vars[i].toDataURL("image/jpeg", .92);
    ui.after.hidden = false; ui.split.hidden = false;
    ui.tagA.hidden = ui.tagB.hidden = false;
    ui.cv.classList.add("hide");
    setSplit(.5); render();
  }
  function setSplit(f) {
    ui.after.style.clipPath = "inset(0 0 0 " + (f * 100) + "%)";
    ui.split.style.left = "calc(" + (f * 100) + "% - 1px)";
  }
  function unpreview() {
    S.pick = null; ui.after.hidden = true; ui.split.hidden = true;
    ui.tagA.hidden = ui.tagB.hidden = true;
    ui.cv.classList.remove("hide"); render();
  }

  /* ---------- галерея версий кадра ----------
     Каждое сохранение кладёт копию в img/<вещь>/_gen/. Список читается из
     репозитория без токена (репозиторий публичный), так что версии видят
     все — можно вернуть любую в один клик. */
  /* Свой архив генераций в браузере (IndexedDB): версии видно сразу, ещё
     до того, как они уехали в репозиторий. Репозиторий — общая память на
     всех, этот архив — личная, чтобы ничего не терялось между заходами. */
  var DB = null;
  function db() {
    if (DB) return DB;
    DB = new Promise(function (ok, no) {
      var rq = indexedDB.open("nnv-studio", 1);
      rq.onupgradeneeded = function () {
        var s = rq.result.createObjectStore("gen", { keyPath: "id", autoIncrement: true });
        s.createIndex("src", "src");
      };
      rq.onsuccess = function () { ok(rq.result); };
      rq.onerror = function () { no(rq.error); };
    });
    return DB;
  }
  async function dbAdd(src, blob) {
    try {
      var d = await db();
      d.transaction("gen", "readwrite").objectStore("gen").add({ src: src, at: Date.now(), blob: blob });
    } catch (e) { /* приватный режим — просто без архива */ }
  }
  async function dbList(src) {
    try {
      var d = await db();
      return await new Promise(function (ok) {
        var out = [];
        var rq = d.transaction("gen").objectStore("gen").index("src").openCursor(IDBKeyRange.only(src));
        rq.onsuccess = function () {
          var c = rq.result;
          if (!c) return ok(out.sort(function (a, b) { return b.at - a.at; }));
          out.push(c.value); c.continue();
        };
        rq.onerror = function () { ok(out); };
      });
    } catch (e) { return []; }
  }

  function genDir(rel) { return rel.replace(/\/[^/]+$/, "") + "/_gen"; }
  function stampName() {
    var d = new Date(), p = function (v) { return String(v).padStart(2, "0"); };
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "-" +
           p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds()) + ".webp";
  }

  async function loadGallery() {
    ui.gal.innerHTML = ""; ui.galBox.hidden = true; ui.use.hidden = true;
    S.ver = null;
    var items = [];
    (await dbList(S.src)).forEach(function (r) {      // свои, из браузера
      items.push({ url: URL.createObjectURL(r.blob), name: when(r.at), blob: r.blob });
    });
    try {                                             // общие, из репозитория
      var r2 = await fetch("https://api.github.com/repos/" + CFG.repo + "/contents/" +
                           genDir(S.src) + "?ref=" + CFG.branch);
      if (r2.ok) {
        (await r2.json()).filter(function (f) { return /\.webp$/i.test(f.name); })
          .sort(function (a, b) { return b.name.localeCompare(a.name); })
          .forEach(function (f) {
            items.push({ url: f.download_url, name: f.name.replace(".webp", ""), repo: true });
          });
      }
    } catch (e) { /* нет сети до GitHub — покажем хотя бы свои */ }
    if (!items.length) return;
    ui.galBox.hidden = false;
    items.slice(0, 30).forEach(function (f) {
      var im = el("img");
      im.src = f.url;
      im.title = (f.repo ? "на сайте: " : "у меня: ") + f.name;
      im.onclick = function () { showVersion(f, im); };
      ui.gal.appendChild(im);
    });
  }

  function when(ms) {
    var d = new Date(ms), p = function (v) { return String(v).padStart(2, "0"); };
    return p(d.getDate()) + "." + p(d.getMonth() + 1) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function showVersion(f, im) {
    S.ver = f; S.pick = null;
    Array.prototype.forEach.call(ui.gal.children, function (t) { t.classList.toggle("on", t === im); });
    ui.after.src = f.url; ui.after.hidden = false;
    ui.split.hidden = false; ui.tagA.hidden = ui.tagB.hidden = false;
    ui.cv.classList.add("hide"); setSplit(.5); render();
    ui.use.hidden = false;
    say("версия " + f.name + " — «Поставить на сайт», если берём её");
  }

  async function useVersion() {
    if (!S.ver || S.busy) return;
    busy(true, "Ставим…");
    try {
      var blob = S.ver.blob || await (await fetch(S.ver.url)).blob();
      var data = await new Promise(function (ok, no) {
        var r = new FileReader(); r.onload = function () { ok(r.result); }; r.onerror = no;
        r.readAsDataURL(blob);
      });
      var res = await put(S.src, data, "вернул версию " + S.ver.name + " для " + S.src);
      busy(false); bust(S.src); say(res);
    } catch (e) { busy(false); saveErr(e); }
  }

  async function download() {
    /* Забрать кадр файлом — когда токена GitHub нет, а правку надо отдать
       тому, кто выкладывает. Имя как у кадра на сайте, чтобы не путаться. */
    if (S.pick === null || S.busy) return;
    try {
      var data = await toWebp(S.vars[S.pick], quality(S.src));
      var a = el("a");
      a.href = data; a.download = S.src.split("/").pop();
      document.body.appendChild(a); a.click(); a.remove();
      say("скачан " + a.download + " — положите его в site/" + S.src + " и запушьте");
    } catch (e) { say(e.message, true); }
  }

  function bust(rel) {                                // показать новый файл сразу
    var stamp = String(Date.now());
    Array.prototype.forEach.call(document.images, function (im) {
      if (im.closest(".nnv-ed")) return;
      var u = new URL(im.src, location.href);
      if (u.pathname.replace(/^\//, "") === rel) im.src = u.pathname + "?v=" + stamp;
    });
  }

  function saveErr(e) {
    /* Самая частая причина — в воркере студии нет токена GitHub. Пишем
       прямо в карточке, что делать, а не голый код ошибки. */
    var m = e.message || String(e);
    if (/GitHub 40[13]|Bad credentials|not accessible|token/i.test(m))
      m += "\n→ в студии нет токена GitHub. Один раз в терминале:\n" +
           "cd proxy && npx wrangler secret put GH_TOKEN";
    say(m, true);
  }

  async function apply() {
    if (S.ver) return useVersion();                   // выбрана готовая версия из галереи
    if (S.pick === null || S.busy) return say("сначала выберите вариант", true);
    await PROBE;
    if (!LOCAL && !A.github && !proxy()) return say("нет канала записи: прокси или свой токен GitHub — кнопка «Ключи»", true);
    busy(true, LOCAL ? "Пишем…" : "Коммитим…");
    try {
      var data = await toWebp(S.vars[S.pick], quality(S.src));
      var msg = "правка кадра " + S.src + ": " +
        (ui.prompt.value.trim() || S.zones.map(function (z) { return z.prompt; }).filter(Boolean).join("; ") || "точечная");
      var res = await put(S.src, data, msg.slice(0, 180));
      /* копия в галерею версий — чтобы к ней можно было вернуться одним
         кликом. Если не записалась, правку это не отменяет. */
      try { await put(genDir(S.src) + "/" + stampName(), data, "версия кадра " + S.src); }
      catch (e) { res += " (в галерею не попало: " + e.message + ")"; }
      busy(false);
      bust(S.src);
      say(res);
      loadGallery();
      setTimeout(close, 1400);
    } catch (e) { busy(false); saveErr(e); }
  }

  /* ---------- ключи ---------- */
  function keysPanel() {
    var v = el("div", "nnv-ed__keys");
    v.innerHTML =
      '<form>' +
        '<div class="nnv-ed__head"><b>Ваши ключи</b></div>' +
        '<p><b>Ключ Google</b> — чтобы генерить: ' +
        '<a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">' +
        'aistudio.google.com/apikey</a>, заведите отдельный и поставьте лимит.<br>' +
        '<b>Токен GitHub</b> — только чтобы правка легла на сайт: ' +
        '<a href="https://github.com/settings/personal-access-tokens" target="_blank" rel="noopener">' +
        'fine-grained</a> на ' + CFG.repo + ', право Contents: read and write. Без него можно ' +
        'генерить и скачивать кадр кнопкой «Скачать».<br>' +
        'Вставляются один раз, лежат только в этом браузере (localStorage) и уходят только ' +
        'в Google и GitHub.</p>' +
        '<div><h4>Ключ Google</h4><input type="password" name="g" placeholder="AIza…" autocomplete="off"></div>' +
        '<div><h4>Токен GitHub</h4><input type="password" name="h" placeholder="github_pat_…" autocomplete="off"></div>' +
        '<div><h4>Общий канал студии (если поднят прокси)</h4><input type="text" name="p" placeholder="https://…workers.dev — тогда ключи не нужны" autocomplete="off"></div>' +
        '<div><h4>Пароль студии (если задан)</h4><input type="password" name="w" placeholder="необязательно" autocomplete="off"></div>' +
        '<div class="nnv-ed__log"></div>' +
        '<div class="nnv-ed__row">' +
          '<button type="button" data-act="check">Проверить</button>' +
          '<button type="button" data-act="save">Сохранить</button>' +
          '<button type="button" data-act="close" class="muted">Закрыть</button>' +
        '</div>' +
        '<div class="nnv-ed__row">' +
          '<button type="button" data-act="off" class="muted">Спрятать карандаши в этом браузере</button>' +
        '</div>' +
      '</form>';
    document.body.appendChild(v);
    var f = v.querySelector("form"), log = v.querySelector(".nnv-ed__log");
    f.g.value = A.gemini || ""; f.h.value = A.github || "";
    f.p.value = A.proxy || CFG.proxy || ""; f.w.value = A.pass || "";
    v.onclick = function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var act = b.dataset.act;
      if (act === "close") return v.remove();
      if (act === "off") { A.off = true; keep(); location.reload(); return; }
      A.gemini = f.g.value.trim(); A.github = f.h.value.trim();
      A.proxy = f.p.value.trim(); A.pass = f.w.value.trim(); keep();
      if (act === "save") { log.textContent = "сохранено"; log.className = "nnv-ed__log nnv-ed__ok"; return; }
      log.textContent = "проверяем…"; log.className = "nnv-ed__log";
      var checks = [];
      if (proxy())
        checks.push(fetch(proxy() + "/gen", { method: "OPTIONS" })
          .then(function (r) { return r.ok || r.status === 405
            ? "Прокси: отвечает — гостям ключи не нужны" : "Прокси: " + r.status; })
          .catch(function () { return "Прокси: не отвечает по этому адресу"; }));
      if (A.gemini)
        checks.push(fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + encodeURIComponent(A.gemini))
          .then(function (r) { return r.ok ? "Google: ключ рабочий" : "Google: ключ не принят (" + r.status + ")"; })
          .catch(function () { return "Google: не достучались"; }));
      if (A.github)
        checks.push(gh("", "GET").then(function (j) {
          return "GitHub: " + j.full_name + (j.permissions && j.permissions.push ? ", запись есть" : ", ЗАПИСИ НЕТ");
        }).catch(function (e) { return "GitHub: " + e.message; }));
      if (!checks.length) checks.push(Promise.resolve("ничего не задано: впишите адрес прокси или свои ключи"));
      Promise.all(checks).then(function (r) {
        var s = r.join("\n");
        log.textContent = s;
        log.className = "nnv-ed__log " + (/не отвечает|не принят|не достучались|ЗАПИСИ НЕТ|ничего не задано/.test(s)
                                          ? "nnv-ed__bad" : "nnv-ed__ok");
      });
    };
  }

  /* ---------- обвязка ---------- */
  function wire() {
    ui.cv.addEventListener("pointerdown", down);
    ui.cv.addEventListener("pointermove", move);
    ui.cv.addEventListener("pointerup", up);
    ui.cv.addEventListener("pointercancel", up);

    ui.tools.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b || !S) return;
      if (b.dataset.act === "clear") { S.zones = []; S.sel = null; paintZones(); render(); cost(); return; }
      S.tool = b.dataset.tool;
      Array.prototype.forEach.call(ui.tools.querySelectorAll("[data-tool]"), function (t) {
        t.classList.toggle("on", t === b);
      });
      ui.cv.style.cursor = S.tool === "rect" ? "crosshair" : "cell";
    });

    ui.go.onclick = function () { generate(); };
    ui.erase.onclick = erase;
    ui.use.onclick = useVersion;
    ui.keep.onclick = apply;
    ui.apply.onclick = apply;
    ui.down.onclick = download;
    ui.again.onclick = function () {
      unpreview();
      generate.apply(null, (S && S.last) || []);
    };
    ui.keys.onclick = keysPanel;
    ui.root.querySelector(".nnv-ed__close").onclick = close;
    ui.prompt.oninput = cost;

    var sp = false;
    ui.split.addEventListener("pointerdown", function (e) { sp = true; ui.split.setPointerCapture(e.pointerId); });
    ui.wrap.addEventListener("pointermove", function (e) {
      if (!sp) return;
      var r = ui.base.getBoundingClientRect();
      setSplit(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    });
    addEventListener("pointerup", function () { sp = false; });

    addEventListener("keydown", function (e) {
      if (!S || ui.root.hidden) return;
      var typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
      if (e.key === "Escape") close();            // Esc всегда выходит из режима
      else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate();
      else if (!typing && (e.key === "Backspace" || e.key === "Delete") && S.sel) {
        S.zones = S.zones.filter(function (t) { return t !== S.sel; });
        S.sel = null; paintZones(); render(); cost();
      }
    });

    addEventListener("paste", function (e) {
      if (!S || ui.root.hidden) return;
      var items = Array.prototype.slice.call(e.clipboardData.items || [])
        .filter(function (i) { return i.type.indexOf("image/") === 0; })
        .map(function (i) { return i.getAsFile(); });
      if (!items.length) return;
      var box = (S.sel && ui.zones.querySelector(".nnv-ed__zone.on .nnv-ed__drop")) ||
                ui.root.querySelector('[data-drop="all"]');
      if (box.__paste) box.__paste(items);
    });
  }
})();
