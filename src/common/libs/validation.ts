export const validateEmail = (email: string) => {
  const pattern = /@/;
  return pattern.test(email);
};
export const validatePassword = (password: string) => {
  const pattern = /^.{8,}$/;
  return pattern.test(password);
};
