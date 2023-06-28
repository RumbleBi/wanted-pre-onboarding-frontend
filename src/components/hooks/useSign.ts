import { useState } from "react";
import { signIn, signUp } from "../../api/signApi";

interface ISignUpInputProps {
  signInput: { email: string; password: string };
  signSection: "signUp" | "signIn";
}

export function useSign() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSign = async ({ signInput, signSection }: ISignUpInputProps) => {
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

  return { isSubmitting, submitSign };
}
