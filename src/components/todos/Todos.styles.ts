import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 600px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 30px;
`;
export const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;
export const Title = styled.h2``;
export const SignOutBtn = styled.button`
  position: absolute;
  right: 0px;
  width: 70px;
  height: 30px;
  cursor: pointer;
`;
export const TodoListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 420px;
  border: 1px solid black;
  overflow-y: auto;
`;
export const TodoList = styled.li`
  padding: 10px;
  display: flex;
  > label {
    display: flex;
    align-items: center;
    > input[type="checkbox"] {
      margin-right: 5px;
      width: 20px;
      height: 20px;
    }
    > input[type="text"] {
      width: 300px;
      font-size: 14px;
    }
    > span {
      display: inline-block;
      width: 300px;
      font-size: 14px;
    }
  }
  button {
    margin: 0px 5px;
    width: 50px;
    cursor: pointer;
  }
`;
export const TodoListWriteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  > input {
    padding: 5px;
    height: 40px;
    width: 100%;
  }
  > button {
    width: 50px;
    height: 40px;
    cursor: pointer;
    margin-left: 5px;
  }
`;
