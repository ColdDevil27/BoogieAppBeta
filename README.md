# MySSRI

A quick way to check whether a food, drink, medicine or supplement could be a problem while taking an SSRI.
Starting with **Lexapro (escitalopram)**.

> **MySSRI is not medical advice and is not reviewed by clinicians.** It is a reference built from public
> sources. Always confirm with a pharmacist or prescriber.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # data checks + search tests
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

It is a static, offline-capable web app (installable as a PWA). There is no backend and no account. Anything
saved (the "Save it for later" list) stays in the browser on that device.

## Design rules

These come from the design concept and should survive every change.

1. **Never show a green result for something we haven't reviewed.** Anything that doesn't match gets the
   dashed "Not checked yet" state.
2. **Only exact name or alias matches produce a verdict.** Fuzzy matches are shown as "Did you mean...?"
   suggestions, so a typo can't land on the wrong entry.
3. **Every entry is `draft` until a person has checked it against a source.** `verified` entries must list a
   source (enforced by `src/data/data.test.ts`). The UI labels drafts.
4. **Say when sources disagree.** Use the `note` field (see grapefruit and alcohol).
5. **Severity is never color alone.** Each state has its own label and icon, and they differ in lightness.

## How the data works

All content lives in JSON, so adding something never needs a new screen.

```
src/data/lexapro/
  medication.json   which medication we're checking against
  entries.json      one object per food/drink/medicine/supplement
  groups.json       classes of interaction with their own guide (e.g. serotonin syndrome)
```

An **entry** has a name, `aliases` (brands, generics, common phrasings), a `severity` (`avoid` | `caution` |
`low`), a headline and summary, warning signs, next steps, a `status` (`draft` | `verified`) and `sources`.
Add one, run `npm test`, and it appears on the home screen and in search.

A **group** powers a guide screen listing many items at once. An item can link to a full entry with `entryId`.

Lookup is in `src/lib/search.ts`; it is covered by `src/lib/search.test.ts`.

## Roadmap

- [ ] Verify each draft entry against a primary source (FDA label, MedlinePlus, NIH supplement database) and
      mark it `verified`.
- [ ] Alcohol, tramadol and friends: add the rest of the common cases (naproxen, DXM, triptans, melatonin...).
- [ ] Ingredient-based lookup: scan or type a product, resolve its active ingredients, then check those
      against group rules. This is how the list scales without writing a screen per product.
- [ ] Brand/generic alias import from a public drug-name source.
- [ ] More medications (sertraline, fluoxetine, ...) as sibling folders under `src/data/`.
- [ ] Real PNG app icons (192 and 512) for reliable "Add to Home Screen".
- [ ] "My list": saved searches and a printable question sheet for a pharmacist.
