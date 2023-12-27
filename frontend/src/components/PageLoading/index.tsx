import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";
import ReactPortal from "../ReactPortal";

import * as S from "./styles";

type PageLoadingProps = {
  visible: boolean;
};

export default function PageLoading({ visible }: PageLoadingProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount({ visible });

  if (!shouldRender) return null;

  return (
    <ReactPortal portalId="page-loading-portal">
      <S.Overlay visible={visible} ref={animatedElementRef}>
        <S.LoadingIcon />
      </S.Overlay>
    </ReactPortal>
  );
}
