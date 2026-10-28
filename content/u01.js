COURSE.units.push({
  id: 'u01', num: 1, stage: 's1', status: 'ready', minutes: '45 min',
  title: 'Your First Python Program',
  summary: 'Print output, store values in variables, write comments, and read error messages.',
  objectives: [
    'Run a Python statement and explain what <code>print()</code> does',
    'Create variables with the assignment operator <code>=</code>',
    'Follow the naming rules for variables and choose readable names',
    'Write comments that explain intent',
    'Read a simple error message and find the line that caused it'
  ],
  blocks: [
    { type: 'h', text: 'Why Python' },
    { type: 'p', html: 'Python reads close to plain English, which makes it a good first language and a strong tool for working professionals. The same language runs web sites, data analysis, automation, and machine-learning models. Everything you learn in this course applies to all of those.' },

    { type: 'h', text: 'Your first program' },
    { type: 'p', html: 'A Python program is a list of <b>statements</b>. Python runs them from top to bottom, one at a time. The <code>print()</code> function displays a value on the screen (the output).' },
    { type: 'code', caption: 'hello.py', code: `print("Hello, world!")
print("Python is running.")` },
    { type: 'tip', html: 'Press <b>Run ▶</b> on any code box to execute it in your browser, or copy the code and paste it into the Sandbox page.' },

    { type: 'h', text: 'Variables store values' },
    { type: 'p', html: 'A <b>variable</b> is a name that points to a value. You create one with the assignment operator <code>=</code>. The right side is evaluated first, then the result is stored under the name on the left. Read <code>=</code> as "gets", not as "equals".' },
    { type: 'code', caption: 'variables.py', code: `name = "Ada"
age = 36
print(name)
print(age)` },
    { type: 'trace', title: 'Trace: a variable is reassigned', intro: 'Step through the code. Notice that <code>y</code> keeps the value it was given. Changing <code>x</code> later does not change <code>y</code>.',
      code: `x = 5
y = x + 2
x = 10
print(y)`,
      steps: [
        { line: 1, vars: { x: '5' } },
        { line: 2, vars: { x: '5', y: '7' } },
        { line: 3, vars: { x: '10', y: '7' } },
        { line: 4, vars: { x: '10', y: '7' }, say: '7' }
      ] },

    { type: 'h', text: 'Naming rules' },
    { type: 'ul', items: [
      'Names may use letters, digits, and underscores <code>_</code>.',
      'A name cannot start with a digit. <code>2nd_place</code> is illegal; <code>second_place</code> is fine.',
      'Names are <b>case-sensitive</b>. <code>Score</code> and <code>score</code> are two different variables.',
      'Names cannot be Python keywords such as <code>for</code>, <code>if</code>, <code>while</code>, or <code>True</code>.',
      'Use <b>snake_case</b> (lowercase words joined by underscores). It is the Python convention.'
    ] },
    { type: 'table', head: ['Name', 'Legal?', 'Why'], rows: [
      ['<code>total_price</code>', 'Yes', 'Descriptive snake_case'],
      ['<code>x1</code>', 'Yes', 'Letters then a digit is fine'],
      ['<code>1st</code>', 'No', 'Starts with a digit'],
      ['<code>my-name</code>', 'No', 'A hyphen is read as minus'],
      ['<code>class</code>', 'No', 'Reserved keyword']
    ] },

    { type: 'h', text: 'Comments' },
    { type: 'p', html: 'A comment starts with <code>#</code>. Python ignores everything after it on that line. Use comments to explain <i>why</i> code does something, not to repeat what the code already says.' },
    { type: 'code', caption: 'commented.py', code: `# Store the sales tax rate so it is easy to change later.
TAX_RATE = 0.07

price = 40          # the price before tax
print(price * (1 + TAX_RATE))` },

    { type: 'h', text: 'Reading errors' },
    { type: 'p', html: 'When Python cannot run a line, it stops and prints an error. The last line says what went wrong, and the line above it says where. Errors are information, not failure.' },
    { type: 'code', caption: 'broken.py', code: `print(score)` },
    { type: 'p', html: 'That produces <code>NameError: name \'score\' is not defined</code>. The name <code>score</code> was never assigned. Fix it by creating the variable first.' },

    { type: 'predict', intro: 'Before you run anything, decide what each program prints.', items: [
      { code: 'print(2 + 3)', a: '5' },
      { code: 'print("2 + 3")', a: '2 + 3', why: 'Inside quotes, Python treats the text literally. It is a string, not math.' },
      { code: 'a = 1\nb = a\na = 2\nprint(b)', a: '1', why: '<code>b</code> received the value of <code>a</code> at that moment. Later changes to <code>a</code> do not affect <code>b</code>.' },
      { code: 'print(score)', a: 'NameError', why: 'The name was never assigned, so Python cannot find it.' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Introduce yourself', prompt: '<p>Create three variables: <code>name</code> (text), <code>favorite_number</code> (a whole number), and <code>city</code> (text). Print each one on its own line.</p>',
      hint: 'Text goes in quotes. Numbers do not.',
      solution: `name = "Jordan"
favorite_number = 7
city = "Cumming"
print(name)
print(favorite_number)
print(city)` },
    { type: 'exercise', title: 'Swap two values', prompt: '<p>Given <code>a = 1</code> and <code>b = 2</code>, write code that swaps them so <code>a</code> ends with 2 and <code>b</code> ends with 1. Use a third variable called <code>temp</code>.</p>',
      hint: 'Save one value before you overwrite it.',
      solution: `a = 1
b = 2
temp = a
a = b
b = temp
print(a, b)` },

    { type: 'discussion', prompts: [
      'Why do you think Python uses the <code>=</code> symbol for assignment when math uses it for equality? What does that cost a beginner?',
      'Give an example of a comment that repeats the code and one that explains why. Which one is more useful six months from now?',
      'Which naming rule do you think causes the most confusion for new programmers, and why?'
    ], facilitator: 'Students often read <code>x = x + 1</code> as an impossible equation. Have them trace it with the Trace tool above, or ask: "what is <code>x</code> before the line? after?"' }
  ],
  terms: [
    { t: 'Statement', d: 'One complete instruction the interpreter runs, such as <code>print("hi")</code> or <code>x = 3</code>.' },
    { t: 'Interpreter', d: 'The program that reads Python code and runs it. Python code runs line by line through the interpreter.' },
    { t: 'Variable', d: 'A name that refers to a value stored in memory. The value can be changed by assigning a new one.' },
    { t: 'Assignment', d: 'Storing a value under a name using <code>=</code>. The right side is computed first.' },
    { t: 'print()', d: 'A built-in function that writes its arguments to the output, separated by spaces, followed by a newline.' },
    { t: 'Comment', d: 'Text after <code>#</code> that Python ignores. Used to explain intent to human readers.' },
    { t: 'Keyword', d: 'A word reserved by the language (for example <code>if</code>, <code>for</code>, <code>True</code>). It cannot be used as a variable name.' },
    { t: 'snake_case', d: 'Naming style with lowercase words joined by underscores, such as <code>total_price</code>. Python\'s convention for variables and functions.' },
    { t: 'NameError', d: 'The error raised when code uses a name that has not been assigned.' },
    { t: 'SyntaxError', d: 'The error raised when code breaks the grammar of the language, such as a missing quotation mark or parenthesis.' }
  ]
});
