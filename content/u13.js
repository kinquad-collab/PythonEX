COURSE.units.push({
  id: 'u13', num: 13, stage: 's1', status: 'ready', minutes: '75 min',
  title: 'Files, CSV, and JSON',
  summary: 'Read and write text files safely, then load and save the two formats that real data uses: CSV and JSON.',
  objectives: [
    'Open, read, and write text files with <code>with open(...)</code>',
    'Choose the right file mode: <code>r</code>, <code>w</code>, <code>a</code>',
    'Read a CSV file row by row with the <code>csv</code> module',
    'Convert between Python data and JSON with <code>json</code>',
    'Explain why file paths and encodings can break a program, and how to avoid it'
  ],
  blocks: [
    { type: 'h', text: 'Why files' },
    { type: 'p', html: 'Variables disappear when a program ends. Files keep data between runs. Almost every real data task starts with reading a file, and most results end up written to one.' },

    { type: 'h', text: 'Opening files with with' },
    { type: 'p', html: '<code>open(path, mode)</code> returns a file object. Use it inside a <code>with</code> block. The file is closed automatically when the block ends, even if an error happens inside it.' },
    { type: 'table', head: ['Mode', 'Meaning', 'If the file is missing'], rows: [
      ['<code>"r"</code>', 'Read text', 'Error: <code>FileNotFoundError</code>'],
      ['<code>"w"</code>', 'Write text; replaces the old contents', 'Creates the file'],
      ['<code>"a"</code>', 'Append to the end', 'Creates the file']
    ] },
    { type: 'code', caption: 'write_read.py', code: `with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("First line\\n")
    f.write("Second line\\n")

with open("notes.txt", "r", encoding="utf-8") as f:
    text = f.read()
print(text)` },
    { type: 'note', html: 'In the browser sandbox, files live in a temporary in-memory folder. They last until the page is reloaded. On your computer they are saved to disk.' },

    { type: 'h', text: 'Reading line by line' },
    { type: 'p', html: 'A file object can be looped over. Python reads one line at a time, so this works even for files too large to fit in memory. Each line keeps its newline character; <code>.strip()</code> removes it.' },
    { type: 'code', caption: 'lines.py', code: `with open("notes.txt", "a", encoding="utf-8") as f:
    f.write("Third line\\n")

with open("notes.txt", encoding="utf-8") as f:
    for number, line in enumerate(f, start=1):
        print(number, line.strip())` },

    { type: 'h', text: 'Paths' },
    { type: 'p', html: 'A path that does not start with a slash is relative to the folder the program runs from. Print <code>os.getcwd()</code> if you are unsure. <code>pathlib</code> (Unit 15) gives a cleaner way to build paths that work on Windows, macOS, and Linux.' },
    { type: 'warn', html: 'Windows paths contain backslashes. Use a raw string (<code>r"C:\\data\\grades.csv"</code>) or forward slashes (<code>"C:/data/grades.csv"</code>).' },

    { type: 'h', text: 'CSV: rows of comma-separated values' },
    { type: 'p', html: 'CSV is the most common export format for spreadsheets and databases. The <code>csv</code> module handles quoting and commas inside values for you. Always pass <code>newline=""</code> when opening a CSV file for writing.' },
    { type: 'code', caption: 'csv_demo.py', code: `import csv
import io

# A small CSV held in memory so this runs anywhere.
data = io.StringIO("name,score\\nAna,91\\nBen,84\\n")

reader = csv.DictReader(data)
for row in reader:
    print(row["name"], int(row["score"]) + 1)` },
    { type: 'p', html: 'With <code>DictReader</code>, each row is a dictionary keyed by the header. Values always arrive as text, so convert numbers with <code>int()</code> or <code>float()</code>.' },
    { type: 'code', caption: 'csv_write.py', code: `import csv

rows = [{"item": "pencil", "qty": 4}, {"item": "eraser", "qty": 2}]
with open("stock.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["item", "qty"])
    writer.writeheader()
    writer.writerows(rows)

with open("stock.csv", encoding="utf-8") as f:
    print(f.read())` },

    { type: 'h', text: 'JSON: nested data' },
    { type: 'p', html: 'JSON stores dictionaries, lists, strings, numbers, booleans, and null. Web APIs and configuration files use it. <code>json.dumps()</code> turns Python data into a JSON string, and <code>json.loads()</code> turns a string back into Python. The <code>json.dump()</code> and <code>json.load()</code> versions read and write files directly.' },
    { type: 'code', caption: 'json_demo.py', code: `import json

student = {"name": "Maya", "grades": [91, 88], "active": True, "advisor": None}

text = json.dumps(student, indent=2)
print(text)

back = json.loads(text)
print(back["grades"][1])` },
    { type: 'table', head: ['Python', 'JSON'], rows: [
      ['<code>dict</code>', 'object <code>{ }</code>'],
      ['<code>list</code> / <code>tuple</code>', 'array <code>[ ]</code>'],
      ['<code>str</code>', 'string'],
      ['<code>int</code> / <code>float</code>', 'number'],
      ['<code>True</code> / <code>False</code>', '<code>true</code> / <code>false</code>'],
      ['<code>None</code>', '<code>null</code>']
    ] },
    { type: 'tip', html: 'Notice that JSON uses lowercase <code>true</code> and <code>null</code>. Converting back to Python turns them into <code>True</code> and <code>None</code>.' },

    { type: 'h', text: 'Handling file errors' },
    { type: 'p', html: 'Files go missing and paths change. Combine what you learned in Unit 11 with <code>open()</code>.' },
    { type: 'code', caption: 'safe_read.py', code: `def read_or_default(path, default=""):
    try:
        with open(path, encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return default

print(repr(read_or_default("does_not_exist.txt", "no file")))` },

    { type: 'predict', intro: 'Think about what each file operation leaves behind.', items: [
      { code: 'with open("a.txt", "w") as f:\n    f.write("hi")\nwith open("a.txt") as f:\n    print(f.read())', a: 'hi' },
      { code: 'with open("a.txt", "a") as f:\n    f.write("!")\nwith open("a.txt") as f:\n    print(f.read())', a: 'hi!', why: 'Append adds to the end. It does not replace the file.' },
      { code: 'import json\nprint(json.dumps({"ok": True, "x": None}))', a: '{"ok": true, "x": null}' },
      { code: 'import json\nprint(json.loads("[1, 2, 3]")[2])', a: '3' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Count lines', prompt: '<p>Write a program that writes three lines of text to <code>log.txt</code>, then reopens the file and prints how many lines it has.</p>',
      solution: `with open("log.txt", "w", encoding="utf-8") as f:
    f.write("start\\nmiddle\\nend\\n")

with open("log.txt", encoding="utf-8") as f:
    count = sum(1 for _ in f)
print(count)` },
    { type: 'exercise', title: 'Average from CSV', prompt: '<p>Using the in-memory CSV below, print the average score as a float.</p><pre>name,score\nAna,91\nBen,84\nCy,77</pre>',
      hint: 'Collect the scores into a list inside the loop, converting each one with <code>float()</code>.',
      solution: `import csv
import io

data = io.StringIO("name,score\\nAna,91\\nBen,84\\nCy,77\\n")
scores = [float(row["score"]) for row in csv.DictReader(data)]
print(sum(scores) / len(scores))` },

    { type: 'discussion', prompts: [
      'Why does <code>with open(...)</code> matter? What could go wrong with a plain <code>open</code> and no <code>close</code>?',
      'A CSV export opens correctly in a spreadsheet but breaks in your code. What are three things you would check first?',
      'JSON and CSV both store data as text. What does each handle well, and what does each handle badly?'
    ], facilitator: 'Students often forget that CSV values are strings. Ask them to predict the type of <code>row["score"]</code> before printing it.' }
  ],
  terms: [
    { t: 'File object', d: 'The object returned by <code>open()</code> that provides read and write methods for a file.' },
    { t: 'with statement', d: 'A block that acquires a resource and guarantees it is released when the block ends.' },
    { t: 'Mode', d: 'The letter(s) passed to <code>open()</code> that set reading, writing, or appending, such as <code>"r"</code>, <code>"w"</code>, or <code>"a"</code>.' },
    { t: 'Encoding', d: 'The rule for turning characters into bytes, such as UTF-8. Mismatched encodings garble text.' },
    { t: 'Relative path', d: 'A file path measured from the folder the program runs in, rather than from the root of the disk.' },
    { t: 'CSV', d: 'Comma-separated values: plain text with one record per line and commas between fields.' },
    { t: 'JSON', d: 'JavaScript Object Notation: a text format for nested data made of objects, arrays, strings, numbers, booleans, and null.' },
    { t: 'Serialize', d: 'Convert data in memory into a format that can be stored or sent, such as a JSON string.' }
  ]
});
