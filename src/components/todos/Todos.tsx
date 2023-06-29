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
