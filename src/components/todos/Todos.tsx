import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import * as S from "./Todos.styles";
import { MouseEvent, useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodoList, updateTodo } from "../../api/todosApi";
import { ITodoListData } from "../../types/types";

export default function Todos() {
  useAuth();

  const navigate = useNavigate();

  const [todoListData, setTodoListData] = useState<ITodoListData[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>("");
  const [todoInput, setTodoInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [updateTodoInput, setUpdateTodoInput] = useState("");

  const [isEdit, setIsEdit] = useState<number | null>(null);

  // todoList get
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setAccessToken(accessToken);

    getTodoList(accessToken)
      .then((res) => {
        setTodoListData([...res]);
      })
      .catch((e) => {
        if (e === "Unauthorized") {
          alert("로그인을 하셔야됩니다.");
          navigate("/signin");
          return;
        }
        alert(e);
      });
  }, []);

  // todoList logout
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다!");
    navigate("/signin");
  };

  // todoList create
  const handleCreateTodo = () => {
    if (!todoInput) {
      alert("최소 한 글자는 입력해야 합니다.");
      return;
    }

    createTodo(accessToken, todoInput)
      .then((res) => {
        setTodoListData([...todoListData, res]);
        setTodoInput("");
        alert("작성되었습니다!");
      })
      .catch((e) => console.log(e));
  };

  // todoList update
  const handleUpdateTodo = (e: MouseEvent<HTMLButtonElement>) => {
    if (!updateTodoInput) {
      alert("수정된 사항이 있어야 합니다.");
      return;
    }
    const id = Number(e.currentTarget.id);

    updateTodo(accessToken, id, updateTodoInput, isChecked)
      .then(() => {
        getTodoList(accessToken)
          .then((res) => {
            setTodoListData(res);
            setIsEdit(null);
            alert("수정되었습니다!");
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  // todoList delete
  const handleDeleteTodo = (e: MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.id);

    deleteTodo(accessToken, id)
      .then(() => {
        const updateTodoListData = todoListData.filter((el) => el.id !== id);
        setTodoListData(updateTodoListData);
        alert("삭제되었습니다!");
      })
      .catch((e) => {
        if (e === "Unauthorized") {
          alert("로그인을 하셔야됩니다.");
          navigate("/signin");
          return;
        }
        alert(e);
      });
  };
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
                  onClick={handleUpdateTodo}
                  id={String(el.id)}
                >
                  제출
                </button>
                <button type='button' data-testid='cancel-button' onClick={() => setIsEdit(null)}>
                  취소
                </button>
              </>
            ) : (
              <>
                <button type='button' onClick={() => setIsEdit(el.id)}>
                  수정
                </button>
                <button
                  type='button'
                  data-testid='delete-button'
                  onClick={handleDeleteTodo}
                  id={String(el.id)}
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
