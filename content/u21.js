COURSE.units.push({
  id: 'u21', num: 21, stage: 's3', status: 'ready', minutes: '100 min',
  title: 'Training a PyTorch Model',
  summary: 'Turn a dataset into tensors, choose a loss and optimizer, run the training loop, evaluate honestly, and save the model.',
  objectives: [
    'Prepare a dataset as tensors with a train/test split and feature scaling',
    'Choose a loss function for regression and for classification',
    'Write the five steps of a training loop: zero gradients, forward, loss, backward, step',
    'Evaluate a model with <code>model.eval()</code> and <code>torch.no_grad()</code>',
    'Save and reload a model with <code>state_dict</code>'
  ],
  blocks: [
    { type: 'note', html: '<b>Where to run this unit.</b> Use Google Colab or a local install with <code>pip install torch scikit-learn</code>. PyTorch does not run in the browser sandbox. The code uses a fixed random seed so results repeat closely from run to run; exact decimals can vary slightly between machines. <b>Run the code blocks in order in one notebook.</b> Each block uses variables created by the blocks above it.' },

    { type: 'h', text: 'The training loop' },
    { type: 'p', html: 'Training is a loop. Each pass over the training data is an <b>epoch</b>. For each batch, the model makes predictions, a <b>loss</b> measures how wrong they are, and the optimizer nudges the weights to reduce that loss. Everything else in this unit fills in those steps.' },
    { type: 'ol', items: [
      'Clear old gradients: <code>optimizer.zero_grad()</code>',
      'Forward pass: <code>logits = model(x)</code>',
      'Compute the loss: <code>loss = loss_fn(logits, y)</code>',
      'Backward pass: <code>loss.backward()</code>',
      'Update the weights: <code>optimizer.step()</code>'
    ] },

    { type: 'h', text: 'Prepare the data' },
    { type: 'p', html: 'Start from the iris data used in Unit 19. Split it first, then scale using statistics from the training set only (the same rule as the pipeline in Unit 19). Convert the NumPy arrays to tensors. Classification labels must be <code>int64</code> for <code>CrossEntropyLoss</code>.' },
    { type: 'code', caption: 'data.py', run: false, code: `import torch
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.25, random_state=42, stratify=iris.target
)

scaler = StandardScaler().fit(X_train)          # learn from training data only
X_train = torch.tensor(scaler.transform(X_train), dtype=torch.float32)
X_test = torch.tensor(scaler.transform(X_test), dtype=torch.float32)
y_train = torch.tensor(y_train, dtype=torch.long)
y_test = torch.tensor(y_test, dtype=torch.long)

print(X_train.shape, y_train.dtype)` },
    { type: 'note', html: '<code>stratify=iris.target</code> keeps the same proportion of each species in both sets. It matters when classes are small or uneven.' },

    { type: 'h', text: 'Model, loss, and optimizer' },
    { type: 'ul', items: [
      '<b>Model:</b> a small network that maps 4 features to 3 class scores.',
      '<b>Loss:</b> <code>CrossEntropyLoss</code> for classification. It takes raw logits and the integer class labels. For regression, <code>MSELoss</code> is the usual choice.',
      '<b>Optimizer:</b> <code>Adam</code> adjusts each weight using its gradient history. Its learning rate (<code>lr</code>) sets the step size. Too large and the loss bounces; too small and training is slow.'
    ] },
    { type: 'code', caption: 'setup.py', run: false, code: `import torch
import torch.nn as nn

torch.manual_seed(0)

model = nn.Sequential(
    nn.Linear(4, 16),
    nn.ReLU(),
    nn.Linear(16, 3)
)
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)` },

    { type: 'h', text: 'Running the loop' },
    { type: 'code', caption: 'train.py', run: false, code: `for epoch in range(200):
    model.train()
    optimizer.zero_grad()
    logits = model(X_train)
    loss = loss_fn(logits, y_train)
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 50 == 0:
        print(f"epoch {epoch + 1:3d}  loss {loss.item():.3f}")` },
    { type: 'p', html: 'This loop runs the whole training set through the model at once, which is called full-batch training. Real datasets are too large for that, so they are split into <b>mini-batches</b>, usually fetched with a <code>DataLoader</code>. The five steps stay the same.' },
    { type: 'warn', html: 'Forgetting <code>optimizer.zero_grad()</code> makes gradients add up across steps, and training behaves strangely. Put it first in the loop every time.' },

    { type: 'h', text: 'Evaluate honestly' },
    { type: 'p', html: 'Switch to evaluation mode with <code>model.eval()</code>, which turns off behaviors such as dropout that only apply during training. Wrap the calculation in <code>torch.no_grad()</code> so PyTorch does not build the graph needed for gradients. Score on the test set, which the model has never used for training.' },
    { type: 'code', caption: 'evaluate.py', run: false, code: `model.eval()
with torch.no_grad():
    test_logits = model(X_test)
    predicted = test_logits.argmax(dim=1)
    accuracy = (predicted == y_test).float().mean().item()

print(f"test accuracy: {accuracy:.2f}")
print("above 0.9:", accuracy > 0.9)` },
    { type: 'p', html: '<code>argmax(dim=1)</code> picks the highest score in each row. Comparing with the labels and taking the mean gives the fraction correct.' },

    { type: 'h', text: 'Save and reload' },
    { type: 'p', html: 'Save the <b>state_dict</b>, which is a dictionary of the learned weights, rather than the whole model object. To reload, build the same architecture first, then load the weights into it.' },
    { type: 'code', caption: 'save_load.py', run: false, code: `import torch
import torch.nn as nn

model = nn.Sequential(nn.Linear(4, 16), nn.ReLU(), nn.Linear(16, 3))
torch.save(model.state_dict(), "iris_model.pt")

fresh = nn.Sequential(nn.Linear(4, 16), nn.ReLU(), nn.Linear(16, 3))
fresh.load_state_dict(torch.load("iris_model.pt"))
fresh.eval()
print("reloaded")` },
    { type: 'tip', html: 'Newer PyTorch versions may warn about <code>weights_only</code> when loading. Passing <code>weights_only=True</code> to <code>torch.load</code> is the safe choice for a state_dict.' },

    { type: 'h', text: 'Common problems' },
    { type: 'table', head: ['Symptom', 'Likely cause', 'Fix'], rows: [
      ['Loss is <code>nan</code>', 'Learning rate too high, or bad input values', 'Lower <code>lr</code>; check scaling'],
      ['Loss does not go down', 'Learning rate too low, or gradients not flowing', 'Raise <code>lr</code>; check <code>backward()</code> and <code>step()</code>'],
      ['Training accuracy high, test accuracy low', 'Overfitting', 'More data, smaller model, early stopping'],
      ['Shape or dtype error', 'Labels not <code>long</code>, or features not <code>float32</code>', 'Cast with <code>.long()</code> or <code>.float()</code>']
    ] },

    { type: 'h', text: 'Reason before you run' },
    { type: 'ul', items: [
      'Without <code>optimizer.zero_grad()</code>, what happens to <code>.grad</code> between steps? <i>It accumulates, because PyTorch adds each new backward pass to the old gradients.</i>',
      'Why evaluate with <code>torch.no_grad()</code>? <i>No gradients are needed for predictions, so it saves memory and time.</i>',
      'Why fit the scaler on the training set only? <i>So the test set stays unseen, as in Unit 19.</i>'
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Fit a line', prompt: '<p>Train a single <code>nn.Linear(1, 1)</code> with <code>MSELoss</code> and SGD (<code>lr=0.05</code>) to learn the rule <code>y = 2x + 1</code> from <code>x = torch.linspace(0, 1, 20).reshape(-1, 1)</code>. Train for 500 epochs, then print the learned weight and bias, rounded to one decimal place.</p>',
      hint: 'Build <code>y = 2 * x + 1</code> as the target. Then the loop is the same five steps as above.',
      solution: `import torch
import torch.nn as nn

torch.manual_seed(0)
x = torch.linspace(0, 1, 20).reshape(-1, 1)
y = 2 * x + 1

model = nn.Linear(1, 1)
loss_fn = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.05)

for _ in range(500):
    optimizer.zero_grad()
    loss = loss_fn(model(x), y)
    loss.backward()
    optimizer.step()

print(round(model.weight.item(), 1), round(model.bias.item(), 1))   # about 2.0 and 1.0` },

    { type: 'discussion', prompts: [
      'Why do we keep a test set that the model never trains on, even when the data is small?',
      'The loss went down, but the test accuracy did not improve. List three things you would check, in order.',
      'Would you deploy a model that scores 0.95 on a test set you looked at a hundred times while tuning? Why or why not?'
    ], facilitator: 'Ask students to change the learning rate to 1.0 and to 0.00001, run the loop, and describe what they see. Then ask them to write one sentence explaining the difference.' }
  ],
  terms: [
    { t: 'Epoch', d: 'One full pass of the training data through the model.' },
    { t: 'Batch / mini-batch', d: 'A subset of the training data processed together in one step of the loop.' },
    { t: 'Loss function', d: 'A formula that measures how wrong the predictions are. Training minimizes it.' },
    { t: 'CrossEntropyLoss', d: 'The standard loss for classification. It takes raw logits and integer class labels.' },
    { t: 'Optimizer', d: 'The algorithm that updates the weights from their gradients, such as SGD or Adam.' },
    { t: 'Learning rate', d: 'The size of each update step taken by the optimizer.' },
    { t: 'model.eval()', d: 'Switches a model to evaluation behavior, turning off training-only behaviors such as dropout.' },
    { t: 'torch.no_grad()', d: 'A context manager that turns off gradient tracking for faster, lighter evaluation.' },
    { t: 'state_dict', d: 'A dictionary of a model\'s learned parameters, used to save and load it.' },
    { t: 'Stratify', d: 'Splitting data so each class keeps the same proportion in the training and test sets.' }
  ]
});
