COURSE.units.push({
  id: 'u02', num: 2, stage: 's1', status: 'ready', minutes: '60 min',
  title: 'Data Types and Strings',
  summary: 'Integers, floats, strings, and booleans; checking types; converting between them; working with text.',
  objectives: [
    'Identify the common types: <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>',
    'Check a value\'s type with <code>type()</code> and convert with <code>int()</code>, <code>float()</code>, <code>str()</code>',
    'Explain why <code>0.1 + 0.2</code> is not exactly <code>0.3</code>',
    'Index and slice strings, and use common string methods',
    'Build readable output with f-strings'
  ],
  blocks: [
    { type: 'h', text: 'Every value has a type' },
    { type: 'p', html: 'A <b>data type</b> tells Python what kind of value something is and what operations make sense on it. Python checks types as the program runs.' },
    { type: 'table', head: ['Type', 'Name in code', 'Examples', 'What it holds'], rows: [
      ['Integer', '<code>int</code>', '<code>42</code>, <code>-7</code>, <code>0</code>', 'Whole numbers'],
      ['Float', '<code>float</code>', '<code>3.14</code>, <code>-0.5</code>, <code>2.0</code>', 'Numbers with a decimal point'],
      ['String', '<code>str</code>', '<code>"Hello"</code>, <code>\'a\'</code>', 'Text, in quotes'],
      ['Boolean', '<code>bool</code>', '<code>True</code>, <code>False</code>', 'Yes or no. Capitalized.']
    ] },
    { type: 'code', caption: 'types.py', code: `age = 15          # int
height = 5.8      # float
name = "Jordan"   # str
is_student = True # bool

print(type(age))
print(type(height))
print(type(name))
print(type(is_student))` },

    { type: 'h', text: 'Arithmetic and division' },
    { type: 'p', html: 'Python has two division operators. <code>/</code> always returns a float. <code>//</code> is floor division and returns a whole number. <code>%</code> is the remainder, which is useful for checking even and odd.' },
    { type: 'code', caption: 'division.py', code: `print(7 / 2)    # 3.5
print(7 // 2)   # 3
print(7 % 2)    # 1
print(2 ** 10)  # 1024` },

    { type: 'h', text: 'Converting between types' },
    { type: 'p', html: 'Input and file data often arrive as text. Convert with <code>int()</code>, <code>float()</code>, or <code>str()</code>. This is called <b>casting</b>.' },
    { type: 'code', caption: 'casting.py', code: `text = "42"
number = int(text)
print(number + 8)     # 50 (math)
print(text + "8")     # 428 (joins two strings)
print(float("3.5") * 2)
print(str(99) + " bottles")` },
    { type: 'warn', html: '<code>int("3.7")</code> raises a <code>ValueError</code>. Convert to <code>float</code> first, then to <code>int</code> if you need to drop the decimal part: <code>int(float("3.7"))</code> gives <code>3</code>.' },

    { type: 'h', text: 'Floats are approximate' },
    { type: 'p', html: 'Computers store most decimal numbers in binary, which cannot represent 0.1 exactly. Small errors show up. Compare floats with a tolerance, not with <code>==</code>. Later you will use <code>math.isclose()</code>.' },
    { type: 'code', caption: 'float_surprise.py', code: `print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)
print(round(0.1 + 0.2, 2))` },

    { type: 'h', text: 'Strings' },
    { type: 'p', html: 'A string is an ordered sequence of characters. Each character has an <b>index</b>, starting at 0. Negative indexes count from the end. A <b>slice</b> <code>text[start:stop]</code> returns a part of the string; <code>stop</code> is not included.' },
    { type: 'code', caption: 'strings.py', code: `word = "Python"
print(word[0])      # P
print(word[-1])     # n
print(word[0:3])    # Pyt
print(word[2:])     # thon
print(len(word))    # 6
print(word.upper()) # PYTHON
print("py" in word.lower())  # True` },
    { type: 'p', html: 'Strings are <b>immutable</b>. You cannot change one character in place. You build a new string instead.' },
    { type: 'warn', html: '<code>word[0] = "J"</code> raises <code>TypeError: \'str\' object does not support item assignment</code>. Use <code>"J" + word[1:]</code> to build <code>"Jython"</code>.' },
    { type: 'table', head: ['Method', 'What it does', 'Example result'], rows: [
      ['<code>.upper()</code> / <code>.lower()</code>', 'Changes letter case', '<code>"hi".upper()</code> → <code>"HI"</code>'],
      ['<code>.strip()</code>', 'Removes spaces at both ends', '<code>"  hi  ".strip()</code> → <code>"hi"</code>'],
      ['<code>.replace(old, new)</code>', 'Replaces every match', '<code>"a-b".replace("-", "+")</code> → <code>"a+b"</code>'],
      ['<code>.split(sep)</code>', 'Splits into a list', '<code>"a,b".split(",")</code> → <code>["a", "b"]</code>'],
      ['<code>.startswith(text)</code>', 'Checks the beginning', '<code>"Python".startswith("Py")</code> → <code>True</code>']
    ] },

    { type: 'h', text: 'f-strings' },
    { type: 'p', html: 'Put an <code>f</code> before the opening quote and wrap any expression in braces. This is the cleanest way to mix text and values.' },
    { type: 'code', caption: 'fstrings.py', code: `score = 92
student = "Maya"
print(f"{student} scored {score}% on the test.")
print(f"Next goal: {score + 3}%")` },

    { type: 'predict', intro: 'Work out each result by hand first.', items: [
      { code: 'print(7 / 2)', a: '3.5' },
      { code: 'print(7 // 2)', a: '3' },
      { code: 'print("5" * 3)', a: '555', why: 'Multiplying a string repeats it.' },
      { code: 'print(bool(""))', a: 'False', why: 'An empty string is "falsy".' },
      { code: 'print(int("3.7"))', a: 'ValueError', why: 'A decimal string cannot be parsed as an int.' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Full name', prompt: '<p>Store a first name and a last name in two variables. Print the full name using an f-string, for example <code>Ada Lovelace</code>.</p>',
      solution: `first = "Ada"
last = "Lovelace"
print(f"{first} {last}")` },
    { type: 'exercise', title: 'Clean and count', prompt: '<p>Start with <code>raw = "   Python Is Fun   "</code>. Remove the extra spaces, make it lowercase, and print how many characters it has.</p>',
      hint: 'Methods can be chained: <code>raw.strip().lower()</code>. Then call <code>len()</code> on the result.',
      solution: `raw = "   Python Is Fun   "
clean = raw.strip().lower()
print(clean)
print(len(clean))` },

    { type: 'discussion', prompts: [
      'Why do you think <code>"5" + "5"</code> gives <code>"55"</code> while <code>5 + 5</code> gives <code>10</code>? What does that tell you about types?',
      'Where in your daily life do you see numbers stored as text, and what would break if a program treated them as numbers?',
      'If floats cannot represent 0.1 exactly, when should a bank program use integers (cents) instead?'
    ], facilitator: 'The bank question is a good opening for a short discussion of money and <code>Decimal</code>. Students do not need to implement it yet.' }
  ],
  terms: [
    { t: 'Data type', d: 'A category of value (int, float, str, bool) that determines what operations are valid on it.' },
    { t: 'int', d: 'Integer: a whole number with no decimal point.' },
    { t: 'float', d: 'Floating-point number: a number with a decimal point. Stored approximately.' },
    { t: 'str', d: 'String: an immutable sequence of characters written in quotes.' },
    { t: 'bool', d: 'Boolean: the value <code>True</code> or <code>False</code>. Named for George Boole.' },
    { t: 'type()', d: 'A built-in function that returns the type of a value, such as <code>&lt;class \'int\'&gt;</code>.' },
    { t: 'Casting', d: 'Converting a value from one type to another, for example <code>int("42")</code>.' },
    { t: 'Index', d: 'The position of an item in a sequence. Counting starts at 0.' },
    { t: 'Slice', d: 'A part of a sequence written <code>seq[start:stop]</code>. The stop position is excluded.' },
    { t: 'Immutable', d: 'A value that cannot be changed after it is created. Strings, integers, and tuples are immutable.' },
    { t: 'f-string', d: 'A string literal beginning with <code>f</code> that embeds expressions in braces, such as <code>f"{x}"</code>.' },
    { t: 'Method', d: 'A function that belongs to an object and is called with a dot, such as <code>name.upper()</code>.' }
  ]
});
