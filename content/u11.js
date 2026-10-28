COURSE.units.push({
  id: 'u11', num: 11, stage: 's1', status: 'ready', minutes: '60 min',
  title: 'Errors and Exceptions',
  summary: 'Read a traceback, catch expected failures with try/except, and raise errors when input is wrong.',
  objectives: [
    'Read a traceback and identify the exception type, message, and line',
    'Use <code>try</code> / <code>except</code> to handle a failure you expect',
    'Catch a specific exception rather than everything, and explain why',
    'Use <code>else</code> and <code>finally</code> with a try block',
    'Raise an exception from your own function when input is invalid'
  ],
  blocks: [
    { type: 'h', text: 'An exception stops the program' },
    { type: 'p', html: 'When Python hits a problem it cannot resolve, it raises an <b>exception</b>. If nothing catches it, the program stops and prints a <b>traceback</b>. Read a traceback from the bottom up: the last line gives the exception type and message, and the lines above show the path that led to it.' },
    { type: 'code', caption: 'traceback.py', code: `def average(values):
    return sum(values) / len(values)

print(average([]))` },
    { type: 'p', html: 'The bottom line reads <code>ZeroDivisionError: division by zero</code>. The line above shows that <code>average</code> failed on <code>sum(values) / len(values)</code>, because the list was empty.' },

    { type: 'h', text: 'try and except' },
    { type: 'p', html: 'Put code that might fail inside <code>try</code>. If it raises an exception, Python jumps to the matching <code>except</code> block instead of stopping. Use this for failures you expect and can recover from, such as a user typing text where a number belongs.' },
    { type: 'code', caption: 'safe_int.py', code: `def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return None

print(safe_int("42"))
print(safe_int("forty"))` },

    { type: 'h', text: 'Catch specific exceptions' },
    { type: 'p', html: 'Name the exception you expect. A bare <code>except:</code> or <code>except Exception:</code> also catches bugs you did not mean to handle, such as a typo in a variable name, and hides them. Catch the smallest set that makes sense, and handle each one differently when needed.' },
    { type: 'code', caption: 'specific.py', code: `def read_score(items, index):
    try:
        value = int(items[index])
    except IndexError:
        return "no such position"
    except ValueError:
        return "not a number"
    return value

print(read_score(["90", "x"], 0))
print(read_score(["90", "x"], 1))
print(read_score(["90", "x"], 5))` },
    { type: 'warn', html: 'A bare <code>except:</code> catches even <code>KeyboardInterrupt</code>, which is how a user stops a program. Avoid it. Catch named exceptions.' },

    { type: 'h', text: 'else and finally' },
    { type: 'ul', items: [
      '<code>else</code> runs only if the <code>try</code> block finished without an exception. Keep it for the code that depends on success.',
      '<code>finally</code> runs every time, whether or not an exception happened. Use it to clean up, such as closing a file.'
    ] },
    { type: 'code', caption: 'else_finally.py', code: `try:
    number = int("15")
except ValueError:
    print("bad input")
else:
    print("doubled:", number * 2)
finally:
    print("check finished")` },

    { type: 'h', text: 'Raising your own exceptions' },
    { type: 'p', html: '<code>raise</code> starts an exception on purpose. It is how a function reports that the input is wrong. The caller can then catch it, or let it stop the program. Choose a standard type that matches the problem: <code>ValueError</code> for a bad value, <code>TypeError</code> for a wrong type.' },
    { type: 'code', caption: 'raise.py', code: `def set_age(age):
    if not isinstance(age, int):
        raise TypeError("age must be a whole number")
    if age < 0:
        raise ValueError("age cannot be negative")
    return age

try:
    set_age(-4)
except ValueError as error:
    print("Rejected:", error)` },

    { type: 'h', text: 'Ask forgiveness or check first' },
    { type: 'p', html: 'Python programmers often try the operation and handle the failure ("easier to ask forgiveness than permission"). The other style checks first with an <code>if</code>. Both are valid. Use the check when it is simple and clear, such as <code>if divisor != 0</code>. Use <code>try</code> when the check is complicated or the failure can happen in many places.' },

    { type: 'h', text: 'Common exceptions' },
    { type: 'table', head: ['Exception', 'Usually means', 'Example that raises it'], rows: [
      ['<code>NameError</code>', 'Name not assigned', '<code>print(total)</code> before <code>total = 0</code>'],
      ['<code>TypeError</code>', 'Operation on the wrong type', '<code>"5" + 5</code>'],
      ['<code>ValueError</code>', 'Right type, bad value', '<code>int("x")</code>'],
      ['<code>IndexError</code>', 'Position out of range', '<code>[1, 2][5]</code>'],
      ['<code>KeyError</code>', 'Key not in dictionary', '<code>{"a": 1}["b"]</code>'],
      ['<code>ZeroDivisionError</code>', 'Division by zero', '<code>1 / 0</code>'],
      ['<code>FileNotFoundError</code>', 'File does not exist', '<code>open("missing.txt")</code>']
    ] },

    { type: 'predict', intro: 'Trace the flow: which block runs, and does the program keep going?', items: [
      { code: 'print(int("12") + 1)', a: '13' },
      { code: 'try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print("caught")', a: 'caught' },
      { code: 'try:\n    x = int("a")\nexcept ValueError:\n    print("bad")\nelse:\n    print("ok")', a: 'bad', why: 'The <code>else</code> block is skipped because an exception happened.' },
      { code: 'try:\n    print("a")\nfinally:\n    print("done")', a: 'a\ndone' },
      { code: 'try:\n    raise ValueError("no")\nexcept Exception as e:\n    print(type(e).__name__, e)', a: 'ValueError no' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Safe divide', prompt: '<p>Write <code>safe_divide(a, b)</code> that returns <code>a / b</code>, or <code>None</code> when <code>b</code> is zero. Use <code>try</code> / <code>except</code>. Test it with <code>(10, 2)</code> and <code>(10, 0)</code>.</p>',
      solution: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))` },
    { type: 'exercise', title: 'Validate a score', prompt: '<p>Write <code>check_score(score)</code> that raises <code>TypeError</code> if the score is not an <code>int</code>, and <code>ValueError</code> if it is not between 0 and 100. Otherwise it returns the score. Call it with <code>105</code> inside a <code>try</code> block and print the error message.</p>',
      hint: 'Use <code>isinstance(score, int)</code> for the type check, then a range check.',
      solution: `def check_score(score):
    if not isinstance(score, int):
        raise TypeError("score must be an int")
    if score < 0 or score > 100:
        raise ValueError("score must be 0 to 100")
    return score

try:
    check_score(105)
except ValueError as error:
    print(error)` },

    { type: 'discussion', prompts: [
      'Why is a bare <code>except:</code> dangerous? Describe a bug it could hide.',
      'A user types "twelve" into a grade form. Should the program crash, show a message, or retry? Who decides?',
      'When would you rather check with an <code>if</code> than with <code>try</code>?'
    ], facilitator: 'Have students deliberately introduce a typo (for example, <code>prnt</code>) inside a bare <code>try</code> block. Watch the bug disappear silently, then bring it back with a named exception.' }
  ],
  terms: [
    { t: 'Exception', d: 'An error signal raised when something goes wrong during execution. Unhandled exceptions stop the program.' },
    { t: 'Traceback', d: 'The report Python prints for an unhandled exception, listing the call path and ending with the exception type and message.' },
    { t: 'try / except', d: 'A block that runs code and jumps to a handler if a named exception is raised.' },
    { t: 'else (try)', d: 'A block that runs only when the try block completed without an exception.' },
    { t: 'finally', d: 'A block that always runs after try/except, used for cleanup.' },
    { t: 'raise', d: 'A statement that raises an exception on purpose.' },
    { t: 'ValueError', d: 'Raised when an argument has the right type but an inappropriate value.' },
    { t: 'TypeError', d: 'Raised when an operation is applied to a value of the wrong type.' }
  ]
});
