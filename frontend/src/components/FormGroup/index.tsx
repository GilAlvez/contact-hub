import { ReactNode } from "react";

import * as S from "./styles";

type FormGroupProps = {
  children: ReactNode;
  errors?: string[];
};

export default function FormGroup({ errors, children }: FormGroupProps) {
  return (
    <S.Container>
      {children}
      {errors?.map((error) => <S.Error>{error}</S.Error>)}
    </S.Container>
  );
}
