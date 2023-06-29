# wanted-pre-onboarding-frontend 6월 사전과제

---

1주차 과제 코드 개선 리스트

- 폴더구조 개선
- 관심사의 분리(공통 컴포넌트, hooks 분리)

---

## 폴더구조 개선

**기존 프로젝트 폴더 구조**

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

**개선된 프로젝트 폴더 구조**

```
.
├── App.tsx
├── Router.tsx                      // (new) Router 코드들을 따로 분리해서 관리
├── api
│   ├── config.ts
│   ├── signApi.ts
│   └── todosApi.ts
├── auth
│   └── useAuth.ts
├── common
│   └── libs
│       └── validation.ts
├── components
│   ├── hooks                       // (new) 관심사의 분리 원칙을 따라 중복 사용되는 함수나 비즈니스 로직을 hooks 폴더에 모아서 재사용이 가능하도록 개선
│   │   ├── useLogout.ts
│   │   ├── useSign.ts
│   │   ├── useSignValidation.ts
│   │   └── useTodolist.ts
│   ├── signIn
│   │   ├── SignIn.styles.ts
│   │   └── SignIn.tsx
│   ├── signUp
│   │   ├── SignUp.styles.ts
│   │   └── SignUp.tsx
│   └── todos
│       ├── Todos.styles.ts
│       └── Todos.tsx
├── index.tsx
├── styles
│   └── globalStyles.ts
└── types
    └── types.ts
```

폴더구조를 변경한 이유 : 우선 폴더구조를 변경하기 전에 생각했던 부분은 나무만 보지말고 숲을 바라보라는 개념에서 조금 다르게 생각하여 나무와 숲 중간 사이의 시야. 즉, 너무 가까이도, 너무 멀리도 보지 않는 중간 단계의 시야로 프로젝트의 사이즈가 커질 것을 고려하여 개선하였습니다.

- Router.tsx 로 인해 추후 프로젝트의 페이지가 늘어날 것을 대비해 코드의 가독성을 증가시키기위해 따로 코드를 분리하였습니다.

- hooks 폴더를 생성하여 공통적으로 사용될 수 있을 잠재적인 코드들에 대해 다른 페이지에서도 활용할 수 있도록 확장성을 증가시켰습니다.

---

## 관심사의 분리

관심사의 분리의 디자인을 따른 이유는 만약 페이지에서 새로운 기능들이 추가될 경우, 한 파일에서 너무 많은 코드들이 쌓이게 될 것이고, 이는 가독성과 유지보수성에서 복잡성을 야기할 수 있습니다. 이를 해결하기 위해 `비즈니스 로직 - 뷰 로직`을 분리하여 자신이 관리할 코드에 대해 집중할 수 있도록 개선하였습니다.

이메일 & 비밀번호 검증 로직은 로그인, 회원가입 비즈니스 로직에서 공통적으로 사용하는 부분이고, 로그아웃 기능은 추후 프로젝트의 크기가 커질 경우 재사용할 가능성이 높은 기능이라고 생각했기 때문에 custom hook 으로 분리하였습니다. (ex: 공통 레이아웃 헤더에 로그아웃 기능 추가)

```ts
// useLogout.ts

export const useLogout = (navigate: (url: string) => void) => {
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다!");
    navigate("/signin");
  };

  return handleSignOut;
};
```

```ts
// useSignValidation.ts

import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../common/libs/validation";

interface ISignInputProps {
  email: string;
  password: string;
}

export function useSignInValidation(signInput: ISignInputProps) {
  const [isValidated, setIsValidated] = useState({ email: false, password: false, isValid: true });

  useEffect(() => {
    const { email, password } = signInput;

    const validateSignInInput = () => {
      const isValidEmail = validateEmail(email);
      const isValidPassword = validatePassword(password);
      const isValid = !(isValidEmail && isValidPassword);

      setIsValidated({
        email: isValidEmail,
        password: isValidPassword,
        isValid,
      });
    };

    validateSignInInput();
  }, [signInput]);

  return isValidated;
}
```

기존 Todos.tsx 파일에서 적힌 비즈니스 로직을 관심사의 분리를 적용하여 코드의 가독성, 유지보수를 더 편리하게 개선하였습니다.

```js
// useTodolist.ts

import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodoList, updateTodo } from "../../api/todosApi";
import { ITodoListData } from "../../types/types";

export const useTodoList = (accessToken: string, navigate: (url: string) => void) => {
  const [todoListData, setTodoListData] = useState<ITodoListData[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [updateTodoInput, setUpdateTodoInput] = useState("");
  const [isEdit, setIsEdit] = useState<number | null>(null);

  // 투두리스트 조회 및 auth
  useEffect(() => {
    getTodoList({ accessToken })
      .then((res) => {
        setTodoListData([...res]);
      })
      .catch((e) => {
        if (e === "Unauthorized") {
          navigate("/signin");
          return;
        }
      });
  }, [accessToken, navigate]);

  // 투두리스트 생성
  const handleCreateTodo = () => {
    if (!todoInput) {
      alert("최소 한 글자는 입력해야 합니다.");
      return;
    }
    createTodo({ accessToken, todoInput })
      .then((res) => {
        setTodoListData([...todoListData, res]);
        setTodoInput("");
        alert("작성되었습니다!");
      })
      .catch((e) => console.log(e));
  };

  // 투두리스트 업데이트
  const handleUpdateTodo = (id: number) => {
    console.log(updateTodoInput);

    updateTodo({ accessToken, id, updateTodoInput, isCompleted: isChecked })
      .then(() => {
        getTodoList({ accessToken })
          .then((res) => {
            setTodoListData(res);
            setIsEdit(null);
            alert("수정되었습니다!");
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  // 투두리스트 삭제
  const handleDeleteTodo = (id: number) => {
    deleteTodo({ accessToken, id })
      .then(() => {
        const updateTodoListData = todoListData.filter((el) => el.id !== id);
        setTodoListData(updateTodoListData);
        alert("삭제되었습니다!");
      })
      .catch((e) => console.log(e));
  };

  return {
    todoListData,
    todoInput,
    isChecked,
    updateTodoInput,
    isEdit,
    setTodoInput,
    setIsChecked,
    setUpdateTodoInput,
    setIsEdit,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};
```

```jsx
// Todos.tsx

import { useNavigate } from "react-router-dom";

import * as S from "./Todos.styles";

import { useAuth } from "../../auth/useAuth";
import { useTodoList } from "../hooks/useTodolist";
import { useLogout } from "../hooks/useLogout";

export default function Todos() {
  useAuth();

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken") || "";

  const handleSignOut = useLogout(navigate);
  const {
    todoListData,
    isEdit,
    todoInput,
    setTodoInput,
    setIsChecked,
    setUpdateTodoInput,
    setIsEdit,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useTodoList(accessToken, navigate);

  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <S.Title>투두리스트</S.Title>
        <S.SignOutBtn onClick={handleSignOut}>로그아웃</S.SignOutBtn>
      </S.HeaderWrapper>
      <S.TodoListWrapper>
        {todoListData.map((el) => (
          <S.TodoList key={el.id}>
            <label>
              <input
                type='checkbox'
                defaultChecked={el.isCompleted}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              {isEdit === el.id ? (
                <input
                  type='text'
                  data-testid='modify-input'
                  defaultValue={el.todo}
                  onChange={(e) => setUpdateTodoInput(e.target.value)}
                />
              ) : (
                <span>{el.todo}</span>
              )}
            </label>
            {isEdit === el.id ? (
              <>
                <button
                  type='button'
                  data-testid='submit-button'
                  onClick={() => handleUpdateTodo(el.id)}
                >
                  제출
                </button>
                <button type='button' data-testid='cancel-button' onClick={() => setIsEdit(null)}>
                  취소
                </button>
              </>
            ) : (
              <>
                <button type='button' data-testid='modify-button' onClick={() => setIsEdit(el.id)}>
                  수정
                </button>
                <button
                  type='button'
                  data-testid='delete-button'
                  onClick={() => handleDeleteTodo(el.id)}
                >
                  삭제
                </button>
              </>
            )}
          </S.TodoList>
        ))}
      </S.TodoListWrapper>
      <S.TodoListWriteWrapper>
        <input
          type='text'
          data-testid='new-todo-input'
          placeholder='할 일을 입력해 주세요.'
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button data-testid='new-todo-add-button' onClick={handleCreateTodo}>
          작성
        </button>
      </S.TodoListWriteWrapper>
    </S.Wrapper>
  );
}
```

같은 방식으로 회원가입 페이지도 hook로 분리하여 코드의 가독성, 유지보수가 더 편리하도록 개선하였습니다.
로그인 페이지는 같은 방식으로 분리하여서 생략하였습니다.

```js
// useSign.ts

import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn, signUp } from "../../api/signApi";

interface ISignSubmitProps {
  signInput: { email: string, password: string };
  signSection: "signUp" | "signIn";
}

interface ISignInputProps {
  email: string;
  password: string;
}

export function useSign() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInput, setSignInput] =
    useState <
    ISignInputProps >
    {
      email: "",
      password: "",
    };

  const handleSignInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInput({ ...signInput, [e.target.name]: e.target.value });
  };

  const submitSign = async ({ signInput, signSection }: ISignSubmitProps) => {
    try {
      setIsSubmitting(true);

      const { email, password } = signInput;
      if (signSection === "signUp") {
        const res = await signUp({ email, password });
        return res;
      }
      if (signSection === "signIn") {
        const res = await signIn({ email, password });
        return res;
      }
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      throw e;
    }
  };

  const handleSignSubmit = async (signSection: "signUp" | "signIn") => {
    try {
      const res = await submitSign({ signInput, signSection });

      if (res?.status === 200 && signSection === "signIn") {
        localStorage.setItem("accessToken", res.data.access_token);
        alert("로그인 성공!");
        navigate("/todos");
      }

      if (res?.status === 201 && signSection === "signUp") {
        alert("회원가입이 되었습니다!");
        navigate("/signin");
      }
    } catch (e) {
      if (e === 404) {
        alert("없는 계정입니다 확인해주세요.");
        return;
      }
      if (e === 401) {
        alert("비밀번호가 틀립니다 확인해주세요.");
        return;
      }

      alert(e);
    }
  };

  return { isSubmitting, signInput, submitSign, handleSignInput, handleSignSubmit };
}
```

```jsx
// SignUp.tsx

import { useNavigate } from "react-router-dom";

import * as S from "./SignUp.styles";

import { usePublicAuth } from "../../auth/useAuth";
import { useSignInValidation } from "../hooks/useSignValidation";
import { useSign } from "../hooks/useSign";

export default function SignUp() {
  usePublicAuth();

  const navigate = useNavigate();

  const { isSubmitting, signInput, handleSignInput, handleSignSubmit } = useSign();
  const isValidated = useSignInValidation(signInput);

  return (
    <S.Wrapper>
      <S.Title>회원가입</S.Title>
      <S.InputWrapper>
        <h4>아이디</h4>
        {!isValidated.email && (
          <S.ValidatedError>아이디가 올바른 형식이 아닙니다.</S.ValidatedError>
        )}
        <input
          type='email'
          name='email'
          data-testid='email-input'
          placeholder='@를 포함한 이메일 아이디가 필요합니다.'
          onChange={handleSignInput}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <h4>비밀번호</h4>
        {!isValidated.password && (
          <S.ValidatedError>비밀번호가 올바른 형식이 아닙니다.</S.ValidatedError>
        )}
        <input
          type='password'
          name='password'
          data-testid='password-input'
          placeholder='비밀번호는 8자 이상이어야 합니다.'
          onChange={handleSignInput}
        />
      </S.InputWrapper>
      <S.BtnWrapper>
        <S.SignUpBtn
          data-testid='signup-button'
          disabled={isValidated.isValid || isSubmitting}
          onClick={() => handleSignSubmit("signUp")}
        >
          가입하기
        </S.SignUpBtn>
        <S.BackBtn onClick={() => navigate("/signin")}>돌아가기</S.BackBtn>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}
```

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
