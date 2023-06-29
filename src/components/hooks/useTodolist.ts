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
