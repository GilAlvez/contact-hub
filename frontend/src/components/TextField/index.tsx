import { HTMLStyledProps } from "../../../styled-system/types";

import * as S from "./styles";

type TextFieldProps = HTMLStyledProps<"input">;

function TextField(props: TextFieldProps) {
  return <S.TextField {...props} />;
}

export default TextField;
