> Vite.js로 세팅된 이 프로젝트의 실행 명령어는 `npm run dev` 입니다.

# Folder Tree

```
// 폴더 트리 구조는 아래를 참고합니다.

📦 project
├─ .vscode
├─ node_modules
├─ public
│  ├─ data
│  ├─ images
│  ├─ favicon.ico
│  └─ index.html
├─ src
│  ├─ components
│  │  └─ Button
│  │     ├─ Button.js
│  │     └─ Button.scss
│  ├─ pages
│  │  └─ Login
│  │     ├─ Login.js
│  │     └─ Login.scss
│  ├─ styles
│  ├─ index.js
│  └─ Router.js
├─ .exlintrc
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
└─ package.json
```

# Naming & Rules

## CSS / Scss

```scss
// CSS 또는 Scss 클래스 네이밍은 기본적으로 kebab-case를 따릅니다.
.post-list {
	...
}

// 선택자와 동일한 결로 네이밍을 정합니다.
ul.post-list {}        // good
li.post-list {}        // bad
li.post-list-item {}   // good
```

## React

```jsx
// import 순서는 아래와 같이 정렬합니다.
import React from 'react';                 // 1. React + hook
import Button from 'url';                  // 2. Components
import './Button.scss'                     // 3. Scss

// 변수와 함수의 이름은 camelCase를 따릅니다.
const userInfo;
const submitComment = () => {
	...
}

// 상수는 UPPER_SNAKE_CASE를 따릅니다.
const USER_DATA;

// 변수와 조합해 문자열을 생성하는 경우에는 템플릿 리터럴을 사용합니다.
const message = `hello, ${name}!`;         // good
const message = 'hello' + name + "!";      // bad
```

## Files

```
// 파일명은 camelCase를 따릅니다.
postList.js                                // good
postlist.js                                // bad
```

## Branch

```
// 브랜치 이름은 기능 및 컴포넌트별로 명명합니다.
feature/submit
component/button

// 긴급한 오류를 수정하기 위해 아래와 같은 브랜치를 생성할 수도 있습니다.
hotfix
```

# PR & commit

```
// PR은 하나의 기능 개발 완료 시 진행합니다. 여러 commit이 쌓여서 하나의 PR이 완성됩니다. 즉 commit은 PR에 대한 상세 개발 내역입니다.
- PR: 로그인 화면 개발
- commit: 인풋 컴포넌트 개발 / 버튼 컴포넌트 개발 / 유효성 검사 기능 추가 등

// commit 메시지는 아래와 같이 나눠 작성합니다.
[feat] 제목          // 기능 추가
[fix] 제목           // 버그 수정
[refact] 제목        // 리팩토링
[style] 제목         // UI 수정
```
