import { useEffect, useRef, useState } from "react";

type AnimatedUnmountHook = {
  visible: boolean;
};

export default function useAnimatedUnmount({ visible }: AnimatedUnmountHook) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function onAnimationEnd() {
      setShouldRender(false);
    }

    const overlayRefElement = animatedElementRef.current;
    if (!visible && animatedElementRef) {
      overlayRefElement?.addEventListener("animationend", onAnimationEnd);
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener("animationend", onAnimationEnd);
      }
    };
  }, [visible]);
  return {
    shouldRender,
    animatedElementRef,
  };
}
