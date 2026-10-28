COURSE.units.push({
  id: 'u19', num: 19, stage: 's3', status: 'ready', minutes: '90 min',
  title: 'Machine Learning with scikit-learn',
  summary: 'The supervised-learning workflow: features and labels, train/test splits, fitting models, measuring accuracy, and avoiding overfitting.',
  objectives: [
    'Explain features, labels, and the difference between supervised and unsupervised learning',
    'Split data into training and test sets, and explain why the split must come first',
    'Fit a model with <code>fit</code>, make predictions with <code>predict</code>, and measure it with <code>score</code>',
    'Read a confusion matrix and explain what accuracy does and does not tell you',
    'Recognize overfitting and use a pipeline so preprocessing does not leak test information'
  ],
  blocks: [
    { type: 'h', text: 'What machine learning is' },
    { type: 'p', html: 'Machine learning finds patterns in data and uses them to make predictions. Instead of writing the rules yourself, you give the algorithm examples and let it estimate the rules. The quality of a model depends mostly on the data and on how honestly you measure it.' },
    { type: 'ul', items: [
      '<b>Features</b> are the input measurements, such as petal length or hours studied. Usually a table with one row per example.',
      '<b>Label</b> (or target) is the answer you want to predict, such as the flower species.',
      '<b>Supervised learning</b> uses labeled examples. Classification predicts a category; regression predicts a number.',
      '<b>Unsupervised learning</b> finds structure without labels, such as grouping similar customers. It is covered briefly in the capstone.'
    ] },

    { type: 'h', text: 'Load a dataset' },
    { type: 'p', html: 'scikit-learn ships with small classic datasets, so you can start without downloading anything. The iris dataset has 150 flowers, four measurements each, and three species.' },
    { type: 'code', caption: 'load_iris.py', code: `from sklearn.datasets import load_iris

iris = load_iris()
print(iris.feature_names)
print(iris.target_names)
print(iris.data.shape)
print(iris.data[0])
print(iris.target[0])` },
    { type: 'p', html: '<code>iris.data</code> is the feature table (150 rows, 4 columns). <code>iris.target</code> holds the label for each row as a number: 0, 1, or 2. <code>iris.target_names</code> says what each number means.' },

    { type: 'h', text: 'Train and test sets' },
    { type: 'p', html: 'A model must be tested on examples it has never seen. Hold back part of the data as a <b>test set</b> before any training. Train on the rest. If you test on the data you trained on, the score measures memory, not learning.' },
    { type: 'code', caption: 'split.py', code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=42
)
print(len(X_train), len(X_test))` },
    { type: 'note', html: 'By convention, <code>X</code> (capital) holds the features and <code>y</code> holds the labels. <code>random_state=42</code> makes the split the same every run. The number 42 is arbitrary; any fixed number works.' },

    { type: 'h', text: 'Fit, predict, score' },
    { type: 'p', html: 'Every scikit-learn model follows the same pattern. Create it, call <code>fit(X_train, y_train)</code> to learn from the training data, call <code>predict(X_test)</code> to get predictions, and call <code>score(X_test, y_test)</code> to get accuracy. Once you learn this pattern, you can swap models freely.' },
    { type: 'code', caption: 'first_model.py', code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=42
)

model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(predictions[:10])
print("accuracy:", round(model.score(X_test, y_test), 3))` },
    { type: 'p', html: 'K-nearest neighbors predicts the majority label among the <i>k</i> closest training examples. It is simple to understand, which makes it a good first model.' },

    { type: 'h', text: 'Accuracy and the confusion matrix' },
    { type: 'p', html: 'Accuracy is the fraction of correct predictions. It can hide problems: if 95% of emails are not spam, a model that always says "not spam" scores 95%. A <b>confusion matrix</b> shows where each kind of mistake happens. Rows are the true labels, columns are the predictions.' },
    { type: 'code', caption: 'confusion.py', code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=42
)
model = KNeighborsClassifier(n_neighbors=3).fit(X_train, y_train)
pred = model.predict(X_test)

print(accuracy_score(y_test, pred))
print(confusion_matrix(y_test, pred))` },
    { type: 'tip', html: 'Chaining <code>.fit(...)</code> works because <code>fit</code> returns the model itself. It is a common pattern in scikit-learn.' },

    { type: 'h', text: 'Overfitting' },
    { type: 'p', html: '<b>Overfitting</b> means the model learned the training examples, including their noise, and does poorly on new data. A model with a very large <code>k</code> is too simple; a model with <code>k=1</code> can memorize. Compare training and test scores to see the gap. A large gap is a warning.' },
    { type: 'code', caption: 'overfit.py', code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=42
)

for k in [1, 3, 5, 15]:
    model = KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train)
    train_acc = model.score(X_train, y_train)
    test_acc = model.score(X_test, y_test)
    print(k, round(train_acc, 2), round(test_acc, 2))` },

    { type: 'h', text: 'Preprocessing with a pipeline' },
    { type: 'p', html: 'Some models need features on a similar scale. <code>StandardScaler</code> rescales each feature to mean 0 and standard deviation 1. The scaler must learn its numbers from the <b>training</b> data only. If you scale the whole table first, information from the test set leaks into training, and the score is too optimistic. A <code>Pipeline</code> does the steps in the right order for you.' },
    { type: 'code', caption: 'pipeline.py', code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=42
)

pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=500))
pipe.fit(X_train, y_train)
print("accuracy:", round(pipe.score(X_test, y_test), 3))` },

    { type: 'h', text: 'Regression: predicting a number' },
    { type: 'p', html: 'When the label is a number, use a regressor. <code>LinearRegression</code> fits a straight line (or plane) through the data. The score for regression is R², where 1.0 is perfect and 0 means no better than predicting the average.' },
    { type: 'code', caption: 'regression.py', code: `from sklearn.linear_model import LinearRegression

hours = [[1], [2], [3], [4], [5]]
scores = [52, 58, 65, 71, 76]

line = LinearRegression().fit(hours, scores)
print(round(line.coef_[0], 2))
print(round(line.predict([[6]])[0], 1))` },

    { type: 'predict', intro: 'Trust the process: predict what the model will do with each change.', items: [
      { code: 'from sklearn.datasets import load_iris\nprint(len(load_iris().target))', a: '150' },
      { code: 'import numpy as np\nprint(np.bincount([0, 0, 1, 2]))', a: '[2 1 1]', why: 'Counts how often each label value appears.' },
      { code: 'from sklearn.linear_model import LinearRegression\nm = LinearRegression().fit([[0], [1], [2]], [0, 2, 4])\nprint(round(m.predict([[10]])[0]))', a: '20', why: 'The data follows y = 2x exactly, so the fitted line does too.' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Try other k values', prompt: '<p>Using the iris split from this unit (<code>random_state=42</code>, <code>test_size=0.25</code>), find which value of <code>k</code> from 1 to 15 gives the highest test accuracy. Print that <code>k</code> and its accuracy.</p>',
      hint: 'Loop over <code>range(1, 16)</code>, keep track of the best score and its k.',
      solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=42
)

best_k, best_acc = None, 0
for k in range(1, 16):
    acc = KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train).score(X_test, y_test)
    if acc > best_acc:
        best_k, best_acc = k, acc
print(best_k, round(best_acc, 3))` },
    { type: 'exercise', title: 'Spot the leak', prompt: '<p>The code below scales all the data before splitting. Explain in one sentence what is wrong with it, then rewrite it so the scaler is fitted on the training set only.</p><pre>X_scaled = StandardScaler().fit_transform(iris.data)\nX_train, X_test, y_train, y_test = train_test_split(X_scaled, iris.target, random_state=42)</pre>',
      solution: `# Problem: the scaler saw the test rows when it computed the mean and
# standard deviation, so information leaked into the test score.
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, random_state=42
)
pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=500))
print(round(pipe.fit(X_train, y_train).score(X_test, y_test), 3))` },

    { type: 'discussion', prompts: [
      'A spam filter is 99% accurate. Why might that still be a bad filter? What would you check next?',
      'Why must the test set stay untouched until the very end of a project? What happens to your honest score if you tune the model using it?',
      'Which features in the iris data would a person use to tell species apart? Does the model use them the same way?'
    ], facilitator: 'Ask students to run the overfitting example and read the gap column aloud. Ask which k they would ship, and why not the one with the best training score.' }
  ],
  terms: [
    { t: 'Feature', d: 'An input variable used to make a prediction, usually a column in the feature table.' },
    { t: 'Label / target', d: 'The value a supervised model is trained to predict.' },
    { t: 'Supervised learning', d: 'Learning from examples that include the correct label.' },
    { t: 'Unsupervised learning', d: 'Finding structure in data that has no labels, such as clusters.' },
    { t: 'Train/test split', d: 'Dividing data into a set used for fitting and a held-back set used only for evaluation.' },
    { t: 'Accuracy', d: 'The fraction of predictions that match the true labels.' },
    { t: 'Confusion matrix', d: 'A table of true labels against predicted labels, showing which mistakes the model makes.' },
    { t: 'Overfitting', d: 'When a model fits the training data, including its noise, so well that it performs worse on new data.' },
    { t: 'Data leakage', d: 'When information from the test set influences training, making the measured score too optimistic.' },
    { t: 'Pipeline', d: 'A scikit-learn object that chains preprocessing steps and a model so they are fitted and applied in order.' },
    { t: 'R²', d: 'A regression score where 1.0 is a perfect fit and 0 means no better than predicting the average.' }
  ]
});
