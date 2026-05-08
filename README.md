# Open Agency — A Layman's Guide to Digital Consent

> Responsible AI asks for consent.

An open educational resource explaining AI scraping, provenance (C2PA), and
adversarial defences (Glaze, Nightshade) in plain English — so non-technical
creators can understand and exercise their right to consent online.

A companion **technical handbook** ([assets/Handbook.pdf](assets/Handbook.pdf))
covers the underlying mathematics — perturbation objectives, poisoning dynamics,
and the cryptographic provenance chain — for readers who want the equations.

Built as a course project for *Responsible AI* (COL864), IIT Delhi.
Live site: https://sanketrt.github.io/Open-Agency

---

## Tech stack

- **HTML5 + CSS + vanilla JS.** No framework, no build step, no bundler.
- **One Google Font** (Fraunces) for headlines; system-UI stack for body.
- **No tracking, no analytics, no third-party scripts** beyond the font CSS.
- **Deployed on GitHub Pages** via the workflow in `.github/`.

If you can write HTML, you can contribute.

## Local development

```bash
git clone https://github.com/SanketRt/Open-Agency
cd Open-Agency
```

Any static server works:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then visit `http://localhost:8080`.

## Folder structure

```
.
├── index.html              # main page
├── tools/
│   ├── c2pa.html           # deep dive: provenance
│   ├── glaze.html          # deep dive: defensive cloak
│   └── nightshade.html     # deep dive: offensive poison
├── assets/
│   ├── Handbook.pdf        # technical companion (mathematics deep-dive)
│   ├── css/main.css        # all styles, design tokens at :root
│   └── js/
│       ├── main.js         # nav, reveal animations, hero dissolve
│       └── simulator.js    # the Agency Simulator (Canvas-only, local)
├── media/                  # SVGs and other static media
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Design principles

1. **Plain-English.** If a sentence needs a glossary, rewrite the sentence.
2. **Specific, not alarmist.** Link named cases. Avoid outrage blogs.
3. **Editorial, not SaaS.** Serif headlines. Paper-and-ink palette. No AI purple.
4. **Accessible by default.** WCAG AA for all colour pairs, keyboard-navigable,
   `prefers-reduced-motion` honoured, alt text on every image.
5. **Performance budget.** Index page under 500 KB. Lighthouse 95+ target.

## Scope

We **are** a plain-English synthesis of existing work on AI, consent, and
creator-side defences, with one section grounded in the Indian regulatory context.

We **are not**:

- A legal resource. We point to laws; we don't interpret them for your case.
- A news tracker. We cite specific incidents as illustration, not a running log.
- A host of models, datasets, or poisoned/glazed assets.
- Taking a position on whether generative AI should exist. We take a position
  that consent should be opt-in, informed, and revocable.

## License

- **Content:** [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Code:** [MIT](LICENSE)

Attribution, not permission, is the default.

## Credits

Project for *Responsible AI* (COL864), IIT Delhi.
Primary sources and citations are listed in the Bibliography section of the site.
