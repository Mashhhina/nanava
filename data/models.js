// Данные страницы моделей (site/models.html). НЕ ПРАВИТЬ РУКАМИ:
// пересобирается из refs/models/registry.json + usage.json командой
//     python3 scripts/build_models.py
window.NNV_MODELS = {
  "generated": "2026-08-27 21:41",
  "unknown": [],
  "models": [
    {
      "name": "katya",
      "ru": "Катя",
      "gender": "f",
      "height": null,
      "build": "худощавое/стройное, узкие плечи, длинная шея, тонкие руки",
      "note": "Действующий лист — фас + 3/4 + профиль, оба боковых смотрят вправо, левого ракурса нет. Канон сверен, не трогаем: если нужна левая сторона — догенерить второй лист и сверить отдельно.",
      "desc": "young woman, short dark chestnut wavy bob with a choppy fringe, light hazel eyes, freckles across the nose and cheeks, natural skin with no makeup, narrow shoulders, long neck, slim petite build",
      "sheetStatus": "canon",
      "sheet": "img/models/katya/sheet.webp",
      "photos": [
        {
          "file": "face-photo-crop.jpg",
          "url": "img/models/katya/photo-01.webp"
        }
      ],
      "refs": [
        "face-photo-crop.jpg"
      ],
      "prompt": "Character reference sheet of the EXACT same person as in the reference photo(s): young woman, short dark chestnut wavy bob with a choppy fringe, light hazel eyes, freckles across the nose and cheeks, natural skin with no makeup, narrow shoulders, long neck, slim petite build. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): young woman, short dark chestnut wavy bob with a choppy fringe, light hazel eyes, freckles across the nose and cheeks, natural skin with no makeup, narrow shoulders, long neck, slim petite build. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": false,
      "items": [
        "cap-fangs",
        "dress-feather",
        "earcuff-spine",
        "earrings-cameo",
        "scarf-organza"
      ],
      "kind": "person",
      "face": "img/models/katya/face.webp",
      "sheetSrc": "refs/models/katya/character-sheet.png"
    },
    {
      "name": "alya",
      "ru": "Аля",
      "gender": "f",
      "height": null,
      "build": "уточнить у Алексея",
      "note": "27.08 получено нормальное фото (photo-street-night) — канон пересобран по нему: чёлка рваная «шторкой», волосы волнами. Старый вебка-скрин (face-photo-videocall) — только история, в референсы не давать.",
      "desc": "young woman, long dark blonde hair falling well below the shoulders in soft loose waves, thin wispy curtain-style bangs over the forehead, light grey-blue eyes, pale skin, no makeup, soft rounded face with a gently pointed chin",
      "sheetStatus": "candidate",
      "sheet": "img/models/alya/sheet.webp",
      "photos": [
        {
          "file": "face-photo-crop.jpg",
          "url": "img/models/alya/photo-01.webp"
        },
        {
          "file": "face-photo-street-crop.jpg",
          "url": "img/models/alya/photo-02.webp"
        },
        {
          "file": "face-photo-videocall.jpg",
          "url": "img/models/alya/photo-03.webp"
        },
        {
          "file": "photo-street-night.webp",
          "url": "img/models/alya/photo-04.webp"
        }
      ],
      "refs": [
        "face-photo-street-crop.jpg",
        "photo-street-night.webp"
      ],
      "prompt": "Character reference sheet of the EXACT same person as in the reference photo(s): young woman, long dark blonde hair falling well below the shoulders in soft loose waves, thin wispy curtain-style bangs over the forehead, light grey-blue eyes, pale skin, no makeup, soft rounded face with a gently pointed chin. The reference is a night street photo: reconstruct the SAME real person faithfully in clean studio light, do not idealize or invent a different face. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): young woman, long dark blonde hair falling well below the shoulders in soft loose waves, thin wispy curtain-style bangs over the forehead, light grey-blue eyes, pale skin, no makeup, soft rounded face with a gently pointed chin. The reference is a night street photo: reconstruct the SAME real person faithfully in clean studio light, do not idealize or invent a different face. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": false,
      "items": [
        "dress-moon",
        "scarf-knight",
        "top-organza"
      ],
      "kind": "person",
      "face": "img/models/alya/face.webp",
      "sheetSrc": "refs/models/alya/character-sheet-candidate.jpg"
    },
    {
      "name": "lina",
      "ru": "Лина",
      "gender": "f",
      "height": null,
      "build": "худощавое, узкие плечи, длинная шея, выраженные ключицы",
      "note": "В живых фото встречается с косами и с кудрями — канон: боб с чёлкой.",
      "desc": "young woman, short dark brown hair cut as a chin-length bob with a short blunt fringe, light green-grey eyes, thick straight dark eyebrows, very full lips with a prominent lower lip, oval face with a defined jaw and high cheekbones, light freckles across the nose and cheeks, pale light skin, no makeup",
      "sheetStatus": "candidate",
      "sheet": "img/models/lina/sheet.webp",
      "photos": [
        {
          "file": "face-photo-crop.jpg",
          "url": "img/models/lina/photo-01.webp"
        },
        {
          "file": "photo-01-front.jpg",
          "url": "img/models/lina/photo-02.webp"
        },
        {
          "file": "photo-02-pixie.jpg",
          "url": "img/models/lina/photo-03.webp"
        },
        {
          "file": "photo-03-braids.jpg",
          "url": "img/models/lina/photo-04.webp"
        },
        {
          "file": "photo-04-curly.jpg",
          "url": "img/models/lina/photo-05.webp"
        },
        {
          "file": "photo-05-closeup.jpg",
          "url": "img/models/lina/photo-06.webp"
        },
        {
          "file": "photo-06-milan.jpg",
          "url": "img/models/lina/photo-07.webp"
        },
        {
          "file": "photo-07-lying.jpg",
          "url": "img/models/lina/photo-08.webp"
        }
      ],
      "refs": [
        "face-photo-crop.jpg",
        "photo-02-pixie.jpg",
        "photo-05-closeup.jpg"
      ],
      "prompt": "Character reference sheet of the EXACT same person as in the reference photo(s): young woman, short dark brown hair cut as a chin-length bob with a short blunt fringe, light green-grey eyes, thick straight dark eyebrows, very full lips with a prominent lower lip, oval face with a defined jaw and high cheekbones, light freckles across the nose and cheeks, pale light skin, no makeup. The reference photos show her with different hair (braids, curls, pixie): use ONLY the short dark brown bob with blunt fringe, and keep the facial identity identical across all references. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): young woman, short dark brown hair cut as a chin-length bob with a short blunt fringe, light green-grey eyes, thick straight dark eyebrows, very full lips with a prominent lower lip, oval face with a defined jaw and high cheekbones, light freckles across the nose and cheeks, pale light skin, no makeup. The reference photos show her with different hair (braids, curls, pixie): use ONLY the short dark brown bob with blunt fringe, and keep the facial identity identical across all references. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": false,
      "items": [
        "skirt-dipdye",
        "tote-ghost"
      ],
      "kind": "person",
      "face": "img/models/lina/face.webp",
      "sheetSrc": "refs/models/lina/character-sheet-candidate.jpg"
    },
    {
      "name": "nikita",
      "ru": "Никита",
      "gender": "m",
      "height": null,
      "build": "худощавое, узкие плечи, тонкие руки",
      "note": "Реальный Никита из команды. Канон сверен Алексеем 27.08 (по кадру bag-crystal f2). Красные глаза — правило от 27.08 (PLAYBOOK, «Никита — всегда с красными глазами»): канон с серо-голубыми глазами устарел, пересобрать и сверить.",
      "desc": "young man, fully shaved bald head (smooth, no stubble), very pale light skin, vivid red irises (clearly red eyes), thin light eyebrows, narrow elongated face with high cheekbones and slightly hollow cheeks",
      "sheetStatus": "canon",
      "sheet": "img/models/nikita/sheet.webp",
      "photos": [
        {
          "file": "face-photo-crop.jpg",
          "url": "img/models/nikita/photo-01.webp"
        },
        {
          "file": "photo-01-jacket.jpg",
          "url": "img/models/nikita/photo-02.webp"
        },
        {
          "file": "photo-02-front.jpg",
          "url": "img/models/nikita/photo-03.webp"
        }
      ],
      "refs": [
        "face-photo-crop.jpg",
        "photo-02-front.jpg"
      ],
      "prompt": "Character reference sheet of the EXACT same person as in the reference photo(s): young man, fully shaved bald head (smooth, no stubble), very pale light skin, vivid red irises (clearly red eyes), thin light eyebrows, narrow elongated face with high cheekbones and slightly hollow cheeks. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): young man, fully shaved bald head (smooth, no stubble), very pale light skin, vivid red irises (clearly red eyes), thin light eyebrows, narrow elongated face with high cheekbones and slightly hollow cheeks. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": false,
      "items": [
        "bag-crystal",
        "longsleeve-smile",
        "sweater-shadow",
        "tee-riders"
      ],
      "kind": "person",
      "face": "img/models/nikita/face.webp",
      "sheetSrc": "refs/models/nikita/character-sheet.png"
    },
    {
      "name": "lesha",
      "ru": "Лёша",
      "gender": "m",
      "height": null,
      "build": "худощавое",
      "note": "Постоянные детали: серебряный септум и серебряные кольца в обоих ушах — в каждом кадре. Канон гладко выбрит.",
      "desc": "young man, dark brown straight chin-length hair (soft bob parted near the middle, strands often tucked behind the ears), warm hazel-brown eyes, medium dark eyebrows, soft oval face with a gentle jawline, light skin with a warm undertone, a small silver SEPTUM RING in the nose and a small silver hoop earring in each ear (keep the septum ring and hoops in every view)",
      "sheetStatus": "candidate",
      "sheet": "img/models/lesha/sheet.webp",
      "photos": [
        {
          "file": "face-photo-crop.jpg",
          "url": "img/models/lesha/photo-01.webp"
        },
        {
          "file": "photo-01-halo.webp",
          "url": "img/models/lesha/photo-02.webp"
        },
        {
          "file": "photo-02-tee.webp",
          "url": "img/models/lesha/photo-03.webp"
        },
        {
          "file": "photo-03-dog.webp",
          "url": "img/models/lesha/photo-04.webp"
        },
        {
          "file": "photo-04-window.webp",
          "url": "img/models/lesha/photo-05.webp"
        }
      ],
      "refs": [
        "face-photo-crop.jpg",
        "photo-01-halo.webp",
        "photo-02-tee.webp"
      ],
      "prompt": "Character reference sheet of the EXACT same person as in the reference photo(s): young man, dark brown straight chin-length hair (soft bob parted near the middle, strands often tucked behind the ears), warm hazel-brown eyes, medium dark eyebrows, soft oval face with a gentle jawline, light skin with a warm undertone, a small silver SEPTUM RING in the nose and a small silver hoop earring in each ear (keep the septum ring and hoops in every view). Canonical look is CLEAN-SHAVEN: one reference photo shows light chin stubble — ignore it. Keep the facial identity identical to the reference photos. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): young man, dark brown straight chin-length hair (soft bob parted near the middle, strands often tucked behind the ears), warm hazel-brown eyes, medium dark eyebrows, soft oval face with a gentle jawline, light skin with a warm undertone, a small silver SEPTUM RING in the nose and a small silver hoop earring in each ear (keep the septum ring and hoops in every view). Canonical look is CLEAN-SHAVEN: one reference photo shows light chin stubble — ignore it. Keep the facial identity identical to the reference photos. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": false,
      "items": [
        "hoodie-horns",
        "jacket-knight"
      ],
      "kind": "person",
      "face": "img/models/lesha/face.webp",
      "sheetSrc": "refs/models/lesha/character-sheet-candidate.jpg"
    },
    {
      "name": "pasha",
      "ru": "Паша",
      "gender": "m",
      "height": null,
      "build": "уточнить у Алексея",
      "note": "Реальный Паша. Канон: очень короткий бритый ёжик и лёгкая щетина. Исходник — селфи с телефона сверху и с тёплым цветом; сверка обязательна.",
      "desc": "young man, very short buzzed light brown hair (close crop, high receding hairline at the temples), light blue-grey eyes, straight light eyebrows, long narrow face with a straight nose, defined jaw and prominent cheekbones, short light stubble beard on the chin, jaw and upper lip, thin lips, fair skin with a warm undertone, slightly protruding ears",
      "sheetStatus": "candidate",
      "sheet": "img/models/pasha/sheet.webp",
      "photos": [
        {
          "file": "face-photo-crop.jpg",
          "url": "img/models/pasha/photo-01.webp"
        },
        {
          "file": "photo-01-selfie.webp",
          "url": "img/models/pasha/photo-02.webp"
        }
      ],
      "refs": [
        "face-photo-crop.jpg",
        "photo-01-selfie.webp"
      ],
      "prompt": "Character reference sheet of the EXACT same person as in the reference photo(s): young man, very short buzzed light brown hair (close crop, high receding hairline at the temples), light blue-grey eyes, straight light eyebrows, long narrow face with a straight nose, defined jaw and prominent cheekbones, short light stubble beard on the chin, jaw and upper lip, thin lips, fair skin with a warm undertone, slightly protruding ears. The reference is a warm-toned phone selfie shot from above: reconstruct the SAME real person faithfully, neutralize the colour cast and the upward angle, do not idealize or invent a different face. Keep the short stubble beard and the buzzed hair in every view. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): young man, very short buzzed light brown hair (close crop, high receding hairline at the temples), light blue-grey eyes, straight light eyebrows, long narrow face with a straight nose, defined jaw and prominent cheekbones, short light stubble beard on the chin, jaw and upper lip, thin lips, fair skin with a warm undertone, slightly protruding ears. The reference is a warm-toned phone selfie shot from above: reconstruct the SAME real person faithfully, neutralize the colour cast and the upward angle, do not idealize or invent a different face. Keep the short stubble beard and the buzzed hair in every view. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": false,
      "items": [
        "mask-denim"
      ],
      "kind": "person",
      "face": "img/models/pasha/face.webp",
      "sheetSrc": "refs/models/pasha/character-sheet-candidate.jpg"
    },
    {
      "name": "bulochka",
      "ru": "Булочка",
      "gender": "dog",
      "height": null,
      "build": "бордер-колли, среднего размера, поджарая; в кадре всегда лежит",
      "note": "Наша собака и фишка каталога: ровно на каждой третьей вещи один кадр карточки — с Булочкой (PLAYBOOK, «Булочка в кадре»; кому досталась — python3 scripts/bulochka.py). В кадре она ЛЕЖИТ и без ошейника: аксессуары в кадре бывают только наши. Живое фото от Алексея 27.08 (photo-01-sofa.jpg — стоит на диване у окна, Варшава-Муранув; face-photo-crop.jpg — кроп морды с него). Фото только одно и стоя, лежачей позы в референсах нет — если лежачий ракурс поедет, просить у Алексея кадр лёжа.",
      "desc": "a young border collie named Bulochka: medium-sized, slim athletic build, semi-long soft double coat in warm LIVER CHOCOLATE BROWN (never black), classic collie markings — a narrow white blaze running up the muzzle between the eyes, white muzzle and chin, a wide white ruff on the chest, white front legs and paws, brown mask over both eyes and cheeks, brown semi-erect ears folded at the tips, light amber-hazel eyes, brown liver nose and eye rims, feathered brown tail",
      "sheetStatus": "canon",
      "sheet": "img/models/bulochka/sheet.webp",
      "photos": [
        {
          "file": "face-photo-crop.jpg",
          "url": "img/models/bulochka/photo-01.webp"
        },
        {
          "file": "photo-01-sofa.jpg",
          "url": "img/models/bulochka/photo-02.webp"
        }
      ],
      "refs": [
        "face-photo-crop.jpg",
        "photo-01-sofa.jpg"
      ],
      "prompt": "Character reference sheet of the EXACT same dog as in the reference photo(s): a young border collie named Bulochka: medium-sized, slim athletic build, semi-long soft double coat in warm LIVER CHOCOLATE BROWN (never black), classic collie markings — a narrow white blaze running up the muzzle between the eyes, white muzzle and chin, a wide white ruff on the chest, white front legs and paws, brown mask over both eyes and cheeks, brown semi-erect ears folded at the tips, light amber-hazel eyes, brown liver nose and eye rims, feathered brown tail. This is a REAL dog and always the SAME dog: keep her markings and proportions identical in every frame, do not restyle her into a black-and-white collie, do not make her a puppy or a cartoon. NO COLLAR, no harness, no leash, no tag, no dog toys or bowls in the frame. One horizontal row of FIVE studio views of this same dog, left to right: (1) left profile standing, (2) left three-quarter standing, (3) frontal standing, (4) right three-quarter standing, (5) LYING DOWN in profile with front paws stretched forward and head up — the pose she is photographed in for the catalogue. EXACT same head shape, muzzle, ear set, eye colour and white markings in every view; preserve her identity, do not idealize her, do not change the markings, keep natural fur texture. Calm neutral expression, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent body size and eye level across all five views. No collar, no leash, no text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): a young border collie named Bulochka: medium-sized, slim athletic build, semi-long soft double coat in warm LIVER CHOCOLATE BROWN (never black), classic collie markings — a narrow white blaze running up the muzzle between the eyes, white muzzle and chin, a wide white ruff on the chest, white front legs and paws, brown mask over both eyes and cheeks, brown semi-erect ears folded at the tips, light amber-hazel eyes, brown liver nose and eye rims, feathered brown tail. This is a REAL dog and always the SAME dog: keep her markings and proportions identical in every frame, do not restyle her into a black-and-white collie, do not make her a puppy or a cartoon. NO COLLAR, no harness, no leash, no tag, no dog toys or bowls in the frame. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": true,
      "items": [
        "bag-crystal",
        "bag-frill",
        "bag-frill-yellow",
        "cap-fangs",
        "cardholder-nanava",
        "dress-tiedye",
        "earrings-cameo",
        "hoodie-horns",
        "mask-denim",
        "mockneck-dark-rider",
        "scarf-knight",
        "tote-ghost"
      ],
      "kind": "dog",
      "face": "img/models/bulochka/face.webp",
      "sheetSrc": "refs/models/bulochka/character-sheet.png"
    },
    {
      "name": "anya",
      "ru": "Аня",
      "gender": "f",
      "height": null,
      "build": "худощавое, узкие плечи, тонкие руки",
      "note": "Реальная Аня, фото от 27.08 (зонт + кухня). Постоянная деталь — маленькие золотые кольца в обоих ушах, в каждом кадре. Канон: натуральные кудри до плеч, не выпрямлять. Рост и телосложение — уточнить у Алексея.",
      "desc": "young woman, shoulder-length natural curly light chestnut-brown hair (soft ringlets, shorter layered curls at the crown and around the face, high forehead), light grey-green eyes, straight medium-thin brows, long narrow face with a defined jaw and a slightly pointed chin, straight nose with a rounded tip, medium lips with a defined cupid's bow, pale fair skin, very feminine adult face, professional editorial makeup: even skin tone, sculpted cheekbones, defined brows, mascara, shaped lips; small gold hoop earrings in both ears, slim build with narrow shoulders and thin arms",
      "sheetStatus": "candidate",
      "sheet": "img/models/anya/sheet.webp",
      "photos": [
        {
          "file": "face-photo-crop.jpg",
          "url": "img/models/anya/photo-01.webp"
        },
        {
          "file": "photo-01-umbrella.jpg",
          "url": "img/models/anya/photo-02.webp"
        },
        {
          "file": "photo-02-kitchen.jpg",
          "url": "img/models/anya/photo-03.webp"
        }
      ],
      "refs": [
        "face-photo-crop.jpg",
        "photo-01-umbrella.jpg"
      ],
      "prompt": "Character reference sheet of the EXACT same person as in the reference photo(s): young woman, shoulder-length natural curly light chestnut-brown hair (soft ringlets, shorter layered curls at the crown and around the face, high forehead), light grey-green eyes, straight medium-thin brows, long narrow face with a defined jaw and a slightly pointed chin, straight nose with a rounded tip, medium lips with a defined cupid's bow, pale fair skin, very feminine adult face, professional editorial makeup: even skin tone, sculpted cheekbones, defined brows, mascara, shaped lips; small gold hoop earrings in both ears, slim build with narrow shoulders and thin arms. The references are candid phone photos in flat daylight: reconstruct the SAME real person faithfully in clean studio light, do not idealize or invent a different face; keep the natural curl pattern of the hair and the gold hoops in every view. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): young woman, shoulder-length natural curly light chestnut-brown hair (soft ringlets, shorter layered curls at the crown and around the face, high forehead), light grey-green eyes, straight medium-thin brows, long narrow face with a defined jaw and a slightly pointed chin, straight nose with a rounded tip, medium lips with a defined cupid's bow, pale fair skin, very feminine adult face, professional editorial makeup: even skin tone, sculpted cheekbones, defined brows, mascara, shaped lips; small gold hoop earrings in both ears, slim build with narrow shoulders and thin arms. The references are candid phone photos in flat daylight: reconstruct the SAME real person faithfully in clean studio light, do not idealize or invent a different face; keep the natural curl pattern of the hair and the gold hoops in every view. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": false,
      "items": [
        "bag-frill",
        "bag-frill-yellow",
        "bag-nanava",
        "belt-holster",
        "cardholder-nanava",
        "dress-tiedye",
        "earcuff-crystal",
        "longsleeve-rider",
        "longsleeve-sketch",
        "mockneck-dark-rider",
        "shirt-fangs",
        "skirt-lace",
        "sweater-rider",
        "tee-star",
        "tote-kitten",
        "towel-rider",
        "vest-crown"
      ],
      "kind": "person",
      "face": "img/models/anya/face.webp",
      "sheetSrc": "refs/models/anya/character-sheet-candidate.jpg"
    }
  ],
  "items": [
    {
      "id": "tee-star",
      "title": "Star Oversized T-Shirt",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/p01.webp",
          "label": "p01",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/tee-star/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/tee-star/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tee-star/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tee-star/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tee-star/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tee-star/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "longsleeve-rider",
      "title": "Rider Layered Longsleeve",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/p02.webp",
          "label": "p02",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/longsleeve-rider/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/longsleeve-rider/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-rider/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-rider/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-rider/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-rider/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "longsleeve-sketch",
      "title": "Sketch Longsleeve Cream",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/p03.webp",
          "label": "p03",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/longsleeve-sketch/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/longsleeve-sketch/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-sketch/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-sketch/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-sketch/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-sketch/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "vest-crown",
      "title": "Crown Wool Vest",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/p04.webp",
          "label": "p04",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/vest-crown/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/vest-crown/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/vest-crown/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/vest-crown/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/vest-crown/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/vest-crown/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "sweater-rider",
      "title": "Rider Sweater Red",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/p05.webp",
          "label": "p05",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/sweater-rider/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/sweater-rider/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/sweater-rider/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/sweater-rider/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/sweater-rider/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/sweater-rider/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "dress-tiedye",
      "title": "Tie-Dye Chiffon Dress",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/p06.webp",
          "label": "p06",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/dress-tiedye/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/dress-tiedye/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-tiedye/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-tiedye/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-tiedye/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-tiedye/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f7",
      "refsCustom": false
    },
    {
      "id": "mockneck-dark-rider",
      "title": "Dark Rider Satin Mockneck",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/p07.webp",
          "label": "p07",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/mockneck-dark-rider/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/mockneck-dark-rider/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/mockneck-dark-rider/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/mockneck-dark-rider/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/mockneck-dark-rider/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/mockneck-dark-rider/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f7",
      "refsCustom": false
    },
    {
      "id": "hoodie-horns",
      "title": "Horns Hoodie Grey",
      "category": "clothes",
      "model": "lesha",
      "frames": [
        {
          "path": "img/p08.webp",
          "label": "p08",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/hoodie-horns/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/hoodie-horns/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/hoodie-horns/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/hoodie-horns/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/hoodie-horns/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/hoodie-horns/process.webp",
          "label": "process",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f7",
      "refsCustom": false
    },
    {
      "id": "skirt-lace",
      "title": "Satin Lace Skirt",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/skirt-lace/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/skirt-lace/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/skirt-lace/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/skirt-lace/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/skirt-lace/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/skirt-lace/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/skirt-lace/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "tee-riders",
      "title": "Riders Oversized T-Shirt",
      "category": "clothes",
      "model": "nikita",
      "frames": [
        {
          "path": "img/p10.webp",
          "label": "p10",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/tee-riders/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/tee-riders/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tee-riders/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tee-riders/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tee-riders/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "shirt-fangs",
      "title": "Fangs Shirt Pink",
      "category": "clothes",
      "model": "anya",
      "frames": [
        {
          "path": "img/p11.webp",
          "label": "p11",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/shirt-fangs/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/shirt-fangs/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/shirt-fangs/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/shirt-fangs/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/shirt-fangs/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/shirt-fangs/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "towel-rider",
      "title": "Rider Towel",
      "category": "objects",
      "model": "anya",
      "frames": [
        {
          "path": "img/p12.webp",
          "label": "p12",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/towel-rider/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/towel-rider/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/towel-rider/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/towel-rider/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/towel-rider/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/towel-rider/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "bag-nanava",
      "title": "NANAVA Faces Bag",
      "category": "bags",
      "model": "anya",
      "frames": [
        {
          "path": "img/bag-nanava/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-nanava/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-nanava/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-nanava/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-nanava/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-nanava/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-nanava/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "jacket-knight",
      "title": "Knight Knit Jacket",
      "category": "clothes",
      "model": "lesha",
      "frames": [
        {
          "path": "img/p14.webp",
          "label": "p14",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/jacket-knight/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/jacket-knight/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/jacket-knight/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/jacket-knight/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/jacket-knight/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "dress-feather",
      "title": "Watch-Strap Feather Dress",
      "category": "clothes",
      "model": "katya",
      "frames": [
        {
          "path": "img/p19.webp",
          "label": "p19",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/dress-feather/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/dress-feather/m2.webp",
          "label": "m2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-feather/m3.webp",
          "label": "m3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-feather/m4.webp",
          "label": "m4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-feather/m5.webp",
          "label": "m5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-feather/m6.webp",
          "label": "m6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "longsleeve-smile",
      "title": "Belarusian Smile Longsleeve",
      "category": "clothes",
      "model": "nikita",
      "frames": [
        {
          "path": "img/longsleeve-smile/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/longsleeve-smile/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/longsleeve-smile/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-smile/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-smile/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/longsleeve-smile/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "skirt-dipdye",
      "title": "Dip-Dye Petal Skirt",
      "category": "clothes",
      "model": "lina",
      "frames": [
        {
          "path": "img/skirt-dipdye/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/skirt-dipdye/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/skirt-dipdye/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/skirt-dipdye/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/skirt-dipdye/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/skirt-dipdye/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/skirt-dipdye/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "cardholder-nanava",
      "title": "NANAVA Cardholder",
      "category": "accessories",
      "model": "anya",
      "frames": [
        {
          "path": "img/p15.webp",
          "label": "p15",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/cardholder-nanava/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/cardholder-nanava/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/cardholder-nanava/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/cardholder-nanava/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/cardholder-nanava/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/cardholder-nanava/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f7",
      "refsCustom": false
    },
    {
      "id": "tote-kitten",
      "title": "Kitten Mesh Tote",
      "category": "bags",
      "model": "anya",
      "frames": [
        {
          "path": "img/p16.webp",
          "label": "p16",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/tote-kitten/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/tote-kitten/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tote-kitten/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tote-kitten/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tote-kitten/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tote-kitten/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "bag-frill",
      "title": "Frill Patent Bag",
      "category": "bags",
      "model": "anya",
      "frames": [
        {
          "path": "img/p17.webp",
          "label": "p17",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-frill/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-frill/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-frill/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-frill/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-frill/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-frill/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f7",
      "refsCustom": false
    },
    {
      "id": "bag-frill-yellow",
      "title": "Frill Patent Bag Yellow",
      "category": "bags",
      "model": "anya",
      "frames": [
        {
          "path": "img/bag-frill-yellow/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-frill-yellow/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-frill-yellow/f1.webp",
          "label": "f1",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-frill-yellow/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-frill-yellow/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-frill-yellow/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-frill-yellow/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f7",
      "refsCustom": false
    },
    {
      "id": "bag-crystal",
      "title": "Crystal Arch Bag",
      "category": "bags",
      "model": "nikita",
      "frames": [
        {
          "path": "img/bag-crystal/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-crystal/f1.webp",
          "label": "f1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-crystal/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-crystal/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-crystal/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-crystal/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-crystal/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f7",
      "refsCustom": false
    },
    {
      "id": "bag-crown",
      "title": "Crown Engraved Bag",
      "category": "bags",
      "model": "",
      "frames": [
        {
          "path": "img/p21.webp",
          "label": "p21",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-crown/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/bag-crown/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-crown/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-crown/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/bag-crown/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "earcuff-crystal",
      "title": "Crystal Ear Cuff",
      "category": "accessories",
      "model": "anya",
      "frames": [
        {
          "path": "img/p18.webp",
          "label": "p18",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/earcuff-crystal/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/earcuff-crystal/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/earcuff-crystal/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/earcuff-crystal/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/earcuff-crystal/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/earcuff-crystal/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "cap-fangs",
      "title": "Fangs Denim Cap",
      "category": "accessories",
      "model": "katya",
      "frames": [
        {
          "path": "img/cap-fangs/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/cap-fangs/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/cap-fangs/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f4",
      "refsCustom": false
    },
    {
      "id": "earcuff-spine",
      "title": "Spine Ear Cuff",
      "category": "accessories",
      "model": "katya",
      "frames": [
        {
          "path": "img/earcuff-spine/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/p23.webp",
          "label": "p23",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/earcuff-spine/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/earcuff-spine/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/earcuff-spine/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "earrings-cameo",
      "title": "Bone Cameo Drop Earrings",
      "category": "accessories",
      "model": "katya",
      "frames": [
        {
          "path": "img/p22.webp",
          "label": "p22",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/earrings-cameo/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/earrings-cameo/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f4",
      "refsCustom": false
    },
    {
      "id": "belt-holster",
      "title": "Holster Velvet Belt",
      "category": "accessories",
      "model": "anya",
      "frames": [
        {
          "path": "img/p25.webp",
          "label": "p25",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/belt-holster/m1.webp",
          "label": "m1",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/belt-holster/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/belt-holster/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "scarf-organza",
      "title": "Layered Organza Scarf",
      "category": "accessories",
      "model": "katya",
      "frames": [
        {
          "path": "img/scarf-organza/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/scarf-organza/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/scarf-organza/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "mask-denim",
      "title": "Ripped Denim Cap Mask",
      "category": "accessories",
      "model": "pasha",
      "frames": [
        {
          "path": "img/mask-denim/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/mask-denim/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/mask-denim/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/mask-denim/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/mask-denim/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f6",
      "refsCustom": false
    },
    {
      "id": "tote-ghost",
      "title": "Ghost Patent Tote",
      "category": "bags",
      "model": "lina",
      "frames": [
        {
          "path": "img/tote-ghost/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/tote-ghost/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/tote-ghost/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tote-ghost/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tote-ghost/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/tote-ghost/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f7",
      "refsCustom": false
    },
    {
      "id": "sweater-shadow",
      "title": "Shadow Turtleneck Grey",
      "category": "clothes",
      "model": "nikita",
      "frames": [
        {
          "path": "img/sweater-shadow/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/sweater-shadow/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/sweater-shadow/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/sweater-shadow/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/sweater-shadow/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/sweater-shadow/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "scarf-knight",
      "title": "Knight Twill Silk Scarf",
      "category": "accessories",
      "model": "alya",
      "frames": [
        {
          "path": "img/scarf-knight/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/scarf-knight/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/scarf-knight/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "f4",
      "refsCustom": false
    },
    {
      "id": "top-organza",
      "title": "Layered Organza Top Grey",
      "category": "clothes",
      "model": "alya",
      "frames": [
        {
          "path": "img/top-organza/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/top-organza/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/top-organza/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/top-organza/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/top-organza/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/top-organza/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    },
    {
      "id": "dress-moon",
      "title": "Moon Organza Gown",
      "category": "clothes",
      "model": "alya",
      "frames": [
        {
          "path": "img/dress-moon/main.webp",
          "label": "main",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/dress-moon/f2.webp",
          "label": "f2",
          "exists": true,
          "ref": true
        },
        {
          "path": "img/dress-moon/f3.webp",
          "label": "f3",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-moon/f4.webp",
          "label": "f4",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-moon/f5.webp",
          "label": "f5",
          "exists": true,
          "ref": false
        },
        {
          "path": "img/dress-moon/f6.webp",
          "label": "f6",
          "exists": true,
          "ref": false
        }
      ],
      "dog": "",
      "refsCustom": false
    }
  ]
};
