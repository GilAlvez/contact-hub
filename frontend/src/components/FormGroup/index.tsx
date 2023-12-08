import { ReactNode } from "react";

import * as S from "./styles";

type FormGroupProps = {
  children: ReactNode;
  error?: string;
};

export default function FormGroup({ error, children }: FormGroupProps) {
  return (
    <S.Container>
      {children}
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
}
