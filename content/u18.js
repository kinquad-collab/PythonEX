COURSE.units.push({
  id: 'u18', num: 18, stage: 's2', status: 'ready', minutes: '75 min',
  title: 'Visualizing Data with matplotlib',
  summary: 'Choose the right chart, build line, bar, scatter, and histogram plots, label them honestly, and save them.',
  objectives: [
    'Choose a chart type that matches the question: comparison, trend, relationship, or distribution',
    'Draw a plot with <code>matplotlib.pyplot</code> and add a title, axis labels, and a legend',
    'Build several plots in one figure with <code>subplots</code>',
    'Plot directly from a pandas DataFrame',
    'Save a figure to a file and explain why axis choices can mislead'
  ],
  blocks: [
    { type: 'h', text: 'Pick the chart for the question' },
    { type: 'p', html: 'A chart answers one question. Start with the question, then choose the chart. The most common mistake is choosing a chart because it looks impressive rather than because it answers the question.' },
    { type: 'table', head: ['Question', 'Chart', 'Function'], rows: [
      ['How do groups compare?', 'Bar chart', '<code>plt.bar</code>'],
      ['How does something change over time?', 'Line chart', '<code>plt.plot</code>'],
      ['Are two numbers related?', 'Scatter plot', '<code>plt.scatter</code>'],
      ['How are values spread out?', 'Histogram', '<code>plt.hist</code>']
    ] },
    { type: 'note', html: 'The plotting code in this unit is not run in the browser sandbox, because a sandbox cannot display a figure. Run it in Google Colab (free), in a Jupyter notebook, or as a script on your computer. Each example has been run with matplotlib installed.' },

    { type: 'h', text: 'Your first plot' },
    { type: 'code', caption: 'first_plot.py', run: false, code: `import matplotlib.pyplot as plt

months = ["Aug", "Sep", "Oct", "Nov"]
hours = [4, 6, 5, 7]

plt.plot(months, hours, marker="o")
plt.title("Study hours per month")
plt.xlabel("Month")
plt.ylabel("Hours")
plt.show()` },
    { type: 'p', html: 'Every chart needs a title, labeled axes with units, and a legend if it has more than one series. <code>plt.show()</code> opens the window. In a notebook, the figure appears below the cell.' },

    { type: 'h', text: 'Bar charts for comparison' },
    { type: 'code', caption: 'bars.py', run: false, code: `import matplotlib.pyplot as plt

periods = ["1", "2", "3", "4"]
averages = [86.5, 82.0, 90.2, 78.4]

plt.bar(periods, averages, color="#3b5bdb")
plt.title("Average score by period")
plt.xlabel("Period")
plt.ylabel("Average score (out of 100)")
plt.ylim(0, 100)
plt.show()` },
    { type: 'warn', html: 'Bar charts should start at zero. A bar that starts at 80 makes a 2-point difference look like a 50% difference. That is a misleading chart, even if every number is correct. Line charts and scatter plots are allowed to use a narrower range.' },

    { type: 'h', text: 'Scatter plots for relationships' },
    { type: 'code', caption: 'scatter.py', run: false, code: `import matplotlib.pyplot as plt

hours_studied = [1, 2, 3, 4, 5, 6, 7, 8]
test_scores = [55, 60, 66, 70, 74, 79, 85, 88]

plt.scatter(hours_studied, test_scores)
plt.title("Study time and test score")
plt.xlabel("Hours studied")
plt.ylabel("Test score")
plt.show()` },
    { type: 'p', html: 'A scatter plot shows whether two numbers move together. It does not prove that one causes the other. Say "is associated with" unless you have an experiment.' },

    { type: 'h', text: 'Histograms for distributions' },
    { type: 'code', caption: 'hist.py', run: false, code: `import matplotlib.pyplot as plt

scores = [55, 62, 68, 70, 71, 73, 75, 78, 79, 80, 82, 85, 88, 91, 95]

plt.hist(scores, bins=5, edgecolor="white")
plt.title("Distribution of test scores")
plt.xlabel("Score")
plt.ylabel("Number of students")
plt.show()` },
    { type: 'p', html: 'The number of bins changes the picture. Too few hides detail, and too many makes noise. Try a few values before you decide what the data shows.' },

    { type: 'h', text: 'Several plots in one figure' },
    { type: 'p', html: '<code>plt.subplots(rows, cols)</code> returns a figure and a grid of axes. Draw on each axis with its own method: <code>ax.plot</code>, <code>ax.bar</code>, and so on. Use <code>fig.tight_layout()</code> to stop labels from overlapping.' },
    { type: 'code', caption: 'subplots.py', run: false, code: `import matplotlib.pyplot as plt

hours = [1, 2, 3, 4, 5]
scores = [55, 62, 66, 73, 79]

fig, (left, right) = plt.subplots(1, 2, figsize=(9, 3.5))
left.plot(hours, scores, marker="o")
left.set_title("Trend")
right.scatter(hours, scores)
right.set_title("Relationship")
fig.tight_layout()
plt.show()` },

    { type: 'h', text: 'Plotting a DataFrame' },
    { type: 'p', html: 'pandas DataFrames and Series have a <code>.plot</code> method that calls matplotlib for you. It is a fast way to look at data, but name your axes explicitly before sharing a chart.' },
    { type: 'code', caption: 'df_plot.py', run: false, code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({"period": [1, 2, 3], "score": [86, 82, 90]})
ax = df.plot(x="period", y="score", kind="bar", legend=False)
ax.set_ylabel("Average score")
plt.tight_layout()
plt.show()` },

    { type: 'h', text: 'Saving a figure' },
    { type: 'p', html: '<code>plt.savefig("chart.png", dpi=150)</code> writes the figure to a file. Call it <i>before</i> <code>plt.show()</code>, because <code>show</code> can clear the figure. Use PNG for slides and SVG or PDF for documents.' },

    { type: 'h', text: 'Judgment checks' },
    { type: 'ul', items: [
      '<b>Bars start at 80 instead of 0.</b> Exaggerates small differences, because the eye compares bar heights.',
      '<b>A scatter plot shows study hours and scores rising together.</b> That is an association. Other factors can drive both numbers.',
      '<b>A histogram with 2 bins for 40 scores.</b> Hides the shape, because different parts of the distribution are merged.'
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Labeled trend', prompt: '<p>Plot the list <code>[3, 5, 4, 8, 7]</code> against the days <code>["Mon", "Tue", "Wed", "Thu", "Fri"]</code> as a line with markers. Add a title, both axis labels, and save it to <code>trend.png</code>.</p>',
      solution: `import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
values = [3, 5, 4, 8, 7]

plt.plot(days, values, marker="o")
plt.title("Daily reading minutes")
plt.xlabel("Day")
plt.ylabel("Minutes")
plt.savefig("trend.png", dpi=150)` },

    { type: 'discussion', prompts: [
      'Find a chart in a newspaper or on social media. What question does it answer? Would a different chart answer it better?',
      'When is a truncated axis acceptable? Give one example where it is and one where it is not.',
      'What would you need to know before claiming that a scatter plot shows a cause?'
    ], facilitator: 'Show two bar charts of the same numbers, one starting at 0 and one at 80. Ask the room which company looks better. Then talk about how it would feel to be on the wrong end of the second one.' }
  ],
  terms: [
    { t: 'matplotlib', d: 'The standard Python library for drawing charts. Its <code>pyplot</code> module is usually imported as <code>plt</code>.' },
    { t: 'Figure', d: 'The whole picture that matplotlib draws, which can hold one or more axes.' },
    { t: 'Axes', d: 'A single plotting area inside a figure, with its own x and y axes, title, and data.' },
    { t: 'Histogram', d: 'A chart that groups numeric values into bins and shows how many fall in each bin.' },
    { t: 'Bin', d: 'A range of values grouped together in a histogram.' },
    { t: 'Scatter plot', d: 'A chart of points, one per observation, that shows the relationship between two numbers.' },
    { t: 'Truncated axis', d: 'An axis that does not start at zero, which can exaggerate differences between bars.' },
    { t: 'subplots', d: 'A function that creates a grid of axes in one figure.' }
  ]
});
