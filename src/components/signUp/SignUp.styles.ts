import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 500px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 30px;
`;
export const Title = styled.h2`
  margin-bottom: 50px;
`;
export const InputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
  > input {
    width: 100%;
    padding: 10px 5px;
    margin-top: 5px;
  }
`;
export const ValidatedError = styled.div`
  color: red;
  font-size: 12px;
`;
export const BtnWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
export const SignUpBtn = styled.button`
  width: 150px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
`;

export const BackBtn = styled.button`
  width: 150px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
`;
