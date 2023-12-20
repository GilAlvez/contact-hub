import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { useEffect } from "react";

import { ToastProps } from "../ToastContainer";

import * as S from "./styles";

type ToastMessageProps = {
  toast: ToastProps;
  onRemoveMessage: (id: number) => void;
};

function ToastMessage({ toast, onRemoveMessage }: ToastMessageProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(toast.id);
    }, toast.duration ?? 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, toast.id, toast.duration]);

  return (
    <S.Container
      role="button"
      tabIndex={0}
      variant={toast.variant}
      onClick={() => onRemoveMessage(toast.id)}
    >
      {toast.variant === "danger" && <XCircle />}
      {toast.variant === "success" && <CheckCircle />}
      <S.Title>{toast.title}</S.Title>
    </S.Container>
  );
}

export default ToastMessage;
