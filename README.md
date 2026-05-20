# TCS NQT Mock Interface

Frontend-only mock exam app built with React and Vite. Questions load from `src/questions.md` via Vite's raw import — no backend required.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Features

- Markdown question parser (`src/parser.js`)
- Exam state persisted in `localStorage` (refresh-safe)
- CBT-style layout: header, question panel, palette sidebar, action bar
- 60-minute countdown timer (configurable default in `useExamPersistence.js`)

## Adding questions

Edit `src/questions.md` using this format:

```md
### Q: Your question text here?
- [ ] Option A
- [x] Correct option
- [ ] Option C
```

Mark the correct option with `[x]`.

## Reset progress

Use **Start New Attempt** in the score modal, or clear `localStorage` key `tcs-nqt-mock-exam` in DevTools.
