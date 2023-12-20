import ReactPortal from "../ReactPortal";

import * as S from "./styles";

type PageLoadingProps = {
  active: boolean;
};

export default function PageLoading({ active }: PageLoadingProps) {
  if (!active) return null;

  return (
    <ReactPortal portalId="page-loading-portal">
      <S.Overlay>
        <S.LoadingIcon />
      </S.Overlay>
    </ReactPortal>
  );
}
