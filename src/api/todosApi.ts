import axios from "axios";
import { api } from "./config";
import { ICreateTodo, IDeleteTodo, ITodoListData, ITodosApi, IUpdateTodo } from "../types/types";

export const getTodoList = async (data: ITodosApi): Promise<ITodoListData[]> => {
  try {
    const response = await api.get("todos", {
      headers: { Authorization: `Bearer ${data.accessToken}` },
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
    throw e;
  }
};

export const deleteTodo = async (data: IDeleteTodo): Promise<void> => {
  try {
    await api.delete(`todos/${data.id}`, {
      headers: { Authorization: `Bearer ${data.accessToken}` },
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
    throw e;
  }
};

export const createTodo = async (data: ICreateTodo): Promise<ITodoListData> => {
  try {
    const response = await api.post(
      "todos",
      { todo: data.todoInput },
      {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      }
    );

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
    throw e;
  }
};

export const updateTodo = async (data: IUpdateTodo): Promise<ITodoListData> => {
  try {
    const response = await api.put(
      `todos/${data.id}`,
      { todo: data.updateTodoInput, isCompleted: data.isCompleted },
      { headers: { Authorization: `Bearer ${data.accessToken}` } }
    );

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
    throw e;
  }
};
