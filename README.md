# npm-check-webpack-plugin

Uses the [`npm-check`](https://github.com/dylang/npm-check) library to check for missing dependencies before running a webpack build. By default, if it finds any missing or outdated dependencies it will automatically run `npm install` before continuing with the build.

While in watch mode, the plugin will only check for changes in dependencies when the package.json file changes to speed up the webpack rebuilds.  To make this work, you must require your package.json file in your app so that webpack will watch the file.

## Installation

```
npm install npm-check-webpack-plugin
```

## Usage

In `webpack.config.js` (or whatever file you have your webpack config in):

```js
var NpmCheckPlugin = require('npm-check-webpack-plugin');
/* ES6:
   import NpmCheckPlugin from 'npm-check-webpack-plugin';
 */

module.exports =
  { //... webpack config
    plugins:
      [ new NpmCheckPlugin(/* { autoInstall: [false|true*] silent: [false*|true] }*/)
      ]
  };
```


In `app.js` or equivalent, require your package.json file (use this as an excuse to put your version number to good use)

```js
var config = require('../package.json');

console.log(config.version);
```