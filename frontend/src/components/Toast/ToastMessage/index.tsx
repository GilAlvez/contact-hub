import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

import { ToastProps } from "../ToastContainer";

import * as S from "./styles";

type ToastMessageProps = {
  toast: ToastProps;
  isLeaving: boolean;
  onRemoveMessage: (id: number) => void;
  onAnimationEnd: (id: number) => void;
};

function ToastMessage({ toast, isLeaving, onRemoveMessage, onAnimationEnd }: ToastMessageProps) {
  const animatedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(toast.id);
    }

    const animatedRefElement = animatedRef.current;
    if (isLeaving) {
      animatedRefElement?.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (animatedRefElement) {
        animatedRefElement.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [isLeaving, onAnimationEnd, toast.id]);

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
