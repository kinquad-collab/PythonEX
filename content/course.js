/* PythonEX — course registry.
 * Each unit file (content/uNN.js) pushes one unit object onto COURSE.units.
 * status: 'ready' (full lesson) or 'planned' (outline only).
 */
window.COURSE = {
  units: [],
  stages: [
    {
      id: 's1',
      title: 'Stage 1 — Python Foundations',
      blurb: 'Syntax, data types, decisions, repetition, and reusable code. Everything after this depends on it.'
    },
    {
      id: 's2',
      title: 'Stage 2 — Data Tools',
      blurb: 'NumPy for fast arrays and math, pandas for tables. Outlined; full lessons are in development.'
    },
    {
      id: 's3',
      title: 'Stage 3 — Machine Learning',
      blurb: 'PyTorch and the machine-learning workflow. Outlined; full lessons are in development.'
    }
  ],
  sandboxStarter:
    '# Try anything here. Press Run (or Ctrl+Enter).\n' +
    'name = "PythonEX"\n' +
    'count = 3\n' +
    'print("Welcome to", name)\n' +
    'for i in range(count):\n' +
    '    print("Round", i + 1)\n'
};
