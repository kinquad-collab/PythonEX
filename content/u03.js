COURSE.units.push({
  id: 'u03', num: 3, stage: 's1', status: 'ready', minutes: '60 min',
  title: 'Boolean Logic and Truth Tables',
  summary: 'Comparison operators, the logical operators and, or, not, precedence, and reading truth tables.',
  objectives: [
    'Write comparisons with <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;=</code> and explain the result',
    'Combine conditions with <code>and</code>, <code>or</code>, and <code>not</code>',
    'Build and read truth tables for a logic expression',
    'Explain short-circuit evaluation and why order matters',
    'Predict the result of an expression that mixes several operators'
  ],
  blocks: [
    { type: 'h', text: 'Comparisons produce booleans' },
    { type: 'p', html: 'A comparison asks a yes-or-no question and produces a <code>bool</code>. Every condition you will write in the next units is a comparison or a combination of them.' },
    { type: 'table', head: ['Operator', 'Meaning', 'Example', 'Result'], rows: [
      ['<code>==</code>', 'equal to', '<code>3 == 3</code>', '<code>True</code>'],
      ['<code>!=</code>', 'not equal to', '<code>3 != 3</code>', '<code>False</code>'],
      ['<code>&lt;</code> / <code>&gt;</code>', 'less / greater than', '<code>2 &lt; 5</code>', '<code>True</code>'],
      ['<code>&lt;=</code> / <code>&gt;=</code>', 'less or equal / greater or equal', '<code>5 &gt;= 6</code>', '<code>False</code>']
    ] },
    { type: 'warn', html: '<code>=</code> assigns. <code>==</code> compares. Writing <code>if x = 5:</code> is a <code>SyntaxError</code>.' },

    { type: 'h', text: 'and, or, not' },
    { type: 'p', html: '<code>and</code> is True only when <b>both</b> sides are True. <code>or</code> is True when <b>at least one</b> side is True. <code>not</code> flips the value.' },
    { type: 'code', caption: 'logic.py', code: `a = True
b = False
print(a and b)    # False
print(a or b)     # True
print(not a)      # False
print(5 > 3 and 2 == 2)   # True` },

    { type: 'h', text: 'Truth tables' },
    { type: 'p', html: 'A <b>truth table</b> lists every combination of inputs and the output for each. With two variables there are 2 × 2 = 4 rows. With three there are 8. Each extra variable doubles the rows. Use the table below to predict each column, then reveal the answers.' },
    { type: 'truth', title: 'Truth tables for A and B', vars: ['A', 'B'], intro: 'Predict each column first, then press <b>Reveal results</b>.', cols: [
      { label: 'A and B', f: function (v) { return v.A && v.B; } },
      { label: 'A or B', f: function (v) { return v.A || v.B; } },
      { label: 'A != B (exclusive or)', f: function (v) { return v.A !== v.B; } },
      { label: 'not A', f: function (v) { return !v.A; } }
    ] },
    { type: 'note', html: 'The "exclusive or" column (called XOR) is True when exactly one input is True. It is the same as <code>!=</code> on two booleans.' },

    { type: 'h', text: 'Precedence' },
    { type: 'p', html: 'Operators run in a fixed order. From highest to lowest: comparisons, then <code>not</code>, then <code>and</code>, then <code>or</code>. Use parentheses whenever you are not sure. They make the code easier to read as well.' },
    { type: 'code', caption: 'precedence.py', code: `print(True or False and False)     # True: "and" runs first
print((True or False) and False)   # False
print(not True or True)            # True: "not" runs first` },

    { type: 'h', text: 'Short-circuit evaluation' },
    { type: 'p', html: 'Python stops evaluating as soon as the answer is known. In <code>x and y</code>, if <code>x</code> is False the whole expression is False and <code>y</code> is never run. In <code>x or y</code>, if <code>x</code> is True, <code>y</code> is skipped. This lets you write safe checks like <code>name is not None and name.strip() != ""</code>.' },
    { type: 'code', caption: 'short_circuit.py', code: `def check():
    print("check() was called")
    return True

print(False and check())   # check() never runs
print(True or check())    # check() never runs` },

    { type: 'h', text: 'Truthy and falsy values' },
    { type: 'p', html: 'Every value can be used as a condition. <code>0</code>, <code>0.0</code>, <code>""</code>, <code>[]</code>, and <code>None</code> are <b>falsy</b>. Everything else is <b>truthy</b>. Use this to write short checks like <code>if items:</code> to test for a non-empty list.' },

    { type: 'predict', intro: 'Be careful with precedence and short-circuiting.', items: [
      { code: 'print(not 0)', a: 'True', why: '0 is falsy, and <code>not</code> flips it.' },
      { code: 'print(3 == 3.0)', a: 'True', why: 'Int and float compare by value.' },
      { code: 'print("apple" < "banana")', a: 'True', why: 'Strings compare alphabetically, letter by letter.' },
      { code: 'print(1 < 2 < 3)', a: 'True', why: 'Python allows chained comparisons. It means <code>1 &lt; 2 and 2 &lt; 3</code>.' },
      { code: 'print(False and True or True)', a: 'True', why: '<code>and</code> binds tighter, so it is <code>(False and True) or True</code>.' },
      { code: 'print(True or print("hi"))', a: 'True', why: 'The <code>or</code> already knows the answer, so <code>print("hi")</code> never runs.' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Between 1 and 10', prompt: '<p>Given <code>x = 7</code>, write one expression that is True only when <code>x</code> is from 1 to 10 inclusive. Print it.</p>',
      hint: 'Python lets you chain comparisons. You can also write it with <code>and</code>.',
      solution: `x = 7
print(1 <= x <= 10)
print(x >= 1 and x <= 10)` },
    { type: 'exercise', title: 'NAND table', prompt: '<p>Write a truth table for <code>not (A and B)</code>. Predict every row before you run the code, then check.</p>',
      solution: `for A in [True, False]:
    for B in [True, False]:
        print(A, B, not (A and B))` },

    { type: 'discussion', prompts: [
      'Restaurants say "you may have soup or salad." Is that an inclusive or an exclusive or? How would you write each in Python?',
      'Why is <code>a or b</code> safe to write when <code>a</code> is a check like <code>user is None</code>?',
      'Can you write an expression equivalent to <code>A or B</code> using only <code>and</code> and <code>not</code>? Try it with a truth table.'
    ], facilitator: 'The last question leads to De Morgan\'s laws: <code>not (A and B)</code> equals <code>(not A) or (not B)</code>. Let students verify it with the table rather than memorize it.' }
  ],
  terms: [
    { t: 'Boolean', d: 'A value that is either <code>True</code> or <code>False</code>.' },
    { t: 'Comparison operator', d: 'An operator that compares two values and returns a boolean: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.' },
    { t: 'Logical operator', d: '<code>and</code>, <code>or</code>, and <code>not</code>, which combine or invert boolean values.' },
    { t: 'Truth table', d: 'A table listing every combination of inputs and the resulting output of a logic expression.' },
    { t: 'XOR (exclusive or)', d: 'True when exactly one of two inputs is True. In Python, <code>a != b</code> on booleans.' },
    { t: 'Operator precedence', d: 'The fixed order in which operators are evaluated. Parentheses override it.' },
    { t: 'Short-circuit evaluation', d: 'Stopping a boolean expression as soon as its result is known, so later parts are never evaluated.' },
    { t: 'Truthy / falsy', d: 'Values that count as True or False in a condition. Falsy values include <code>0</code>, <code>""</code>, <code>[]</code>, and <code>None</code>.' },
    { t: 'Chained comparison', d: 'A comparison such as <code>1 &lt; x &lt; 10</code>, which Python evaluates as two comparisons joined by <code>and</code>.' }
  ]
});
