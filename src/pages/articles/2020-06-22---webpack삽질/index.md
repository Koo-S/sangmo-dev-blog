---
title: "webpack 과 관련된 삽질..."
date: "2020-06-22"
layout: post
draft: false
path: "/dev/webpack"
category: "dev"
tags:
  - "dev"
  - "webpack"
  - "javasciprt"
---

### 요약

- 개발을 너무 야매? 스타일로 배워서 뭐가 뭔지 잘 모른다. 근데 내가 그냥 잘 모르고 주워들었던 거 위주로 나만의 삽질을 글로 남겨보는 과정이다... **내가 기억하기 위함의 글 임**
- 준비한게 아니라 의식의 흐름대로 그냥 정리함 삽질하면서 기록하고 기록한걸 조금 수정하는 수준! 누가 볼건 아니고 그냥 **내가 나중에 기억하기 위함의 글 임**

### 내가 해본 삽질 정리

- 갑자기 webpack version 4를 잘 사용하고 싶었다. 하나의 번들링 file로 만들고 싶었다.
- 내가 index.js에서 사용한 module 만 webpack으로 번들링 시키고 싶었다.

    ```jsx
    const test = require('mainTest.js') // 이렇게 하면 mainTest.js 를 모두 번들링하는 것으로 알고 있음
    	import {test1} from './mainTest.js' // 이렇게 했을 경우 mainTest의 test1 module만 번들링 할 수 있음
    ```

- 처음에는 index.js에서 사용한 모듈만 포함시키는 방법을 몰랐다
그래서 node_modules를 webpack에서 번들링할 때 아예 제외시키려고 했다.
- 그래서 찾아본 모듈 [https://www.npmjs.com/package/webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals)
이걸 쓰면 webpack 번들링 하면 node_modules 전부 제외된다. 찾아보니까 내가 작성한 파일만 번들링 하고싶을때 쓴다고 하더라
- 그 다음 나의 요구사항에 맞게 걸린 키워드 TreeShaking
나무를 흔들다라는 뜻으로 내가 쓰는 모듈만 번들링이 가능한 개념이였다.

ref)

  [https://medium.com/naver-fe-platform/webpack에서-tree-shaking-적용하기-1748e0e0c365](https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-tree-shaking-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-1748e0e0c365)

  [https://huns.me/development/2265](https://huns.me/development/2265)

- sideEffect라는 문제도 있었음 정확히 모르지만 sideEffect가 있으면 내가 사용한 모듈 말고 다른 연관 있는 모듈도 webpack에서 같이 번들링 됨
- 테스트 코드를 만들어 보려고 하는데 나중에 만들면 여기다 업데이트 할 예정임

### 내가 작성한 webpack.config.js

```jsx
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack'); // .env 파일 bundle 할때 .js 파일에 포함시키기 위함

module.exports = {
  entry: './index.js', // 시작점 번들링 시 바라볼 파일
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env', {
              targets: { node: 'current' },
            }
          ],
        ],
      },
      exclude: ['/node_modules'],
    }],
  },
  plugins: [
    new Dotenv(), 
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
  },
};
```

ref) 

- dotenv-webpack: [https://www.npmjs.com/package/dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack)
- webpack v4 option 참고 [https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d](https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d)


### 자세한 설명은 link로 대체.. 나중에 찾아보면 알듯 싶다.