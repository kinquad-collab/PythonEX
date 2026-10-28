COURSE.units.push({
  id: 'u12', num: 12, stage: 's1', status: 'ready', minutes: '75 min',
  title: 'Advanced Functions and Comprehensions',
  summary: 'Flexible arguments, lambda, map/filter/zip, comprehensions, sorting with key, and recursion.',
  objectives: [
    'Write a function that accepts any number of positional and keyword arguments',
    'Use <code>lambda</code> for a short, unnamed function',
    'Transform and select data with <code>map</code>, <code>filter</code>, and <code>zip</code>',
    'Write list, dictionary, and set comprehensions, and decide when a plain loop is clearer',
    'Sort with a <code>key</code> function',
    'Write a recursive function with a base case'
  ],
  blocks: [
    { type: 'h', text: 'Flexible arguments: *args and **kwargs' },
    { type: 'p', html: '<code>*args</code> collects extra positional arguments into a tuple. <code>**kwargs</code> collects extra keyword arguments into a dictionary. The names <code>args</code> and <code>kwargs</code> are conventions; the <code>*</code> and <code>**</code> are what matter.' },
    { type: 'code', caption: 'flexible.py', code: `def total(*numbers):
    return sum(numbers)

def describe(**details):
    for key, value in details.items():
        print(f"{key}: {value}")

print(total(1, 2, 3, 4))
describe(name="Ada", course="Python")` },

    { type: 'h', text: 'lambda: a small unnamed function' },
    { type: 'p', html: '<code>lambda parameters: expression</code> makes a function with no name. It can hold one expression only. Use it when you need a short function to hand to another function, such as a sort key. Name the function with <code>def</code> when it needs more than one line.' },
    { type: 'code', caption: 'lambda.py', code: `square = lambda x: x * x
print(square(7))

pairs = [(1, "pear"), (3, "apple"), (2, "fig")]
print(sorted(pairs))                       # sorts by the first item
print(sorted(pairs, key=lambda p: p[1]))   # sorts by the name` },

    { type: 'h', text: 'map, filter, and zip' },
    { type: 'p', html: '<code>map(func, items)</code> applies a function to each item. <code>filter(func, items)</code> keeps items for which the function returns True. <code>zip(a, b)</code> pairs items from two sequences. In modern Python, <code>map</code>, <code>filter</code>, and <code>zip</code> return iterators, so wrap them in <code>list()</code> to see the results.' },
    { type: 'code', caption: 'map_filter_zip.py', code: `prices = [2.5, 4.0, 1.25]
print(list(map(lambda p: p * 1.07, prices)))
print(list(filter(lambda p: p > 2, prices)))

names = ["Ana", "Ben"]
scores = [91, 84]
print(list(zip(names, scores)))
for name, score in zip(names, scores):
    print(name, score)` },

    { type: 'h', text: 'Comprehensions' },
    { type: 'p', html: 'A <b>comprehension</b> builds a collection in one expression. The pattern is <code>[expression for item in sequence if condition]</code>. Use the same idea with <code>{}</code> for a dictionary or set.' },
    { type: 'code', caption: 'comprehensions.py', code: `nums = range(1, 11)

squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
labels = ["even" if n % 2 == 0 else "odd" for n in range(4)]
lengths = {word: len(word) for word in ["cat", "horse"]}
unique_lengths = {len(word) for word in ["cat", "dog", "horse"]}

print(squares)
print(evens)
print(labels)
print(lengths)
print(unique_lengths)` },
    { type: 'tip', html: 'If a comprehension needs more than one loop or a long condition, write a normal loop. Clear code beats short code. Your reader is the priority.' },
    { type: 'p', html: 'A <b>generator expression</b> uses parentheses instead of brackets. It produces values one at a time, which saves memory on large data: <code>sum(n * n for n in range(1000))</code>.' },

    { type: 'h', text: 'Sorting with key' },
    { type: 'p', html: '<code>sorted()</code> and <code>list.sort()</code> accept a <code>key</code> function. Python sorts by the value that function returns, not by the item itself. Add <code>reverse=True</code> for descending order.' },
    { type: 'code', caption: 'sort_key.py', code: `students = [
    {"name": "Ana", "score": 88},
    {"name": "Ben", "score": 95},
    {"name": "Cy", "score": 72}
]
ranked = sorted(students, key=lambda s: s["score"], reverse=True)
for s in ranked:
    print(s["name"], s["score"])` },

    { type: 'h', text: 'Recursion' },
    { type: 'p', html: 'A <b>recursive</b> function calls itself on a smaller version of the problem. Every recursive function needs a <b>base case</b> that stops the calls, and each call must move toward it. Without a base case you get a <code>RecursionError</code>.' },
    { type: 'trace', title: 'Trace: factorial(3)', intro: 'Each row shows the line that just ran and the value of <code>n</code> in the call that ran it. The calls go down to <code>n = 1</code>, then the results multiply on the way back up.',
      code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(3))`,
      steps: [
        { line: 1, vars: { factorial: 'function' } },
        { line: 2, vars: { factorial: 'function', n: '3' } },
        { line: 4, vars: { factorial: 'function', n: '3' } },
        { line: 2, vars: { factorial: 'function', n: '2' } },
        { line: 4, vars: { factorial: 'function', n: '2' } },
        { line: 2, vars: { factorial: 'function', n: '1' } },
        { line: 3, vars: { factorial: 'function', n: '1' } },
        { line: 4, vars: { factorial: 'function', n: '2' } },
        { line: 4, vars: { factorial: 'function', n: '3' } },
        { line: 6, vars: { factorial: 'function' }, say: '6' }
      ] },

    { type: 'predict', intro: 'Watch for lazy iterators and for lambdas that return values.', items: [
      { code: 'def f(*args):\n    return len(args)\n\nprint(f(1, 2, 3))', a: '3' },
      { code: 'print(list(map(lambda x: x + 1, [1, 2])))', a: '[2, 3]' },
      { code: 'print(list(filter(lambda x: x > 2, [1, 2, 3, 4])))', a: '[3, 4]' },
      { code: 'print(list(zip([1, 2], "ab")))', a: "[(1, 'a'), (2, 'b')]" },
      { code: 'print([n for n in range(6) if n % 3 == 0])', a: '[0, 3]' },
      { code: 'print(sorted(["bb", "a", "ccc"], key=len))', a: "['a', 'bb', 'ccc']" },
      { code: 'print(sum(n for n in range(4)))', a: '6' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Average of anything', prompt: '<p>Write <code>average(*values)</code> that returns the average of any number of arguments. Test it with <code>average(2, 4, 9)</code>.</p>',
      solution: `def average(*values):
    return sum(values) / len(values)

print(average(2, 4, 9))` },
    { type: 'exercise', title: 'Recursive sum', prompt: '<p>Write <code>total(items)</code> that returns the sum of a list using recursion only (no <code>sum()</code>, no loops). Start with the base case of an empty list.</p>',
      hint: 'The sum of a list is its first item plus the sum of the rest: <code>items[1:]</code>.',
      solution: `def total(items):
    if not items:
        return 0
    return items[0] + total(items[1:])

print(total([1, 2, 3, 4]))` },

    { type: 'discussion', prompts: [
      'When is a comprehension easier to read than a loop, and when is it harder?',
      'Why does <code>map</code> return an iterator instead of a list? What does that change for large files?',
      'A recursive solution and a loop solution can compute the same answer. What does each one make easier to see?'
    ], facilitator: 'Common error: printing <code>map(...)</code> directly shows an object address, not the values. Ask students why, then show <code>list(...)</code>.' }
  ],
  terms: [
    { t: '*args', d: 'A parameter that collects extra positional arguments into a tuple.' },
    { t: '**kwargs', d: 'A parameter that collects extra keyword arguments into a dictionary.' },
    { t: 'lambda', d: 'A one-expression, unnamed function, written <code>lambda x: x * 2</code>.' },
    { t: 'map', d: 'A built-in that applies a function to each item of a sequence, returning an iterator.' },
    { t: 'filter', d: 'A built-in that keeps the items for which a function returns True.' },
    { t: 'zip', d: 'A built-in that pairs up items from several sequences, stopping at the shortest.' },
    { t: 'Comprehension', d: 'A compact expression that builds a list, dictionary, or set from a loop and an optional condition.' },
    { t: 'Generator expression', d: 'A comprehension in parentheses that produces values lazily, one at a time.' },
    { t: 'Iterator', d: 'An object that produces items one at a time and can be looped over once.' },
    { t: 'Recursion', d: 'A function that calls itself on a smaller problem until it reaches a base case.' },
    { t: 'Base case', d: 'The condition that stops a recursive function from calling itself again.' }
  ]
});
