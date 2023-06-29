import { useNavigate } from "react-router-dom";

import * as S from "./SignUp.styles";

import { usePublicAuth } from "../../auth/useAuth";
import { useSignInValidation } from "../hooks/useSignValidation";
import { useSign } from "../hooks/useSign";

export default function SignUp() {
  usePublicAuth();

  const navigate = useNavigate();

  const { isSubmitting, signInput, handleSignInput, handleSignSubmit } = useSign();
  const isValidated = useSignInValidation(signInput);

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
          onChange={handleSignInput}
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
          onChange={handleSignInput}
        />
      </S.InputWrapper>
      <S.BtnWrapper>
        <S.SignUpBtn
          data-testid='signup-button'
          disabled={isValidated.isValid || isSubmitting}
          onClick={() => handleSignSubmit("signUp")}
        >
          가입하기
        </S.SignUpBtn>
        <S.BackBtn onClick={() => navigate("/signin")}>돌아가기</S.BackBtn>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}
