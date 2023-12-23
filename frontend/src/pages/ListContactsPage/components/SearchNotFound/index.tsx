import { WarningCircle } from "@phosphor-icons/react";

import * as S from "./styles";

type SearchNotFoundProps = {
  searchTerm: string;
};

function SearchNotFound({ searchTerm }: SearchNotFoundProps) {
  return (
    <S.SearchNotFoundContainer>
      <WarningCircle />
      <span>Results not found to &quot;{searchTerm}&quot;</span>
    </S.SearchNotFoundContainer>
  );
}

export default SearchNotFound;
