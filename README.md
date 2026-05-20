# TCS NQT Mock Interface

Frontend-only mock exam app with a **test dashboard** and consolidated Markdown per subject.

## Data files (single file per subject)

| Subject | File |
|---------|------|
| Quant | `src/data/quant.md` |
| Programming | `src/data/programming.md` |
| Verbal | `src/data/verbal.md` |

Each file contains multiple tests separated by `--- TEST 1 ---`, `--- TEST 2 ---`, etc. Questions and answers share the same `### Q1`, `### Q2` headers within each test block.

## Registry

`src/data/testIndex.js` imports the three files with `?raw`, runs `parseSubjectMarkdown()`, and exports a flat `tests` array (e.g. `quant-test-1` → **Quant - Test 1**).

## Quick start

```bash
npm install
npm run dev
```

## Adding content

Edit the relevant `src/data/*.md` file. Use `- [FUB]` for fill-in questions; otherwise use `- [ ]` MCQ options. Match each question block with an answer block using the same `### Qn` id.
