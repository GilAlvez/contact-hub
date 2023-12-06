import { ArrowLeft } from "@phosphor-icons/react";

import * as S from "./styles";

type PageHeaderProps = {
  title: string;
};

function PageHeader({ title }: PageHeaderProps) {
  return (
    <S.Container>
      <S.BackLinkButton to="/">
        <ArrowLeft size={18} /> Back
      </S.BackLinkButton>
      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.Container>
  );
}

export default PageHeader;
