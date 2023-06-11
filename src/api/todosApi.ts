import axios from "axios";
import { api } from "./config";

export const getTodoList = async (accessToken: string | null) => {
  try {
    const response = await api.get("todos", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
  }
};

export const deleteTodo = async (accessToken: string | null, id: number) => {
  try {
    const response = await api.delete(`todos/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);
    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
  }
};

export const createTodo = async (accessToken: string | null, todoInput: string) => {
  try {
    const response = await api.post(
      "todos",
      { todo: todoInput },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
  }
};

export const updateTodo = async (
  accessToken: string | null,
  id: number,
  updateTodoInput: string,
  isCompleted: boolean
) => {
  try {
    const response = await api.put(
      `todos/${id}`,
      { todo: updateTodoInput, isCompleted },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
  }
};
