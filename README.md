## Index

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Features](#features)
- [How To Make](#how-to-make)
- [Trouble Shooting](#try)

## Overview

**관광명소를 보여주고 검색할 수 있는 간단한 웹 애플리케이션입니다.**

**localhost:3000에서만 동작합니다.**

## Features

**관광지**

- 관광지 목록을 확인할 수 있습니다.
- 관광지의 평점을 별 개수로 확인할 수 있습니다. 평점은 0.5 단위로 올림하여 별 0개부터 별 5개로 표현합니다. 예를 들어 평점이 0.3점이면 별 반개로, 4.84점이면 별 5개로 표현합니다.
- 관광지에 달린 리뷰의 개수를 확인할 수 있습니다. 리뷰의 개수는 최대 99까지 표시하며 99를 넘는 수는 "99+"로 표현합니다.
- 관광지를 좋아요한 사람 수를 확인할 수 있습니다. 관광지를 좋아요한 사람 수는 최대 999까지 999를 넘는 수는 "999+"로 표현합니다.

**좋아요 / 좋아요 취소**

- 관광지를 좋아요할 수 있습니다.
- 좋아요한 관광지를 좋아요 취소할 수 있습니다.

**검색**

- 관광지를 검색할 수 있습니다.
- 검색 영역은 화면 상단에 고정하고 스크롤을 내리면 그림자를 표시합니다.
- 검색어를 입력하는 중 그리고 검색어 입력 후 엔터를 눌렀을 때 API를 호출하여 목록을 표시합니다.
- 검색어를 입력할 때 너무 많은 API 요청을 하지 않도록 조절해야 합니다.
- 검색 API의 응답을 기다리고 있을 때 스켈레톤 UI를 표시합니다.
- 관광지의 이름에서 검색어를 하이라이트합니다.
- 검색어를 입력했을 있을 때는 입력 영역 우측에 검색어를 한 번에 제거하는 버튼을 표시합니다.

## Getting Started

1. npm install
2. npm start

## How To Make

**Process**

1. 스타일 디렉토리 개발
2. 컴포넌트 개발
3. 컴포넌트 조합
4. 서버로부터 데이터 받기
5. 성능 최적화
6. 기타 기능 개발

**What I Do To Improve Project**

- axios를 통한 서버 통신
- 서버 통신 로딩시 Skeleton UI 노출
- 성능 최적화
  - memo 사용으로 컴포넌트 랜더링 최소화
  - debounce, throttle, useDebounce 사용으로 API 호출 최소화
- 사용자의 예상치 못한 행동 대응
  - debounce를 사용하여 한번에 다량으로 발생하는 API호출 최소화
  - ex. 빠르게 좋아요를 여러번 누르거나 빠르게 검색창에서 엔터를 여러번 누르는 경우
- 좋아요 / 좋아요 취소 인터랙션 구현
  - 라이브러리를 사용하지 않고 css만으로 구현
- 기타 디테일한 UI 개선
  - 카드 제목 1줄 이상은 말줄임표 처리
  - 카드 설명 2줄 이상은 말줌임표 처리
- 에러 핸들링

## 결과물
https://user-images.githubusercontent.com/22545843/206652848-03bc3fc7-d6b7-4159-b5eb-dd4eea47ad18.mov

## 트러블 슈팅

![](https://velog.velcdn.com/images/dusdjeks/post/85834dea-5014-4fd9-ba44-8d176a49e75d/image.png)

Jest는 ECMAScript를 모르기 때문에 import가 무엇인지 모른다. 그래서 vscode에서 추천해주는 페이지를 따라가 다음과 같은 해결책을 찾았다.

```js
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

이 코드는 jest에서 ECMAScript를 사용할 수 있게 해주는 설정이다. 그러나 나의 경우에 이는 해결책이 되어주지 못했고 다른 해결 방안을 찾아보았다. stack overflow에서 추천하는 "type": "module"또한 동작하지 않았다.

그래서 이러한 문제의 원인에 대해서 생각을 해보다, 내가 짠 코드는 ES6이므로, babel 설정을 통해 commonjs로 바꿔주면 되지 않을까 ? 라는 생각을 하게 되었다.

따라서, ES6 module을 commonjs로 transpile 해주는 babel 설정을 하였다. 에러해 해당하는 plugin을 일일이 찾는 것이 굉장히 많은 시간을 들게 하였다. (이틀정도 밤새 찾았다...😱)

_.babelrc_

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "targets": {
    "node": "current"
  },
  "plugins": [
    "@babel/plugin-transform-modules-commonjs",
    "babel-plugin-inline-react-svg",
    "babel-plugin-named-asset-import"
  ]
}
```

여기까지 진행했을 때에는 jsx파일 읽지 못하는 에러가 발생하였다.
따라서 jest 환경 설정도 다시금 해주었다.

jest.config.json

```json
{
  "moduleFileExtensions": ["js", "jsx", "json"],
  "testEnvironment": "jsdom"
  "moduleNameMapper": {
    "^@/(.*)$": "./src/$1"
  },
  "testMatch": [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  "transformIgnorePatterns": ["./src/node_modules/"],
  "verbose": true,
  "collectCoverage": true,
  "testEnvironment": "jsdom",
  "transform": {
    "\\.[jt]sx?$": "babel-jest"
  }
}
```

다음은 package.json 전문이다.

```json
{
  "name": "frontend-assignment",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^1.1.3",
    "jest": "^29.2.2",
    "lodash": "^4.17.21",
    "nanoid": "^4.0.0",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.2",
    "react-scripts": "5.0.1",
    "styled-components": "^5.3.6"
  },
  "devDependencies": {
    "@babel/core": "^7.19.6",
    "@babel/plugin-transform-modules-commonjs": "^7.19.6",
    "@babel/preset-env": "^7.19.4",
    "@babel/preset-react": "^7.18.6",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^14.2.1",
    "babel-jest": "^29.2.2",
    "babel-plugin-inline-react-svg": "^2.0.1",
    "babel-plugin-named-asset-import": "^0.3.8",
    "husky": "^8.0.0",
    "jest-environment-jsdom": "^29.2.2",
    "lint-staged": "^13.0.3",
    "msw": "^0.42.3",
    "prettier": "^2.7.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest",
    "eject": "react-scripts eject",
    "prettier": "prettier . --write",
    "prepare": "husky install"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "lint-staged": {
    "*": "npx prettier --check",
    "*.{js,jsx,ts,tsx}": "npx eslint"
  },
  "msw": {
    "workerDirectory": "public"
  }
}
```

이렇게까지 설정을 해보았으나,, 밑빠진 독에 물을 붓는 느낌이 들었고, 리프레쉬를 한 후에 다시금 원인을 분석해 보았다.

## 문제 원인 정리

import, jsx는 ECMAscript 문법이고, axios와 nanoid는 ECMAScript 문법을 따르는 모듈이다.

Jest는 Node.js 환경에서 동작하기 때문에 CommonJS 방식으로 모듈을 사용한다.

Jest는 바벨같은 트랜스파일러를 통해 ECMAScript 모듈을 CommonJS 문법에 맞도록 변경 후 사용해야 한다.

**Jest는 node_modules 폴더를 트랜스파일러의 변경 대상에서 제외한다.**

따라서, node_modules 중에서 nanoid, axios를 변경 대상에서 제외하지 않도록 설정해줘야 한다.

## 해결한 방법

그렇다.. 애초에 Jest는 node_modules 하위에 있는 폴더들은 트랜스파일 대상에서 제외하는데, 그걸 제외하지 않도록 설정해주면 되는 것이었다.

```js
"jest": {
    "transformIgnorePatterns": [
      "node_modules\/(?!nanoid|axios)"
    ]
  }
```

이 결론에 도달하는데 최소한 이틀은 밤을 샌 것 같다..

## 이를 통해 문제를 해결할 수 있는 이유

기본적으로 Jest는 node_modules 하위 디렉토리의 코드들은 변경 대상에서 제외한다. transformIgnorePatterns 설정 값을 통해 변경 제외 대상을 지정할 수 있다.

## 배운점

해결하기 까다로운 문제를 마주했을 때, 가장 중요한 것은

**문제의 원인을 정확히 진단하는 것이다.**

문제의 원인을 정확히 진단하지 않고 문제를 해결하려 할 때,
우연히 해결할 수도 있다.

그러나, 추후에 똑같은 문제가 발생할 확률이 높고, 문제와 관련없는 해결책을 찾아보기 때문에 문제를 해결하는데 시간이 오래 걸릴 수 있다.
