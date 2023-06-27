# wanted-pre-onboarding-frontend 6월 사전과제

---

1주차 과제 코드 개선 리스트

- 폴더구조 개선
- 관심사의 분리 필요(공통 컴포넌트, hook 분리 필요)
- eslint, husky 적용하기

---

## 지원자 : 조진일

## 프로젝트 실행 방법 : `npm install & npm start`

## 프로젝트 폴더구조

```
.
├── App.tsx
├── api
│   ├── config.ts                   // axios default 설정
│   ├── signApi.ts                  // sign 관련 api
│   └── todosApi.ts                 // todolist 관련 api
├── auth
│   └── useAuth.ts                  // 로그인 hook
├── common
│   └── libs
│       └── validation.ts           // 이메일, 패스워드 검증
├── components
│   ├── signIn
│   │   ├── SignIn.styles.ts
│   │   └── SignIn.tsx              // 로그인페이지
│   ├── signUp
│   │   ├── SignUp.styles.ts
│   │   └── SignUp.tsx              // 회원가입페이지
│   └── todos
│       ├── Todos.styles.ts
│       └── Todos.tsx               // todolist페이지
├── index.tsx
├── styles
│   └── globalStyles.ts             // 글로벌 스타일
└── types
    └── types.ts                    // 타입지정
```

## 사용 라이브러리

```
"react-router-dom": "^6.12.1",
"styled-components": "^5.3.10",
"typescript": "^4.9.5",
"axios": "^1.4.0",
"react": "^18.2.0",
```

## 시연 영상

#### 회원가입, 로그인

- 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요
- [x] 이메일 조건: `@` 포함
- [x] 비밀번호 조건: 8자 이상
- [x] 이메일과 비밀번호의 유효성 검사 조건은 별도의 추가 조건 부여 없이 위의 조건대로만 진행해주세요 (e.g. 비밀번호 유효성 검사에 특수문자 포함 등의 새로운 조건을 추가하는 행위, 비밀번호 확인 조건을 추가하는 행위 등은 지양해주세요)

- [x] 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여해주세요
- [x] 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동해주세요
- [x] 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동해주세요
- [x] 응답받은 JWT는 로컬 스토리지에 저장해주세요

![signup-in](https://github.com/RumbleBi/wanted-pre-onboarding-frontend/assets/85114315/5a2bc022-b200-40c0-8ffa-99c37066f9e3)

---

#### 리다이렉트

- 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
- [x] 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
- [x] 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트 시켜주세요

## ![redirect](https://github.com/RumbleBi/wanted-pre-onboarding-frontend/assets/85114315/de6c3302-c8f4-4eba-95e9-e77f9c0521b2)

---

#### 투두리스트 CRUD

- ##### 조회하기 & UI
- [x] `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
- [x] 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
- [x] TODO의 완료 여부는 `<input type="checkbox" />`를 통해 표현해주세요
- [x] TODO는 `<li>` tag를 이용해 감싸주세요
- [x] 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요
- [x] TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요
- ##### 작성하기
- [x] 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
- [x] TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.
- [x] TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.

```
체크박스의 경우 해당 할일의 제출버튼을 눌러야 체크박스의 isCompleted boolean 값을 변경하도록 적용함.
```

- ##### 삭제하기
- [x] 투두 리스트의 TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제되도록 해주세요
- ##### 수정하기

- [x] TODO 우측의 수정 버튼을 누르면 수정모드가 활성화 되도록 해주세요
- [x] 수정모드에서는 TODO의 내용을 변경할 수 있어야 합니다.
- [x] 수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경해주세요
- [x] 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시되게 해주세요
- [x] 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트 될 수 있도록 해주세요
- [x] 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화 해주세요

![todolist](https://github.com/RumbleBi/wanted-pre-onboarding-frontend/assets/85114315/478cb7f9-cc67-4d64-8475-b9da8c257d0f)
