COURSE.units.push({
  id: 'u13', num: 13, stage: 's2', status: 'planned', minutes: 'Outline',
  title: 'pandas: DataFrames',
  summary: 'Load, inspect, clean, filter, group, and summarize tabular data.',
  objectives: [
    'Create and inspect a DataFrame with <code>head()</code>, <code>info()</code>, and <code>describe()</code>',
    'Select rows and columns and filter with conditions',
    'Group and aggregate data with <code>groupby</code>'
  ],
  blocks: [
    { type: 'note', html: 'This unit is outlined. The full lesson is in development.' },
    { type: 'h', text: 'Planned coverage' },
    { type: 'ul', items: [
      'Series and DataFrame: labeled rows and columns',
      'Reading CSV files with <code>pd.read_csv</code>',
      'Selecting with <code>[]</code>, <code>.loc</code>, and <code>.iloc</code>',
      'Filtering rows with conditions and combining them with <code>&amp;</code> and <code>|</code>',
      'Handling missing values with <code>isna</code>, <code>dropna</code>, <code>fillna</code>',
      '<code>groupby</code> and aggregation; a first small analysis of class data'
    ] }
  ],
  terms: []
});
