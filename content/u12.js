COURSE.units.push({
  id: 'u12', num: 12, stage: 's2', status: 'planned', minutes: 'Outline',
  title: 'NumPy: Arrays and Fast Math',
  summary: 'Arrays, vectorized operations, indexing and slicing on arrays, and why NumPy is fast.',
  objectives: [
    'Create arrays and explain how they differ from Python lists',
    'Use vectorized operations instead of loops',
    'Index, slice, and reshape multidimensional arrays'
  ],
  blocks: [
    { type: 'note', html: 'This unit is outlined. The full lesson is in development. Install-free use is available in the sandbox, because NumPy loads automatically when imported.' },
    { type: 'h', text: 'Planned coverage' },
    { type: 'ul', items: [
      'Why arrays: homogeneous data, contiguous memory, and vectorized math',
      '<code>np.array</code>, <code>np.arange</code>, <code>np.zeros</code>, <code>np.ones</code>, <code>np.linspace</code>',
      'Shape, dtype, and <code>reshape</code>',
      'Boolean masks and fancy indexing',
      'Broadcasting: how NumPy matches shapes without copying data',
      'Aggregations: <code>sum</code>, <code>mean</code>, <code>std</code>, <code>axis</code>'
    ] }
  ],
  terms: []
});
