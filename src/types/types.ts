export interface ITodoListData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface ISignApi {
  email: string;
  password: string;
}

export interface ITodosApi {
  accessToken: string;
}

export interface IDeleteTodo extends ITodosApi {
  id: number;
}

export interface ICreateTodo extends ITodosApi {
  todoInput: string;
}

export interface IUpdateTodo extends ITodosApi {
  id: number;
  updateTodoInput: string;
  isCompleted: boolean;
}

export interface ISignRes {
  status: number;
  access_token: string;
}
