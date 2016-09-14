module.exports = {
    extends: 'airbnb',
    installedESLint: true,
    plugins: [ ],
    env: {
      node: true,
      es6: true,
      browser: true,
    },
    rules: {
      strict: 0,
      'arrow-body-style': [2, 'always'],
      'no-console': 0,
    },
    globals: {
      d3: true,
      $: true,
    }
};
