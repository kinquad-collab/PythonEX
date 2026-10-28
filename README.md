# PythonEX

A Python course that runs as a static site on GitHub Pages. Each unit has a lesson page with
readable explanations, step-through traces, predict-then-reveal questions, exercises with
solutions, discussion prompts for live sessions, key terms, a sandbox that runs real Python in
the browser, and a downloadable PDF.

## Pages

| File | What it is |
|---|---|
| `index.html` | Course dashboard: units by stage, progress checkmarks (saved in each browser only) |
| `lesson.html?unit=u05` | One lesson. `?unit=all&print=1` prints the full course |
| `glossary.html` | Every key term, grouped by unit, with search and A–Z jump links |
| `sandbox.html` | Free-play Python editor (Pyodide: standard library, NumPy, pandas, scikit-learn). Ctrl+Enter runs code |
| `pdfs/` | Downloadable PDFs (one per unit, full course, glossary) |

## Repository layout

```
index.html  lesson.html  glossary.html  sandbox.html
css/style.css          shared styles, including print styles for PDFs
js/app.js              renders pages, copy/run buttons, demos, progress, sandbox
content/course.js      stages, sandbox starter code
content/uNN.js         one file per unit (lesson content, terms)
pdfs/                  generated PDFs (rebuild after editing content)
scripts/build-pdfs.js  prints the real pages to PDF with Playwright
```

## Units

| # | Unit | Status |
|---|---|---|
| 1 | Your First Python Program | Lesson |
| 2 | Data Types and Strings | Lesson |
| 3 | Boolean Logic and Truth Tables | Lesson |
| 4 | Conditionals: Making Decisions | Lesson |
| 5 | Loops: Repeating Work | Lesson |
| 6 | Functions | Lesson |
| 7 | Lists | Lesson |
| 8 | Tuples and Sets | Lesson |
| 9 | Dictionaries | Lesson |
| 10 | Libraries and Modules | Lesson |
| 11 | Errors and Exceptions | Lesson |
| 12 | Advanced Functions and Comprehensions | Lesson |
| 13 | Files, CSV, and JSON | Lesson |
| 14 | Classes and Objects | Lesson |
| 15 | The Standard Library Toolkit | Lesson |
| 16 | NumPy: Arrays and Fast Math | Lesson |
| 17 | pandas: Tables You Can Question | Lesson |
| 18 | Visualizing Data with matplotlib | Lesson |
| 19 | Machine Learning with scikit-learn | Lesson |
| 20 | PyTorch: Tensors, Gradients, and Neural Networks | Lesson (run in Colab) |
| 21 | Training a PyTorch Model | Lesson (run in Colab) |
| 22 | Capstone and Responsible Data Work | Lesson |
| 23 | Working Like a Python Developer | Reference lesson |

Stages on the dashboard: **Foundations** (units 1–15), **Data tools** (16–18), **Machine learning** (19–22),
and **Reference** (23, read before 19–21).

## Adding or editing a unit

Each unit is one `content/uNN.js` file that pushes an object onto `COURSE.units`. The `blocks`
array is rendered in order. Block types:

| `type` | Fields | Renders as |
|---|---|---|
| `h` / `h3` | `text` | Section heading |
| `p` | `html` | Paragraph |
| `ul` | `items` | Bulleted list |
| `code` | `code`, `caption`, `run` (set `false` to disable Run) | Code box with Copy and Run |
| `tip` / `warn` / `note` | `html` | Callout |
| `table` | `head`, `rows` | Table |
| `predict` | `items: [{code, a, why}]` | Predict-then-reveal cards |
| `trace` | `title`, `code`, `steps: [{line, vars, say}]` | Step-through trace (PDF: full table) |
| `truth` | `vars`, `cols: [{label, f}]` | Truth table with reveal |
| `exercise` | `title`, `prompt`, `hint`, `solution`, `runnable` | Exercise with a hidden solution |
| `discussion` | `prompts`, `facilitator` | Discussion prompts with instructor notes |

Also set `terms: [{t, d}]`. Those terms appear on the lesson page and in the glossary.

Code blocks are written as JavaScript template literals. Escape `${` as `\${` inside them.

## Rebuilding the PDFs

PDFs are generated from the real pages, so rebuild them after any content change:

```bash
npm install playwright
npx playwright install chromium
node scripts/build-pdfs.js
```

To use a Chromium binary you already have, set `CHROMIUM_PATH=/path/to/chromium`.

## Publishing on GitHub Pages

Settings → Pages → Build and deployment: Source "Deploy from a branch", then choose the branch
and the `/ (root)` folder. The `.nojekyll` file tells Pages to serve the files as they are.

## Sandbox notes

The sandbox loads Python 3.12 (Pyodide 0.26.4) from the jsDelivr CDN the first time someone
presses Run. The first run takes a few seconds. `input()` is not supported in the browser.
Standard-library modules work. NumPy and pandas load automatically when code imports them.
PyTorch and matplotlib plots do not run in the browser, so Units 18, 20, and 21 are marked to run in Colab or locally.
