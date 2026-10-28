COURSE.units.push({
  id: 'u16', num: 16, stage: 's2', status: 'ready', minutes: '90 min',
  title: 'NumPy: Arrays and Fast Math',
  summary: 'Arrays with a fixed type and shape, math without loops, indexing and masks, broadcasting, and the matrix product.',
  objectives: [
    'Create arrays and explain how they differ from Python lists',
    'Read an array\'s <code>shape</code>, <code>dtype</code>, and <code>ndim</code>',
    'Use vectorized math instead of loops, and explain why it is faster',
    'Index, slice, and select with boolean masks in 1-D and 2-D arrays',
    'Aggregate along an axis and predict the shape of the result',
    'Use broadcasting and the <code>@</code> matrix product'
  ],
  blocks: [
    { type: 'h', text: 'Why NumPy' },
    { type: 'p', html: 'NumPy stores numbers in a compact block of memory, all with the same type, and runs its math in optimized code. An operation on a whole array happens in one step, with no Python loop. This is the foundation for pandas, scikit-learn, and PyTorch: all of them use NumPy-style arrays underneath.' },
    { type: 'code', caption: 'import_numpy.py', code: `import numpy as np

a = np.array([1, 2, 3, 4])
print(a)
print(a * 10)
print(a.shape, a.dtype)` },
    { type: 'note', html: 'The convention is <code>import numpy as np</code>. Nearly every tutorial and codebase uses <code>np</code>.' },

    { type: 'h', text: 'Arrays versus lists' },
    { type: 'table', head: ['', 'List', 'NumPy array'], rows: [
      ['Element types', 'Can mix types', 'One type for all items (<code>dtype</code>)'],
      ['<code>[1, 2] * 2</code>', '<code>[1, 2, 1, 2]</code> (repeats)', '<code>[2 4]</code> (multiplies each item)'],
      ['<code>+</code> between two', 'Joins them', 'Adds item by item'],
      ['Math on every item', 'Needs a loop or comprehension', 'Written directly'],
      ['Speed on large data', 'Slower', 'Much faster']
    ] },
    { type: 'warn', html: '<code>[1, 2] * 2</code> repeats the list. <code>np.array([1, 2]) * 2</code> multiplies each number. Mixing these up is the most common NumPy beginner error.' },

    { type: 'h', text: 'Creating arrays' },
    { type: 'code', caption: 'creating.py', code: `import numpy as np

print(np.zeros(3))
print(np.ones((2, 3)))
print(np.arange(0, 10, 2))
print(np.linspace(0, 1, 5))
print(np.eye(2))` },
    { type: 'p', html: '<code>np.arange(start, stop, step)</code> works like <code>range</code> but returns an array. <code>np.linspace(start, stop, count)</code> gives evenly spaced values and includes <code>stop</code>. The shape is a tuple: <code>(2, 3)</code> means two rows, three columns.' },

    { type: 'h', text: 'Shape, dtype, and reshape' },
    { type: 'code', caption: 'shape.py', code: `import numpy as np

a = np.arange(6)
print(a.shape)
grid = a.reshape(2, 3)
print(grid)
print(grid.shape, grid.ndim)
print(np.array([1.5, 2]).dtype)` },
    { type: 'p', html: '<code>reshape</code> changes the shape without changing the data. The new shape must hold the same number of items. Use <code>-1</code> to let NumPy calculate one dimension for you: <code>a.reshape(-1, 2)</code> gives three rows here.' },

    { type: 'h', text: 'Indexing and slicing' },
    { type: 'p', html: 'For a 2-D array, <code>grid[row, col]</code> picks one element. A colon selects a whole range. <code>grid[:, 1]</code> means "all rows, column 1".' },
    { type: 'code', caption: 'indexing.py', code: `import numpy as np

grid = np.arange(1, 13).reshape(3, 4)
print(grid)
print(grid[0, 2])
print(grid[1])
print(grid[:, 1])
print(grid[1:, :2])` },

    { type: 'h', text: 'Boolean masks' },
    { type: 'p', html: 'Comparing an array with a value gives a <b>boolean mask</b>: an array of True and False with the same shape. Use the mask inside square brackets to keep only the True positions. This is how you filter data without a loop.' },
    { type: 'code', caption: 'masks.py', code: `import numpy as np

scores = np.array([72, 95, 88, 61, 90])
passing = scores >= 75
print(passing)
print(scores[passing])
print(np.count_nonzero(passing))
scores[scores < 65] = 65
print(scores)` },
    { type: 'tip', html: 'Combine masks with <code>&amp;</code> (and), <code>|</code> (or), and <code>~</code> (not). Put each comparison in parentheses: <code>(a &gt; 1) &amp; (a &lt; 5)</code>. Plain <code>and</code> does not work on arrays.' },

    { type: 'h', text: 'Vectorized math and aggregation' },
    { type: 'p', html: 'Operations like <code>+</code>, <code>*</code>, <code>np.sqrt</code>, and <code>np.exp</code> apply to every element. Aggregations like <code>sum</code>, <code>mean</code>, <code>std</code>, <code>min</code>, and <code>max</code> reduce an array. With <code>axis=0</code> they reduce down the rows (one result per column). With <code>axis=1</code> they reduce across the columns (one result per row).' },
    { type: 'code', caption: 'aggregate.py', code: `import numpy as np

grid = np.array([[1, 2, 3],
                 [4, 5, 6]])
print(grid.sum())
print(grid.sum(axis=0))
print(grid.sum(axis=1))
print(grid.mean(axis=1))
print(np.sqrt(np.array([4, 9, 16])))` },

    { type: 'h', text: 'Broadcasting' },
    { type: 'p', html: 'When two arrays have different shapes, NumPy <b>broadcasts</b> the smaller one: it stretches it across the larger one without copying data. A single number, or a row that matches the last dimension, can be combined with a whole table.' },
    { type: 'code', caption: 'broadcast.py', code: `import numpy as np

table = np.array([[10, 20, 30],
                  [40, 50, 60]])
bonus = np.array([1, 2, 3])
print(table + bonus)
print(table * 0.5)` },
    { type: 'trace', title: 'Trace: what broadcasting does', intro: 'The row <code>bonus</code> is applied to each row of <code>table</code>. The shapes are (2, 3) and (3,), which line up on the last axis.',
      code: `import numpy as np

table = np.array([[10, 20], [30, 40]])
bonus = np.array([1, 2])
result = table + bonus
print(result)`,
      steps: [
        { line: 3, vars: { np: 'module', table: '2 x 2 array' } },
        { line: 4, vars: { np: 'module', table: '2 x 2 array', bonus: 'shape (2,)' } },
        { line: 5, vars: { np: 'module', table: '2 x 2 array', bonus: 'shape (2,)', result: '[[11 22] [31 42]]' } },
        { line: 6, vars: { np: 'module', table: '2 x 2 array', bonus: 'shape (2,)', result: '[[11 22] [31 42]]' }, say: '[[11 22]\n [31 42]]' }
      ] },

    { type: 'h', text: 'Matrix product' },
    { type: 'p', html: 'The <code>@</code> operator performs matrix multiplication. The inner sizes must match: a (2, 3) array times a (3, 4) array gives a (2, 4) array. <code>*</code> is different: it multiplies element by element.' },
    { type: 'code', caption: 'matmul.py', code: `import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[0, 1], [1, 0]])
print(A * B)
print(A @ B)` },

    { type: 'h', text: 'Random numbers with a seed' },
    { type: 'p', html: 'For reproducible results, create a generator with a seed. The same seed gives the same numbers every run, which matters for tests and for teaching.' },
    { type: 'code', caption: 'rng.py', code: `import numpy as np

rng = np.random.default_rng(42)
print(rng.integers(1, 7, size=5))
print(rng.random(2).round(3))` },

    { type: 'predict', intro: 'Pay attention to shape, and to <code>*</code> versus <code>@</code>.', items: [
      { code: 'import numpy as np\nprint(np.array([1, 2]) * 2)', a: '[2 4]' },
      { code: 'import numpy as np\nprint(np.zeros((2, 3)).shape)', a: '(2, 3)' },
      { code: 'import numpy as np\nprint(np.arange(5)[::2])', a: '[0 2 4]' },
      { code: 'import numpy as np\ng = np.arange(6).reshape(2, 3)\nprint(g.sum(axis=0))', a: '[3 5 7]', why: 'Columns: 0+3, 1+4, 2+5.' },
      { code: 'import numpy as np\nprint(np.array([1, 5, 9]) > 4)', a: '[False  True  True]' },
      { code: 'import numpy as np\nprint(np.arange(6).reshape(2, 3).reshape(-1).shape)', a: '(6,)' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Temperatures', prompt: '<p>Given <code>celsius = np.array([0, 20, 37, 100])</code>, compute an array of Fahrenheit values with one expression, and print the values that are above 80°F using a mask.</p>',
      solution: `import numpy as np

celsius = np.array([0, 20, 37, 100])
fahrenheit = celsius * 9 / 5 + 32
print(fahrenheit)
print(fahrenheit[fahrenheit > 80])` },
    { type: 'exercise', title: 'Column means', prompt: '<p>Create a 4-by-3 array with <code>np.arange(12).reshape(4, 3)</code>. Print the mean of each column, then the total of all values.</p>',
      solution: `import numpy as np

grid = np.arange(12).reshape(4, 3)
print(grid.mean(axis=0))
print(grid.sum())` },

    { type: 'discussion', prompts: [
      'A list comprehension and a NumPy expression can give the same answer. What does each make easier to read, and what does each make easier to speed up?',
      'Why does NumPy require one dtype for all items? What would be lost if it allowed mixed types?',
      'Broadcasting can silently combine shapes you did not intend. How would you check that a result has the shape you expect?'
    ], facilitator: 'Ask students to predict <code>shape</code> before printing for every reshape. Most errors in this unit are shape errors, and reading the shape aloud catches them early.' }
  ],
  terms: [
    { t: 'ndarray', d: 'NumPy\'s n-dimensional array: a block of same-typed values with a shape.' },
    { t: 'shape', d: 'A tuple giving the size of each dimension, such as <code>(2, 3)</code> for two rows and three columns.' },
    { t: 'dtype', d: 'The data type of every element in an array, such as <code>int64</code> or <code>float64</code>.' },
    { t: 'Vectorization', d: 'Writing an operation on a whole array at once instead of looping over its elements.' },
    { t: 'Boolean mask', d: 'An array of True and False values, used to select elements that meet a condition.' },
    { t: 'Axis', d: 'The dimension an aggregation runs along. <code>axis=0</code> runs down rows; <code>axis=1</code> runs across columns.' },
    { t: 'Broadcasting', d: 'The rules NumPy uses to combine arrays of different shapes by stretching the smaller one.' },
    { t: 'Reshape', d: 'Changing an array\'s shape while keeping the same data and the same number of elements.' },
    { t: 'Matrix product', d: 'The <code>@</code> operator, which multiplies two arrays using rows of the first and columns of the second.' }
  ]
});
