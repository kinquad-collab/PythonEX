COURSE.units.push({
  id: 'u09', num: 9, stage: 's1', status: 'ready', minutes: '75 min',
  title: 'Dictionaries',
  summary: 'Store values under named keys: create, read, update, safely look up, loop over, and nest dictionaries.',
  objectives: [
    'Create a dictionary and read, add, and update values by key',
    'Use <code>.get()</code> to look up a key that might be missing',
    'Loop over keys, values, and key-value pairs with <code>.items()</code>',
    'Build a dictionary by counting items in a loop',
    'Work with a dictionary nested inside another dictionary'
  ],
  blocks: [
    { type: 'h', text: 'Key-value pairs' },
    { type: 'p', html: 'A <b>dictionary</b> maps <b>keys</b> to <b>values</b>. Instead of remembering that item 2 is Ben\'s score, you look up <code>scores["Ben"]</code>. Keys must be immutable (strings and numbers are the usual choices). Values can be anything.' },
    { type: 'code', caption: 'dict_basics.py', code: `student = {
    "name": "Maya",
    "age": 16,
    "grades": [91, 88, 95]
}

print(student["name"])
print(student["grades"][0])` },

    { type: 'h', text: 'Adding and changing values' },
    { type: 'p', html: 'Assigning to a key that exists updates it. Assigning to a new key adds it.' },
    { type: 'code', caption: 'dict_update.py', code: `scores = {"Ana": 90}
scores["Ben"] = 85      # new key: added
scores["Ana"] = 95      # existing key: updated
print(scores)` },

    { type: 'h', text: 'Safe lookups with get()' },
    { type: 'p', html: 'Reading a missing key raises <code>KeyError</code>. <code>.get(key, default)</code> returns the default instead, which is the safe choice when the key might not exist.' },
    { type: 'code', caption: 'get_safe.py', code: `prices = {"apple": 0.50, "pear": 0.75}
print(prices.get("apple", 0))
print(prices.get("kiwi", 0))` },
    { type: 'warn', html: 'A missing key with <code>prices["kiwi"]</code> raises <code>KeyError: \'kiwi\'</code>. Use <code>.get()</code> when the key is not guaranteed to exist.' },

    { type: 'h', text: 'Looping over a dictionary' },
    { type: 'p', html: '<code>.keys()</code> gives the keys, <code>.values()</code> gives the values, and <code>.items()</code> gives both as pairs. Looping over the dictionary directly visits the keys.' },
    { type: 'trace', title: 'Trace: loop over items', intro: 'Each pass unpacks one key-value pair into <code>name</code> and <code>score</code>. Notice that the dictionary was changed before the loop, so the loop sees Ana\'s new score.',
      code: `grades = {"Ana": 90}
grades["Ben"] = 85
grades["Ana"] = 95
for name, score in grades.items():
    print(name, score)`,
      steps: [
        { line: 1, vars: { grades: "{'Ana': 90}" } },
        { line: 2, vars: { grades: "{'Ana': 90, 'Ben': 85}" } },
        { line: 3, vars: { grades: "{'Ana': 95, 'Ben': 85}" } },
        { line: 4, vars: { grades: "{'Ana': 95, 'Ben': 85}", name: "'Ana'", score: '95' } },
        { line: 5, vars: { grades: "{'Ana': 95, 'Ben': 85}", name: "'Ana'", score: '95' }, say: 'Ana 95' },
        { line: 4, vars: { grades: "{'Ana': 95, 'Ben': 85}", name: "'Ben'", score: '85' } },
        { line: 5, vars: { grades: "{'Ana': 95, 'Ben': 85}", name: "'Ben'", score: '85' }, say: 'Ben 85' }
      ] },

    { type: 'h', text: 'Counting with a dictionary' },
    { type: 'p', html: 'A very common pattern is counting how often each item appears. Start empty, then for each item, use <code>.get(item, 0) + 1</code> to add one to its count.' },
    { type: 'code', caption: 'counter.py', code: `words = "the cat saw the dog and the bird".split()
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
print(counts)
print("'the' appears", counts["the"], "times")` },

    { type: 'h', text: 'Nested dictionaries' },
    { type: 'p', html: 'A dictionary can hold other dictionaries or lists. Chain the keys to reach deeper values. Real data (JSON from web APIs) looks exactly like this.' },
    { type: 'code', caption: 'nested.py', code: `class_roster = {
    "period_1": {"teacher": "Ms. Lee", "students": ["Ana", "Ben"]},
    "period_2": {"teacher": "Mr. Cruz", "students": ["Cy", "Dee", "Eli"]}
}

print(class_roster["period_2"]["teacher"])
print(len(class_roster["period_2"]["students"]))` },

    { type: 'predict', intro: 'Keys decide what is found. Watch for duplicates and for missing keys.', items: [
      { code: 'd = {"a": 1}\nprint(d["a"])', a: '1' },
      { code: 'd = {"a": 1}\nprint(d["b"])', a: 'KeyError' },
      { code: 'print({"x": 1}.get("y", 0))', a: '0' },
      { code: 'd = {"k": 2}\nd["k"] = 5\nprint(d)', a: "{'k': 5}" },
      { code: 'print(len({"a": 1, "a": 2}))', a: '1', why: 'The second "a" replaces the first. Keys are unique.' },
      { code: 'print(1 in {"a": 1})', a: 'False', why: '<code>in</code> checks keys, not values.' },
      { code: 'd = {"p": {"age": 3}}\nprint(d["p"]["age"])', a: '3' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Inventory', prompt: '<p>Start with <code>stock = {"pencil": 4, "pen": 2}</code>. Add 3 pens, add 5 erasers (a new key), then print the whole dictionary.</p>',
      solution: `stock = {"pencil": 4, "pen": 2}
stock["pen"] = stock["pen"] + 3
stock["eraser"] = 5
print(stock)` },
    { type: 'exercise', title: 'Most common', prompt: '<p>Using the counts from the counter example, find the word with the highest count and print it. Test with the sentence <code>"a b a c a b"</code>.</p>',
      hint: 'Loop over <code>counts.items()</code> and keep track of the best word and count seen so far.',
      solution: `words = "a b a c a b".split()
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1

best_word = None
best_count = 0
for word, n in counts.items():
    if n > best_count:
        best_word = word
        best_count = n
print(best_word, best_count)` },

    { type: 'discussion', prompts: [
      'When is a list of pairs a better choice than a dictionary, and when is it worse?',
      'Why do you think dictionary keys must be immutable? What would go wrong if a key could change after it was stored?',
      'Think of a real system you use (a school portal, a game, a store app). What are its keys and values?'
    ], facilitator: 'Ask students to compare <code>d[key]</code> and <code>d.get(key)</code> on a missing key. Note that <code>.get(key)</code> with no default returns <code>None</code> instead of raising an error.' }
  ],
  terms: [
    { t: 'Dictionary', d: 'A collection that maps unique keys to values, written in curly braces with <code>key: value</code> pairs.' },
    { t: 'Key', d: 'The label used to look up a value in a dictionary. Keys must be immutable and unique.' },
    { t: 'Value', d: 'The data stored under a key. Values can be any type.' },
    { t: '.get()', d: 'A dictionary method that returns the value for a key, or a default if the key is missing.' },
    { t: '.items()', d: 'A dictionary method that yields key-value pairs, usually unpacked in a loop as <code>for k, v in d.items()</code>.' },
    { t: 'KeyError', d: 'The error raised when reading a key that is not in the dictionary.' },
    { t: 'Nested dictionary', d: 'A dictionary that contains another dictionary or list as a value.' },
    { t: 'Counter pattern', d: 'Using a dictionary to count occurrences: <code>counts[item] = counts.get(item, 0) + 1</code>.' }
  ]
});
