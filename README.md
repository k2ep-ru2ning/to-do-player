# FPS: Focus, Plan and Start

> 컴퓨터 앞에서 방황하지 말고, 집중해서(Focus) 계획을 세우고(Plan) 바로 시작하세요(Start).

## ✅ 프로젝트 소개

할 일을 계획하고, 계획한 시간만큼 실행할 수 있도록 도와주는 애플리케이션입니다.

<img src="https://user-images.githubusercontent.com/80243123/195044078-b3ad38a0-c7a9-41d2-8ac9-7f3d7d4fc26c.png" alt="screen shot" width="640">

## 📌 배포

[https://fps-focus-plan-start.vercel.app](https://fps-focus-plan-start.vercel.app)

## 📂 Wiki: 개발 일지

개발하면서 **공부한 내용**, **만났던 문제** 및 **문제 해결을 위해 노력했던 과정**을 [wiki](https://github.com/keeep-runnning/fps/wiki)에 정리했습니다.

## 🔧 기술 스택

<img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black">
<br>
<img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=reactrouter&logoColor=black">
<img src="https://img.shields.io/badge/-Chakra%20UI-319795?style=flat-square&logo=chakraui&logoColor=white">
<br>
<img src="https://img.shields.io/badge/-Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=black">
<img src="https://img.shields.io/badge/-Babel-F9DC3E?style=flat-square&logo=babel&logoColor=black">
<br>
<img src="https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=black">
<img src="https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black">
<br>
<img src="https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white">

## ⚙️ 주요 기능

### ➕ 할 일 추가

<img src="https://user-images.githubusercontent.com/80243123/195044267-ddbece8f-0e17-4484-a7c4-8b679c4c80af.png" alt="task addition screen shot" width="640">

사용자가 입력한 데이터가 유효한지 검증(`Validation`)하고, 할 일을 추가합니다.

### 📜 할 일 및 완료한 일 조회

- 화면을 좌우 두 영역으로 나누어 `왼쪽`에는 `타이머`를, `오른쪽`에는 `할 일 탭(Tab)`을 표시했습니다.

- 오른쪽의 할 일 탭에서
  - `할 일 목록`을 선택하면, 계획한 일들을 표시합니다.
  - `완료한 일` 목록을 선택하면, 완료된 일들을 표시합니다.
  - 목록에서 일을 클릭하면, 왼쪽 타이머 영역에 상세 내용이 표시됩니다.

#### 할 일 목록

<img src="https://user-images.githubusercontent.com/80243123/195044487-9cdedb64-0153-4574-8b29-eda32235c0f6.png" alt="task list screen shot" width="640">

#### 완료한 일

<img src="https://user-images.githubusercontent.com/80243123/195044627-8f1d503e-e514-44ed-9f3a-91cad23fa4c2.png" alt="finished task list screen shot" width="640">

### 📝 할 일 수정

<img src="https://user-images.githubusercontent.com/80243123/195044774-e906bddb-5e12-4269-b2be-16bcd7dff18f.png" alt="task update screen shot" width="640">

사용자가 변경한 데이터가 유효한지 검증(`validation`)하고, 할 일을 수정합니다.

### ➖ 할 일 삭제

<img src="https://user-images.githubusercontent.com/80243123/195044898-aa07fa4d-54f2-4717-a213-0c4fbd6db01e.png" alt="task removal screen shot" width="640">

### ⏰ 할 일 타이머 시작, 중지, 리셋 및 완료

<img src="https://user-images.githubusercontent.com/80243123/195045049-220be4c1-3184-47df-be59-af77fab68594.png" alt="timer screen shot" width="640">

- 할 일 목록에서 할 일을 클릭하면, 왼쪽 타이머 영역에 상세 내용이 표시됩니다.
- 타이머가 제공하는 버튼을 통해 타이머를 시작, 중지, 리셋할 수 있습니다.
- 타이머가 완료되면, 완료를 알리는 메시지가 표시됩니다.

## 💻 실행 방법

> 개발 서버를 이용해 `local`에서 실행하는 방법

1. 패키지 설치

```
npm install
```

2. `npm script` 실행

```
npm run dev
```
