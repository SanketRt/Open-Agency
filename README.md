# Open Agency — A Layman's Guide to Digital Consent

> Responsible AI asks for consent.

An open educational resource explaining AI scraping, provenance (C2PA), and
adversarial defences (Glaze, Nightshade) in plain English — so non-technical
creators can understand and exercise their right to consent online.

Built as a course project in Responsible AI. Live site: _(add GitHub Pages URL here)_

---

## Tech stack

- **HTML5 + CSS + vanilla JS.** No framework. No build step. No bundler.
- **Self-hosted or system font + one Google Font** (Fraunces). System-UI stack for body.
- **No tracking. No analytics. No third-party scripts** except the font CSS.
- **Deployed on GitHub Pages.**

If you can write HTML, you can contribute.

## Local development

```bash
git clone https://github.com/SanketRt/open-agency
cd open-agency
```

For live-reload, any static server works:

```bash
python3 -m http.server 8080

npx serve .
```

Then visit `http://localhost:8080`.

## Folder structure

```
.
├── index.html                 Main single-page narrative
├── tools/
│   ├── c2pa.html              Deep dive: C2PA Content Credentials
│   ├── glaze.html             Deep dive: Glaze (SAND Lab)
│   └── nightshade.html        Deep dive: Nightshade (SAND Lab)
├── survey/                    Raw survey data, methodology, results page
├── assets/
│   ├── css/main.css           All styles (one file — intentional)
│   ├── js/
│   │   ├── main.js            Nav, hero animation, scroll reveals
│   │   └── simulator.js       The Agency Simulator (client-side)
│   └── img/
├── CONTRIBUTING.md
├── LICENSE.txt
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
creator-side defences, grounded in the Indian context.

We **are not**:

- A legal resource. We point to laws; we don't interpret them for your case.
- A news tracker. We cite specific incidents as illustration, not a running log.
- A host of models, datasets, or poisoned/glazed assets.
- Taking a position on whether generative AI should exist. We take a position
  that consent should be opt-in, informed, and revocable.

## License

- **Content:** [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Code:** [MIT](LICENSE.txt)

Attribution, not permission, is the default.

## Credits

Project for _Special Topics in AI_ (COL864), _IIT Delhi_.
Supervisor: _Prof. Vijay Keswani_.
Primary sources and citations listed at the bottom of each page.
