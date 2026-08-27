/* NANAVA — редактор картинок на живом сайте. Открыт всем, кто зашёл: правит
   тот, у кого есть свои ключи (кнопка «Ключи» в шапке редактора).
   Спрятать карандаши в своём браузере: nanava.store/?nnv-studio=0 , вернуть — =1.

   Общий ключ в коде сайта не зашит намеренно: файл лежит в публичном
   репозитории, то есть ключ Google утечёт вместе с ним (а токен GitHub
   гитхаб сам отзовёт своим сканером секретов). Поэтому каждый вставляет
   свой — один раз на браузер.

   Что умеет: ховер по любой картинке → карандаш → обводим зоны мышкой
   (прямоугольник или кисть), пишем текст ко всей правке или к отдельной
   зоне, кидаем туда же картинки-референсы. Генерация уходит НАПРЯМУЮ в
   Google (Nano Banana) с ключом, который админ один раз вставил в
   настройках; результат вклеивается только внутрь зоны и коммитится в
   репозиторий сайта через GitHub API — то есть правка сразу на проде.

   Ключи лежат в localStorage этого браузера и никуда больше не уходят:
   запросы идут только на generativelanguage.googleapis.com и api.github.com.
   Заводите отдельный ключ Google с лимитом и fine-grained токен GitHub
   только на этот репозиторий (Contents: read and write). */
(function () {
  var CFG = {
    param: "nnv-studio",
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
  fetch("/api/ping").then(function (r) { LOCAL = r.ok; }).catch(function () {});

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
  async function ask(prompt, parts, aspect, size) {
    if (!A.gemini) throw new Error("не вставлен ключ Google — кнопка «Ключи» в шапке редактора");
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
                            [part(full)].concat(refs.map(part)), arOf(W, H), size);
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
    if (!A.github) throw new Error("не вставлен токен GitHub — кнопка «Ключи» в шапке редактора");
    var cur = await gh("/contents/" + rel + "?ref=" + CFG.branch, "GET");
    await gh("/contents/" + rel, "PUT", { message: message, branch: CFG.branch,
      sha: cur.sha, content: dataUrl.replace(/^data:[^,]*,/, "") });
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
    ui.where.textContent = LOCAL ? "запись в файл (локальный сервер)" : "коммит в " + CFG.repo;
    paintRefs(); paintZones(); cost();
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
        '<div class="nnv-ed__row">' +
          '<select class="nnv-ed__mode">' +
            '<option value="auto">режим: авто</option>' +
            '<option value="crop">точно по зоне</option>' +
            '<option value="full">весь кадр в контексте</option></select>' +
          '<select class="nnv-ed__qual"><option value="2K">2K</option><option value="1K">1K дешевле</option></select>' +
          '<select class="nnv-ed__n"><option>1</option><option selected>2</option><option>3</option><option>4</option></select>' +
        '</div>' +
        '<button class="nnv-ed__go">Сгенерировать</button>' +
        '<div class="nnv-ed__cost"></div>' +
        '<div class="nnv-ed__log"></div>' +
        '<div class="nnv-ed__varsbox" hidden><h4>Варианты</h4><div class="nnv-ed__vars"></div>' +
          '<div class="nnv-ed__row" style="margin-top:8px">' +
            '<button class="nnv-ed__apply">Применить</button>' +
            '<button class="nnv-ed__again muted">Ещё варианты</button></div>' +
          '<div class="nnv-ed__cost nnv-ed__where"></div></div>' +
        '<div class="nnv-ed__foot">' +
          '<button class="nnv-ed__close muted">Закрыть (Esc)</button></div>' +
      '</aside>';
    document.body.appendChild(root);
    var g = function (s) { return root.querySelector(s); };
    ui = { root: root, wrap: g(".nnv-ed__wrap"), base: g(".nnv-ed__base"), after: g(".nnv-ed__after"),
           split: g(".nnv-ed__split"), tagA: root.querySelectorAll(".nnv-ed__tag")[0],
           tagB: root.querySelectorAll(".nnv-ed__tag")[1], cv: g(".nnv-ed__cv"),
           tools: g(".nnv-ed__tools"), path: g(".nnv-ed__path"), size: g(".nnv-ed__size"),
           prompt: g(".nnv-ed__prompt"), zones: g(".nnv-ed__zones"), mode: g(".nnv-ed__mode"),
           qual: g(".nnv-ed__qual"), n: g(".nnv-ed__n"), go: g(".nnv-ed__go"),
           cost: g(".nnv-ed__cost"), log: g(".nnv-ed__log"), varsBox: g(".nnv-ed__varsbox"),
           vars: g(".nnv-ed__vars"), apply: g(".nnv-ed__apply"), again: g(".nnv-ed__again"),
           where: g(".nnv-ed__where"), keys: g(".nnv-ed__keysbtn"), hint: g(".nnv-ed__tools .hint") };
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
  function cost() {
    if (!S) return;
    var p = passes(), n = +ui.n.value, price = CFG.price[ui.qual.value];
    ui.cost.textContent = "~$" + (p * n * price).toFixed(2) + " · " + p +
      (p === 1 ? " проход" : " прохода") + " × " + n + " вар.";
  }

  function say(t, err) {
    ui.log.textContent = t || "";
    ui.log.className = "nnv-ed__log" + (err ? " err" : "");
  }
  function busy(on, msg) {
    S.busy = on;
    ui.go.disabled = ui.apply.disabled = ui.again.disabled = on;
    ui.go.textContent = on ? (msg || "Генерим…") : "Сгенерировать";
  }

  /* ---------- генерация ---------- */
  async function generate() {
    if (S.busy) return;
    var lines = [];
    function log(s) { lines.push(s); say(lines.slice(-3).join("\n")); }
    try { plan(S.zones, ui.prompt.value, S.refs); }
    catch (e) { return say(e.message, true); }
    if (!A.gemini) { keysPanel(); return say("вставьте свой ключ Google — окно открылось", true); }
    busy(true);
    var t0 = Date.now(), n = +ui.n.value, made = [];
    try {
      for (var v = 1; v <= n; v++) {
        log("вариант " + v + "/" + n);
        made.push(await edit(S.img, S.zones, ui.prompt.value, S.refs,
                             ui.mode.value, ui.qual.value, log));
      }
    } catch (e) {
      busy(false);
      return say((made.length ? "часть вариантов готова. " : "") + e.message, !made.length);
    }
    busy(false);
    S.vars = made;
    say("готово за " + Math.round((Date.now() - t0) / 1000) + " с · " +
        ui.cost.textContent.split(" · ")[0]);
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

  async function apply() {
    if (S.pick === null || S.busy) return;
    if (!LOCAL && !A.github) { keysPanel(); return say("вставьте свой токен GitHub — окно открылось", true); }
    busy(true, LOCAL ? "Пишем…" : "Коммитим…");
    try {
      var data = await toWebp(S.vars[S.pick], quality(S.src));
      var msg = "правка кадра " + S.src + ": " +
        (ui.prompt.value.trim() || S.zones.map(function (z) { return z.prompt; }).filter(Boolean).join("; ") || "точечная");
      var res = await put(S.src, data, msg.slice(0, 180));
      busy(false);
      var stamp = String(Date.now());
      Array.prototype.forEach.call(document.images, function (im) {
        if (im.closest(".nnv-ed")) return;
        var u = new URL(im.src, location.href);
        if (u.pathname.replace(/^\//, "") === S.src) im.src = u.pathname + "?v=" + stamp;
      });
      say(res);
      setTimeout(close, 1200);
    } catch (e) { busy(false); say(e.message, true); }
  }

  /* ---------- ключи ---------- */
  function keysPanel() {
    var v = el("div", "nnv-ed__keys");
    v.innerHTML =
      '<form>' +
        '<div class="nnv-ed__head"><b>Ключи админа</b></div>' +
        '<p>Лежат только в этом браузере (localStorage) и уходят только в Google и GitHub. ' +
        'Заводите отдельный ключ Google с лимитом и fine-grained токен GitHub на репозиторий ' +
        CFG.repo + ' с правом Contents: read and write.</p>' +
        '<div><h4>Ключ Google (Gemini)</h4><input type="password" name="g" placeholder="AIza…"></div>' +
        '<div><h4>Токен GitHub</h4><input type="password" name="h" placeholder="github_pat_…"></div>' +
        '<div class="nnv-ed__log"></div>' +
        '<div class="nnv-ed__row">' +
          '<button type="button" data-act="check">Проверить</button>' +
          '<button type="button" data-act="save">Сохранить</button>' +
          '<button type="button" data-act="off" class="muted">Выйти из режима</button>' +
          '<button type="button" data-act="close" class="muted">Закрыть</button>' +
        '</div>' +
      '</form>';
    document.body.appendChild(v);
    var f = v.querySelector("form"), log = v.querySelector(".nnv-ed__log");
    f.g.value = A.gemini || ""; f.h.value = A.github || "";
    v.onclick = function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var act = b.dataset.act;
      if (act === "close") return v.remove();
      if (act === "off") { localStorage.removeItem(KEY); location.reload(); return; }
      A.gemini = f.g.value.trim(); A.github = f.h.value.trim(); keep();
      if (act === "save") { log.textContent = "сохранено"; log.className = "nnv-ed__log nnv-ed__ok"; return; }
      log.textContent = "проверяем…"; log.className = "nnv-ed__log";
      Promise.all([
        fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + encodeURIComponent(A.gemini))
          .then(function (r) { return r.ok ? "Google: ключ рабочий" : "Google: ключ не принят (" + r.status + ")"; })
          .catch(function () { return "Google: не достучались"; }),
        A.github
          ? gh("", "GET").then(function (j) {
              return "GitHub: " + j.full_name + (j.permissions && j.permissions.push ? ", запись есть" : ", ЗАПИСИ НЕТ");
            }).catch(function (e) { return "GitHub: " + e.message; })
          : Promise.resolve("GitHub: токен не вставлен")
      ]).then(function (r) {
        log.textContent = r.join("\n");
        log.className = "nnv-ed__log" + (r.join(" ").indexOf("рабочий") >= 0 && r.join(" ").indexOf("запись есть") >= 0 ? " nnv-ed__ok" : " nnv-ed__bad");
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

    ui.go.onclick = generate;
    ui.apply.onclick = apply;
    ui.again.onclick = function () { unpreview(); generate(); };
    ui.keys.onclick = keysPanel;
    ui.root.querySelector(".nnv-ed__close").onclick = close;
    ui.n.onchange = ui.qual.onchange = cost;
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
      if (e.key === "Escape") { S.pick !== null ? unpreview() : close(); }
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
