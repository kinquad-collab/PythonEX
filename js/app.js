/* PythonEX — shared app logic
 * Renders the dashboard, lesson pages, glossary, and sandbox from window.COURSE
 * (defined in content/*.js). Runs Python in the browser with Pyodide.
 */
(function () {
  'use strict';

  var PYODIDE_VERSION = '0.26.4';
  var PYODIDE_BASE = 'https://cdn.jsdelivr.net/pyodide/v' + PYODIDE_VERSION + '/full/';
  var PROGRESS_KEY = 'pythonex-progress';
  var PARAMS = new URLSearchParams(location.search);
  var PRINT = PARAMS.get('print') === '1';
  var uidCounter = 0;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function uid() { uidCounter += 1; return 'x' + uidCounter; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function courseUnits() { return (window.COURSE && COURSE.units) || []; }
  function unitById(id) {
    return courseUnits().filter(function (u) { return u.id === id; })[0];
  }

  /* ---------- progress (per viewer, localStorage) ---------- */
  function getProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
  }
  function setDone(id, done) {
    var p = getProgress();
    p[id] = !!done;
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) { /* private mode: ignore */ }
  }

  /* ---------- Python runtime (Pyodide) ---------- */
  var pyPromise = null;
  function loadPython() {
    if (!pyPromise) {
      pyPromise = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = PYODIDE_BASE + 'pyodide.js';
        s.onload = function () {
          /* global loadPyodide */
          loadPyodide({ indexURL: PYODIDE_BASE }).then(resolve, reject);
        };
        s.onerror = function () { reject(new Error('Could not load the Python runtime from the CDN.')); };
        document.head.appendChild(s);
      });
      pyPromise.catch(function () { pyPromise = null; });
    }
    return pyPromise;
  }

  /* Runs code in a fresh namespace. Resolves with the captured output text. */
  function runCode(code) {
    return loadPython().then(function (py) {
      var lines = [];
      py.setStdout({ batched: function (s) { lines.push(s); } });
      py.setStderr({ batched: function (s) { lines.push(s); } });
      return py.loadPackagesFromImports(code).then(function () {
        var ns = py.globals.get('dict')();
        return py.runPythonAsync(code, { globals: ns });
      }).then(function () {
        return { ok: true, text: lines.join('\n') || '(program ran with no output)' };
      }, function (err) {
        var msg = (err && err.message) ? err.message : String(err);
        var all = msg.trim().split('\n');
        // Keep only the frames from the student's code; drop Pyodide's internal frames.
        var start = all.findIndex(function (l) { return l.indexOf('File "<exec>"') !== -1; });
        var shown = start === -1 ? all.slice(-6) : all.slice(start);
        return { ok: false, text: (lines.length ? lines.join('\n') + '\n' : '') + shown.join('\n') };
      });
    });
  }

  /* ---------- clipboard ---------- */
  function copyText(text, btn) {
    function done(ok) {
      var old = btn.textContent;
      btn.textContent = ok ? 'Copied!' : 'Copy failed';
      setTimeout(function () { btn.textContent = old; }, 1400);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else {
      fallback();
    }
  }

  /* ---------- block renderers (lesson content) ---------- */
  function codeBlock(b) {
    var runnable = b.run !== false;
    var cap = b.caption || 'Python';
    return '<div class="codeblock">' +
      '<div class="cb-bar"><span class="cap">' + esc(cap) + '</span>' +
      '<button type="button" data-copy>Copy</button>' +
      (runnable && !PRINT ? '<button type="button" data-run>Run ▶</button>' : '') +
      '</div>' +
      '<pre><code>' + esc(b.code) + '</code></pre>' +
      '<pre class="cb-out" hidden></pre>' +
      '</div>';
  }

  function predictBlock(b) {
    var items = b.items.map(function (it) {
      return '<div class="predict">' +
        '<pre>' + esc(it.code) + '</pre>' +
        (PRINT ? '' : '<button type="button" class="btn ghost small-btn" data-reveal>Reveal answer</button>') +
        '<div class="reveal"' + (PRINT ? '' : ' hidden') + '>Answer: <code>' + esc(it.a) + '</code>' +
        (it.why ? '<br><span class="small">' + it.why + '</span>' : '') + '</div>' +
        '</div>';
    }).join('');
    return '<div class="demo"><div class="demo-title">Predict the output <span class="badge">Think first</span></div>' +
      (b.intro ? '<p class="small muted">' + b.intro + '</p>' : '') + items + '</div>';
  }

  /* Print version: every step written out as a table, since PDFs cannot step. */
  function traceStaticBlock(b) {
    var out = [];
    var rows = b.steps.map(function (s, i) {
      if (s.say) out.push(s.say);
      var vars = Object.keys(s.vars || {}).map(function (k) { return k + ' = ' + s.vars[k]; }).join(', ');
      return '<tr><td>' + (i + 1) + '</td><td>' + s.line + '</td><td><code>' + esc(vars || '—') + '</code></td>' +
        '<td><code>' + esc(out.join(' | ') || '—') + '</code></td></tr>';
    }).join('');
    return '<div class="demo"><div class="demo-title">' + esc(b.title || 'Trace the code') + ' <span class="badge">Trace</span></div>' +
      '<pre class="trace-code">' + b.code.split('\n').map(function (t, i) {
        return '<div><span class="ln">' + (i + 1) + '</span>' + esc(t) + '</div>';
      }).join('') + '</pre>' +
      '<table class="generic"><thead><tr><th>Step</th><th>Line run</th><th>Variables after the line</th><th>Output so far</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div>';
  }

  function traceBlock(b) {
    if (PRINT) return { html: traceStaticBlock(b), trace: null };
    var lines = b.code.split('\n');
    var code = lines.map(function (t, i) {
      return '<div data-ln="' + (i + 1) + '"><span class="ln">' + (i + 1) + '</span>' + esc(t) + '</div>';
    }).join('');
    var interactive = !PRINT;
    var html = '<div class="demo" data-trace>' +
      '<div class="demo-title">' + esc(b.title || 'Trace the code') + ' <span class="badge">Step through</span></div>' +
      (b.intro ? '<p class="small muted">' + b.intro + '</p>' : '') +
      '<div class="demo-body"><div><pre class="trace-code">' + code + '</pre></div>' +
      '<div><div class="vars-wrap"></div>' +
      '<div class="small muted" style="margin-top:10px">Output so far</div>' +
      '<div class="out-box"></div>' +
      (interactive ? '<div class="btn-row">' +
        '<button type="button" class="btn ghost small-btn" data-prev>◀ Back</button>' +
        '<button type="button" class="btn small-btn" data-next>Next ▶</button>' +
        '<button type="button" class="btn ghost small-btn" data-reset>Reset</button>' +
        '<span class="status-line"></span></div>' : '') +
      '</div></div></div>';
    return { html: html, trace: b };
  }

  function paintTrace(wrap, stepIndex) {
    var b = wrap.__trace;
    var steps = b.steps;
    var i = Math.max(0, Math.min(stepIndex, steps.length - 1));
    wrap.__step = i;
    var s = steps[i];
    $all('[data-ln]', wrap).forEach(function (row) {
      row.classList.toggle('hl', Number(row.getAttribute('data-ln')) === s.line);
    });
    var names = Object.keys(s.vars || {});
    var table = names.length ? '<table class="vars"><tr><th>variable</th><th>value</th></tr>' +
      names.map(function (k) { return '<tr><td>' + esc(k) + '</td><td>' + esc(s.vars[k]) + '</td></tr>'; }).join('') +
      '</table>' : '<p class="small muted">No variables yet.</p>';
    $('.vars-wrap', wrap).innerHTML = table;
    var out = [];
    for (var k = 0; k <= i; k++) { if (steps[k].say) out.push(steps[k].say); }
    $('.out-box', wrap).textContent = out.length ? out.join('\n') : '(nothing printed yet)';
    var status = $('.status-line', wrap);
    if (status) status.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
  }

  function truthBlock(b) {
    var vars = b.vars;
    var n = Math.pow(2, vars.length);
    var head = vars.map(function (v) { return '<th>' + esc(v) + '</th>'; }).join('') +
      b.cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('');
    var rows = '';
    for (var r = 0; r < n; r++) {
      var values = {};
      var cells = '';
      vars.forEach(function (v, j) {
        values[v] = !((r >> (vars.length - 1 - j)) & 1);
        cells += '<td class="' + (values[v] ? 'T' : 'F') + '">' + (values[v] ? 'True' : 'False') + '</td>';
      });
      b.cols.forEach(function (c) {
        var val = !!c.f(values);
        if (PRINT) {
          cells += '<td class="' + (val ? 'T' : 'F') + '">' + (val ? 'True' : 'False') + '</td>';
        } else {
          cells += '<td class="res" data-val="' + (val ? 'T' : 'F') + '">?</td>';
        }
      });
      rows += '<tr>' + cells + '</tr>';
    }
    var reveal = PRINT ? '' : '<div class="btn-row"><button type="button" class="btn small-btn" data-reveal-truth>Reveal results</button>' +
      '<span class="small muted">Predict each column first, then check yourself.</span></div>';
    return '<div class="demo"><div class="demo-title">' + esc(b.title || 'Truth table') + ' <span class="badge">Interactive</span></div>' +
      (b.intro ? '<p class="small muted">' + b.intro + '</p>' : '') +
      reveal +
      '<table class="truth"><thead><tr>' + head + '</tr></thead><tbody>' + rows + '</tbody></table></div>';
  }

  function exerciseBlock(b, n) {
    var hint = b.hint ? '<details class="hint"><summary>Hint</summary><div>' + b.hint + '</div></details>' : '';
    // PDFs are student handouts: solutions are left out of print output.
    var solution = PRINT ? '' :
      '<details class="solution"><summary>Show solution</summary>' + codeBlock({ code: b.solution, caption: 'Solution', run: b.runnable }) + '</details>';
    return '<details class="exercise" open><summary>Exercise ' + n + (b.title ? ' — ' + esc(b.title) : '') + '</summary>' +
      '<div>' + b.prompt + '</div>' + hint + solution + '</details>';
  }

  function discussionBlock(b) {
    var items = b.prompts.map(function (p) { return '<li>' + p + '</li>'; }).join('');
    // Facilitator notes are for the instructor, so they stay out of the PDFs.
    return '<div class="callout"><strong>Discussion</strong><ol class="disc">' + items + '</ol></div>' +
      (b.facilitator && !PRINT ? '<details class="facil"><summary>Facilitator notes</summary><div>' + b.facilitator + '</div></details>' : '');
  }

  function renderBlocks(blocks) {
    var exN = 0;
    var traces = [];
    var html = blocks.map(function (b) {
      switch (b.type) {
        case 'h': return '<h2 id="' + slug(b.text) + '">' + esc(b.text) + '</h2>';
        case 'h3': return '<h3>' + esc(b.text) + '</h3>';
        case 'p': return '<p>' + b.html + '</p>';
        case 'ul': return '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
        case 'html': return b.html;
        case 'code': return codeBlock(b);
        case 'tip': return '<div class="callout tip"><strong>Tip</strong>' + b.html + '</div>';
        case 'warn': return '<div class="callout warn"><strong>Watch out</strong>' + b.html + '</div>';
        case 'note': return '<div class="callout"><strong>Note</strong>' + b.html + '</div>';
        case 'table':
          return '<table class="generic"><thead><tr>' + b.head.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
            '</tr></thead><tbody>' + b.rows.map(function (r) {
              return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
            }).join('') + '</tbody></table>';
        case 'predict': return predictBlock(b);
        case 'trace':
          var t = traceBlock(b);
          if (t.trace) traces.push(t.trace);
          return t.html;
        case 'truth': return truthBlock(b);
        case 'exercise': exN += 1; return exerciseBlock(b, exN);
        case 'discussion': return discussionBlock(b);
        default: return '';
      }
    }).join('\n');
    return { html: html, traces: traces };
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var btn;

    if ((btn = t.closest('[data-copy]'))) {
      var cb = btn.closest('.codeblock');
      copyText($('code', cb).textContent, btn);
      return;
    }
    if ((btn = t.closest('[data-run]'))) {
      var block = btn.closest('.codeblock');
      var out = $('.cb-out', block);
      out.hidden = false;
      out.classList.remove('err');
      out.textContent = 'Running…';
      runCode($('code', block).textContent).then(function (res) {
        out.textContent = res.text;
        out.classList.toggle('err', !res.ok);
      });
      return;
    }
    if ((btn = t.closest('[data-reveal]'))) {
      var rev = btn.nextElementSibling;
      rev.hidden = !rev.hidden;
      btn.textContent = rev.hidden ? 'Reveal answer' : 'Hide answer';
      return;
    }
    if ((btn = t.closest('[data-reveal-truth]'))) {
      var table = btn.parentNode.nextElementSibling;
      $all('td.res', table).forEach(function (td) {
        var v = td.getAttribute('data-val');
        td.textContent = v === 'T' ? 'True' : 'False';
        td.className = v;
      });
      btn.textContent = 'Results shown';
      btn.disabled = true;
      return;
    }
    if ((btn = t.closest('[data-prev],[data-next],[data-reset]'))) {
      var wrap = btn.closest('[data-trace]');
      var cur = wrap.__step || 0;
      if (btn.hasAttribute('data-next')) cur += 1;
      if (btn.hasAttribute('data-prev')) cur -= 1;
      if (btn.hasAttribute('data-reset')) cur = 0;
      var last = wrap.__trace.steps.length - 1;
      paintTrace(wrap, Math.max(0, Math.min(cur, last)));
      return;
    }
    if ((btn = t.closest('[data-complete]'))) {
      var id = btn.getAttribute('data-complete');
      var nowDone = !getProgress()[id];
      setDone(id, nowDone);
      btn.textContent = nowDone ? 'Completed ✓' : 'Mark unit complete';
      btn.classList.toggle('done', nowDone);
      return;
    }
  });

  /* ---------- page: dashboard ---------- */
  function renderHome() {
    var root = $('#app');
    var units = courseUnits();
    var progress = getProgress();
    var ready = units.filter(function (u) { return u.status === 'ready'; });
    var done = ready.filter(function (u) { return progress[u.id]; }).length;
    var termCount = units.reduce(function (n, u) { return n + (u.terms || []).length; }, 0);

    var stages = (COURSE.stages || []).map(function (st) {
      var list = units.filter(function (u) { return u.stage === st.id; });
      var cards = list.map(function (u) {
        var planned = u.status !== 'ready';
        var tag = planned ? '<span class="badge planned">In development</span>' : '<span class="badge">Lesson</span>';
        var check = progress[u.id] ? '<span class="check" title="Completed">✓</span>' : '';
        var inner = '<div class="num">Unit ' + u.num + ' · ' + esc(u.minutes || '') + '</div>' +
          '<h3>' + esc(u.title) + '</h3><p>' + esc(u.summary) + '</p>' + tag + check;
        return planned
          ? '<div class="card is-planned">' + inner + '</div>'
          : '<a class="card" href="lesson.html?unit=' + u.id + '">' + inner + '</a>';
      }).join('');
      return '<section class="stage"><h2>' + esc(st.title) + '</h2><p class="muted">' + esc(st.blurb) + '</p>' +
        '<div class="grid">' + cards + '</div></section>';
    }).join('');

    root.innerHTML =
      '<div class="hero">' +
        '<h1>Learn Python, one unit at a time</h1>' +
        '<p>Read each lesson, copy the examples, run them in the browser sandbox, and work the exercises. ' +
        'Every unit has a downloadable PDF, a glossary of its terms, and discussion prompts for live sessions.</p>' +
        '<div class="btn-row">' +
          '<a class="btn" href="lesson.html?unit=' + (ready[0] ? ready[0].id : 'u01') + '">Start Unit 1</a>' +
          '<a class="btn ghost" href="sandbox.html">Open the Python sandbox</a>' +
          '<a class="btn ghost" href="glossary.html">Glossary</a>' +
          '<a class="btn ghost" href="pdfs/full-course.pdf" download>Download full course PDF</a>' +
        '</div>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + ready.length + '</b><span>units ready</span></div>' +
          '<div class="stat"><b>' + (units.length - ready.length) + '</b><span>units in development</span></div>' +
          '<div class="stat"><b>' + termCount + '</b><span>glossary terms</span></div>' +
          '<div class="stat"><b>' + done + ' / ' + ready.length + '</b><span>units marked complete (this browser)</span></div>' +
        '</div>' +
      '</div>' +
      stages +
      '<section class="stage"><h2>Using this site in class</h2><ul>' +
        '<li><b>Lesson pages</b> hold the reading, demos, exercises, and discussion prompts for each unit.</li>' +
        '<li><b>Copy</b> puts a snippet on the clipboard. <b>Run ▶</b> executes it in the browser. Nothing is installed.</li>' +
        '<li><b>Glossary</b> lists every key term, grouped by unit, with search.</li>' +
        '<li><b>PDFs</b> are on each lesson page (Download PDF) for offline reading and printing.</li>' +
        '<li>Progress checkmarks are saved in your browser only. They are not shared with anyone.</li>' +
      '</ul></section>';
    document.body.setAttribute('data-ready', '1');
  }

  /* ---------- page: lesson ---------- */
  function renderLesson() {
    var all = PARAMS.get('unit') === 'all';
    var unit = unitById(PARAMS.get('unit') || 'u01');
    var units = courseUnits();
    var toc = $('#toc');
    var root = $('#lesson');

    if (toc) {
      var stageLinks = (COURSE.stages || []).map(function (st) {
        var list = units.filter(function (u) { return u.stage === st.id; });
        return '<h4>' + esc(st.title.split(' — ')[0]) + '</h4>' + list.map(function (u) {
          var current = unit && u.id === unit.id ? ' aria-current="page"' : '';
          var planned = u.status !== 'ready' ? '<span class="planned-tag">soon</span>' : '';
          return '<a href="lesson.html?unit=' + u.id + '"' + current + '><span class="n">' + u.num + '</span>' +
            '<span>' + esc(u.title) + '</span>' + planned + '</a>';
        }).join('');
      }).join('');
      toc.innerHTML = '<div class="toc-list">' + stageLinks + '</div>';
    }

    if (!unit && !all) {
      root.innerHTML = '<p>Unit not found. <a href="index.html">Back to the course</a>.</p>';
      return;
    }

    if (all) {
      var parts = units.filter(function (u) { return u.status === 'ready'; }).map(function (u, i) {
        return '<section class="' + (i ? 'page-break' : '') + '">' + unitHtml(u, true) + '</section>';
      });
      root.innerHTML = '<h1>PythonEX — Full Course</h1>' + parts.join('');
      document.title = 'PythonEX — Full course';
      finishLesson(root, null, true);
      return;
    }

    root.innerHTML = unitHtml(unit, false);
    document.title = 'Unit ' + unit.num + ': ' + unit.title + ' · PythonEX';
    var idx = units.indexOf(unit);
    var prev = units[idx - 1];
    var next = units[idx + 1];
    var nav = '<div class="btn-row no-print" style="justify-content:space-between;margin-top:28px">' +
      (prev ? '<a class="btn ghost" href="lesson.html?unit=' + prev.id + '">← ' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn" href="lesson.html?unit=' + next.id + '">' + esc(next.title) + ' →</a>' : '<span></span>') +
      '</div>';
    root.insertAdjacentHTML('beforeend', nav);
    finishLesson(root, unit, false);
  }

  function unitHtml(u, inCourse) {
    var progress = getProgress();
    var planned = u.status !== 'ready';
    var banner = planned
      ? '<div class="callout warn"><strong>In development</strong>This unit is outlined but its full lesson is not written yet. The outline below shows what it will cover.</div>'
      : '';
    var objectives = (u.objectives && u.objectives.length)
      ? '<div class="objectives"><h3>By the end of this unit you will be able to</h3><ul>' +
        u.objectives.map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ul></div>'
      : '';
    var rendered = renderBlocks(u.blocks || []);
    var terms = (u.terms && u.terms.length)
      ? '<section class="terms-box" id="terms"><h2>Key terms</h2><dl>' +
        u.terms.map(function (t) { return '<dt>' + esc(t.t) + '</dt><dd>' + t.d + '</dd>'; }).join('') +
        '</dl><p class="small"><a href="glossary.html#unit-' + u.id + '">See all terms in the glossary →</a></p></section>'
      : '';
    var actions = PRINT ? '' :
      '<div class="btn-row no-print">' +
        '<a class="btn ghost small-btn" href="pdfs/' + u.id + '.pdf" download>Download PDF</a>' +
        '<button type="button" class="btn small-btn' + (progress[u.id] ? ' done' : '') + '" data-complete="' + u.id + '">' +
        (progress[u.id] ? 'Completed ✓' : 'Mark unit complete') + '</button>' +
        '<a class="btn ghost small-btn" href="sandbox.html">Open sandbox</a>' +
      '</div>';
    var head = '<header class="lesson-head"><div class="meta"><span class="badge">Unit ' + u.num + '</span>' +
      '<span>' + esc(u.minutes || '') + '</span>' + (planned ? '<span class="badge planned">Outline</span>' : '') + '</div>' +
      '<h1>' + esc(u.title) + '</h1><p class="muted">' + esc(u.summary) + '</p>' + actions + '</header>';
    // Trace definitions are kept on the unit so they can be wired after insertion.
    u.__traces = rendered.traces;
    return '<article data-unit="' + u.id + '">' + head + banner + objectives +
      '<div class="lesson-body">' + rendered.html + '</div>' + terms + '</article>';
  }

  function finishLesson(root, unit, inCourse) {
    if (!inCourse && unit) {
      wireTracesFor(root, unit.__traces);
    } else if (inCourse) {
      $all('article[data-unit]', root).forEach(function (art) {
        wireTracesFor(art, unitById(art.getAttribute('data-unit')).__traces);
      });
    }
    if (PRINT) {
      $all('details', root).forEach(function (d) { d.open = true; });
      $all('.reveal', root).forEach(function (d) { d.hidden = false; });
    }
    document.body.setAttribute('data-ready', '1');
  }

  function wireTracesFor(scope, traces) {
    if (!traces) return;
    $all('[data-trace]', scope).forEach(function (wrap, i) {
      if (!traces[i]) return;
      wrap.__trace = traces[i];
      paintTrace(wrap, 0);
    });
  }

  /* ---------- page: glossary ---------- */
  function renderGlossary() {
    var root = $('#glossary');
    var units = courseUnits();
    var entries = [];
    units.forEach(function (u) {
      (u.terms || []).forEach(function (t) {
        entries.push({ unit: u, term: t.t, def: t.d, letter: t.t.charAt(0).toUpperCase() });
      });
    });
    var letters = {};
    entries.forEach(function (e) { letters[e.letter] = true; });
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var letterNav = '<div class="letters">' + alpha.map(function (L) {
      return '<a href="#letter-' + L + '" class="' + (letters[L] ? '' : 'off') + '">' + L + '</a>';
    }).join('') + '</div>';

    var groups = units.map(function (u) {
      var list = entries.filter(function (e) { return e.unit.id === u.id; });
      if (!list.length) return '';
      list.sort(function (a, b) { return a.term.toLowerCase() < b.term.toLowerCase() ? -1 : 1; });
      return '<section class="gl-unit" id="unit-' + u.id + '"><h2>Unit ' + u.num + ': ' + esc(u.title) + '</h2>' +
        list.map(function (e) {
          return '<div class="gl-item" id="term-' + slug(e.term) + '" data-search="' + esc((e.term + ' ' + e.def).toLowerCase()) + '">' +
            '<b>' + esc(e.term) + '</b><p>' + e.def + '</p>' +
            '<div class="src"><a href="lesson.html?unit=' + u.id + '#terms">Unit ' + u.num + '</a></div></div>';
        }).join('') + '</section>';
    }).join('');

    var byLetter = '<section class="gl-unit"><h2>A–Z</h2>' + alpha.filter(function (L) { return letters[L]; }).map(function (L) {
      var list = entries.filter(function (e) { return e.letter === L; })
        .sort(function (a, b) { return a.term.toLowerCase() < b.term.toLowerCase() ? -1 : 1; });
      return '<h3 id="letter-' + L + '">' + L + '</h3><p class="small">' + list.map(function (e) {
        return '<a href="#term-' + slug(e.term) + '">' + esc(e.term) + '</a>';
      }).join(' · ') + '</p>';
    }).join('') + '</section>';

    root.innerHTML =
      '<div class="hero"><h1>Glossary</h1><p>' + entries.length + ' terms from every unit. Search, or jump by letter. ' +
      'Each entry links back to the unit where it is taught.</p>' +
      (PRINT ? '' : '<input class="search" id="gl-search" type="search" placeholder="Search terms and definitions…" aria-label="Search glossary">') +
      '</div>' + letterNav + groups + byLetter;

    var search = $('#gl-search');
    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        $all('.gl-item', root).forEach(function (item) {
          item.hidden = !!q && item.getAttribute('data-search').indexOf(q) === -1;
        });
        $all('.gl-unit', root).forEach(function (sec) {
          var anyVisible = $all('.gl-item', sec).some(function (i) { return !i.hidden; });
          if (sec.querySelector('.gl-item')) sec.hidden = !anyVisible;
        });
      });
    }
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
    document.body.setAttribute('data-ready', '1');
  }

  /* ---------- page: sandbox ---------- */
  function renderSandbox() {
    var editor = $('#editor');
    var out = $('#sbout');
    var status = $('#sbstatus');
    var starter = (window.COURSE && COURSE.sandboxStarter) ||
      'print("Hello, PythonEX!")\n';
    editor.value = starter;

    function setStatus(t) { status.textContent = t; }
    function run() {
      out.classList.remove('err');
      out.textContent = 'Running…';
      setStatus('Loading Python (first run takes a few seconds)…');
      runCode(editor.value).then(function (res) {
        out.textContent = res.text;
        out.classList.toggle('err', !res.ok);
        setStatus(res.ok ? 'Done.' : 'Finished with an error.');
      });
    }
    $('#sb-run').addEventListener('click', run);
    $('#sb-reset').addEventListener('click', function () {
      editor.value = starter;
      out.textContent = '';
      setStatus('Starter code restored.');
    });
    $('#sb-clear').addEventListener('click', function () { out.textContent = ''; setStatus(''); });
    editor.addEventListener('keydown', function (ev) {
      // Ctrl/Cmd+Enter runs the code; Tab inserts four spaces.
      if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') { ev.preventDefault(); run(); return; }
      if (ev.key === 'Tab') {
        ev.preventDefault();
        var s = editor.selectionStart;
        editor.value = editor.value.slice(0, s) + '    ' + editor.value.slice(editor.selectionEnd);
        editor.selectionStart = editor.selectionEnd = s + 4;
      }
    });
    setStatus('Ready. Press Run (or Ctrl+Enter). input() is not supported in the browser sandbox.');
    document.body.setAttribute('data-ready', '1');
  }

  /* ---------- boot ---------- */
  function boot() {
    if (PRINT) document.documentElement.classList.add('print-mode');
    var page = document.body.getAttribute('data-page');
    try {
      if (page === 'home') renderHome();
      if (page === 'lesson') renderLesson();
      if (page === 'glossary') renderGlossary();
      if (page === 'sandbox') renderSandbox();
    } catch (err) {
      var box = document.createElement('pre');
      box.textContent = 'Something went wrong rendering this page: ' + err.message;
      document.body.appendChild(box);
      document.body.setAttribute('data-ready', '1');
      console.error(err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
