import ReactDOM from "react-dom";

import * as S from "./styles";

type PageLoadingProps = {
  active: boolean;
};

export default function PageLoading({ active }: PageLoadingProps) {
  if (!active) return null;

  const element = document.getElementById("page-loading-portal");

  if (!element) {
    throw new Error("PageLoading Portal element NOT FOUND");
  }
  return ReactDOM.createPortal(
    <S.Overlay>
      <S.LoadingIcon />
    </S.Overlay>,
    element,
  );
}
