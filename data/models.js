// Данные страницы моделей (site/models.html). НЕ ПРАВИТЬ РУКАМИ:
// пересобирается из refs/models/registry.json + usage.json командой
//     python3 scripts/build_models.py
window.NNV_MODELS = {
  "generated": "2026-08-27 15:52",
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
        "dress-feather",
        "earcuff-spine",
        "earrings-cameo",
        "scarf-organza",
        "sweater-rider"
      ],
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
        "dress-tiedye",
        "tee-star"
      ],
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
        "shirt-fangs",
        "skirt-dipdye",
        "vest-crown"
      ],
      "sheetSrc": "refs/models/lina/character-sheet-candidate.jpg"
    },
    {
      "name": "nikita",
      "ru": "Никита",
      "gender": "m",
      "height": null,
      "build": "худощавое, узкие плечи, тонкие руки",
      "note": "Реальный Никита из команды.",
      "desc": "young man, fully shaved bald head (smooth, no stubble), very pale light skin, light grey-blue eyes, thin light eyebrows, narrow elongated face with high cheekbones and slightly hollow cheeks",
      "sheetStatus": "candidate",
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
      "prompt": "Character reference sheet of the EXACT same person as in the reference photo(s): young man, fully shaved bald head (smooth, no stubble), very pale light skin, light grey-blue eyes, thin light eyebrows, narrow elongated face with high cheekbones and slightly hollow cheeks. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptBase": "Character reference sheet of the EXACT same person as in the reference photo(s): young man, fully shaved bald head (smooth, no stubble), very pale light skin, light grey-blue eyes, thin light eyebrows, narrow elongated face with high cheekbones and slightly hollow cheeks. One horizontal row of FIVE studio head-and-shoulders views of this same person, left to right: (1) left profile, (2) left three-quarter view, (3) frontal view, (4) right three-quarter view, (5) right profile. EXACT same face shape, eyes, nose, mouth in every view; preserve facial identity; do not beautify, do not slim, keep natural skin texture. Neutral calm expression, plain dark crew-neck top, plain seamless background of colour #F1F1EF, soft even studio light, photorealistic photography, consistent head size and eye level across all five views. No text, no labels, no watermarks.",
      "promptCustom": false,
      "items": [
        "longsleeve-smile",
        "mask-denim",
        "tee-riders"
      ],
      "sheetSrc": "refs/models/nikita/character-sheet-candidate.jpg"
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
      "items": [],
      "sheetSrc": "refs/models/pasha/character-sheet-candidate.jpg"
    }
  ]
};
