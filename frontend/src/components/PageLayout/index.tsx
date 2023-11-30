import { ReactNode } from "react";

import Header from "../Header";

import * as S from "./styles";

type PageLayoutProps = {
  children: ReactNode;
};

function PageLayout({ children }: PageLayoutProps) {
  return (
    <S.PageLayout>
      <Header />
      {children}
    </S.PageLayout>
  );
}

export default PageLayout;
