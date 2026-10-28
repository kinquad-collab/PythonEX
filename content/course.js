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
      blurb: 'Syntax, data types, decisions, repetition, functions, exceptions, files, classes, and the standard library. Everything after this depends on it.'
    },
    {
      id: 's2',
      title: 'Stage 2 — Data Tools',
      blurb: 'NumPy for fast arrays and math, pandas for tables, and matplotlib for charts.'
    },
    {
      id: 's3',
      title: 'Stage 3 — Machine Learning',
      blurb: 'scikit-learn for classic models, PyTorch for neural networks, and a capstone with responsible data practice.'
    },
    {
      id: 's4',
      title: 'Reference — Working Like a Developer',
      blurb: 'Input, generators, testing, virtual environments, and notebooks. Read it before Units 19 to 21, and keep it for any project.'
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
