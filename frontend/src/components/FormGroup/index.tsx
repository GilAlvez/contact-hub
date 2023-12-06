import { ReactNode } from "react";

import * as S from "./styles";

type FormGroupProps = {
  children: ReactNode;
};

export default function FormGroup({ children }: FormGroupProps) {
  return <S.Container>{children}</S.Container>;
}
