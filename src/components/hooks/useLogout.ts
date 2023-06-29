export const useLogout = (navigate: (url: string) => void) => {
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다!");
    navigate("/signin");
  };

  return handleSignOut;
};
