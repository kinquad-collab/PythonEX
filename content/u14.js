COURSE.units.push({
  id: 'u14', num: 14, stage: 's1', status: 'ready', minutes: '80 min',
  title: 'Classes and Objects',
  summary: 'Bundle data and behavior together: define classes, create objects, write methods, and use inheritance.',
  objectives: [
    'Define a class and create objects (instances) from it',
    'Write <code>__init__</code> to set up each object, and explain <code>self</code>',
    'Write methods that read and change an object\'s attributes',
    'Tell class attributes from instance attributes',
    'Create a subclass that reuses and extends a parent class with <code>super()</code>',
    'Use a dataclass for a simple record'
  ],
  blocks: [
    { type: 'h', text: 'Why classes' },
    { type: 'p', html: 'So far, data and functions have been separate: a dictionary holds a student\'s name and grades, and a function computes the average from it. A <b>class</b> combines the two. It defines a kind of object, with data (<b>attributes</b>) and behavior (<b>methods</b>) kept together. Every value you have used, such as a list or a string, is already an object of some class.' },

    { type: 'h', text: 'A first class' },
    { type: 'code', caption: 'student.py', code: `class Student:
    def __init__(self, name):
        self.name = name
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def average(self):
        return sum(self.grades) / len(self.grades)

maya = Student("Maya")
maya.add_grade(91)
maya.add_grade(88)
print(maya.name, maya.average())` },
    { type: 'ul', items: [
      '<code>class Student:</code> defines the blueprint. By convention, class names are CapitalizedWords.',
      '<code>__init__</code> runs once when you create an object. It sets up the starting attributes.',
      '<code>self</code> is the object the method was called on. It is always the first parameter of a method, and Python fills it in for you.',
      '<code>Student("Maya")</code> creates an <b>instance</b>. Each instance has its own separate data.'
    ] },
    { type: 'trace', title: 'Trace: two objects, separate data', intro: 'Each object holds its own copy of the attributes. Changing one does not change the other.',
      code: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return self.name + " says woof"

a = Dog("Rex")
b = Dog("Milo")
print(a.bark())
print(b.name)`,
      steps: [
        { line: 5, vars: { Dog: 'class' } },
        { line: 8, vars: { Dog: 'class', a: 'Dog(name="Rex")' } },
        { line: 9, vars: { Dog: 'class', a: 'Dog(name="Rex")', b: 'Dog(name="Milo")' } },
        { line: 10, vars: { Dog: 'class', a: 'Dog(name="Rex")', b: 'Dog(name="Milo")' }, say: 'Rex says woof' },
        { line: 11, vars: { Dog: 'class', a: 'Dog(name="Rex")', b: 'Dog(name="Milo")' }, say: 'Milo' }
      ] },

    { type: 'h', text: 'Class attributes and instance attributes' },
    { type: 'p', html: 'An attribute set on <code>self</code> belongs to one object. An attribute set directly in the class body belongs to the class, and every object shares it. Use class attributes for constants or counters that describe the whole group.' },
    { type: 'code', caption: 'class_attr.py', code: `class Course:
    school = "Denmark High School"   # shared by every Course

    def __init__(self, title):
        self.title = title           # one per object

python = Course("Python")
ai = Course("AI")
print(python.school, "|", ai.title)` },

    { type: 'h', text: 'Special methods: __str__' },
    { type: 'p', html: 'Methods named with double underscores on both sides are <b>special methods</b>. Python calls them automatically. <code>__str__</code> controls what <code>print()</code> shows for your object.' },
    { type: 'code', caption: 'str_method.py', code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(3, 4)
print(p)
print(str(p))` },

    { type: 'h', text: 'Inheritance' },
    { type: 'p', html: 'A <b>subclass</b> inherits everything from a parent class and can add or replace methods. Write <code>class Child(Parent):</code>. Call <code>super().__init__()</code> to run the parent\'s setup before adding your own.' },
    { type: 'code', caption: 'inheritance.py', code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow"

class Cow(Animal):
    def speak(self):
        return f"{self.name} says moo"

for pet in [Cat("Ivy"), Cow("Bess")]:
    print(pet.speak())` },
    { type: 'p', html: 'Both subclasses replace <code>speak</code>. This is <b>polymorphism</b>: the loop does not care which kind of animal it has, because each one knows how to speak.' },

    { type: 'h', text: 'Dataclasses: records without boilerplate' },
    { type: 'p', html: 'When a class is only a bundle of fields, the <code>dataclasses</code> module writes <code>__init__</code> and <code>__repr__</code> for you. <code>@dataclass</code> is a <b>decorator</b>: a line above the class that changes it.' },
    { type: 'code', caption: 'dataclass.py', code: `from dataclasses import dataclass

@dataclass
class Book:
    title: str
    pages: int

b = Book("Dune", 412)
print(b)
print(b.pages > 300)` },
    { type: 'tip', html: 'Use a plain class when behavior matters most. Use a dataclass when the object is mostly data, such as a row of a table.' },

    { type: 'predict', intro: 'Trace what each object holds and what each method returns.', items: [
      { code: 'class C:\n    def __init__(self, n):\n        self.n = n\n\nprint(C(5).n)', a: '5' },
      { code: 'class C:\n    count = 0\n    def __init__(self):\n        C.count += 1\n\nC()\nC()\nprint(C.count)', a: '2', why: 'The shared class attribute counts every object created.' },
      { code: 'class A:\n    def hi(self):\n        return "A"\nclass B(A):\n    pass\nprint(B().hi())', a: 'A', why: 'B has no hi of its own, so it inherits A\'s.' },
      { code: 'class P:\n    def __init__(self, x):\n        self.x = x\n    def __str__(self):\n        return f"P{self.x}"\nprint(P(7))', a: 'P7' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Bank account', prompt: '<p>Write a class <code>Account</code> with an opening balance set in <code>__init__</code>, a <code>deposit(amount)</code> method, and a <code>withdraw(amount)</code> method that refuses (returns <code>False</code>) when the balance is too low. Deposit 100, withdraw 30, then try to withdraw 500 and print the final balance.</p>',
      hint: 'Check <code>amount &lt;= self.balance</code> before subtracting.',
      solution: `class Account:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True

acct = Account()
acct.deposit(100)
acct.withdraw(30)
acct.withdraw(500)
print(acct.balance)` },
    { type: 'exercise', title: 'Shapes', prompt: '<p>Create a class <code>Rectangle</code> with <code>width</code> and <code>height</code>, a method <code>area()</code>, and a subclass <code>Square</code> whose constructor takes one size. Print the area of a <code>Square(4)</code>.</p>',
      solution: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Square(Rectangle):
    def __init__(self, size):
        super().__init__(size, size)

print(Square(4).area())` },

    { type: 'discussion', prompts: [
      'What is the difference between a class and an object? Use a real-world example that is not a computer.',
      'When a method uses data from many different parts of a program, is it a sign that the data should belong to a class? Why or why not?',
      'Inheritance can make code shorter or harder to follow. When would you avoid it?'
    ], facilitator: 'Many students forget <code>self</code> inside a method body (writing <code>name</code> instead of <code>self.name</code>). Trace that mistake and show the NameError it causes.' }
  ],
  terms: [
    { t: 'Class', d: 'A blueprint that defines the attributes and methods shared by a kind of object.' },
    { t: 'Object / instance', d: 'A specific value created from a class. Each instance has its own attributes.' },
    { t: 'Attribute', d: 'A variable that belongs to an object, read with a dot, such as <code>maya.name</code>.' },
    { t: 'Method', d: 'A function defined inside a class. It receives the object as <code>self</code>.' },
    { t: 'self', d: 'The conventional name of the first parameter of a method, referring to the object the method was called on.' },
    { t: '__init__', d: 'The special method that sets up a new object when it is created.' },
    { t: '__str__', d: 'The special method that returns the text shown by <code>print()</code> and <code>str()</code>.' },
    { t: 'Inheritance', d: 'A class that takes over the attributes and methods of a parent class, written <code>class Child(Parent):</code>.' },
    { t: 'super()', d: 'A way to call a method from the parent class, such as the parent\'s <code>__init__</code>.' },
    { t: 'Polymorphism', d: 'Using one interface on different kinds of objects, where each responds in its own way.' },
    { t: 'Dataclass', d: 'A class decorated with <code>@dataclass</code> that generates the constructor and printable form from its field annotations.' },
    { t: 'Decorator', d: 'A line starting with <code>@</code> placed above a function or class that wraps or modifies it.' }
  ]
});
