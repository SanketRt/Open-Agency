# Contributing to Open Agency

Thanks for stopping by. This is a small educational project — the bar for
contribution is intentionally low.

## What we want

1. **Better writing.** Shorter, clearer, more specific. If a paragraph can be
   cut without losing meaning, cut it.
2. **Translations.** Especially Indic-language translations — Hindi, Tamil,
   Bengali, Marathi, Kannada, Telugu first. Translations go in `/locales/<lang>/`.
3. **Verified regional cases.** If you have a cited example of AI harm in a
   jurisdiction we don't yet cover, add a card to `#problem`.
4. **Simulator improvements.** The Agency Simulator is intentionally minimal.
   Good first extensions: audio mode, a side-by-side before/after slider, a
   "what a human sees vs what a scraper sees" overlay.

## How to contribute

1. Fork the repo.
2. Branch: `git checkout -b improve-glaze-page` (descriptive names, please).
3. Edit. Open `index.html` in a browser to preview.
4. Commit with a clear message. `git commit -m "clarify C2PA soft bindings paragraph"`.
5. Push and open a Pull Request. Reference any relevant issue.

## Style rules for writing

- **18px body minimum.** Don't shrink it.
- **No jargon without a one-line unpack.** If you use "latent diffusion" you
  explain it in the same sentence.
- **Link primary sources.** Papers, press releases, court filings.
  Not Twitter threads.
- **Avoid "may," "could," "might."** Say what happens. Caveats go in a
  clearly-marked paragraph.
- **Use British-English consistently** (the rest of the site does). "Utilise"
  is not a synonym for "use"; prefer "use."

## Style rules for code

- No framework, no build step. If your feature needs React, open an issue
  first so we can discuss whether it belongs here.
- CSS: add new tokens to the `:root` block in `main.css`, don't hardcode.
- JS: vanilla, no dependencies. `const` and `let`, never `var`. No IIFEs for
  feature code — we have ES modules if we need isolation.
- All interactive elements must be keyboard-navigable and have a visible
  focus state.
- Respect `prefers-reduced-motion`.

## Good first issues

Look for the `good-first-issue` label on GitHub. Typical examples:

- Add a missing reference.
- Fix a typo or unclear sentence.
- Replace a placeholder survey number with a real one (once the survey closes).
- Translate one section into one Indian language.

## Code of conduct

Be kind. Assume good faith. We will remove contributors who don't.

## License

By contributing, you agree your contributions will be licensed under CC-BY-SA
4.0 (content) or MIT (code), matching the rest of the project.
