
# DeleteSourceMapPlugin
Webpack 5 plugin that will remove all SourceMaps url from files and remove .map files after compilation is done

**This plugin wont work with webpack version lower than 5**

## Installation

This plugin requires [Webpack v5+](https://webpack.js.org/migrate/5/) in order to work.

npm
```sh
npm i @zimmc0/delete-sourcemaps-webpack-plugin
```

yarn
```sh
yarn add @zimmc0/delete-sourcemaps-webpack-plugin
```
## Usage
```js
const DeleteSourceMapPlugin = require('@zimmc0/delete-sourcemaps-webpack-plugin')

module.exports = {
    ...
    plugins: [
        new DeleteSourceMapPlugin()
    ],
     ...
}
```
Enjoy ✨
