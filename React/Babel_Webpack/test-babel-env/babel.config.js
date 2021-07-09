const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        chrome: '40',
      },
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true },
    },
  ],
];

module.exports = { presets };
