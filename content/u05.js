COURSE.units.push({
  id: 'u05', num: 5, stage: 's1', status: 'ready', minutes: '70 min',
  title: 'Loops: Repeating Work',
  summary: 'for loops over ranges, while loops with conditions, accumulators, break, and continue.',
  objectives: [
    'Write a <code>for</code> loop over a <code>range()</code> and explain what the loop variable holds',
    'Write a <code>while</code> loop and identify the update that makes it end',
    'Use an accumulator to build up a total',
    'Use <code>break</code> and <code>continue</code> to change the flow of a loop',
    'Recognize and avoid an infinite loop'
  ],
  blocks: [
    { type: 'h', text: 'Why loops' },
    { type: 'p', html: 'A loop repeats a block of code. Without loops you would copy a line 1,000 times. With them, the program repeats the same logic for each item, each number, or until a condition changes.' },

    { type: 'h', text: 'for loops and range()' },
    { type: 'p', html: 'A <code>for</code> loop visits each item in a sequence, one at a time. <code>range(stop)</code> produces the numbers from 0 up to but <b>not including</b> <code>stop</code>. <code>range(start, stop)</code> starts at <code>start</code>. <code>range(start, stop, step)</code> counts by <code>step</code>.' },
    { type: 'code', caption: 'for_range.py', code: `for i in range(3):
    print("Count:", i)

for n in range(2, 10, 3):
    print("Stepped:", n)` },
    { type: 'trace', title: 'Trace: summing 1 to 3', intro: 'The loop variable <code>i</code> takes each value in turn. <code>total</code> keeps growing: this pattern is called an <b>accumulator</b>.',
      code: `total = 0
for i in range(1, 4):
    total = total + i
print(total)`,
      steps: [
        { line: 1, vars: { total: '0' } },
        { line: 2, vars: { total: '0', i: '1' } },
        { line: 3, vars: { total: '1', i: '1' } },
        { line: 2, vars: { total: '1', i: '2' } },
        { line: 3, vars: { total: '3', i: '2' } },
        { line: 2, vars: { total: '3', i: '3' } },
        { line: 3, vars: { total: '6', i: '3' } },
        { line: 2, vars: { total: '6', i: '3' } },
        { line: 4, vars: { total: '6', i: '3' }, say: '6' }
      ] },
    { type: 'note', html: '<code>range(1, 4)</code> gives 1, 2, 3. It does not include 4. That is the most common off-by-one mistake in this unit.' },

    { type: 'h', text: 'while loops' },
    { type: 'p', html: 'A <code>while</code> loop keeps running as long as its condition is True. It is checked before each pass. You must change something inside the loop, or it never stops.' },
    { type: 'code', caption: 'countdown.py', code: `count = 3
while count > 0:
    print(count)
    count = count - 1
print("Liftoff!")` },
    { type: 'trace', title: 'Trace: the countdown', intro: 'Line 2 is the check. It runs before every pass, including the last one that ends the loop.',
      code: `count = 3
while count > 0:
    print(count)
    count = count - 1
print("Liftoff!")`,
      steps: [
        { line: 1, vars: { count: '3' } },
        { line: 2, vars: { count: '3' } },
        { line: 3, vars: { count: '3' }, say: '3' },
        { line: 4, vars: { count: '2' } },
        { line: 2, vars: { count: '2' } },
        { line: 3, vars: { count: '2' }, say: '2' },
        { line: 4, vars: { count: '1' } },
        { line: 2, vars: { count: '1' } },
        { line: 3, vars: { count: '1' }, say: '1' },
        { line: 4, vars: { count: '0' } },
        { line: 2, vars: { count: '0' } },
        { line: 5, vars: { count: '0' }, say: 'Liftoff!' }
      ] },
    { type: 'warn', html: '<b>Infinite loops.</b> If the condition never becomes False, the program runs forever. Common causes: forgetting to update the variable, or using <code>while True:</code> with no <code>break</code>. If you run one in this site, press the browser\'s reload button.' },

    { type: 'h', text: 'break and continue' },
    { type: 'ul', items: [
      '<code>break</code> leaves the loop immediately.',
      '<code>continue</code> skips the rest of this pass and moves to the next item.'
    ] },
    { type: 'code', caption: 'break_continue.py', code: `for n in range(1, 8):
    if n == 3:
        continue       # skip 3
    if n == 6:
        break          # stop before 6
    print(n)` },

    { type: 'h', text: 'Loops and conditions together' },
    { type: 'p', html: 'Loops and <code>if</code> statements combine freely. A common pattern is a loop that searches for something and stops when it finds it.' },
    { type: 'code', caption: 'search.py', code: `scores = [72, 95, 88, 61]
for s in scores:
    if s >= 90:
        print("First score at or above 90:", s)
        break
else:
    print("No score reached 90.")` },
    { type: 'tip', html: 'The <code>else</code> on a loop runs only when the loop finished <i>without</i> hitting <code>break</code>. It is unusual, so label it clearly in your code.' },

    { type: 'predict', intro: 'Trace each loop in your head before you run it.', items: [
      { code: 'for i in range(3):\n    print(i)', a: '0\n1\n2', why: '<code>range(3)</code> stops before 3.' },
      { code: 'print(list(range(2, 10, 3)))', a: '[2, 5, 8]' },
      { code: 'for i in range(5):\n    if i == 2:\n        break\n    print(i)', a: '0\n1' },
      { code: 'for i in range(4):\n    if i % 2 == 0:\n        continue\n    print(i)', a: '1\n3' },
      { code: 'n = 0\nwhile n < 3:\n    n = n + 1\n    print(n)', a: '1\n2\n3' },
      { code: 'print(sum(range(1, 5)))', a: '10', why: '1 + 2 + 3 + 4.' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Divisible by three', prompt: '<p>Print every number from 1 to 20 that is divisible by 3.</p>',
      hint: 'Use <code>%</code>. A number is divisible by 3 when <code>n % 3 == 0</code>.',
      solution: `for n in range(1, 21):
    if n % 3 == 0:
        print(n)` },
    { type: 'exercise', title: 'Running total', prompt: '<p>Starting at <code>total = 0</code>, add 7 to <code>total</code> each time, using a <code>while</code> loop. Stop as soon as <code>total</code> is 50 or more. Print the final total.</p>',
      solution: `total = 0
while total < 50:
    total = total + 7
print(total)` },

    { type: 'discussion', prompts: [
      'When would you choose <code>for</code> and when <code>while</code>? Give one example of each from everyday life.',
      'The trace shows line 2 running one more time than the body. Why does the check need to run one extra time?',
      'What is the risk of using <code>while True:</code>, and how does a <code>break</code> reduce it?'
    ], facilitator: 'Ask students to predict the final value of <code>total</code> in the running-total exercise before running it: 7, 14, ..., 56. The answer is 56, not 50, because the check is done before each addition.' }
  ],
  terms: [
    { t: 'Loop', d: 'A statement that repeats a block of code.' },
    { t: 'Iteration', d: 'One pass through the body of a loop.' },
    { t: 'for loop', d: 'A loop that assigns each item of a sequence to a variable in turn.' },
    { t: 'while loop', d: 'A loop that repeats while its condition is True. The condition is checked before each pass.' },
    { t: 'range()', d: 'A built-in that produces a sequence of integers from <code>start</code> up to but not including <code>stop</code>.' },
    { t: 'Accumulator', d: 'A variable that collects a running result, such as a total, across loop iterations.' },
    { t: 'break', d: 'A statement that exits the nearest loop immediately.' },
    { t: 'continue', d: 'A statement that skips the rest of the current iteration and moves to the next.' },
    { t: 'Infinite loop', d: 'A loop whose condition never becomes False, so it never ends unless interrupted.' },
    { t: 'Off-by-one error', d: 'A bug caused by a range or index that is one too high or too low.' }
  ]
});
