import { useCallback, useEffect, useState } from "react";

import { toastEventManager } from "../toast";
import ToastMessage from "../ToastMessage";

import * as S from "./styles";

export type ToastProps = {
  id: number;
  title: string;
  variant: "default" | "success" | "danger";
  duration?: number;
};

function ToastContainer() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    function onAddToast({ title, variant, duration }: Omit<ToastProps, "id">) {
      setToasts((prevState) => [...prevState, { id: Math.random(), variant, title, duration }]);
    }

    toastEventManager.on("addtoast", onAddToast);
    return () => {
      toastEventManager.dispose("addtoast", onAddToast);
    };
  }, []);

  const onRemoveMessage = useCallback((id: number) => {
    setToasts((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

  return (
    <S.Container>
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} toast={toast} onRemoveMessage={onRemoveMessage} />
      ))}
    </S.Container>
  );
}

export default ToastContainer;
