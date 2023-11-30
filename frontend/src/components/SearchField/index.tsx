import { HTMLStyledProps } from "../../../styled-system/types";

import * as S from "./styles";

type SearchFieldProps = HTMLStyledProps<"input">;

function SearchField({ type, ...rest }: SearchFieldProps) {
  return <S.SearchField type="search" {...rest} />;
}

export default SearchField;
