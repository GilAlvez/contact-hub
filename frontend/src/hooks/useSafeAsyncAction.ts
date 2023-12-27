import { useCallback } from "react";

import useIsMounted from "./useIsMounted";

export default function useMountedSafeAction() {
  const isMounted = useIsMounted();

  const executeIfMounted = useCallback(
    (callback: Function) => {
      if (isMounted()) callback();
    },
    [isMounted],
  );

  return executeIfMounted;
}
