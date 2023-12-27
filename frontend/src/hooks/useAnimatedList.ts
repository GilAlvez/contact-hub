import { ReactNode, RefObject, createRef, useCallback, useEffect, useRef, useState } from "react";

export default function useAnimatedList<T = unknown>() {
  const [items, setItems] = useState<T[]>([]);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const onAnimationEnd = useCallback((itemId: number) => {
    const listenerRemover = animationEndListeners.current.get(itemId);
    listenerRemover();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter((item: any) => item.id !== itemId));
    setPendingRemovalItemsIds((prevState) => prevState.filter((id) => id !== itemId));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const handleAnimationEnd = () => onAnimationEnd(itemId);
        const listenerRemover = () => {
          animatedElement.removeEventListener("animationend", handleAnimationEnd);
        };

        animatedElement.addEventListener("animationend", handleAnimationEnd);
        animationEndListeners.current.set(itemId, listenerRemover);
      }
    });
  }, [onAnimationEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      removeListeners.forEach((listenerRemover) => listenerRemover());
    };
  }, []);

  const onRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((itemId: number) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderItems = useCallback(
    (
      func: (
        value: T,
        { isLeaving, animatedRef }: { isLeaving: boolean; animatedRef: RefObject<HTMLDivElement> },
      ) => ReactNode,
    ) =>
      items.map<ReactNode>((item: any) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);
        const animatedRef = getAnimatedRef(item.id);

        return func(item, { isLeaving, animatedRef });
      }),
    [getAnimatedRef, items, pendingRemovalItemsIds],
  );

  return {
    items,
    setItems,
    renderItems,
    onRemoveItem,
  };
}
