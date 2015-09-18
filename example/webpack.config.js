var NpmCheckPlugin = require('../dist');

module.exports =
  { entry: './fixtures/main.js',
    output:
      { filename: 'output.js'
      },
    plugins:
      [ new NpmCheckPlugin()
      ]
  };
