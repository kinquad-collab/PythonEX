COURSE.units.push({
  id: 'u15', num: 15, stage: 's1', status: 'ready', minutes: '75 min',
  title: 'The Standard Library Toolkit',
  summary: 'Counter, defaultdict, dates, paths, regular expressions, and itertools: tools you will reach for in every data project.',
  objectives: [
    'Count items with <code>collections.Counter</code> and group with <code>defaultdict</code>',
    'Do date arithmetic with <code>datetime</code> and format dates as text',
    'Build file paths with <code>pathlib</code>',
    'Search and extract text with regular expressions (<code>re</code>)',
    'Combine items with <code>itertools</code> product and combination helpers'
  ],
  blocks: [
    { type: 'h', text: 'Why the standard library matters' },
    { type: 'p', html: 'Before installing anything, check the standard library. Most small tasks have a built-in answer, and the built-in version is documented, tested, and available on every machine. Unit 10 covered how to import and read docs; this unit covers the tools you will use most.' },

    { type: 'h', text: 'collections.Counter and defaultdict' },
    { type: 'p', html: '<code>Counter</code> counts hashable items. It replaces the counting loop from Unit 9. <code>defaultdict(list)</code> gives every new key an empty list automatically, so you can append without checking first.' },
    { type: 'code', caption: 'collections_demo.py', code: `from collections import Counter, defaultdict

words = "the cat and the hat and the bat".split()
counts = Counter(words)
print(counts.most_common(2))

by_length = defaultdict(list)
for w in words:
    by_length[len(w)].append(w)
print(dict(by_length))` },
    { type: 'note', html: '<code>most_common(n)</code> returns the n most frequent items with their counts. When two items tie, the one that appeared first comes first.' },

    { type: 'h', text: 'datetime: dates and times' },
    { type: 'p', html: '<code>date</code> holds a calendar day, <code>datetime</code> holds a day and a time, and <code>timedelta</code> represents a difference. Subtracting two dates gives a <code>timedelta</code>. <code>strftime</code> formats a date as text, and <code>strptime</code> parses text into a date.' },
    { type: 'code', caption: 'dates.py', code: `from datetime import date, timedelta, datetime

start = date(2026, 8, 26)
due = start + timedelta(days=21)
print(due)
print((due - start).days)
print(due.strftime("%B %d, %Y"))

parsed = datetime.strptime("2026-09-01 14:30", "%Y-%m-%d %H:%M")
print(parsed.hour)` },
    { type: 'table', head: ['Code', 'Meaning', 'Example output'], rows: [
      ['<code>%Y</code>', 'four-digit year', '2026'],
      ['<code>%m</code> / <code>%d</code>', 'month / day, zero-padded', '09 / 01'],
      ['<code>%B</code>', 'full month name', 'September'],
      ['<code>%H:%M</code>', 'hour (24-hour) and minute', '14:30']
    ] },
    { type: 'warn', html: 'Naive <code>datetime</code> objects have no time zone. Mixing them with timezone-aware ones raises an error. Store times in one zone (often UTC) and convert only for display.' },

    { type: 'h', text: 'pathlib: paths that work everywhere' },
    { type: 'p', html: '<code>Path</code> objects join folders with <code>/</code>, which works on Windows, macOS, and Linux. They also know how to check whether a file exists and how to read it.' },
    { type: 'code', caption: 'pathlib_demo.py', code: `from pathlib import Path

folder = Path("data")
grades = folder / "grades.csv"
print(grades)
print(grades.suffix)
print(grades.stem)
print(grades.parent)` },
    { type: 'p', html: 'Paths are only descriptions. Use <code>grades.exists()</code> to check, and <code>grades.read_text()</code> or <code>grades.write_text()</code> to work with the contents.' },

    { type: 'h', text: 're: regular expressions' },
    { type: 'p', html: 'A regular expression describes a pattern of text. The <code>re</code> module finds, checks, and replaces text that matches. Write patterns as raw strings (<code>r"..."</code>) so backslashes reach the regex engine unchanged.' },
    { type: 'table', head: ['Pattern', 'Matches'], rows: [
      ['<code>\\d</code>', 'one digit (0–9)'],
      ['<code>\\w</code>', 'a letter, digit, or underscore'],
      ['<code>\\s</code>', 'whitespace'],
      ['<code>.</code>', 'any character except newline'],
      ['<code>+</code> / <code>*</code>', 'one or more / zero or more of the item before it'],
      ['<code>[a-z]</code>', 'any lowercase letter'],
      ['<code>^</code> / <code>$</code>', 'start / end of the text']
    ] },
    { type: 'code', caption: 're_demo.py', code: `import re

log = "Order 1042 shipped to zip 30041 on 2026-08-26"

print(re.findall(r"\\d+", log))
print(re.search(r"\\d{4}-\\d{2}-\\d{2}", log).group())
print(re.sub(r"\\d", "#", "room 204"))

m = re.match(r"(\\w+)@(\\w+)\\.com", "ada@school.com")
print(m.group(1), m.group(2))` },
    { type: 'tip', html: 'Start with a simple pattern and test it on a few examples. Regular expressions are powerful, and they are also easy to get wrong. Keep them short, and comment what they match.' },

    { type: 'h', text: 'itertools: combining items' },
    { type: 'p', html: '<code>itertools</code> has fast tools for combinations. <code>product</code> gives every pair, <code>combinations</code> gives each unordered group once, and <code>permutations</code> gives each ordering.' },
    { type: 'code', caption: 'itertools_demo.py', code: `from itertools import product, combinations

sizes = ["S", "M"]
colors = ["red", "blue"]
print(list(product(sizes, colors)))

team = ["Ana", "Ben", "Cy"]
print(list(combinations(team, 2)))` },

    { type: 'predict', intro: 'Watch for ties, zero-padding, and what <code>re</code> returns when nothing matches.', items: [
      { code: 'from collections import Counter\nprint(Counter("aab").most_common(1))', a: "[('a', 2)]" },
      { code: 'from datetime import date, timedelta\nprint((date(2026, 1, 1) + timedelta(days=31)).isoformat())', a: '2026-02-01' },
      { code: 'from pathlib import Path\nprint(Path("a/b/c.txt").suffix)', a: '.txt' },
      { code: 'import re\nprint(re.findall(r"\\d+", "a1b22c333"))', a: "['1', '22', '333']" },
      { code: 'import re\nprint(re.search(r"z", "abc"))', a: 'None', why: '<code>search</code> returns None when nothing matches.' },
      { code: 'from itertools import combinations\nprint(len(list(combinations([1, 2, 3, 4], 2))))', a: '6' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Most common letter', prompt: '<p>Using <code>Counter</code>, print the most common letter in <code>"mississippi"</code> and how many times it appears.</p>',
      solution: `from collections import Counter

letters = Counter("mississippi")
letter, count = letters.most_common(1)[0]
print(letter, count)` },
    { type: 'exercise', title: 'Extract emails', prompt: '<p>Given <code>text = "Contact ada@school.org or ben@example.com today."</code>, use <code>re.findall</code> to print a list of the two addresses. A simple pattern is <code>r"[\\w.]+@[\\w.]+"</code>.</p>',
      solution: `import re

text = "Contact ada@school.org or ben@example.com today."
print(re.findall(r"[\\w.]+@[\\w.]+", text))` },

    { type: 'discussion', prompts: [
      'Which standard-library tool from this unit would have saved you the most time in a past project?',
      'Regular expressions are hard to read. When is that cost worth paying, and when should you use plain string methods instead?',
      'Why does pathlib use <code>/</code> to join paths? What would a hand-written path join need to handle?'
    ], facilitator: 'The <code>re.search</code> return value is either a match object or None. Students who call <code>.group()</code> directly on the result hit an AttributeError. Use that as a teaching moment about checking before using.' }
  ],
  terms: [
    { t: 'Counter', d: 'A dictionary subclass from <code>collections</code> that counts how often each item appears.' },
    { t: 'defaultdict', d: 'A dictionary that creates a default value (such as an empty list) for any missing key.' },
    { t: 'timedelta', d: 'A duration: the difference between two dates or times.' },
    { t: 'strftime / strptime', d: 'Methods that format a date as text (<code>strftime</code>) or parse text into a date (<code>strptime</code>).' },
    { t: 'Path', d: 'An object from <code>pathlib</code> that represents a file or folder path and offers methods to read, write, and inspect it.' },
    { t: 'Regular expression', d: 'A pattern that describes a set of strings, used to search, match, and replace text.' },
    { t: 'Raw string', d: 'A string literal prefixed with <code>r</code> that treats backslashes literally, commonly used for regex patterns.' },
    { t: 'itertools', d: 'A standard-library module of fast, memory-efficient tools for looping and combining items.' }
  ]
});
