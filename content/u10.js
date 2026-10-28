COURSE.units.push({
  id: 'u10', num: 10, stage: 's1', status: 'ready', minutes: '60 min',
  title: 'Libraries and Modules',
  summary: 'Import the standard library, read its documentation, and split your own code into modules.',
  objectives: [
    'Import a module and call its functions with dot notation',
    'Use <code>from ... import</code> and <code>import ... as</code> and explain when each is appropriate',
    'Find a function\'s documentation with <code>help()</code> and <code>dir()</code>',
    'Explain what the standard library includes and what <code>pip</code> adds',
    'Create a module file and import it from another file'
  ],
  blocks: [
    { type: 'h', text: 'Modules and libraries' },
    { type: 'p', html: 'A <b>module</b> is a file of Python code that can be imported. A <b>library</b> is a collection of modules. Python ships with a large <b>standard library</b>, so many common tasks need no installation. Anything else you install with <code>pip</code>, which is covered in the NumPy and pandas units.' },

    { type: 'h', text: 'Importing' },
    { type: 'code', caption: 'imports.py', code: `import math
import statistics

print(math.sqrt(16))
print(math.pi)
print(math.floor(3.7))
print(statistics.mean([2, 4, 6]))` },
    { type: 'p', html: 'After <code>import math</code>, everything in the module is reached with a dot: <code>math.sqrt</code>. The name <code>math</code> comes first so you always know where a function lives.' },
    { type: 'code', caption: 'import_styles.py', code: `from math import ceil, factorial
print(ceil(2.1))
print(factorial(5))

import math as m
print(m.hypot(3, 4))` },
    { type: 'tip', html: 'Use <code>import math</code> when many names come from one module. Use <code>from math import ceil</code> when you need only one or two names. An alias such as <code>as m</code> is common for long names; pandas and NumPy use <code>pd</code> and <code>np</code> by convention.' },

    { type: 'h', text: 'Finding out what a module offers' },
    { type: 'code', caption: 'discover.py', code: `import math

print(len(dir(math)))          # how many names the module has
print(math.sqrt.__doc__)       # the documentation string` },
    { type: 'p', html: 'In an interactive environment, <code>help(math.sqrt)</code> prints the same documentation. Reading the documentation is a skill you will use every day. Get in the habit of checking the docs before guessing.' },

    { type: 'h', text: 'Some useful standard-library tools' },
    { type: 'table', head: ['Module', 'What it gives you', 'Example'], rows: [
      ['<code>math</code>', 'Square root, rounding, trig, constants', '<code>math.sqrt(9)</code> → 3.0'],
      ['<code>statistics</code>', 'Mean, median, standard deviation', '<code>statistics.median([1, 3, 9])</code> → 3'],
      ['<code>random</code>', 'Random choices and numbers', '<code>random.choice(["a", "b"])</code>'],
      ['<code>datetime</code>', 'Dates and times', '<code>datetime.date.today()</code>'],
      ['<code>csv</code> / <code>json</code>', 'Read and write common data files', '<code>json.loads(text)</code>']
    ] },
    { type: 'note', html: 'Random results differ on every run. To get the same "random" numbers each time while you test, call <code>random.seed(42)</code> first. Seeding is standard practice in data science and machine learning.' },

    { type: 'h', text: 'Writing your own module' },
    { type: 'p', html: 'Any <code>.py</code> file is a module. Put a helpful function in its own file and import it from your main program. Two files are needed, so this example is shown as code to save on your computer rather than in the browser sandbox.' },
    { type: 'code', caption: 'greetings.py (module file)', run: false, code: `def hello(name):
    """Return a friendly greeting."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    # Runs only when you run this file directly, not when it is imported.
    print(hello("test"))` },
    { type: 'code', caption: 'main.py (in the same folder)', run: false, code: `from greetings import hello

print(hello("Ada"))` },
    { type: 'p', html: 'The <code>if __name__ == "__main__":</code> line lets a file work both as a script and as a module. Python sets <code>__name__</code> to <code>"__main__"</code> only when the file is run directly.' },
    { type: 'warn', html: 'Do not name your file the same as a standard-library module (for example <code>random.py</code> or <code>math.py</code>). Python will import your file instead of the library and the program will fail in confusing ways.' },

    { type: 'predict', intro: 'Remember what <code>round()</code> does with exactly .5, and that <code>math</code> functions return floats.', items: [
      { code: 'import math\nprint(math.floor(-2.5))', a: '-3' },
      { code: 'import math\nprint(math.ceil(2.1))', a: '3' },
      { code: 'from math import pow\nprint(pow(2, 3))', a: '8.0' },
      { code: 'import math\nprint(math.factorial(5))', a: '120' },
      { code: 'print(round(2.5))', a: '2', why: 'Python rounds .5 to the nearest even number ("banker\'s rounding").' },
      { code: 'print(round(3.5))', a: '4' },
      { code: 'import math\nprint(math.hypot(3, 4))', a: '5.0' },
      { code: 'print(abs(-7))', a: '7' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Hypotenuse two ways', prompt: '<p>For a right triangle with legs 5 and 12, compute the hypotenuse once with <code>math.sqrt</code> and once with <code>math.hypot</code>. Print both results.</p>',
      solution: `import math

a = 5
b = 12
print(math.sqrt(a ** 2 + b ** 2))
print(math.hypot(a, b))` },
    { type: 'exercise', title: 'Build a module', runnable: false, prompt: '<p>Create <code>shapes.py</code> with a function <code>circle_area(radius)</code> that returns <code>math.pi * radius ** 2</code>. In a second file, import it and print the area of a circle with radius 2. Write both files on your computer.</p>',
      hint: 'The module file needs <code>import math</code> at the top.',
      solution: `# shapes.py
import math

def circle_area(radius):
    return math.pi * radius ** 2

# main.py
from shapes import circle_area
print(circle_area(2))` },

    { type: 'discussion', prompts: [
      'Why do you think Python includes a large standard library instead of making everyone install packages? What are the trade-offs?',
      'What is the risk of a file named <code>random.py</code> in your project folder? How would you find the cause of the error?',
      'When you see <code>import numpy as np</code> in someone else\'s code, what do you expect the rest of the code to look like?'
    ], facilitator: 'Show students how to find a module\'s documentation online (docs.python.org) and how to check whether a name came from the standard library or from a file in their folder.' }
  ],
  terms: [
    { t: 'Module', d: 'A Python file (<code>.py</code>) whose functions and variables can be imported into another program.' },
    { t: 'Library', d: 'A collection of modules that provides a set of related tools, such as the standard library, NumPy, or pandas.' },
    { t: 'Standard library', d: 'The modules that come with every Python installation, such as <code>math</code>, <code>random</code>, and <code>json</code>.' },
    { t: 'import', d: 'A statement that loads a module so its names can be used.' },
    { t: 'Alias', d: 'A shorter name given to a module on import, such as <code>import numpy as np</code>.' },
    { t: 'pip', d: 'The package installer for Python. It downloads third-party libraries from the Python Package Index.' },
    { t: 'Seed', d: 'A starting value for a random number generator. The same seed produces the same sequence every run.' },
    { t: '__name__', d: 'A built-in variable. It equals <code>"__main__"</code> when a file is run directly, and the module name when imported.' }
  ]
});
