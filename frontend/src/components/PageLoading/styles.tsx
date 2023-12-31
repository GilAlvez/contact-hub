import { Spinner } from "@phosphor-icons/react";

import { styled } from "../../../styled-system/jsx";

export const Overlay = styled("div", {
  base: {
    bga: "black/5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    w: "full",
    h: "full",
    left: "0",
    top: "0",
    backdropFilter: "blur(2px)",
  },
  variants: {
    visible: {
      true: {
        animation: "fadein 0.3s forwards",
      },
      false: {
        animation: "fadeout 0.3s forwards",
      },
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export const LoadingIcon = styled(Spinner, {
  base: {
    w: "12",
    h: "12",
    animation: "spin 1.5s linear infinite",
  },
});
