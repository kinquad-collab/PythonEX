COURSE.units.push({
  id: 'u17', num: 17, stage: 's2', status: 'ready', minutes: '90 min',
  title: 'pandas: Tables You Can Question',
  summary: 'Load a table, inspect it, select and filter rows, create columns, handle missing values, and summarize by group.',
  objectives: [
    'Create a DataFrame and explain how it differs from a NumPy array',
    'Load a CSV with <code>pd.read_csv</code> and inspect it with <code>head</code>, <code>info</code>, and <code>describe</code>',
    'Select columns and rows with <code>[]</code>, <code>.loc</code>, and <code>.iloc</code>',
    'Filter rows with conditions and create new columns',
    'Find, count, and fill missing values',
    'Summarize with <code>groupby</code> and <code>value_counts</code>'
  ],
  blocks: [
    { type: 'h', text: 'What pandas adds' },
    { type: 'p', html: 'A <b>DataFrame</b> is a table: rows and columns, where each column has a name and can have its own type. A <b>Series</b> is one column. pandas builds on NumPy, so the speed is similar, and it adds labels, missing-value handling, and the reading and grouping tools that real data needs.' },
    { type: 'code', caption: 'first_frame.py', code: `import pandas as pd

df = pd.DataFrame({
    "name": ["Ana", "Ben", "Cy"],
    "score": [91, 84, 77],
    "period": [1, 2, 1]
})
print(df)
print(df["score"])
print(type(df["score"]).__name__)` },
    { type: 'note', html: 'The convention is <code>import pandas as pd</code>.' },

    { type: 'h', text: 'Reading data' },
    { type: 'p', html: '<code>pd.read_csv</code> loads a CSV file into a DataFrame. It accepts a file path or a URL. Here it reads from text held in memory, so the example runs in the sandbox. With a real file, pass its path instead.' },
    { type: 'code', caption: 'read_csv.py', code: `import io
import pandas as pd

csv_text = """name,period,score,absent
Ana,1,91,0
Ben,2,84,2
Cy,1,77,
Dee,2,95,1
"""
df = pd.read_csv(io.StringIO(csv_text))
print(df)` },

    { type: 'h', text: 'Inspecting a table' },
    { type: 'table', head: ['Call', 'What you learn'], rows: [
      ['<code>df.head(3)</code>', 'The first rows, to see the layout'],
      ['<code>df.shape</code>', '(rows, columns)'],
      ['<code>df.info()</code>', 'Column names, types, and how many values are missing'],
      ['<code>df.describe()</code>', 'Count, mean, spread, and quartiles of the numeric columns'],
      ['<code>df.columns</code>', 'The column names']
    ] },
    { type: 'code', caption: 'inspect.py', code: `import io
import pandas as pd

df = pd.read_csv(io.StringIO("name,period,score,absent\\nAna,1,91,0\\nBen,2,84,2\\nCy,1,77,\\nDee,2,95,1\\n"))
print(df.shape)
print(df.columns.tolist())
print(df.describe())` },

    { type: 'h', text: 'Selecting: columns, then rows' },
    { type: 'p', html: 'Select columns with a list of names: <code>df[["name", "score"]]</code>. For rows, use <code>.loc</code> with labels, or <code>.iloc</code> with positions. <code>.iloc[0]</code> is the first row; <code>.loc[0]</code> is the row labeled 0. With the default index these are the same, but they stop matching once you sort or filter.' },
    { type: 'code', caption: 'select.py', code: `import pandas as pd

df = pd.DataFrame({"name": ["Ana", "Ben", "Cy"], "score": [91, 84, 77]})
print(df[["name", "score"]])
print(df.iloc[1])
print(df.loc[2, "score"])
print(df.iloc[0:2, 0])` },

    { type: 'h', text: 'Filtering rows' },
    { type: 'p', html: 'A condition on a column gives a True/False Series. Put it inside <code>df[...]</code> to keep the matching rows. Combine conditions with <code>&amp;</code> and <code>|</code>, and put each one in parentheses.' },
    { type: 'code', caption: 'filter.py', code: `import pandas as pd

df = pd.DataFrame({"name": ["Ana", "Ben", "Cy", "Dee"],
                   "score": [91, 84, 77, 95],
                   "period": [1, 2, 1, 2]})
high = df[df["score"] >= 90]
print(high)
print(df[(df["period"] == 1) & (df["score"] < 90)])` },

    { type: 'h', text: 'New columns and sorting' },
    { type: 'code', caption: 'columns_sort.py', code: `import pandas as pd

df = pd.DataFrame({"name": ["Ana", "Ben", "Cy"], "score": [91, 84, 77]})
df["passed"] = df["score"] >= 80
df["curve"] = df["score"] + 5
print(df.sort_values("score", ascending=False))` },
    { type: 'p', html: 'Arithmetic on a column applies to every row, the same way it does in NumPy. Methods like <code>sort_values</code> return a new DataFrame, so assign the result if you want to keep it.' },

    { type: 'h', text: 'Missing values' },
    { type: 'p', html: 'Missing values appear as <code>NaN</code> (not a number). Count them with <code>isna().sum()</code>. Remove rows with <code>dropna()</code>, or fill them with <code>fillna()</code>. Decide which one before you summarize: a mean that silently skips missing values can hide a problem.' },
    { type: 'code', caption: 'missing.py', code: `import io
import pandas as pd

df = pd.read_csv(io.StringIO("name,absent\\nAna,0\\nBen,2\\nCy,\\n"))
print(df.isna().sum())
print(df.dropna())
print(df.fillna(0))` },
    { type: 'warn', html: 'An empty cell becomes <code>NaN</code>, which makes an integer column into a float column. That is normal, but check <code>info()</code> when a count column looks wrong.' },

    { type: 'h', text: 'groupby: summaries by category' },
    { type: 'p', html: '<code>groupby(column)</code> splits the table into one group per value, then applies a summary to each group. The pattern is <code>df.groupby("period")["score"].mean()</code>: group by period, then take the mean score in each.' },
    { type: 'code', caption: 'groupby.py', code: `import pandas as pd

df = pd.DataFrame({
    "name": ["Ana", "Ben", "Cy", "Dee", "Eli"],
    "period": [1, 2, 1, 2, 1],
    "score": [91, 84, 77, 95, 88]
})
print(df.groupby("period")["score"].mean())
print(df.groupby("period")["score"].agg(["count", "min", "max"]))
print(df["period"].value_counts())` },
    { type: 'tip', html: 'Use <code>agg</code> when you want several summaries at once. Use <code>value_counts()</code> to count categories in one column.' },

    { type: 'predict', intro: 'Think about the shape and index of each result before you run it.', items: [
      { code: 'import pandas as pd\nprint(pd.DataFrame({"a": [1, 2]}).shape)', a: '(2, 1)' },
      { code: 'import pandas as pd\ndf = pd.DataFrame({"x": [5, 6, 7]})\nprint(df[df["x"] > 5]["x"].tolist())', a: '[6, 7]' },
      { code: 'import pandas as pd\ndf = pd.DataFrame({"x": [5, 6, 7]})\nprint(df.iloc[-1, 0])', a: '7' },
      { code: 'import pandas as pd\nprint(pd.Series([1, None, 3]).isna().sum())', a: '1' },
      { code: 'import pandas as pd\ndf = pd.DataFrame({"g": ["a", "b", "a"], "v": [1, 2, 3]})\nprint(df.groupby("g")["v"].sum().tolist())', a: '[4, 2]' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Honor roll', prompt: '<p>Build a DataFrame with the names <code>Ana, Ben, Cy, Dee</code> and scores <code>91, 84, 77, 95</code>. Add a column <code>honors</code> that is True when the score is 90 or more. Print only the rows where <code>honors</code> is True.</p>',
      solution: `import pandas as pd

df = pd.DataFrame({"name": ["Ana", "Ben", "Cy", "Dee"],
                   "score": [91, 84, 77, 95]})
df["honors"] = df["score"] >= 90
print(df[df["honors"]])` },
    { type: 'exercise', title: 'Period averages', prompt: '<p>Using the table from the groupby example, print the average score for each period, rounded to one decimal place with <code>.round(1)</code>.</p>',
      solution: `import pandas as pd

df = pd.DataFrame({
    "name": ["Ana", "Ben", "Cy", "Dee", "Eli"],
    "period": [1, 2, 1, 2, 1],
    "score": [91, 84, 77, 95, 88]
})
print(df.groupby("period")["score"].mean().round(1))` },

    { type: 'discussion', prompts: [
      'Why do you think pandas keeps the original index after filtering rows? When does that help, and when does it cause bugs?',
      'A column of ages has one blank cell. Options: drop the row, fill with 0, fill with the average. Which would you choose for a survey, and why?',
      'What question would you ask of a grade table before you trust a <code>groupby</code> average?'
    ], facilitator: 'Most errors come from forgetting that <code>df[df["x"] &gt; 5]</code> needs parentheses around each condition when combining with <code>&amp;</code>. Show the error message on purpose.' }
  ],
  terms: [
    { t: 'DataFrame', d: 'A two-dimensional labeled table in pandas, with named columns that can each have a different type.' },
    { t: 'Series', d: 'A one-dimensional labeled array, such as a single column of a DataFrame.' },
    { t: 'Index', d: 'The labels for the rows of a DataFrame or Series. The default is 0, 1, 2, and so on.' },
    { t: 'read_csv', d: 'The pandas function that loads a CSV file (or text) into a DataFrame.' },
    { t: 'loc / iloc', d: '<code>loc</code> selects by label; <code>iloc</code> selects by integer position.' },
    { t: 'NaN', d: 'Not a Number: pandas\' marker for a missing value in a numeric column.' },
    { t: 'groupby', d: 'A method that splits rows into groups by the values of one or more columns, so you can summarize each group.' },
    { t: 'value_counts', d: 'A method that counts how often each distinct value appears in a column.' }
  ]
});
