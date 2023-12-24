import { ReactNode, useCallback, useState } from "react";

export default function useAnimatedList<T = unknown>() {
  const [items, setItems] = useState<T[]>([]);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

  const onRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const onAnimationEnd = useCallback((id: number) => {
    setItems((prevState) => prevState.filter((item: any) => item.id !== id));
    setPendingRemovalItemsIds((prevState) => prevState.filter((itemId) => itemId !== id));
  }, []);

  const renderItems = useCallback(
    (func: (value: T, { isLeaving }: { isLeaving: boolean }) => ReactNode) =>
      items.map<ReactNode>((item: any) =>
        func(item, { isLeaving: pendingRemovalItemsIds.includes(item.id) }),
      ),
    [items, pendingRemovalItemsIds],
  );

  return {
    items,
    setItems,
    renderItems,
    onRemoveItem,
    onAnimationEnd,
  };
}
