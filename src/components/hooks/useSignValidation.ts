import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../common/libs/validation";

interface ISignInputProps {
  email: string;
  password: string;
}

export function useSignInValidation(signInput: ISignInputProps) {
  const [isValidated, setIsValidated] = useState({ email: false, password: false, isValid: true });

  useEffect(() => {
    const { email, password } = signInput;

    const validateSignInInput = () => {
      const isValidEmail = validateEmail(email);
      const isValidPassword = validatePassword(password);
      const isValid = !(isValidEmail && isValidPassword);

      setIsValidated({
        email: isValidEmail,
        password: isValidPassword,
        isValid,
      });
    };

    validateSignInInput();
  }, [signInput]);

  return isValidated;
}
