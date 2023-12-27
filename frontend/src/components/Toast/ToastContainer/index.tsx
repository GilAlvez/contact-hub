import { useEffect } from "react";

import useAnimatedList from "../../../hooks/useAnimatedList";
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
  const {
    setItems: setToasts,
    renderItems: renderToasts,
    onRemoveItem,
  } = useAnimatedList<ToastProps>();

  useEffect(() => {
    function onAddToast({ title, variant, duration }: Omit<ToastProps, "id">) {
      setToasts((prevState) => [...prevState, { id: Math.random(), variant, title, duration }]);
    }

    toastEventManager.on("addtoast", onAddToast);
    return () => {
      toastEventManager.dispose("addtoast", onAddToast);
    };
  }, [setToasts]);

  return (
    <S.Container>
      {renderToasts((toast, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={toast.id}
          toast={toast}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
          onRemoveMessage={onRemoveItem}
        />
      ))}
    </S.Container>
  );
}

export default ToastContainer;
