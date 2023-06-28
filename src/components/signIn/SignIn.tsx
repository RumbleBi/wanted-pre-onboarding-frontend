import { ChangeEvent, useState } from "react";
import * as S from "./SignIn.styles";
import { useNavigate } from "react-router-dom";
import { usePublicAuth } from "../../auth/useAuth";
import { useSignInValidation } from "../hooks/useSignValidation";
import { useSign } from "../hooks/useSign";

export default function SignIn() {
  usePublicAuth();

  const navigate = useNavigate();

  const [signInput, setSignInput] = useState({ email: "", password: "" });

  const signSection = "signIn";
  const isValidated = useSignInValidation(signInput);

  const { isSubmitting, submitSign } = useSign();

  // 로그인 Input
  const handleSignInInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInput({ ...signInput, [e.target.name]: e.target.value });
  };

  // 로그인 제출
  const handleSignInSubmit = async () => {
    try {
      const res = await submitSign({ signInput, signSection });
      if (res?.status === 200) {
        localStorage.setItem("accessToken", res.data.access_token);
        alert("로그인 성공!");
        navigate("/todos");
      }
    } catch (e) {
      if (e === 404) {
        alert("없는 계정입니다 확인해주세요.");
        return;
      }
      if (e === 401) {
        alert("비밀번호가 틀립니다 확인해주세요.");
        return;
      }
      alert(e);
    }
  };

  return (
    <S.Wrapper>
      <S.Title>로그인</S.Title>
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
          onChange={handleSignInInput}
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
          onChange={handleSignInInput}
        />
      </S.InputWrapper>
      <S.BtnWrapper>
        <S.SignInBtn
          data-testid='signin-button'
          disabled={isValidated.isValid || isSubmitting}
          onClick={handleSignInSubmit}
        >
          로그인
        </S.SignInBtn>
        <S.SignUpBtn onClick={() => navigate("/signup")}>회원가입</S.SignUpBtn>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}
