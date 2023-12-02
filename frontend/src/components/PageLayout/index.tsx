import { ReactNode } from "react";

import * as S from "./styles";

type PageLayoutProps = {
  children: ReactNode;
};

function PageLayout({ children }: PageLayoutProps) {
  return <S.PageLayout>{children}</S.PageLayout>;
}

export default PageLayout;
