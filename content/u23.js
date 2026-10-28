COURSE.units.push({
  id: 'u23', num: 23, stage: 's4', status: 'ready', minutes: '90 min',
  title: 'Working Like a Python Developer',
  summary: 'Input from users, generators, match statements, scope keywords, identity versus equality, testing with assert and unittest, virtual environments with pip, and Jupyter or Colab.',
  objectives: [
    'Read user input with <code>input()</code> and convert it safely',
    'Write a generator with <code>yield</code> and explain why it saves memory',
    'Use a <code>match</code> statement to choose among patterns',
    'Explain <code>global</code> and <code>nonlocal</code>, and when to avoid them',
    'Tell <code>is</code> from <code>==</code>',
    'Write a test with <code>assert</code> and <code>unittest</code>',
    'Create a virtual environment and install packages with pip',
    'Run notebook code in Jupyter or Google Colab'
  ],
  blocks: [
    { type: 'note', html: 'This is a reference unit. Read it before Units 19 to 21, which use Colab and pip. The sandbox cannot run <code>input()</code>, so those examples are shown as code to run on your computer or in Colab.' },

    { type: 'h', text: 'Reading input' },
    { type: 'p', html: '<code>input(prompt)</code> pauses the program, shows the prompt, and returns what the user typed as a <b>string</b>. Convert it before using it as a number. Anything a user types can be wrong, so pair the conversion with an exception check from Unit 11.' },
    { type: 'code', caption: 'ask_age.py', run: false, code: `def ask_age():
    while True:
        text = input("Your age: ")
        try:
            age = int(text)
        except ValueError:
            print("Please type a whole number.")
            continue
        if age < 0:
            print("Age cannot be negative.")
            continue
        return age

print("You are", ask_age())` },

    { type: 'h', text: 'Generators: values one at a time' },
    { type: 'p', html: 'A function that uses <code>yield</code> is a <b>generator</b>. Each <code>yield</code> hands back one value and pauses. The next value is computed only when it is asked for. A list of a million numbers is stored in memory all at once; a generator can produce the same numbers without storing them.' },
    { type: 'code', caption: 'generator.py', code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)))

total = 0
for value in countdown(4):
    total += value
print(total)` },
    { type: 'p', html: 'Generator expressions from Unit 12 are generators too. Use them when you only need to loop once over a large sequence.' },

    { type: 'h', text: 'match: choosing by pattern' },
    { type: 'p', html: 'The <code>match</code> statement (Python 3.10 and later) compares a value against several patterns. It is clearer than a long <code>elif</code> chain when you are checking one value against fixed options. The <code>_</code> pattern is the default.' },
    { type: 'code', caption: 'match.py', code: `def describe(code):
    match code:
        case 200:
            return "OK"
        case 404:
            return "Not found"
        case 500 | 503:
            return "Server problem"
        case _:
            return "Unknown"

print(describe(404))
print(describe(503))
print(describe(302))` },

    { type: 'h', text: 'global and nonlocal' },
    { type: 'p', html: 'Unit 6 showed that assigning a name inside a function creates a local variable. <code>global name</code> tells Python to assign the module-level variable instead. <code>nonlocal name</code> does the same for a variable in an enclosing function.' },
    { type: 'code', caption: 'global_nonlocal.py', code: `count = 0

def bump():
    global count
    count += 1

def make_counter():
    total = 0
    def add():
        nonlocal total
        total += 1
        return total
    return add

bump()
bump()
print(count)

counter = make_counter()
counter()
print(counter())` },
    { type: 'warn', html: 'Use <code>global</code> sparingly. A function that changes a global is hard to test and hard to reason about. Passing values in and returning results (Unit 6) is almost always clearer.' },

    { type: 'h', text: 'is versus ==' },
    { type: 'p', html: '<code>==</code> asks whether two values are equal. <code>is</code> asks whether they are the <b>same object</b> in memory. Use <code>is</code> for <code>None</code> and for the singletons <code>True</code> and <code>False</code>; use <code>==</code> for everything else.' },
    { type: 'code', caption: 'identity.py', code: `a = [1, 2]
b = [1, 2]
c = a
print(a == b, a is b)
print(a is c)
print(None is None)` },

    { type: 'h', text: 'Testing with assert' },
    { type: 'p', html: '<code>assert condition, message</code> stops the program with an <code>AssertionError</code> when the condition is False. It is a quick check during development. Tests are written the same way, but kept in files and run automatically.' },
    { type: 'code', caption: 'assert_demo.py', code: `def add_tax(price, rate=0.07):
    return round(price * (1 + rate), 2)

assert add_tax(100) == 107.0, "100 with tax should be 107.0"
assert add_tax(0) == 0, "zero stays zero"
print("all checks passed")` },

    { type: 'h', text: 'Testing with unittest' },
    { type: 'p', html: 'The <code>unittest</code> module (in the standard library) organizes tests into classes. Each method whose name starts with <code>test_</code> is a test. Run the file with <code>python test_tax.py</code>, and you see how many tests passed.' },
    { type: 'code', caption: 'test_tax.py', run: false, code: `import unittest

def add_tax(price, rate=0.07):
    return round(price * (1 + rate), 2)

class TestAddTax(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(add_tax(100), 107.0)

    def test_zero(self):
        self.assertEqual(add_tax(0), 0)

if __name__ == "__main__":
    unittest.main()` },
    { type: 'tip', html: 'Write the test before you fix a bug. If the test fails, you have reproduced the bug. When it passes, the bug stays fixed even after future changes.' },

    { type: 'h', text: 'Virtual environments and pip' },
    { type: 'p', html: 'A <b>virtual environment</b> is a private folder of packages for one project, so different projects can use different versions. Create one once per project, activate it, then install with <code>pip</code>. These commands are typed in a terminal, not in Python.' },
    { type: 'code', caption: 'terminal (not Python)', run: false, code: `python -m venv .venv
# Windows:   .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install numpy pandas scikit-learn matplotlib
pip freeze > requirements.txt` },
    { type: 'p', html: '<code>pip freeze</code> records the exact versions you installed in <code>requirements.txt</code>. Someone else can recreate the environment with <code>pip install -r requirements.txt</code>. Keeping this file is the difference between code that runs once and code that runs again.' },

    { type: 'h', text: 'Jupyter and Google Colab' },
    { type: 'p', html: 'A <b>notebook</b> mixes code cells with text, and each cell runs in the same session. It is ideal for exploring data and for lessons like these. <b>Google Colab</b> runs notebooks in your browser with NumPy, pandas, scikit-learn, matplotlib, and PyTorch already installed (PyTorch is used in Units 20 and 21). To install something extra in Colab, run <code>!pip install package-name</code> in a cell.' },
    { type: 'ul', items: [
      'Run a cell with Shift+Enter. The variables persist between cells.',
      'If results look wrong, use Runtime → Restart session and run everything from the top. Hidden state from earlier cells is a common source of confusing results.',
      'Notebooks are for exploring. Move code you rely on into a <code>.py</code> file with functions and tests.'
    ] },

    { type: 'h', text: 'Debugging with print and the debugger' },
    { type: 'p', html: 'The fastest debugger is a <code>print()</code> that shows the value you are unsure about, with a label. Remove it when you are done. For longer problems, the built-in debugger <code>breakpoint()</code> pauses the program at that line and lets you inspect variables. Type <code>c</code> to continue and <code>q</code> to quit.' },

    { type: 'predict', intro: 'Reason through the behavior, then check it.', items: [
      { code: 'def g():\n    yield 1\n    yield 2\nprint(list(g()))', a: '[1, 2]' },
      { code: 'x = None\nprint(x is None)', a: 'True' },
      { code: 'print([1] == [1], [1] is [1])', a: 'True False', why: 'Two separate list objects with the same contents.' },
      { code: 'def f(n):\n    match n:\n        case 0:\n            return "zero"\n        case _:\n            return "other"\nprint(f(5))', a: 'other' },
      { code: 'count = 1\ndef f():\n    global count\n    count = 5\nf()\nprint(count)', a: '5' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Even numbers generator', prompt: '<p>Write a generator <code>evens(limit)</code> that yields the even numbers from 0 up to but not including <code>limit</code>. Print <code>list(evens(10))</code>.</p>',
      solution: `def evens(limit):
    for n in range(0, limit, 2):
        yield n

print(list(evens(10)))` },
    { type: 'exercise', title: 'Test a function', prompt: '<p>Write a function <code>is_leap(year)</code> using the rule: divisible by 4, except centuries that are not divisible by 400. Write two <code>assert</code> statements: 2024 is leap, and 1900 is not.</p>',
      solution: `def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

assert is_leap(2024), "2024 is a leap year"
assert not is_leap(1900), "1900 is not a leap year"
print("tests passed")` },

    { type: 'discussion', prompts: [
      'Why does a generator matter for a file with ten million lines? What would a list of those lines cost?',
      'You inherit a project with no <code>requirements.txt</code>. What would you do first, and why?',
      'Which tool in this unit would have saved you the most time in a project you already finished?'
    ], facilitator: 'Demonstrate the <code>is</code> trap: <code>x = 1000; y = 1000; print(x is y)</code> can print True or False depending on how Python caches numbers. The lesson is that <code>is</code> is for identity checks, not equality.' }
  ],
  terms: [
    { t: 'input()', d: 'A built-in that shows a prompt and returns the user\'s typed text as a string.' },
    { t: 'Generator', d: 'A function that uses <code>yield</code> to produce values one at a time, pausing between them.' },
    { t: 'yield', d: 'A statement that returns a value from a generator and pauses until the next value is requested.' },
    { t: 'match statement', d: 'A statement that compares a value against patterns and runs the first pattern that fits (Python 3.10+).' },
    { t: 'global / nonlocal', d: 'Keywords that let a function assign a variable from the module level (<code>global</code>) or an enclosing function (<code>nonlocal</code>).' },
    { t: 'is', d: 'The identity operator. True when two names refer to the same object in memory.' },
    { t: 'assert', d: 'A statement that raises <code>AssertionError</code> when its condition is False, used for quick checks and tests.' },
    { t: 'unittest', d: 'The standard-library testing framework. Tests are methods named <code>test_...</code> inside a <code>TestCase</code> class.' },
    { t: 'Virtual environment', d: 'An isolated folder of installed packages for one project, created with <code>python -m venv</code>.' },
    { t: 'pip', d: 'The package installer for Python. Installs libraries from the Python Package Index.' },
    { t: 'Notebook', d: 'A document of code and text cells, each runnable in a shared session. Jupyter and Google Colab both use notebooks.' }
  ]
});
