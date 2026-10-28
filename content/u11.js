COURSE.units.push({
  id: 'u11', num: 11, stage: 's1', status: 'planned', minutes: '60 min (planned)',
  title: 'Errors and Exceptions',
  summary: 'Read tracebacks, handle failures with try/except, and raise your own errors.',
  objectives: [
    'Read a traceback and identify the line and the exception type',
    'Use <code>try</code> / <code>except</code> to recover from expected failures',
    'Raise an exception with <code>raise</code> when input is invalid'
  ],
  blocks: [
    { type: 'note', html: 'This unit is outlined. The full lesson, demonstrations, and exercises are being written.' },
    { type: 'h', text: 'Planned coverage' },
    { type: 'ul', items: [
      'Tracebacks: reading the call stack from the bottom up',
      'Common exceptions: <code>ValueError</code>, <code>TypeError</code>, <code>KeyError</code>, <code>IndexError</code>, <code>ZeroDivisionError</code>',
      '<code>try</code>, <code>except</code>, <code>else</code>, <code>finally</code>',
      'Catching specific exceptions instead of everything',
      '<code>raise</code> to signal bad input from your own functions',
      'Reading and writing files safely with <code>with open(...)</code>'
    ] }
  ],
  terms: []
});
