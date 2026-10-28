COURSE.units.push({
  id: 'u06', num: 6, stage: 's1', status: 'ready', minutes: '70 min',
  title: 'Functions',
  summary: 'Define reusable code with def, pass inputs, return results, and understand local versus global scope.',
  objectives: [
    'Define a function with <code>def</code> and call it',
    'Distinguish parameters from arguments',
    'Return a value with <code>return</code> and explain what happens when there is no <code>return</code>',
    'Use default and keyword arguments',
    'Explain why variables inside a function are local'
  ],
  blocks: [
    { type: 'h', text: 'Why functions' },
    { type: 'p', html: 'A <b>function</b> is a named block of code you can run as many times as you need. Functions make programs shorter, easier to test, and easier to change, because the logic lives in one place. You have been calling functions since Unit 1: <code>print()</code>, <code>range()</code>, and <code>int()</code> are all functions.' },

    { type: 'h', text: 'Defining and calling' },
    { type: 'code', caption: 'greet.py', code: `def greet(name):
    print(f"Hello, {name}!")

greet("Ada")
greet("Ben")` },
    { type: 'ul', items: [
      '<code>def</code> starts the definition. The name follows, then parentheses, then a colon.',
      '<b>Parameters</b> are the names listed in the definition (<code>name</code>).',
      '<b>Arguments</b> are the values you pass when calling (<code>"Ada"</code>).'
    ] },

    { type: 'h', text: 'Returning values' },
    { type: 'p', html: '<code>return</code> sends a value back to the caller and ends the function. A function without a <code>return</code> gives back <code>None</code>, Python\'s "no value" marker. Use <code>return</code> when the caller needs the result; use <code>print()</code> when the goal is only to show something.' },
    { type: 'trace', title: 'Trace: a function with a return value', intro: 'The variables <code>price</code>, <code>rate</code>, and <code>tax</code> exist only while the function runs. Watch them disappear at line 5.',
      code: `def add_tax(price, rate=0.07):
    tax = price * rate
    return price + tax

total = add_tax(100)
print(total)`,
      steps: [
        { line: 1, vars: { add_tax: 'function' } },
        { line: 2, vars: { add_tax: 'function', price: '100', rate: '0.07', tax: '7.0' } },
        { line: 3, vars: { add_tax: 'function', price: '100', rate: '0.07', tax: '7.0' } },
        { line: 5, vars: { add_tax: 'function', total: '107.0' } },
        { line: 6, vars: { add_tax: 'function', total: '107.0' }, say: '107.0' }
      ] },

    { type: 'h', text: 'Default and keyword arguments' },
    { type: 'p', html: 'A parameter can have a default value. Callers may leave it out. You can also pass arguments by name, which makes calls easier to read.' },
    { type: 'code', caption: 'defaults.py', code: `def greet(name="friend", punctuation="!"):
    print(f"Hi {name}{punctuation}")

greet()
greet("Maya")
greet(punctuation="?", name="Sam")` },

    { type: 'h', text: 'Scope: where variables live' },
    { type: 'p', html: 'A variable created inside a function is <b>local</b>. It exists only during that call. A variable created at the top level of a file is <b>global</b>. A function can <i>read</i> a global, but assigning to a name inside a function creates a new local variable instead of changing the global one.' },
    { type: 'code', caption: 'scope.py', code: `total = 10

def try_to_change():
    total = 99          # creates a new local variable
    print("inside:", total)

try_to_change()
print("outside:", total)` },
    { type: 'warn', html: 'Using a local variable outside its function raises <code>NameError</code>. Return the value instead of relying on a shared variable.' },

    { type: 'h', text: 'Good function habits' },
    { type: 'ul', items: [
      'Give each function one clear job and a verb name: <code>calculate_tax</code>, not <code>stuff</code>.',
      'Add a short docstring, a string as the first line of the body, that says what the function does.',
      'Prefer passing values in and returning results over changing globals.'
    ] },
    { type: 'code', caption: 'docstring.py', code: `def is_even(n):
    """Return True if n is divisible by 2."""
    return n % 2 == 0

print(is_even(4))
print(is_even(7))` },

    { type: 'predict', intro: 'Remember: a missing <code>return</code> gives <code>None</code>.', items: [
      { code: 'def double(x):\n    return x * 2\n\nprint(double(4))', a: '8' },
      { code: 'def hi(name="friend"):\n    print("Hi", name)\n\nhi()', a: 'Hi friend' },
      { code: 'n = 5\ndef bump(n):\n    n = n + 1\n    return n\n\nbump(n)\nprint(n)', a: '5', why: 'The function returned 6 but nothing kept it, and the global <code>n</code> was never changed.' },
      { code: 'def check(x):\n    if x > 0:\n        return "positive"\n\nprint(check(-1))', a: 'None', why: 'No <code>return</code> ran, so the function gives back <code>None</code>.' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Celsius to Fahrenheit', prompt: '<p>Write a function <code>c_to_f(celsius)</code> that returns the Fahrenheit value (<code>celsius * 9 / 5 + 32</code>). Print the result for 100 and for 0.</p>',
      solution: `def c_to_f(celsius):
    return celsius * 9 / 5 + 32

print(c_to_f(100))
print(c_to_f(0))` },
    { type: 'exercise', title: 'Largest of three', prompt: '<p>Write <code>largest(a, b, c)</code> that returns the biggest of the three numbers <b>without</b> using the built-in <code>max()</code>. Test it with 4, 9, and 2.</p>',
      hint: 'Start by assuming <code>a</code> is the biggest, then compare it to <code>b</code> and <code>c</code> with <code>if</code> statements.',
      solution: `def largest(a, b, c):
    best = a
    if b > best:
        best = b
    if c > best:
        best = c
    return best

print(largest(4, 9, 2))` },

    { type: 'discussion', prompts: [
      'Why does <code>scope.py</code> print 99 inside and 10 outside? What would make a beginner expect the outside value to change?',
      'When would you want a default argument, and when would you rather require the caller to supply the value?',
      'If you wrote one function that does three jobs, how would you split it?'
    ], facilitator: 'Ask a student to explain the difference between <code>print()</code> and <code>return</code> in their own words. Most confusion in this unit is between the two.' }
  ],
  terms: [
    { t: 'Function', d: 'A named, reusable block of code, defined with <code>def</code> and run by calling it.' },
    { t: 'Parameter', d: 'A variable name in a function definition that receives a value when the function is called.' },
    { t: 'Argument', d: 'The actual value passed to a function when it is called.' },
    { t: 'return', d: 'A statement that ends a function and sends a value back to the caller.' },
    { t: 'None', d: 'Python\'s special value meaning "no value". Functions without a <code>return</code> produce it.' },
    { t: 'Default argument', d: 'A parameter with a preset value, such as <code>rate=0.07</code>, used when the caller does not supply one.' },
    { t: 'Keyword argument', d: 'An argument passed by name, such as <code>greet(name="Sam")</code>.' },
    { t: 'Local variable', d: 'A variable that exists only inside the function where it was created.' },
    { t: 'Global variable', d: 'A variable defined at the top level of a program, visible to the code that follows it.' },
    { t: 'Docstring', d: 'A string literal placed as the first line of a function body to document what it does.' }
  ]
});
