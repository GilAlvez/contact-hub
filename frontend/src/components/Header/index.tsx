import TextField from "../TextField";

import * as S from "./styles";

function Header() {
  return (
    <S.Header>
      <S.Logo>ContactHub</S.Logo>
      <TextField type="text" placeholder="Pesquisar contato" />
    </S.Header>
  );
}

export default Header;
