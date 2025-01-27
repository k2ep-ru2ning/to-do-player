# To-Do Player

할 일을 계획하고, 계획한 시간만큼 집중할 수 있도록 도와주는 애플리케이션입니다.

## 배포

[to-do-player.netlify.app](https://to-do-player.netlify.app/)

## 개발 일지

개발하면서 **공부한 내용**, **겪었던 문제를 해결하기 위해 노력했던 과정**을 [Github Wiki](https://github.com/k2ep-ru2ning/to-do-player/wiki)에 정리했습니다.

## 기술 스택

<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <img src="https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakraui&logoColor=white">
</div>
<div>
  <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black">
  <img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">
</div>
<div>
  <img src="https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=Node.js">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
</div>

## 주요 기능

### 할 일 계획 (추가/선택/수정/삭제)

#### 할 일 추가/선택

![추가/선택 예시](https://github.com/k2ep-ru2ning/to-do-player/assets/80243123/d2120864-f7eb-4f02-b38e-99ebc741fbb2)

- `할 일 추가하기` 버튼을 누르면 할 일 추가 form이 나타납니다.
- 할 일 이름과 계획 시간을 입력할 수 있습니다.
  - 입력한 값이 유효하면 modal이 닫히고 할 일이 추가됩니다.
- 추가된 할 일은 `할 일 목록`에 표시됩니다.
- `할 일 목록`에서 할 일을 선택하면, 선택된 일의 이름과 남은 시간이 왼쪽에 표시됩니다.
  - 선택된 일을 수정/삭제/시작/정지/초기화/재시작할 수 있습니다.

#### 할 일 수정

![수정 예시](https://github.com/k2ep-ru2ning/to-do-player/assets/80243123/09f96f1a-01ef-41a4-8c35-4ceb77119a3a)

- `수정하기` 버튼을 누르면 할 일 수정 form이 나타납니다.
- 할 일 이름, 계획 시간을 수정할 수 있습니다.

#### 할 일 삭제

![삭제 예시](https://github.com/k2ep-ru2ning/to-do-player/assets/80243123/5a9b1c40-de3b-4bd0-b09d-ed4ab7e91188)

### 할 일 실행 (시작/정지/초기화/재시작/완료)

#### 할 일 시작/정지

![시작/정지 예시](https://github.com/k2ep-ru2ning/to-do-player/assets/80243123/f94d1e08-2faf-4c01-9cf0-0395613d50af)

- 시작 버튼을 눌러 선택한 일을 시작할 수 있습니다.
- 정지 버튼을 눌러 진행 중인 일을 멈출 수 있습니다.
  - `할 일 목록` 또는 `완료한 일`에서 **진행 중인 일이 아닌 일을 선택**하면, 기존에 진행 중인 일을 멈춥니다.

#### 할 일 초기화 (reset)

![초기화 예시](https://github.com/k2ep-ru2ning/to-do-player/assets/80243123/857bf850-fdda-4769-a7e1-a007cf0703cf)

선택한 일이 정지 상태일 때, 초기화 버튼을 눌러서 남은 시간을 계획 시간으로 되돌릴 수 있습니다.

#### 할 일 재시작 (restart)

![재시작 예시](https://github.com/k2ep-ru2ning/to-do-player/assets/80243123/58cca291-845a-42e1-9547-05ecc2f907ac)

선택한 일이 진행 중일 때, 재시작 버튼을 눌러서 남은 시간을 계획 시간으로 되돌리고 재시작할 수 있습니다.

#### 할 일 완료

![완료 예시](https://github.com/k2ep-ru2ning/to-do-player/assets/80243123/5e9d0294-9b74-4e5f-bea3-9f61a9040443)

- 일을 완료하면, 할 일이 완료되었다는 메시지를 표시합니다.
- 일을 완료하면, 완료된 일이 `할 일 목록`에서 `완료한 일`로 이동합니다.

## 로컬 환경에서 실행하는 방법

1. `npm install` 명령어로 필요한 패키지들을 설치합니다.
2. `npm run dev` 명령어로 webpack dev server를 실행시킵니다.

   - `3000` 포트에서 실행됩니다.
