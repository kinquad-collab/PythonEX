COURSE.units.push({
  id: 'u04', num: 4, stage: 's1', status: 'ready', minutes: '60 min',
  title: 'Conditionals: Making Decisions',
  summary: 'if, elif, and else; indentation as structure; nested decisions; the order of branches.',
  objectives: [
    'Write an <code>if</code> statement and explain why indentation matters',
    'Choose between a chain of <code>elif</code> branches and separate <code>if</code> statements',
    'Trace which branch runs for a given input',
    'Nest conditionals and keep them readable',
    'Avoid the common mistakes: <code>=</code> for <code>==</code>, missing colons, and wrong branch order'
  ],
  blocks: [
    { type: 'h', text: 'The if statement' },
    { type: 'p', html: 'An <code>if</code> statement runs a block of code only when its condition is True. The condition ends with a colon. The block under it is indented, usually by four spaces. Python uses indentation to know where the block ends.' },
    { type: 'code', caption: 'if_basic.py', code: `temperature = 92

if temperature > 85:
    print("Turn on the fan.")
    print("Drink some water.")

print("Done checking.")` },
    { type: 'p', html: 'The last line is not indented, so it runs no matter what the temperature is.' },

    { type: 'h', text: 'if, elif, else' },
    { type: 'p', html: 'Use <code>elif</code> ("else if") to test a list of alternatives. Python checks them in order and runs <b>only the first</b> branch that is True. Then it skips the rest. The <code>else</code> branch catches everything left over.' },
    { type: 'code', caption: 'grades.py', code: `score = 84

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print("Grade:", grade)` },
    { type: 'trace', title: 'Trace: which branch runs?', intro: 'Watch the program check each condition in order. Once a branch matches, the others are skipped.',
      code: `score = 84

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print("Grade:", grade)`,
      steps: [
        { line: 1, vars: { score: '84' } },
        { line: 3, vars: { score: '84' } },
        { line: 5, vars: { score: '84' } },
        { line: 6, vars: { score: '84', grade: "'B'" } },
        { line: 12, vars: { score: '84', grade: "'B'" }, say: 'Grade: B' }
      ] },
    { type: 'warn', html: 'Order matters. If you test <code>score &gt;= 70</code> first, a score of 95 lands in the "C" branch. Put the strictest condition first, or use separate <code>if</code> statements.' },

    { type: 'h', text: 'Nested decisions' },
    { type: 'p', html: 'You can put a conditional inside another one. Each extra level adds four spaces. If you find yourself nesting three or more levels deep, consider a different structure, such as checking for the failing case first and returning or continuing early.' },
    { type: 'code', caption: 'nested.py', code: `age = 17
has_ticket = True

if has_ticket:
    if age >= 18:
        print("Enter, adult.")
    else:
        print("Enter, minor. Guardian required.")
else:
    print("Buy a ticket first.")` },

    { type: 'h', text: 'Combining conditions' },
    { type: 'p', html: 'Use <code>and</code>, <code>or</code>, and <code>not</code> from Unit 3 to combine tests into one condition. This is often cleaner than nesting.' },
    { type: 'code', caption: 'combined.py', code: `age = 17
has_ticket = True

if has_ticket and age >= 18:
    print("Enter, adult.")
elif has_ticket:
    print("Enter, minor.")
else:
    print("Buy a ticket first.")` },

    { type: 'h', text: 'Conditional expressions' },
    { type: 'p', html: 'For a simple choice between two values, Python has a one-line form: <code>value_if_true if condition else value_if_false</code>. Use it for short values only.' },
    { type: 'code', caption: 'ternary.py', code: `n = 7
print("even" if n % 2 == 0 else "odd")` },

    { type: 'predict', intro: 'Predict which lines print. Pay attention to indentation and branch order.', items: [
      { code: 'x = 5\nif x > 3:\n    print("big")', a: 'big' },
      { code: 'x = 5\nif x > 3:\n    print("a")\nif x > 1:\n    print("b")', a: 'a\nb', why: 'Two separate <code>if</code> statements are both checked.' },
      { code: 'x = 5\nif x > 3:\n    print("a")\nelif x > 1:\n    print("b")', a: 'a', why: 'Only the first true branch runs.' },
      { code: 'x = 0\nif x:\n    print("yes")\nelse:\n    print("no")', a: 'no', why: '0 is falsy.' },
      { code: 'print("even" if 4 % 2 == 0 else "odd")', a: 'even' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Adult or minor', prompt: '<p>Given <code>age = 16</code>, print <code>Adult</code> if the age is 18 or more, otherwise print <code>Minor</code>.</p>',
      solution: `age = 16
if age >= 18:
    print("Adult")
else:
    print("Minor")` },
    { type: 'exercise', title: 'Ticket price', prompt: '<p>A movie ticket costs $12. Students (age 17 and under) pay $8. Seniors (age 65 and over) pay $9. Given <code>age = 70</code>, print the price.</p>',
      hint: 'Check the age groups in an order that makes each branch correct.',
      solution: `age = 70
if age <= 17:
    price = 8
elif age >= 65:
    price = 9
else:
    price = 12
print(f"Price: \${price}")` },

    { type: 'discussion', prompts: [
      'Rewrite the grades example with separate <code>if</code> statements instead of <code>elif</code>. What breaks, and why?',
      'When is nesting clearer than combining with <code>and</code>? When is it worse?',
      'Give an example of a real-world rule that has an <code>else</code> branch you would not want to forget.'
    ], facilitator: 'With separate <code>if</code>s and a score of 84, the first matching <code>if</code> sets "B", then the <code>if score &gt;= 70</code> line also matches and overwrites it with "C". Every true <code>if</code> runs; only the first true <code>elif</code> does. Use the trace to show this.' }
  ],
  terms: [
    { t: 'Condition', d: 'An expression that evaluates to True or False and decides whether a block runs.' },
    { t: 'Branch', d: 'One path through a conditional. Each <code>if</code>, <code>elif</code>, and <code>else</code> defines a branch.' },
    { t: 'Indentation', d: 'Leading spaces that show which lines belong to a block. Python requires consistent indentation.' },
    { t: 'Block', d: 'A group of statements that run together, introduced by a colon and indented beneath a statement.' },
    { t: 'elif', d: 'Short for "else if". Tests another condition only if the previous ones were False.' },
    { t: 'Nested conditional', d: 'A conditional placed inside another conditional\'s block.' },
    { t: 'Conditional expression', d: 'A one-line choice written <code>a if condition else b</code>.' }
  ]
});
