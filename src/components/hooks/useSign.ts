import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn, signUp } from "../../api/signApi";

interface ISignSubmitProps {
  signInput: { email: string; password: string };
  signSection: "signUp" | "signIn";
}

interface ISignInputProps {
  email: string;
  password: string;
}

export function useSign() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInput, setSignInput] = useState<ISignInputProps>({
    email: "",
    password: "",
  });

  const handleSignInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInput({ ...signInput, [e.target.name]: e.target.value });
  };

  const submitSign = async ({ signInput, signSection }: ISignSubmitProps) => {
    try {
      setIsSubmitting(true);

      const { email, password } = signInput;
      if (signSection === "signUp") {
        const res = await signUp({ email, password });
        return res;
      }
      if (signSection === "signIn") {
        const res = await signIn({ email, password });
        return res;
      }
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      throw e;
    }
  };

  const handleSignSubmit = async (signSection: "signUp" | "signIn") => {
    try {
      const res = await submitSign({ signInput, signSection });

      if (res?.status === 200 && signSection === "signIn") {
        localStorage.setItem("accessToken", res.data.access_token);
        alert("로그인 성공!");
        navigate("/todos");
      }

      if (res?.status === 201 && signSection === "signUp") {
        alert("회원가입이 되었습니다!");
        navigate("/signin");
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

  return { isSubmitting, signInput, submitSign, handleSignInput, handleSignSubmit };
}
