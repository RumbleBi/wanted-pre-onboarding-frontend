import { useAuth } from "../../auth/useAuth";
import * as S from "./Todos.styles";

export default function Todos() {
  useAuth();

  return (
    <S.Wrapper>
      <div>투두리스트</div>
    </S.Wrapper>
  );
}
