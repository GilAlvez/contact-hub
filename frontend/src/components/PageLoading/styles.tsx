import { Spinner } from "@phosphor-icons/react";

import { styled } from "../../../styled-system/jsx";

export const Overlay = styled("div", {
  base: {
    bga: "primary.main/30",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    w: "full",
    h: "full",
    left: "0",
    top: "0",
    backdropFilter: "blur(2px)",
  },
});

export const LoadingIcon = styled(Spinner, {
  base: {
    w: "12",
    h: "12",
    animation: "spin 1.5s linear infinite",
  },
});
