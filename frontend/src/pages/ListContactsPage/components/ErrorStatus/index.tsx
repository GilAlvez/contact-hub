import { Button } from "../../../../components/Button";

import * as S from "./styles";

type ErrorStatusProps = {
  onRetry: () => void;
};

function ErrorStatus({ onRetry }: ErrorStatusProps) {
  return (
    <S.ErrorContainer>
      <S.ErrorMessage>An error has occurred</S.ErrorMessage>
      <Button type="button" onClick={onRetry} height={8} letterSpacing="widest">
        RETRY
      </Button>
    </S.ErrorContainer>
  );
}

export default ErrorStatus;
