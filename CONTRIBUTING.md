# Contributing to Open Agency

Thanks for stopping by. This is a small educational project — the bar for
contribution is intentionally low. If you can spot something wrong, unclear,
or missing, you can fix it.

## What we want

1. **Better writing.** Shorter, clearer, more specific. If a paragraph can be
   cut without losing meaning, cut it.
2. **Verified case studies.** A cited example of AI harm — to ordinary users,
   creators, voters, journalists — that we don't yet cover. Link a primary
   source (paper, court filing, reputable reporting), not a Twitter thread.
3. **Accurate references.** Broken links, outdated stats, or a stronger
   primary source for an existing claim.
4. **Simulator improvements.** The Agency Simulator (`assets/js/simulator.js`)
   is intentionally minimal. Good extensions: a before/after slider, a "what a
   human sees vs what a scraper sees" overlay, an audio mode.
5. **Bug fixes and polish.** Layout glitches, accessibility issues, typos.

## How to contribute

1. Fork the repo.
2. Branch with a descriptive name: `git checkout -b clarify-c2pa-soft-bindings`.
3. Edit. Open `index.html` (or the page under `tools/`) directly in a browser,
   or run a static server (see README) for live previews.
4. Commit with a clear message: `git commit -m "clarify C2PA soft bindings paragraph"`.
5. Push and open a Pull Request. Reference any relevant issue.

For larger changes — a new section, a redesign, a new tool page — open an
issue first so we can talk through scope before you spend time on it.

## Style rules for writing

- **Plain English first.** If you use a technical term ("latent diffusion",
  "perturbation budget"), explain it in the same sentence.
- **Link primary sources.** Papers, press releases, court filings, official
  documents. Add a numbered entry to the Bibliography in `index.html` and
  reference it inline with `<sup class="ref"><a href="#ref-N">[N]</a></sup>`.
- **Avoid hedges.** Prefer "happens" over "may happen." Caveats go in a
  clearly-marked paragraph, not sprinkled through the prose.
- **British English.** The rest of the site uses it ("realise", "honour",
  "labelling"). Match.
- **18px body minimum.** Don't shrink it.

## Style rules for code

- No framework, no build step, no bundler. If your feature genuinely needs
  one, open an issue first.
- CSS: add new tokens to the `:root` block in `assets/css/main.css` rather
  than hard-coding values.
- JS: vanilla, no dependencies. `const` and `let`, never `var`.
- Every interactive element must be keyboard-navigable and have a visible
  focus state.
- Respect `prefers-reduced-motion` for any animation you add.
- Keep the index page under the 500 KB performance budget.

## Good first issues

Look for the `good-first-issue` label on GitHub. Typical examples:

- Fix a typo or unclear sentence.
- Add or update a Bibliography reference.
- Improve alt text on an image or SVG.
- Add a small extension to the Agency Simulator.

## Code of conduct

Be kind. Assume good faith. We will remove contributors who don't.

## License

By contributing, you agree your contributions will be licensed under
CC-BY-SA 4.0 (content) or MIT (code), matching the rest of the project.
