# deps for react (webpack5 + webpack-serve by webpack-plugin-serv)

`package.json`
```
"dependencies":{
  "react": "16.10.2",
  "react-dom": "16.10.2",
  "react-router-dom": "5.1.2"
  ...
}
```

```
"devDependencies": {
    "webpack": "^5.66.0",
    "webpack-nano": "^1.1.1",
    "webpack-plugin-serve": "^1.5.0",
    "@babel/core": "^7.16.7",
    "@babel/preset-env": "^7.16.10",
    "@babel/preset-react": "^7.16.7",
    "babel-loader": "^8.2.3",
}
```

`webpack.config.js`

- live reload
- watched

```
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

const options = {
  'host': '127.0.0.1',
  'port': 9999,
  liveReload: true
}

module.exports = {
  context: path.join(__dirname, '/'),
  entry: [
    'webpack-plugin-serve/client',
    path.join(__dirname, 'index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].pack.js'
  },
  'module': {
    'rules': [
      {
        'use': {
          'loader': 'babel-loader',
          'options': {
            'presets': [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        },
        'exclude': /node_modules/,
        'test': /\.js$/
      }
    ]
  },
  mode: 'development',
  plugins: [
    new Serve(options)
    // new HtmlWebpackPlugin({
    //   title: 'snake game - react',
    //   template: 'index.html'
    // })
  ],
  watch: true
}

```

# deps for react (webpack4)
`package.json`
```
{
  "name": "project",
  "dependencies": {
    "react": "16.10.2",
    "react-dom": "16.10.2",
    "react-router-dom": "5.1.2",
    "prop-types": "15.7.2"
  },
  "devDependencies": {
    "webpack": "^2.0",
    "babel-core": "^6.0",
    "babel-loader": "^7.0",
    "babel-preset-env": "*",
    "babel-preset-react": "*"
  },
  "scripts": {
    "build": "webpack",
    "watch": "webpack -w"
  }
}
```

`webpack.config.js`
```
module.exports = {
  "output": {
    "filename": "[name].pack.js"
  },
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "babel-preset-env",
              "babel-preset-react"
            ]
          }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      }
    ]
  },
  "entry": {
    "index": "./index"
  }
};
```
