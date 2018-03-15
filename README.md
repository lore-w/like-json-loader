# like-json-loader
like-json-loader for webpack

---

like-json-loader是一个webpack loader，可以输出符合打包环境的配置文件

## Install

`$ npm install like-json-loader --save-dev`

## Usage

```js

module.exports = {
  ...

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'like-json-loader',
        options: {
          env: 'PRD' // 可从命令行获取
        }
      }
    ]
  }
}
```

## Example
```json
{
  "shareUrl": "www.lore-w.com",
  "XXX": {
    "ABC": {
      "TEST": {
        "localhost": {
          "DEV": "a",
          "SIT": "b",
          "PRD": "c"
        }
      }
    }
  },
  "API": {
     "userList": {
        "DEV": "api.dev.com",
        "SIT": "api.dev.com",
        "PRD": "api.dev.com"
     },
     "addUser": {
      "DEV": "api.dev.com",
      "SIT": "api.dev.com",
      "PRD": "api.dev.com"
     }    
  }
}
```

## Output

```js
{
  "shareUrl": "www.lore-w.com",
  "XXX": {
    "ABC": {
      "TEST": {
        "localhost": "c"
      }
    }
  },
  "API": {
     "userList": "api.dev.com",
     "addUser": "api.dev.com"   
  }
}
```
