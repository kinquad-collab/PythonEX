COURSE.units.push({
  id: 'u07', num: 7, stage: 's1', status: 'ready', minutes: '70 min',
  title: 'Lists',
  summary: 'Ordered collections: indexing, slicing, changing and growing a list, sorting, and the aliasing trap.',
  objectives: [
    'Create lists and access items by index, including negative indexes',
    'Slice a list and explain what the slice includes',
    'Add, remove, and change items with <code>append</code>, <code>insert</code>, <code>remove</code>, <code>pop</code>, and assignment',
    'Explain why a list is mutable and what aliasing means',
    'Loop over a list and build a new list from it'
  ],
  blocks: [
    { type: 'h', text: 'What a list is' },
    { type: 'p', html: 'A <b>list</b> is an ordered collection of values, written in square brackets and separated by commas. The items can be any type, and they can be mixed. Lists are <b>mutable</b>: you can change them after they are created.' },
    { type: 'code', caption: 'lists_basics.py', code: `scores = [72, 95, 88, 61]
names = ["Ana", "Ben", "Cy"]
mixed = [1, "two", 3.0, True]

print(scores)
print(len(names))
print(type(mixed))` },

    { type: 'h', text: 'Indexing and slicing' },
    { type: 'p', html: 'Indexes start at 0. <code>list[-1]</code> is the last item. A slice <code>list[start:stop]</code> returns a new list that includes <code>start</code> and excludes <code>stop</code>.' },
    { type: 'code', caption: 'indexing.py', code: `letters = ["a", "b", "c", "d", "e"]
print(letters[0])     # a
print(letters[-1])    # e
print(letters[1:4])   # ['b', 'c', 'd']
print(letters[:2])    # first two
print(letters[3:])    # from index 3 to the end` },
    { type: 'warn', html: 'Asking for an index that does not exist raises <code>IndexError: list index out of range</code>. For a list of 5 items, the valid indexes are 0 to 4 (or -5 to -1).' },

    { type: 'h', text: 'Changing a list' },
    { type: 'table', head: ['Action', 'Code', 'Effect'], rows: [
      ['Add to the end', '<code>items.append(x)</code>', 'Adds one item at the end'],
      ['Insert at a position', '<code>items.insert(0, x)</code>', 'Puts x at index 0; everything shifts right'],
      ['Remove by value', '<code>items.remove(x)</code>', 'Removes the first match; error if absent'],
      ['Remove by position', '<code>items.pop(i)</code>', 'Removes and returns the item at i (default: last)'],
      ['Replace', '<code>items[2] = x</code>', 'Overwrites the item at index 2']
    ] },
    { type: 'code', caption: 'changing.py', code: `fruit = ["apple", "banana"]
fruit.append("cherry")
fruit.insert(0, "avocado")
fruit[1] = "blueberry"
removed = fruit.pop()
print(fruit)
print("removed:", removed)` },
    { type: 'p', html: 'Methods like <code>append</code> change the list in place and return <code>None</code>. Do not write <code>x = x.append(1)</code>. You would overwrite the list with <code>None</code>.' },

    { type: 'h', text: 'Sorting' },
    { type: 'p', html: '<code>sorted(items)</code> returns a new sorted list and leaves the original alone. <code>items.sort()</code> sorts in place and returns <code>None</code>. Add <code>reverse=True</code> for descending order.' },

    { type: 'h', text: 'Aliasing: two names, one list' },
    { type: 'p', html: 'Assigning a list to a new name does <b>not</b> copy it. Both names point to the same list. Changing one changes the other. Use <code>.copy()</code> or <code>list(original)</code> when you need an independent copy.' },
    { type: 'trace', title: 'Trace: aliasing', intro: 'Both <code>a</code> and <code>b</code> refer to one list, so the append through <code>b</code> shows up in <code>a</code>.',
      code: `a = [1, 2]
b = a
b.append(3)
print(a)`,
      steps: [
        { line: 1, vars: { a: '[1, 2]' } },
        { line: 2, vars: { a: '[1, 2]', b: '[1, 2]' } },
        { line: 3, vars: { a: '[1, 2, 3]', b: '[1, 2, 3]' } },
        { line: 4, vars: { a: '[1, 2, 3]', b: '[1, 2, 3]' }, say: '[1, 2, 3]' }
      ] },

    { type: 'h', text: 'Looping over a list' },
    { type: 'p', html: 'A <code>for</code> loop visits each item in order. Use <code>enumerate()</code> when you also need the index.' },
    { type: 'code', caption: 'loop_lists.py', code: `names = ["Ana", "Ben", "Cy"]
for name in names:
    print("Hi", name)

for i, name in enumerate(names):
    print(i, name)` },
    { type: 'tip', html: 'Do not add or remove items from a list while looping over it. Build a new list instead: <code>evens = [n for n in nums if n % 2 == 0]</code> is the compact form of a loop with <code>append</code>.' },

    { type: 'predict', intro: 'Watch for in-place methods and aliasing.', items: [
      { code: 'nums = [10, 20, 30]\nprint(nums[1])', a: '20' },
      { code: 'nums = [10, 20, 30]\nprint(nums[-1])', a: '30' },
      { code: 'nums = [10, 20, 30]\nnums.append(40)\nprint(len(nums))', a: '4' },
      { code: 'print([1, 2, 3, 4, 5][1:4])', a: '[2, 3, 4]' },
      { code: 'letters = ["a", "b"]\nletters.insert(0, "z")\nprint(letters)', a: "['z', 'a', 'b']" },
      { code: 'x = [3, 1, 2]\nprint(x.sort())', a: 'None', why: '<code>sort()</code> changes the list and returns nothing.' },
      { code: 'print(5 in [1, 2, 3])', a: 'False' },
      { code: 'nums = [1, 2, 3]\nnums[5] = 9', a: 'IndexError' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Average score', prompt: '<p>Given <code>scores = [72, 95, 88, 61]</code>, print the average. Use <code>sum()</code> and <code>len()</code>.</p>',
      solution: `scores = [72, 95, 88, 61]
average = sum(scores) / len(scores)
print(average)` },
    { type: 'exercise', title: 'Squares', prompt: '<p>Build a list called <code>squares</code> containing the squares of 1 through 5 (1, 4, 9, 16, 25). Use a loop and <code>append</code>. Print the list.</p>',
      solution: `squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)` },

    { type: 'discussion', prompts: [
      'Why do you think Python makes lists mutable instead of returning a new list for every change? What does that cost in clarity?',
      'Predict: if two friends share one shopping list in a file and one of them deletes an item, what happens to the other? How is that like aliasing?',
      'When is <code>sorted()</code> the better choice than <code>sort()</code>?'
    ], facilitator: 'The aliasing trace is the most important picture in this unit. Have students predict the output of <code>b = a.copy()</code> followed by <code>b.append(3)</code> before running it.' }
  ],
  terms: [
    { t: 'List', d: 'An ordered, mutable collection of values written in square brackets.' },
    { t: 'Index', d: 'The position of an item in a list, starting at 0. Negative indexes count from the end.' },
    { t: 'Slice', d: 'A new list made from a range of positions, written <code>items[start:stop]</code>.' },
    { t: 'Mutable', d: 'A value that can be changed after it is created. Lists and dictionaries are mutable.' },
    { t: 'Method', d: 'A function attached to an object. <code>append</code>, <code>insert</code>, <code>pop</code>, and <code>sort</code> are list methods.' },
    { t: 'Aliasing', d: 'When two names refer to the same object, so a change through one name is visible through the other.' },
    { t: 'enumerate()', d: 'A built-in that gives each item of a sequence together with its index, for use in a loop.' },
    { t: 'IndexError', d: 'The error raised when an index is outside the range of a list.' },
    { t: 'List comprehension', d: 'A compact expression that builds a list from a loop, such as <code>[n * n for n in range(5)]</code>.' }
  ]
});
