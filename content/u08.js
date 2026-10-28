COURSE.units.push({
  id: 'u08', num: 8, stage: 's1', status: 'ready', minutes: '60 min',
  title: 'Tuples and Sets',
  summary: 'Fixed-size tuples for grouped values, and sets for unique items with fast membership tests.',
  objectives: [
    'Create tuples and explain why they are immutable',
    'Unpack a tuple into separate variables and return several values from a function',
    'Create sets, explain why they hold no duplicates, and use union, intersection, and difference',
    'Choose between a list, a tuple, and a set for a task'
  ],
  blocks: [
    { type: 'h', text: 'Tuples: fixed groups' },
    { type: 'p', html: 'A <b>tuple</b> is an ordered collection written with parentheses. Like a list, it is indexed and sliced. Unlike a list, it is <b>immutable</b>: once created, you cannot add, remove, or replace items. Use a tuple when the group should not change, such as an (x, y) coordinate or an RGB color.' },
    { type: 'code', caption: 'tuples.py', code: `point = (4, 7)
color = (255, 128, 0)
print(point[0])
print(len(color))` },
    { type: 'warn', html: 'A single-item tuple needs a trailing comma: <code>(5,)</code> is a tuple, but <code>(5)</code> is just the number 5.' },

    { type: 'h', text: 'Unpacking' },
    { type: 'p', html: 'You can assign each item of a tuple to its own name in one line. This is called <b>unpacking</b>. The number of names must match the number of items.' },
    { type: 'code', caption: 'unpacking.py', code: `x, y = (3, 4)
print(x + y)

def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([7, 2, 9, 4])
print(low, high)` },
    { type: 'p', html: 'Python functions return multiple values by returning a tuple. The caller unpacks it. This is the most common reason you will see tuples in real code.' },

    { type: 'h', text: 'Sets: unique items' },
    { type: 'p', html: 'A <b>set</b> is an unordered collection of unique values, written with curly braces. Adding a duplicate does nothing. Checking whether an item is in a set is very fast, even for large sets.' },
    { type: 'code', caption: 'sets.py', code: `visited = {1, 2, 2, 3, 3, 3}
print(visited)
print(len(visited))
visited.add(4)
print(4 in visited)` },
    { type: 'warn', html: '<code>{}</code> creates an empty <b>dictionary</b>, not a set. Use <code>set()</code> for an empty set. Also, the order of items in a set is not guaranteed, so do not rely on it.' },

    { type: 'h', text: 'Set operations' },
    { type: 'table', head: ['Operation', 'Symbol', 'Method', 'Meaning'], rows: [
      ['Union', '<code>a | b</code>', '<code>a.union(b)</code>', 'Items in either set'],
      ['Intersection', '<code>a &amp; b</code>', '<code>a.intersection(b)</code>', 'Items in both sets'],
      ['Difference', '<code>a - b</code>', '<code>a.difference(b)</code>', 'Items in a but not in b']
    ] },
    { type: 'code', caption: 'set_ops.py', code: `math_class = {"Ana", "Ben", "Cy"}
art_class = {"Ben", "Dee"}

print(math_class | art_class)
print(math_class & art_class)
print(math_class - art_class)` },

    { type: 'h', text: 'Choosing a collection' },
    { type: 'table', head: ['Need', 'Use', 'Why'], rows: [
      ['An ordered sequence that changes', 'list', 'Indexable, mutable, allows duplicates'],
      ['A fixed group, such as coordinates', 'tuple', 'Immutable; safe to pass around'],
      ['Unique items, fast membership tests', 'set', 'Duplicates removed automatically'],
      ['Labels that map to values', 'dict (Unit 9)', 'Look up by key instead of position']
    ] },
    { type: 'tip', html: 'To remove duplicates from a list while keeping it a list: <code>unique = list(set(items))</code>. The order may change, so use this only when order does not matter.' },

    { type: 'predict', intro: 'Watch for the single-item tuple and for the empty set.', items: [
      { code: 'print((5))', a: '5', why: 'Parentheses alone do not make a tuple.' },
      { code: 'print((5,))', a: '(5,)' },
      { code: 't = (1, 2)\nt[0] = 9', a: 'TypeError', why: 'Tuples cannot be changed.' },
      { code: 'x, y = (3, 4)\nprint(x + y)', a: '7' },
      { code: 'print({1, 2, 2, 3})', a: '{1, 2, 3}' },
      { code: 'print({1, 2} | {2, 3})', a: '{1, 2, 3}' },
      { code: 'print({1, 2, 3} & {2, 3, 4})', a: '{2, 3}' },
      { code: 'print(len(set("banana")))', a: '3', why: 'The unique letters are b, a, n.' },
      { code: 'print({} == set())', a: 'False', why: '<code>{}</code> is an empty dictionary.' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Shared clubs', prompt: '<p>Two clubs have these members: <code>chess = ["Ana", "Ben", "Cy", "Ben"]</code> and <code>robotics = ["Ben", "Dee", "Ana"]</code>. Print the names that appear in <b>both</b> clubs, without duplicates.</p>',
      hint: 'Convert each list to a set, then use <code>&amp;</code>.',
      solution: `chess = ["Ana", "Ben", "Cy", "Ben"]
robotics = ["Ben", "Dee", "Ana"]
shared = set(chess) & set(robotics)
print(shared)` },
    { type: 'exercise', title: 'Unpack a return', prompt: '<p>Write a function <code>stats(nums)</code> that returns a tuple of <code>(smallest, largest, count)</code>. Call it with <code>[4, 8, 1, 6]</code> and unpack the result into three variables. Print each.</p>',
      solution: `def stats(nums):
    return min(nums), max(nums), len(nums)

smallest, largest, count = stats([4, 8, 1, 6])
print(smallest)
print(largest)
print(count)` },

    { type: 'discussion', prompts: [
      'Why might a programmer choose a tuple over a list even when both would work? What is the benefit of "can\'t change it"?',
      'A set throws away duplicates and order. When is that a feature, and when is it a bug?',
      'Pick one real data source (a roster, a list of coordinates, a log of website visits) and say which collection type you would use and why.'
    ], facilitator: 'Set iteration order is an unfixed detail of the interpreter. If a student asks why <code>print({"b", "a"})</code> shows a different order from one run to the next, that is the answer. Do not promise an order.' }
  ],
  terms: [
    { t: 'Tuple', d: 'An immutable, ordered collection written in parentheses, such as <code>(4, 7)</code>.' },
    { t: 'Immutable', d: 'Cannot be changed after creation. Tuples, strings, and numbers are immutable.' },
    { t: 'Unpacking', d: 'Assigning each item of a sequence to a separate name in one statement, such as <code>x, y = point</code>.' },
    { t: 'Set', d: 'An unordered collection of unique values, written in curly braces or created with <code>set()</code>.' },
    { t: 'Union', d: 'The set of items in either of two sets. Written <code>a | b</code>.' },
    { t: 'Intersection', d: 'The set of items in both sets. Written <code>a &amp; b</code>.' },
    { t: 'Difference', d: 'The items in the first set that are not in the second. Written <code>a - b</code>.' },
    { t: 'Membership test', d: 'Checking whether a value is in a collection with the <code>in</code> operator.' }
  ]
});
