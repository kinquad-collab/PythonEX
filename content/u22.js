COURSE.units.push({
  id: 'u22', num: 22, stage: 's3', status: 'ready', minutes: '90 min',
  title: 'Capstone and Responsible Data Work',
  summary: 'Plan and carry out a complete data project from question to report, and check it for leakage, bias, and privacy before anyone trusts it.',
  objectives: [
    'Turn a vague question into a measurable prediction task',
    'Run an end-to-end project: load, clean, explore, model, evaluate, report',
    'Check a project for leakage, misleading charts, and unfair outcomes',
    'Protect personal data, including student records',
    'Write a short model card that states what a model is and is not for'
  ],
  blocks: [
    { type: 'h', text: 'The project' },
    { type: 'p', html: 'This unit is a project, not a lecture. You will use the skills from Units 1 through 21 on one question you care about. A useful project answers a question someone will act on, uses data you have the right to use, and reports both what the model does well and where it fails.' },

    { type: 'h', text: 'Step 1: write the question' },
    { type: 'p', html: 'A question is measurable when you can say what counts as success. "Can we predict which students will need tutoring?" is vague. "Can we flag students whose quarter grade will fall below 70, using only data available by week 4?" is measurable: the target is defined, and the time limit prevents using information from the future.' },
    { type: 'ul', items: [
      '<b>Target:</b> what exactly are you predicting, and how is it measured?',
      '<b>Timing:</b> what information will be available at prediction time? Anything later is leakage.',
      '<b>Action:</b> what will someone do with the answer? If nothing, the project is an exercise.'
    ] },

    { type: 'h', text: 'Step 2: check the data' },
    { type: 'code', caption: 'project_start.py', code: `import io
import pandas as pd

# Replace this text with pd.read_csv("your_file.csv") for real data.
raw = io.StringIO("""student,week1_quiz,week2_quiz,hw_done,final_grade
A01,88,91,5,89
A02,62,58,2,64
A03,75,,4,78
A04,93,95,5,96
A05,50,47,1,55
""")
df = pd.read_csv(raw)
print(df.info())
print(df.isna().sum())
print(df.describe().round(1))` },
    { type: 'p', html: 'Before modeling, look at missing values, impossible numbers (a quiz score of 140), duplicated rows, and the balance of the target. A model trained on a dataset that is 98% one class can score well by ignoring the rare class.' },

    { type: 'h', text: 'Step 3: avoid leakage' },
    { type: 'p', html: '<b>Leakage</b> means a feature contains information you would not have when making the prediction. The most common kind is a column that is recorded after the outcome, such as "final exam taken" when predicting the final grade. Leakage gives scores that look excellent and fail the first time the model meets real data. Remove leaking columns before you split, and keep the split before any fitting, as in Unit 19.' },
    { type: 'warn', html: 'A project that reports 99% accuracy on its first try should be checked for leakage before it is celebrated.' },

    { type: 'h', text: 'Step 4: model and compare' },
    { type: 'p', html: 'Start with a simple baseline: always predict the most common class, or predict the average. Any real model must beat the baseline clearly. Then try one or two models, such as logistic regression and a decision tree, using the same split. Report the baseline next to every result.' },
    { type: 'code', caption: 'baseline.py', code: `from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_breast_cancer

data = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(
    data.data, data.target, test_size=0.25, random_state=0, stratify=data.target
)

baseline = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)
model = LogisticRegression(max_iter=5000).fit(X_train, y_train)

print("baseline:", round(baseline.score(X_test, y_test), 3))
print("logistic:", round(model.score(X_test, y_test), 3))` },
    { type: 'p', html: 'The breast cancer dataset ships with scikit-learn and is used here only to practice the workflow. It is not a clinical tool.' },

    { type: 'h', text: 'Step 5: report honestly' },
    { type: 'p', html: 'A good report has five parts: the question, the data and its limits, the method, the results against the baseline, and the failures. Show at least one chart, labeled as Unit 18 taught. State uncertainty. Say what you did not test.' },

    { type: 'h', text: 'Step 6: check fairness' },
    { type: 'p', html: 'A model can be accurate overall and still fail a group. Compute the same metric separately for each group that matters (for example, each class period, gender, or language background). If the results differ a lot, find out why before deploying. Often the cause is a training set that under-represents the group.' },
    { type: 'code', caption: 'by_group.py', code: `import pandas as pd

results = pd.DataFrame({
    "group": ["A", "A", "A", "B", "B", "B"],
    "correct": [1, 1, 0, 1, 0, 0]
})
print(results.groupby("group")["correct"].mean().round(2))` },

    { type: 'h', text: 'Privacy: student and personal data' },
    { type: 'p', html: 'Student records are sensitive, and in the United States they are protected by law (FERPA). The same caution applies to any personal data. Practical habits:' },
    { type: 'ul', items: [
      'Use the minimum data you need. Drop names and IDs before analysis, and keep a separate key only if you must link results back.',
      'Do not upload identifiable data to a public tool, notebook, or chatbot. Check your school\'s approved tools first.',
      'Share aggregated results (counts, averages with enough people in each group), not individual rows.',
      'Delete working copies you no longer need, and keep the original in its approved location.'
    ] },
    { type: 'tip', html: 'Before using any dataset, ask: who collected it, for what purpose, and did those people agree to this use? If you cannot answer, do not use it yet.' },

    { type: 'h', text: 'Step 7: write a model card' },
    { type: 'p', html: 'A <b>model card</b> is a short document that travels with a model. It answers: what the model predicts, what data it was trained on, how it was evaluated, where it works well, where it fails, and what it must not be used for. Writing it forces you to be specific. A template you can copy:' },
    { type: 'table', head: ['Section', 'What to write'], rows: [
      ['Purpose', 'The question, and the decision it supports'],
      ['Data', 'Source, date range, size, known gaps'],
      ['Method', 'Model type, features, split, random seed'],
      ['Results', 'Metric on the held-out test set, compared with the baseline'],
      ['Groups', 'Results for each important group, and any gaps'],
      ['Limits', 'Where it fails; what it must not be used for'],
      ['Owner', 'Who maintains it, and when it will be reviewed']
    ] },

    { type: 'h', text: 'The capstone checklist' },
    { type: 'ol', items: [
      'A measurable question, with target, timing, and action written down',
      'Data loaded, inspected, and cleaned; limits noted',
      'Leaking columns removed; split done before any fitting',
      'Baseline reported next to every model',
      'Test set used once, at the end, for the final number',
      'At least one labeled chart',
      'Group results checked, with gaps explained',
      'Personal data removed or protected',
      'Model card written'
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Find the leak', prompt: '<p>A team predicts whether a loan will default. Their features include <code>days_late_on_loan</code> and <code>default_flag</code>. Which column leaks the answer, and why? Write the one-line fix.</p>',
      hint: 'Ask whether you could know this value at the moment of the decision.',
      solution: `# default_flag is the outcome itself, so it leaks the answer.
# days_late_on_loan is recorded after the loan starts, so it is only usable
# if the prediction is made after those days have already passed.
# Fix: drop default_flag from the features, and keep only information available
# at the time of the decision (for example, application data).
features = ["income", "loan_amount", "credit_history_years"]` },

    { type: 'discussion', prompts: [
      'Which is worse in your context: a false alarm (flagging a student who was fine) or a miss (not flagging one who needed help)? How does that choice change the model you should build?',
      'Your model is 90% accurate overall, but 60% accurate for one group. What do you do before deploying?',
      'Who should sign off on a model that makes decisions about people, and what should they see first?'
    ], facilitator: 'This is the closing discussion. Ask each group to present their question, their baseline, and one failure they found. Reward the honest failure more than the high score.' }
  ],
  terms: [
    { t: 'Leakage', d: 'When a model is trained on information that would not be available at prediction time, inflating its score.' },
    { t: 'Baseline', d: 'A simple reference model, such as always predicting the most common class, that any real model must beat.' },
    { t: 'Model card', d: 'A short document describing a model\'s purpose, data, evaluation, limits, and owner.' },
    { t: 'Fairness (group metrics)', d: 'Checking that a model\'s performance is comparable across the groups it affects.' },
    { t: 'Unsupervised learning', d: 'Learning structure from unlabeled data, such as clustering similar examples together.' },
    { t: 'FERPA', d: 'The US federal law protecting the privacy of student education records.' },
    { t: 'Aggregation', d: 'Reporting summaries (counts, averages) instead of individual records, to protect privacy.' }
  ]
});
