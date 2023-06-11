import { useNavigate } from "react-router-dom";
import * as S from "./SignUp.styles";
import { ChangeEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../common/libs/validation";
import { signUp } from "../../api/signApi";

export default function SignUp() {
  const navigate = useNavigate();

  const [signUpInput, setSignUpInput] = useState({ email: "", password: "" });
  const [isValidated, setIsValidated] = useState({ email: false, password: false, signup: true });

  // 이메일, 패스워드 검증로직
  useEffect(() => {
    const { email, password } = signUpInput;
    if (validateEmail(email)) {
      setIsValidated((prevState) => ({ ...prevState, email: true }));
    } else {
      setIsValidated((prevState) => ({ ...prevState, email: false }));
    }

    if (validatePassword(password)) {
      setIsValidated((prevState) => ({ ...prevState, password: true }));
    } else {
      setIsValidated((prevState) => ({ ...prevState, password: false }));
    }

    setIsValidated((prevState) => ({
      ...prevState,
      signup: !(prevState.email && prevState.password),
    }));
  }, [signUpInput]);

  // 회원가입 Input
  const handleSignUpInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };

  // 회원가입 제출
  const submitSignUp = () => {
    const { email, password } = signUpInput;

    signUp({ email, password })
      .then((res) => {
        if (res?.status === 201) {
          alert("회원가입이 되었습니다!");
          navigate("/signin");
        }
      })
      .catch((e) => alert(e));
  };

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
          onChange={handleSignUpInput}
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
          onChange={handleSignUpInput}
        />
      </S.InputWrapper>
      <S.BtnWrapper>
        <S.SignUpBtn
          data-testid='signup-button'
          disabled={isValidated.signup}
          onClick={submitSignUp}
        >
          가입하기
        </S.SignUpBtn>
        <S.BackBtn onClick={() => navigate("/signin")}>돌아가기</S.BackBtn>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}
