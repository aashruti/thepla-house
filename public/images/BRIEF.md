# Adobe Firefly image brief — Thepla House

Generate each image in Firefly, **download as JPG**, and save it into the path shown
(filenames must match exactly). When files are in place, the matching line in
`data/images.ts` gets uncommented and the photo goes live (placeholder disappears).

## Firefly settings (apply to every prompt)
- **Content type:** Photo · **Model:** latest Firefly Image
- **Aspect ratio:** as noted per image (Square 1:1 unless stated)
- Append this **style suffix** to every prompt:

> *Photorealistic food photography, home-style Gujarati vegetarian food, brass or copper
> thali/plate on cream linen over a wooden board, warm natural side light, gentle steam,
> shallow depth of field, appetising, warm white balance, no text, no watermark, no logos.*

Keep it 100% vegetarian. No text/labels rendered in the image.

---

## 1) Dishes — Square 1:1 → `public/images/dishes/`

| Save as | Prompt (subject — then add the style suffix) |
|---|---|
| `methi-thepla.jpg` | A neat stack of methi (fenugreek) theplas on a brass plate with a small bowl of mango achar |
| `plain-thepla.jpg` | Folded plain whole-wheat theplas on a plate beside a cup of masala chai |
| `methi-garlic-thepla.jpg` | Close-up of fenugreek-and-garlic theplas, golden flecks, on a brass plate |
| `bajra-rotla.jpg` | Rustic pearl-millet bajra rotla topped with a pat of white butter |
| `palak-thepla.jpg` | Green spinach (palak) theplas stacked on a cloth napkin |
| `gujarati-thali.jpg` | Top-down full Gujarati thali on brass — many small katoris of dal, kadhi, shaak, rotli, rice and a sweet |
| `mini-thali.jpg` | A smaller brass thali — two sabzi, dal, rotli and rice |
| `jain-thali.jpg` | A Jain thali on brass, fresh and colourful, no onion or garlic, neatly arranged katoris |
| `vegan-thali.jpg` | A dairy-free Gujarati thali on brass, bright vegetables and dal |
| `khaman-dhokla.jpg` | Soft yellow khaman dhokla squares tempered with mustard seeds and curry leaves, coriander garnish |
| `khandvi.jpg` | Tightly rolled khandvi with coconut-coriander garnish on a plate |
| `patra.jpg` | Sliced patra spirals (colocasia leaf rolls), tempered, on a plate |
| `handvo.jpg` | Sliced savoury handvo with a crisp golden seeded crust on a wooden board |
| `sabudana-khichdi.jpg` | A bowl of sabudana khichdi with roasted peanuts and a wedge of lemon |
| `mohanthal.jpg` | Diamond-cut mohanthal fudge dusted with slivered pistachio on a plate |
| `sukhdi.jpg` | Squares of sukhdi (whole-wheat & jaggery) stacked on parchment |
| `basundi.jpg` | A bowl of basundi (reduced sweetened milk) topped with chopped nuts |
| `shrikhand.jpg` | A bowl of saffron shrikhand with saffron strands on top |
| `undhiyu.jpg` | An earthen pot of undhiyu with mixed winter vegetables |
| `aamras.jpg` | A bowl of golden Alphonso aamras served with puris |
| `ponkh-vada.jpg` | A plate of crisp green ponkh (fresh jowar) vada |

## 2) Marketing / page heroes → `public/images/marketing/`

| Save as | Aspect | Prompt |
|---|---|---|
| `home-hero.jpg` | **4:3** | A generous home-style Gujarati spread on a large brass thali — methi thepla, dal, sabzi and achar, hero plating, steam rising |
| `founder-tejal.jpg` | **4:5** (portrait) | A warm Indian woman chef in her home kitchen rolling fresh theplas on a wooden board, hands in frame, flour dusting, candid |
| `travel-pack.jpg` | **4:3** | Vacuum-sealed methi thepla travel packs neatly stacked on a wooden surface, clean studio light (leave label area blank — no text) |
| `catering.jpg` | **4:3** | A long table of large brass catering platters of thali items, sweets and farsan laid out for an event |
| `franchise.jpg` | **4:3** | A bright, welcoming Indian vegetarian outlet counter / cloud-kitchen interior, warm wood and brass accents (no text on signage) |
| `kitchen-interior.jpg` | **4:3** | A busy clean cloud kitchen with tavas on the stove and fresh dough being rolled, warm light |
| `rolling-hands.jpg` | **1:1** | Close-up of hands rolling a thepla with a rolling pin on a floured wooden board |

## 3) Blog covers — 16:9 (landscape) → `public/images/blog/`

(The thali-guide, Jain and undhiyu posts reuse dish photos automatically — no new files needed.)

| Save as | Prompt |
|---|---|
| `maida-atta.jpg` | Whole-wheat atta in a bowl with a rolling pin and a few fresh theplas on a wooden board, warm light |
| `freshness-pack.jpg` | A vacuum-sealed methi thepla pack beside a stack of fresh theplas, clean surface |
| `sunflower-oil.jpg` | A bottle of sunflower oil beside fresh vegetables and atta on a kitchen counter |
| `leftovers.jpg` | Thepla rolls and a quick thepla chaat made from leftovers, plated casually |

---

### After you download
Tell me which files are in place (or "all done") and I'll uncomment the matching lines in
`data/images.ts`, then rebuild. You can do this in batches — partial sets are fine; only the
images you've added will switch from placeholder to photo.
