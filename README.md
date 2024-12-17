# 🗓️ 일정관리와 공유 기능을 제공하는 Taskify 

![Taskify Dashboard](https://hwiiron.com/Taskify_dashboard.png)

<br>

## 프로젝트 소개

- 사용자는 커뮤니티를 생성하고 멤버를 초대하여 일정과 할 일 목록을 공유할 수 있습니다.
- 커뮤니티 내 작성된 일정은 카드 형태로 멤버들에게 공유되며, 효율적으로 확인할 수 있습니다.
- 멤버 초대, 목록 분류, 검색 등의 기능을 통해 작업 관리가 더욱 간편해집니다.
- 작성된 일정과 할 일에 댓글을 달아 멤버 간 소통도 가능합니다.

<br>

## 팀원 구성

|               **강수민**               |               **김태완**               |               **신휘철**               |             **이주훈**             |              **이준희**              |
| :------------------------------------: | :------------------------------------: | :------------------------------------: | :--------------------------------: | :----------------------------------: |
| [@hpk5802](https://github.com/hpk5802) | [@twtwkim](https://github.com/twtwkim) | [@hwiiron](https://github.com/hwiiron) | [@whdjh](https://github.com/whdjh) | [@dlwnsl](https://github.com/dlwnsl) |

<br>

### 개발 환경

- Front-end : React, Next.js, TypeScript, Module.CSS, Redux
- Back-end : 제공된 API 활용
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Discord, Notion
- 서비스 배포 환경 : Vercel

<br>

### ESLint와 Prettier

- 코드 스타일 일관성 유지 : 정해진 규칙에 따라 자동으로 코드 스타일을 정리했습니다.
- Airbnb 코딩 컨벤션을 참고하여 기본 규칙을 설정했습니다.
- 협업 시 컨벤션을 신경 쓰는 부담을 줄이고, 빠르고 효율적인 개발을 목표로 설정하였습니다.

<br>

### 브랜치 전략

- Git-flow 전략을 기반으로 브랜치를 관리했습니다.
  - **main** : 배포 단계에서만 사용하는 브랜치.
  - **develop** : 개발 작업의 중심 브랜치로, git-flow에서 master의 역할을 수행.
  - **Feature** : 기능 단위로 개발을 진행하는 보조 브랜치로, 작업 완료 후 develop 브랜치에 병합한 뒤 삭제하여 브랜치 관리를 간소화했습니다.

<br>

### 프로젝트 구조

```
🗂️
├─ README.md
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc
├─ build.sh
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ ic
│  └─ images
├─ src
│  ├─ components
│  │  ├─ common
│  │  │  ├─ button
│  │  │  ├─ card
│  │  │  ├─ dropdown
│  │  │  ├─ input
│  │  │  ├─ modal
│  │  │  ├─ navbar
│  │  │  ├─ pagination
│  │  │  ├─ sidebar
│  │  │  └─ toast
│  │  └─ product
│  │     ├─ auth
│  │     ├─ dashboard
│  │     ├─ landing
│  │     ├─ mydashboard
│  │     └─ mypage
│  ├─ hooks
│  ├─ pages
│  │  ├─ _app.tsx
│  │  ├─ _document.tsx
│  │  ├─ api
│  │  ├─ dashboard
│  │  ├─ index.tsx
│  │  ├─ mydashboard
│  │  ├─ mypage
│  │  ├─ signin
│  │  └─ signup
│  │
│  ├─ reducer
│  ├─ styles
│  ├─ type
│  └─ utils
└─ tsconfig.json
```
