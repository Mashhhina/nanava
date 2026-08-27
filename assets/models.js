/* Витрина моделей для команды (models.html).
   Читает data/models.js (собирается scripts/build_models.py) и data/items.js.
   Если страница открыта под локальным сервером scripts/models_server.py —
   работает кнопка «Редактировать»: загрузка фото, пересборка раскадровки,
   выбор канона, правка роста. На nanava.store сервера нет — страница
   показывает те же данные только на чтение и подсказывает команду. */
(function () {
  var ST = window.NNV_MODELS || { models: [] };
  var ITEMS = {};
  (window.NNV_DATA ? window.NNV_DATA.items : []).forEach(function (it) { ITEMS[it.id] = it; });
  var LIVE = false;                       // есть ли локальный сервер
  var PRICE = 0.101;                      // $ за вариант 2K, из PLAYBOOK
  var mount = document.querySelector("[data-models]");
  var veil = document.querySelector("[data-veil]");
  var modal = document.querySelector("[data-modal]");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }
  function api(path, body) {
    return fetch("/api/" + path, {
      method: body ? "POST" : "GET",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok || j.error) throw new Error(j.error || ("HTTP " + r.status));
        return j;
      });
    });
  }

  var SHEET_LB = { canon: "канон", candidate: "кандидат, ждёт сверки",
                   draft: "черновик из sheets/", none: "нет раскадровки" };

  /* ---------- отрисовка ---------- */
  function thing(id) {
    var it = ITEMS[id];
    if (!it) return '<span class="miss"><span class="ph"><span>' + esc(id) +
                    '</span></span><span class="t">нет в каталоге</span></span>';
    return '<a href="product.html?id=' + esc(id) + '"><span class="ph"><img src="' +
      esc(it.image) + '" alt=""></span><span class="t">' + esc(it.title) + '</span></a>';
  }

  function block(m) {
    var facts =
      '<div><span class="k">Рост</span><span class="v' + (m.height ? '' : ' empty') + '">' +
        (m.height ? esc(m.height) + " см" : "не задан") + '</span></div>' +
      '<div><span class="k">Телосложение</span><span class="v' + (m.build && m.build !== "уточнить у Алексея" ? '' : ' empty') + '">' +
        esc(m.build || "не задано") + '</span></div>' +
      '<div><span class="k">Категория</span><span class="v">' +
        (m.gender === "m" ? "мужская" : "женская") + '</span></div>' +
      '<div><span class="k">Вещей на сайте</span><span class="v">' + m.items.length + '</span></div>';

    var refs = m.photos.map(function (p) {
      var used = m.refs.indexOf(p.file) >= 0;
      return '<figure class="' + (used ? "used" : "") + '"><img src="' + esc(p.url) +
        '" alt=""><figcaption>' + esc(p.file) + (used ? " ·&nbsp;реф" : "") + '</figcaption></figure>';
    }).join("") || '<span class="empty-note">нет живых фото</span>';

    return el(
      '<section class="mdl" id="' + esc(m.name) + '">' +
      '<div class="mdl-head">' +
        '<div>' +
          '<div class="mdl-name">' + esc(m.ru) + '<em>' + esc(m.name) + '</em></div>' +
          '<div class="mdl-facts">' + facts + '</div>' +
        '</div>' +
        '<div class="sp"></div>' +
        '<div class="mdl-actions">' +
          '<span class="badge ' + esc(m.sheetStatus) + '">' + esc(SHEET_LB[m.sheetStatus] || m.sheetStatus) + '</span>' +
          '<button class="btn" data-edit="' + esc(m.name) + '">Редактировать</button>' +
        '</div>' +
      '</div>' +
      (m.sheet ? '<div class="sheet"><img src="' + esc(m.sheet) + '" alt="раскадровка ' + esc(m.ru) + '"></div>'
               : '<div class="sheet none">раскадровки нет — сгенерить через «Редактировать»</div>') +
      '<div class="mdl-cols">' +
        '<div class="col"><h3>Живые фото и референсы</h3><div class="refs">' + refs + '</div>' +
          (m.note ? '<p class="note">' + esc(m.note) + '</p>' : '') + '</div>' +
        '<div class="col"><h3>Вещи на этой модели</h3>' +
          (m.items.length ? '<div class="things">' + m.items.map(thing).join("") + '</div>'
                          : '<p class="empty-note">пока ничего — назначается через ' +
                            'scripts/pick_model.py &lt;f|m&gt; --item &lt;id&gt;</p>') +
        '</div>' +
      '</div>' +
      '</section>');
  }

  /* ---------- вкладка «Вещи» ---------- */
  var CAT = { clothes: "одежда", bags: "сумки", accessories: "аксессуары",
              objects: "объекты" };
  var itemsMount = document.querySelector("[data-items]");
  var tab = (location.hash === "#items") ? "items" : "people";

  function ruModel(name) {
    var m = byName(name);
    return m ? m.ru : name;
  }

  function frameTile(f, i) {
    return '<figure class="frm' + (f.ref ? " ref" : "") + (f.exists ? "" : " gone") +
      '" data-f="' + esc(f.path) + '">' +
      (f.exists ? '<img src="' + esc(f.path) + '" alt="" loading="lazy">'
                : '<span class="no">нет файла</span>') +
      '<figcaption>' + esc(f.label) + (f.ref ? ' · эталон' : '') + '</figcaption></figure>';
  }

  function itemBlock(it) {
    var refs = it.frames.filter(function (f) { return f.ref; }).length;
    return el(
      '<section class="itm" id="item-' + esc(it.id) + '">' +
      '<div class="itm-head">' +
        '<div><span class="itm-name">' + esc(it.title) + '</span>' +
          '<span class="itm-id">' + esc(it.id) + ' · ' + esc(CAT[it.category] || it.category) + '</span></div>' +
        '<div class="sp"></div>' +
        '<span class="badge' + (it.model ? "" : " draft") + '">' +
          (it.model ? "в кадре: " + esc(ruModel(it.model)) : "модель не назначена") + '</span>' +
        '<span class="badge' + (it.refsCustom ? " canon" : "") + '">эталон: ' + refs + ' из ' + it.frames.length + '</span>' +
        '<a class="btn ghost" href="product.html?id=' + esc(it.id) + '" target="_blank">карточка</a>' +
        '<button class="btn" data-item="' + esc(it.id) + '">Редактировать</button>' +
      '</div>' +
      '<div class="frames">' + it.frames.map(frameTile).join("") + '</div>' +
      '</section>');
  }

  var cat = "all";

  function renderItems() {
    var list = (ST.items || []).filter(function (it) {
      return cat === "all" || it.category === cat;
    });
    itemsMount.innerHTML = "";
    list.forEach(function (it) { itemsMount.appendChild(itemBlock(it)); });
    itemsMount.querySelectorAll("[data-item]").forEach(function (b) {
      b.onclick = function () { openItemEdit(b.getAttribute("data-item")); };
    });
  }

  function itemBar() {
    var all = ST.items || [];
    var cats = ["all"].concat(Object.keys(CAT));
    return cats.map(function (c) {
      var n = c === "all" ? all.length
                          : all.filter(function (i) { return i.category === c; }).length;
      return '<a href="#items" data-cat="' + c + '"' + (c === cat ? ' class="on"' : '') +
        '><b>' + (c === "all" ? "все" : CAT[c]) + '</b><span>' + n + '</span></a>';
    }).join("");
  }

  function drawBar() {
    var bar = document.querySelector("[data-bar]");
    if (tab === "items") {
      bar.innerHTML = itemBar();
      bar.querySelectorAll("[data-cat]").forEach(function (a) {
        a.onclick = function (e) {
          e.preventDefault();
          cat = a.getAttribute("data-cat");
          renderItems();
          drawBar();
        };
      });
    } else {
      bar.innerHTML = ST.models.map(function (m) {
        return '<a href="#' + esc(m.name) + '"><b>' + esc(m.ru) + '</b><span>' +
          (m.gender === "m" ? "м" : "ж") + " · " + m.items.length + " вещ." + '</span></a>';
      }).join("");
    }
  }

  function switchTab(next) {
    tab = next;
    location.hash = next === "items" ? "#items" : "";
    document.querySelectorAll("[data-tab]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-tab") === tab);
    });
    mount.hidden = tab !== "people";
    itemsMount.hidden = tab !== "items";
    document.querySelector("[data-title]").textContent = tab === "items" ? "Вещи" : "Модели";
    drawBar();
    document.querySelector("[data-sub]").innerHTML = tab === "items"
      ? 'Раскадровка каждой вещи: все кадры карточки. Любой кадр можно заменить ' +
        'или добавить новый — и отметить, какие кадры уходят <b>эталоном в ' +
        'генерацию</b> (их берут скрипты через <code>scripts/item_refs.py</code>). ' +
        'Источник — <code>site/data/items.js</code> + <code>refs/items/refs.json</code>.'
      : 'Раскадровка (character sheet), постоянные параметры и все вещи, на ' +
        'которых стоит человек. Источник — <code>refs/models/registry.json</code> + ' +
        '<code>usage.json</code>; пересборка — <code>python3 scripts/build_models.py</code>.';
  }

  document.querySelectorAll("[data-tab]").forEach(function (b) {
    b.onclick = function () { switchTab(b.getAttribute("data-tab")); };
  });

  /* ---------- модалка вещи ---------- */
  function itemById(id) {
    return (ST.items || []).filter(function (x) { return x.id === id; })[0];
  }

  function openItemEdit(id) {
    var it = itemById(id);
    var refs = it.frames.filter(function (f) { return f.ref; })
                        .map(function (f) { return f.path; });

    modal.innerHTML =
      '<button class="close" data-x>×</button>' +
      '<h2>' + esc(it.title) + ' <em style="font-size:12px;color:var(--muted)">' + esc(it.id) + '</em></h2>' +
      '<p class="hint" style="margin-top:6px">' +
        (it.model ? 'В кадре: <b>' + esc(ruModel(it.model)) + '</b>. ' : 'Модель не назначена. ') +
        'Кадр «эталон» уходит референсом вещи в каждую генерацию — с него держится ' +
        'форма, цвет и детали. Замена пишется поверх файла карточки: ' +
        'на сайте кадр обновится после <code>git push</code>.</p>' +
      '<h3>Кадры карточки</h3>' +
      '<div class="frames edit" data-frames></div>' +
      '<div class="row" style="margin-top:14px">' +
        '<button class="btn" data-saverefs' + (LIVE ? "" : " disabled") + '>Сохранить эталон</button>' +
        '<button class="btn ghost" data-add' + (LIVE ? "" : " disabled") + '>Добавить кадр</button>' +
        '<input type="file" accept="image/*" data-file style="display:none">' +
      '</div>' +
      '<div class="log" data-log></div>' +
      (LIVE ? "" :
        '<div class="cmd">python3 scripts/models_server.py\n' +
        '# затем http://localhost:8787/models.html#items — здесь кнопки заработают\n\n' +
        '# эталонные кадры вещи из терминала:\n' +
        'python3 scripts/item_refs.py ' + esc(it.id) + '</div>');
    veil.hidden = false;
    modal.querySelector("[data-x]").onclick = closeEdit;

    var box = modal.querySelector("[data-frames]");
    var log = modal.querySelector("[data-log]");
    var file = modal.querySelector("[data-file]");
    var slot = null;                      // какой кадр меняем (null = добавить)

    function drawFrames() {
      box.innerHTML = it.frames.map(function (f) {
        var on = refs.indexOf(f.path) >= 0;
        return '<figure class="frm' + (on ? " ref" : "") + '" data-p="' + esc(f.path) + '">' +
          (f.exists ? '<img src="' + esc(f.path) + '?t=' + Date.now() + '" alt="">'
                    : '<span class="no">нет файла</span>') +
          '<figcaption>' + esc(f.label) + '</figcaption>' +
          '<div class="frm-act">' +
            '<button class="mark" data-ref>' + (on ? "эталон" : "не эталон") + '</button>' +
            '<button class="mark" data-rep' + (LIVE ? "" : " disabled") + '>заменить</button>' +
          '</div></figure>';
      }).join("");
      box.querySelectorAll("[data-p]").forEach(function (f) {
        var p = f.getAttribute("data-p");
        f.querySelector("[data-ref]").onclick = function () {
          var i = refs.indexOf(p);
          if (i >= 0) refs.splice(i, 1); else refs.push(p);
          drawFrames();
        };
        f.querySelector("[data-rep]").onclick = function () {
          slot = p; file.value = ""; file.click();
        };
      });
    }
    drawFrames();

    modal.querySelector("[data-add]").onclick = function () {
      slot = null; file.value = ""; file.click();
    };
    file.onchange = function () {
      var f = file.files[0];
      if (!f) return;
      log.textContent = slot ? ("меняю " + slot + "…") : "добавляю кадр…";
      var r = new FileReader();
      r.onload = function () {
        api("items/" + it.id + "/frame", {
          slot: slot, file: { name: f.name, data: r.result.split(",")[1] }
        }).then(function (j) {
          applyState(j.state);
          it = itemById(id);
          refs = it.frames.filter(function (x) { return x.ref; })
                          .map(function (x) { return x.path; });
          drawFrames();
          log.innerHTML = "<b>записано:</b> site/" + esc(j.slot) +
            (slot ? "" : " — путь дописан в items.js");
        }).catch(function (e) { log.innerHTML = "<b>ошибка:</b> " + esc(e.message); });
      };
      r.readAsDataURL(f);
    };

    modal.querySelector("[data-saverefs]").onclick = function () {
      api("items/" + it.id + "/refs", { refs: refs }).then(function (j) {
        applyState(j.state);
        it = itemById(id);
        log.innerHTML = "<b>сохранено</b> в refs/items/refs.json — эти кадры " +
          "теперь уходят в генерацию";
      }).catch(function (e) { log.innerHTML = "<b>ошибка:</b> " + esc(e.message); });
    };
  }

  function render() {
    mount.innerHTML = "";
    ST.models.forEach(function (m) { mount.appendChild(block(m)); });
    document.querySelector("[data-generated]").textContent =
      "собрано " + (ST.generated || "—") + " · " + ST.models.length + " моделей · " +
      ((ST.items || []).length) + " вещей";
    var mode = document.querySelector("[data-mode]");
    mode.className = "kit-mode" + (LIVE ? " live" : "");
    mode.innerHTML = LIVE
      ? '<span class="dot"></span>Локальный режим: правки сохраняются в refs/models/ и пересобирают страницу.'
      : '<span class="dot"></span>Только чтение. Чтобы править (загрузить фото, пересобрать раскадровку, ' +
        'записать рост) — поднять локальный сервер: <code>python3 scripts/models_server.py</code> ' +
        'и открыть <code>http://localhost:8787/models.html</code>.';
    mount.querySelectorAll("[data-edit]").forEach(function (b) {
      b.onclick = function () { openEdit(b.getAttribute("data-edit")); };
    });
    renderItems();
    switchTab(tab);
  }

  /* ---------- модалка ---------- */
  function byName(n) {
    for (var i = 0; i < ST.models.length; i++) if (ST.models[i].name === n) return ST.models[i];
  }
  function closeEdit() { veil.hidden = true; modal.innerHTML = ""; }
  veil.addEventListener("click", function (e) { if (e.target === veil) closeEdit(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeEdit(); });

  function openEdit(name) {
    var m = byName(name);
    var picked = m.refs.slice();     // какие фото уходят в генерацию
    var uploads = [];                // новые файлы: {name, data(base64), url}
    var chosen = null;               // выбранный вариант раскадровки

    modal.innerHTML =
      '<button class="close" data-x>×</button>' +
      '<h2>' + esc(m.ru) + ' <em style="font-size:12px;color:var(--muted)">' + esc(m.name) + '</em></h2>' +
      '<h3>Параметры</h3>' +
      '<div class="row">' +
        '<div class="f-h"><label>Рост, см</label><input type="number" min="140" max="210" data-height value="' + (m.height || "") + '"></div>' +
        '<div class="f-b"><label>Телосложение</label><input type="text" data-build value="' + esc(m.build) + '"></div>' +
        '<button class="btn" data-save' + (LIVE ? "" : " disabled") + '>Сохранить</button>' +
      '</div>' +
      '<div style="margin-top:10px"><label>Заметка (видна на странице)</label>' +
        '<textarea data-note>' + esc(m.note) + '</textarea></div>' +
      '<h3>Фотографии для раскадровки</h3>' +
      '<div class="drop" data-drop' + (LIVE ? "" : ' style="opacity:.45;pointer-events:none"') + '>' +
        'Перетащить фото сюда или нажать, чтобы выбрать (jpg, png, webp)' +
        '<input type="file" multiple accept="image/*" data-file></div>' +
      '<div class="picks" data-picks></div>' +
      '<h3>Промпт генерации' +
        (m.promptCustom ? ' <span class="badge candidate">свой</span>' : '') +
        ' <button class="lnk" data-base>вернуть базовый</button></h3>' +
      '<textarea class="prompt" data-prompt rows="8"' + (LIVE ? "" : " disabled") + '>' + esc(m.prompt) + '</textarea>' +
      '<p class="hint">Уходит в Nano Banana как есть — вместе с отмеченными выше фото. ' +
        'Сохраняется в реестре модели: этот же текст возьмёт и ' +
        '<code>scripts/gen_character_sheet.py</code>. Пусто или базовый текст — ' +
        'модель вернётся к общему шаблону.</p>' +
      '<div class="row" style="margin-top:14px">' +
        '<div style="width:120px"><label>Вариантов</label>' +
          '<input type="number" min="1" max="4" value="3" data-variants></div>' +
        '<button class="btn" data-regen' + (LIVE ? "" : " disabled") + '>Пересобрать раскадровку</button>' +
        '<span class="log" style="margin:0" data-cost></span>' +
      '</div>' +
      '<div class="log" data-log></div>' +
      '<div class="variants" data-variants></div>' +
      (LIVE ? "" :
        '<div class="cmd">python3 scripts/models_server.py\n' +
        '# затем http://localhost:8787/models.html — здесь кнопки заработают\n\n' +
        '# или всё то же из терминала:\n' +
        'cp <новые-фото> refs/models/' + esc(m.name) + '/\n' +
        'python3 scripts/gen_character_sheet.py ' + esc(m.name) + '\n' +
        'cp refs/models/' + esc(m.name) + '/sheets/variant-N.jpg refs/models/' + esc(m.name) + '/character-sheet.png\n' +
        'python3 scripts/build_models.py --push</div>');
    veil.hidden = false;
    modal.querySelector("[data-x]").onclick = closeEdit;

    var picksBox = modal.querySelector("[data-picks]");
    var log = modal.querySelector("[data-log]");
    var varsBox = modal.querySelector("[data-variants]");
    var cost = modal.querySelector("[data-cost]");

    function drawCost() {
      var n = +modal.querySelector("[data-variants]").value || 0;
      cost.textContent = "≈ $" + (n * PRICE).toFixed(2) + " · 2K, ~40 сек на вариант";
    }
    modal.querySelector("[data-variants]").oninput = drawCost;
    drawCost();
    modal.querySelector("[data-base]").onclick = function () {
      modal.querySelector("[data-prompt]").value = m.promptBase;
    };

    function drawPicks() {
      var all = m.photos.map(function (p) { return { file: p.file, url: p.url }; })
        .concat(uploads.map(function (u) { return { file: u.name, url: u.url, isNew: true }; }));
      picksBox.innerHTML = all.map(function (p) {
        var on = picked.indexOf(p.file) >= 0;
        return '<figure class="pickable' + (on ? " on" : "") + '" data-f="' + esc(p.file) + '">' +
          '<img src="' + esc(p.url) + '" alt="">' +
          '<figcaption><span class="mark">' + (on ? "берём" : "не берём") + '</span><br>' +
          esc(p.file) + (p.isNew ? " · новое" : "") + '</figcaption></figure>';
      }).join("") || '<span class="empty-note">фото нет — загрузите несколько</span>';
      picksBox.querySelectorAll("[data-f]").forEach(function (f) {
        f.onclick = function () {
          var k = f.getAttribute("data-f"), i = picked.indexOf(k);
          if (i >= 0) picked.splice(i, 1); else picked.push(k);
          drawPicks();
        };
      });
    }
    drawPicks();

    /* загрузка фото */
    var drop = modal.querySelector("[data-drop]");
    var file = modal.querySelector("[data-file]");
    if (LIVE) {
      drop.onclick = function () { file.click(); };
      ["dragenter", "dragover"].forEach(function (t) {
        drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add("over"); });
      });
      ["dragleave", "drop"].forEach(function (t) {
        drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.remove("over"); });
      });
      drop.addEventListener("drop", function (e) { take(e.dataTransfer.files); });
      file.onchange = function () { take(file.files); };
    }

    function take(list) {
      var files = [].slice.call(list).filter(function (f) { return /^image\//.test(f.type); });
      if (!files.length) return;
      log.textContent = "загружаю " + files.length + " фото…";
      Promise.all(files.map(function (f) {
        return new Promise(function (res) {
          var r = new FileReader();
          r.onload = function () { res({ name: f.name, data: r.result.split(",")[1] }); };
          r.readAsDataURL(f);
        });
      })).then(function (payload) {
        return api("models/" + m.name + "/photos", { files: payload });
      }).then(function (j) {
        j.saved.forEach(function (s) {
          uploads.push({ name: s.file, url: s.url + "?t=" + Date.now() });
          if (picked.indexOf(s.file) < 0) picked.push(s.file);
        });
        applyState(j.state);
        log.innerHTML = "<b>загружено:</b> " + j.saved.map(function (s) { return esc(s.file); }).join(", ") +
          " → refs/models/" + esc(m.name) + "/";
        drawPicks();
      }).catch(function (e) { log.innerHTML = "<b>ошибка:</b> " + esc(e.message); });
    }

    /* параметры */
    modal.querySelector("[data-save]").onclick = function () {
      var h = modal.querySelector("[data-height]").value;
      api("models/" + m.name + "/meta", {
        height: h ? +h : null,
        build_ru: modal.querySelector("[data-build]").value.trim(),
        note_ru: modal.querySelector("[data-note]").value.trim(),
        prompt: modal.querySelector("[data-prompt]").value
      }).then(function (j) {
        applyState(j.state);
        log.innerHTML = "<b>сохранено</b> в refs/models/registry.json";
      }).catch(function (e) { log.innerHTML = "<b>ошибка:</b> " + esc(e.message); });
    };

    /* пересборка раскадровки */
    modal.querySelector("[data-regen]").onclick = function () {
      if (!picked.length) { log.innerHTML = "<b>выберите хотя бы одно фото</b>"; return; }
      var n = +modal.querySelector("[data-variants]").value || 1;
      var btn = modal.querySelector("[data-regen]");
      btn.disabled = true;
      log.innerHTML = "<b>генерю " + n + " вариант(а)</b> по фото: " + picked.map(esc).join(", ") +
        "\nэто ~" + (n * 40) + " сек, окно не закрывать…";
      varsBox.innerHTML = "";
      api("models/" + m.name + "/regen", {
        refs: picked, variants: n,
        prompt: modal.querySelector("[data-prompt]").value
      })
        .then(function (j) {
          log.innerHTML = "<b>готово.</b> Выберите лучший вариант и нажмите «Сделать каноном».\n" +
            esc(j.log || "");
          varsBox.innerHTML = j.variants.map(function (v) {
            return '<figure data-v="' + esc(v.file) + '"><img src="' + esc(v.url) + '?t=' + Date.now() +
              '" alt=""><figcaption><span>' + esc(v.file) + '</span>' +
              '<span class="mark">выбрать</span></figcaption></figure>';
          }).join("") + (j.variants.length
            ? '<button class="btn" data-canon disabled>Сделать каноном</button>' : "");
          var canon = varsBox.querySelector("[data-canon]");
          varsBox.querySelectorAll("[data-v]").forEach(function (f) {
            f.onclick = function () {
              varsBox.querySelectorAll("[data-v]").forEach(function (x) { x.classList.remove("on"); });
              f.classList.add("on");
              chosen = f.getAttribute("data-v");
              if (canon) canon.disabled = false;
            };
          });
          if (canon) canon.onclick = function () {
            canon.disabled = true;
            api("models/" + m.name + "/canon", { file: chosen }).then(function (jj) {
              applyState(jj.state);
              log.innerHTML = "<b>канон обновлён:</b> refs/models/" + esc(m.name) +
                "/character-sheet.png\nстраница пересобрана — " +
                "выложить: <code>python3 scripts/build_models.py --push</code>";
            }).catch(function (e) { log.innerHTML = "<b>ошибка:</b> " + esc(e.message); });
          };
        })
        .catch(function (e) { log.innerHTML = "<b>ошибка:</b> " + esc(e.message); })
        .then(function () { btn.disabled = false; });
    };
  }

  function applyState(state) {
    if (!state) return;
    ST = state;
    render();
  }

  /* ---------- старт ---------- */
  render();
  fetch("/api/ping").then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) { if (j && j.ok) { LIVE = true; render(); } })
    .catch(function () {});
})();
