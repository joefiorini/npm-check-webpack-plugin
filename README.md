# npm-check-webpack-plugin

Uses the [`npm-check`](https://github.com/dylang/npm-check) library to check for missing dependencies before running a webpack build. By default, if it finds any missing or outdated dependencies it will automatically run `npm install` before continuing with the build.

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
