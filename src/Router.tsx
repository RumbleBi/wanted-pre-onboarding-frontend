import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Todos from "./components/todos/Todos";

export function Router(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signin' />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/todos' element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}
