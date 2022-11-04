# 트리플 x 인터파크 프론트엔드 엔지니어 채용 과제
## Index
  - [Overview](#overview) 
  - [Getting Started](#getting-started)
  - [How To Make](#how-to-make)
  - [Trouble Shooting](#try)


## Overview

**관광명소를 보여주고 검색할 수 있는 간단한 웹 애플리케이션입니다. n**


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
- 성능 최적화 
  - memo 사용으로 컴포넌트 랜더링 최소화  
  - debounce, throttle, useDebounce 사용으로 API 호출 최소화  
- 사용자의 예상치 못한 행동 대응 
  - debounce를 사용하여 한번에 다량으로 발생하는 API호출 최소화 
  - ex. 빠르게 좋아요를 여러번 누르거나 빠르게 검색창에서 엔터를 여러번 누르는 경우 
- 좋아요 / 좋아요 취소 인터랙션 구현 
  - 라이브러리를 사용하지 않고 css만으로 구현 
- 좋아요 / 좋아요 취소 인터랙션 구현 
- 기타 디테일한 UI 개선   
  - 카드 제목 1줄 이상은 말줄임표 처리  
  - 카드 설명 2줄 이상은 말줌임표 처리 
- 에러 핸들링 


## Trouble Shooting

npm test시 import를 읽지 못하는 문제가 발생했습니다. 

프로젝트는 ES6로 구성하였고 테스트 환경은 commnjs만을 이해할 수 있기 때문에 transpile 과정이 필요했습니다. 따라서 jest library를 설치하고 package.json을 다음과 같이 구성하였습니다. 

.package.json
```js
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest",
    "eject": "react-scripts eject",
    "prettier": "prettier . --write",
    "prepare": "husky install"
  },
```

이후에 ES6 module을 commonjs로 transpile 해주는 babel 설정을 하였습니다. 추가적으로 svg와 관련되서 많은 오류가 발견되어 plugin을 찾아 일일이 추가해주었습니다. 

.babelrc
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

여기까지 진행하니 이제는 jsx파일 읽지 못했습니다. 따라서 

```json
{
  "moduleFileExtensions": ["js", "jsx", "json"],

  "testEnvironment": "jsdom"
}
```

와 같이 설정하니 이번에는 
html파일을 읽지 못했습니다.
 
