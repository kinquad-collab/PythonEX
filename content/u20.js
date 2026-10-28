COURSE.units.push({
  id: 'u20', num: 20, stage: 's3', status: 'ready', minutes: '90 min',
  title: 'PyTorch: Tensors, Gradients, and Neural Networks',
  summary: 'Tensors, the operations on them, automatic differentiation, and building a small neural network with nn.Module.',
  objectives: [
    'Create tensors and check their shape, dtype, and device',
    'Explain how a tensor relates to a NumPy array, and convert between them',
    'Use <code>requires_grad</code> and <code>backward()</code> to compute gradients automatically',
    'Explain what a neuron, a layer, and an activation function do',
    'Define a small network with <code>nn.Module</code> and run a forward pass'
  ],
  blocks: [
    { type: 'note', html: '<b>Where to run this unit.</b> PyTorch is not available in the browser sandbox. Use Google Colab (free, no installation; set Runtime → Run all) or install PyTorch locally with <code>pip install torch</code>. Every code block here was run with PyTorch 2.x on CPU. Output shown in the text may differ slightly in the last decimal place.' },

    { type: 'h', text: 'Tensors' },
    { type: 'p', html: 'A <b>tensor</b> is an n-dimensional array, like a NumPy array, with two extra abilities: it can live on a GPU, and it can track how it was computed so gradients can be found automatically. Most of the code you write looks like NumPy.' },
    { type: 'code', caption: 'tensors.py', run: false, code: `import torch

x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
print(x)
print(x.shape, x.dtype)
print(torch.zeros(2, 3))
print(torch.arange(5))` },
    { type: 'table', head: ['NumPy', 'PyTorch', 'Notes'], rows: [
      ['<code>np.array(...)</code>', '<code>torch.tensor(...)</code>', 'Copies the data'],
      ['<code>np.zeros(...)</code>', '<code>torch.zeros(...)</code>', 'Same idea'],
      ['<code>a.shape</code>', '<code>t.shape</code>', 'Same idea'],
      ['<code>a.dtype</code>', '<code>t.dtype</code>', 'Default float is float32 in PyTorch, float64 in NumPy'],
      ['<code>a @ b</code>', '<code>t @ u</code>', 'Matrix product works the same way']
    ] },
    { type: 'warn', html: 'Tensors and arrays must have compatible dtypes for many operations. A common error is mixing <code>int64</code> with <code>float32</code>. Convert with <code>t.float()</code> when a function asks for floats.' },
    { type: 'code', caption: 'convert.py', run: false, code: `import numpy as np
import torch

a = np.array([1.5, 2.5])
t = torch.from_numpy(a)        # shares memory with a
back = t.numpy()               # back to NumPy
print(t, back)` },

    { type: 'h', text: 'Operations and devices' },
    { type: 'p', html: 'Operations work element by element, use broadcasting, and matrix products with <code>@</code>, exactly as in NumPy. Tensors can move to a GPU with <code>.to(device)</code>. Code that picks the device at the top keeps working on machines without a GPU.' },
    { type: 'code', caption: 'device.py', run: false, code: `import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
x = torch.ones(2, 3, device=device)
w = torch.full((3, 2), 0.5, device=device)
print(device, (x @ w).shape)` },

    { type: 'h', text: 'Automatic gradients' },
    { type: 'p', html: 'Training a model means adjusting numbers to reduce an error. The adjustment is the <b>gradient</b>: how much the error changes when each number changes. PyTorch computes gradients automatically. Set <code>requires_grad=True</code> on the tensors you want gradients for, compute a result, then call <code>backward()</code> on it. The gradients appear in <code>.grad</code>.' },
    { type: 'code', caption: 'autograd.py', run: false, code: `import torch

x = torch.tensor(3.0, requires_grad=True)
y = x ** 2 + 2 * x      # y = x^2 + 2x

y.backward()            # compute dy/dx
print(x.grad)           # 2x + 2 at x = 3 is 8` },
    { type: 'trace', title: 'Trace: a gradient by hand', intro: 'The same answer, worked by hand: the derivative of x² + 2x is 2x + 2. This is what <code>backward()</code> computed for you.',
      code: `x = 3.0
y = x ** 2 + 2 * x
slope = 2 * x + 2
print(slope)`,
      steps: [
        { line: 1, vars: { x: '3.0' } },
        { line: 2, vars: { x: '3.0', y: '15.0' } },
        { line: 3, vars: { x: '3.0', y: '15.0', slope: '8.0' } },
        { line: 4, vars: { x: '3.0', y: '15.0', slope: '8.0' }, say: '8.0' }
      ] },
    { type: 'p', html: 'Gradients accumulate in <code>.grad</code>. Clear them before each new step with <code>optimizer.zero_grad()</code> (Unit 21), or the numbers add up across steps.' },

    { type: 'h', text: 'A neuron and an activation' },
    { type: 'p', html: 'A <b>neuron</b> multiplies each input by a weight, adds a bias, and passes the total through an <b>activation function</b>. Without an activation, stacked layers collapse into one linear map. <code>ReLU</code> is the usual choice: it outputs the input if it is positive, and 0 otherwise. Non-linear activations let networks learn curves.' },
    { type: 'code', caption: 'relu.py', run: false, code: `import torch
import torch.nn as nn

relu = nn.ReLU()
print(relu(torch.tensor([-2.0, 0.0, 3.5])))` },

    { type: 'h', text: 'Building a network' },
    { type: 'p', html: 'A neural network is a class that inherits from <code>nn.Module</code> (Unit 14). In <code>__init__</code> you define the layers. In <code>forward</code> you describe how data flows through them. Calling the model, such as <code>net(x)</code>, runs <code>forward</code>.' },
    { type: 'code', caption: 'network.py', run: false, code: `import torch
import torch.nn as nn

class TinyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.hidden = nn.Linear(4, 8)   # 4 features in, 8 hidden units
        self.act = nn.ReLU()
        self.out = nn.Linear(8, 3)      # 3 classes out

    def forward(self, x):
        x = self.act(self.hidden(x))
        return self.out(x)

net = TinyNet()
batch = torch.rand(5, 4)                # 5 examples, 4 features each
logits = net(batch)
print(logits.shape)                     # torch.Size([5, 3])` },
    { type: 'p', html: 'The output of the last layer, before any softmax, is called the <b>logits</b>. Each row is a score for each class. The class with the highest score is the prediction.' },

    { type: 'h', text: 'Parameters' },
    { type: 'code', caption: 'parameters.py', run: false, code: `import torch.nn as nn

layer = nn.Linear(4, 8)
print(layer.weight.shape)
print(layer.bias.shape)
print(sum(p.numel() for p in layer.parameters()))` },
    { type: 'p', html: 'Parameters are the weights and biases the network learns. <code>parameters()</code> lists them, and <code>numel()</code> counts the numbers in each. 4 × 8 weights plus 8 biases is 40 numbers for this layer.' },

    { type: 'predict', intro: 'Shapes and gradients are where most PyTorch errors start.', items: [
      { code: 'import torch\nprint(torch.zeros(2, 3).shape)', a: 'torch.Size([2, 3])' },
      { code: 'import torch\nprint(torch.arange(4).sum().item())', a: '6' },
      { code: 'import torch\nx = torch.tensor(2.0, requires_grad=True)\ny = x * x\ny.backward()\nprint(x.grad.item())', a: '4.0', why: 'd(x²)/dx = 2x = 4 at x = 2.' },
      { code: 'import torch.nn as nn\nprint(nn.Linear(4, 8).weight.shape)', a: 'torch.Size([8, 4])', why: 'PyTorch stores the weight as (out_features, in_features).' }
    ] },

    { type: 'h', text: 'Practice' },
    { type: 'exercise', title: 'Gradient check', prompt: '<p>Create a tensor <code>x</code> with value 5.0 and <code>requires_grad=True</code>. Compute <code>y = 3 * x ** 2</code>, call <code>backward()</code>, and print <code>x.grad</code>. Check that it matches the derivative 6x by hand.</p>',
      solution: `import torch

x = torch.tensor(5.0, requires_grad=True)
y = 3 * x ** 2
y.backward()
print(x.grad)   # 6 * 5 = 30` },
    { type: 'exercise', title: 'Shape the network', prompt: '<p>Change the <code>TinyNet</code> above so its hidden layer has 16 units. Predict the new parameter count before you run it, then check. Hint: a Linear layer from <i>a</i> to <i>b</i> has <i>a × b + b</i> parameters.</p>',
      solution: `import torch.nn as nn

hidden = nn.Linear(4, 16)
out = nn.Linear(16, 3)
total = sum(p.numel() for p in list(hidden.parameters()) + list(out.parameters()))
print(total)   # (4*16 + 16) + (16*3 + 3) = 80 + 51 = 131` },

    { type: 'discussion', prompts: [
      'Why does a network need a non-linear activation? What would happen to three stacked linear layers without one?',
      'Gradients tell you which way to move a weight. What would go wrong if the gradient were always zero?',
      'Why might a team prefer a smaller network that is easier to explain, even if a bigger one is slightly more accurate?'
    ], facilitator: 'Ask students to count the parameters of <code>TinyNet</code> by hand before running the count. The layer formulas are the useful part to remember.' }
  ],
  terms: [
    { t: 'Tensor', d: 'A multi-dimensional array in PyTorch that can run on a GPU and track gradients.' },
    { t: 'dtype', d: 'The number type stored in a tensor, such as <code>float32</code> or <code>int64</code>.' },
    { t: 'Device', d: 'Where a tensor lives: <code>cpu</code> or an accelerator such as <code>cuda</code>.' },
    { t: 'Gradient', d: 'The rate at which an output changes as a parameter changes. Training moves parameters against the gradient.' },
    { t: 'Autograd', d: 'PyTorch\'s automatic differentiation: it records operations and computes gradients on <code>backward()</code>.' },
    { t: 'Neuron', d: 'A unit that computes a weighted sum of its inputs plus a bias, then applies an activation function.' },
    { t: 'Activation function', d: 'A non-linear function applied after a layer, such as ReLU, so the network can learn curves.' },
    { t: 'nn.Module', d: 'The base class for PyTorch models. Layers are defined in <code>__init__</code> and the data flow in <code>forward</code>.' },
    { t: 'Logits', d: 'The raw, unnormalized scores a classifier outputs before a softmax or other probability step.' },
    { t: 'Parameters', d: 'The learned numbers of a model, such as weights and biases.' }
  ]
});
