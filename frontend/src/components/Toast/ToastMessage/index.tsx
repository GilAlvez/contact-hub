import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { RefObject, useEffect } from "react";

import { ToastProps } from "../ToastContainer";

import * as S from "./styles";

type ToastMessageProps = {
  toast: ToastProps;
  isLeaving: boolean;
  animatedRef: RefObject<HTMLDivElement>;
  onRemoveMessage: (id: number) => void;
};

function ToastMessage({ toast, isLeaving, animatedRef, onRemoveMessage }: ToastMessageProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(toast.id);
    }, toast.duration ?? 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, toast]);

  return (
    <S.Container
      role="button"
      tabIndex={0}
      variant={toast.variant}
      onClick={() => onRemoveMessage(toast.id)}
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {toast.variant === "danger" && <XCircle />}
      {toast.variant === "success" && <CheckCircle />}
      <S.Title>{toast.title}</S.Title>
    </S.Container>
  );
}

export default ToastMessage;
