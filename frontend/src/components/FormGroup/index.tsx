import { ReactNode } from "react";

import * as S from "./styles";

type FormGroupProps = {
  children: ReactNode;
  errors?: string[];
  isLoading?: boolean;
};

export default function FormGroup({ isLoading = false, errors, children }: FormGroupProps) {
  return (
    <S.Container>
      <S.FormItem>
        {children}
        {isLoading && (
          <S.LoaderWrapper>
            <S.ItemLoading />
          </S.LoaderWrapper>
        )}
      </S.FormItem>
      {errors?.map((error) => <S.Error>{error}</S.Error>)}
    </S.Container>
  );
}
