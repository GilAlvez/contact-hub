import { Package } from "@phosphor-icons/react";

import * as S from "./styles";

function EmptyList() {
  return (
    <S.EmptyListContainer>
      <Package size={100} weight="thin" />
      <p>
        Empty contacts, click on &quot;<S.EmptyListCTA>New Contact</S.EmptyListCTA>&quot; to create
        your first one
      </p>
    </S.EmptyListContainer>
  );
}

export default EmptyList;
