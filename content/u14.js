COURSE.units.push({
  id: 'u14', num: 14, stage: 's3', status: 'planned', minutes: 'Outline',
  title: 'PyTorch and the Machine-Learning Workflow',
  summary: 'Tensors, a first model, training loops, and evaluation. Run in Google Colab or a local install.',
  objectives: [
    'Explain the machine-learning workflow: data, model, loss, optimizer, evaluation',
    'Create tensors and run them through a simple model',
    'Write and read a basic training loop'
  ],
  blocks: [
    { type: 'note', html: 'This unit is outlined. PyTorch does not run in the browser sandbox. Lessons in this unit will use Google Colab (free, no install) or a local environment.' },
    { type: 'h', text: 'Planned coverage' },
    { type: 'ul', items: [
      'The workflow: data → model → loss → optimizer → evaluation',
      'Tensors and how they relate to NumPy arrays',
      'A linear model on a small dataset',
      'The training loop: forward pass, loss, backward pass, optimizer step',
      'Train/test split and overfitting',
      'Ethics and data quality: where bad models come from'
    ] }
  ],
  terms: []
});
