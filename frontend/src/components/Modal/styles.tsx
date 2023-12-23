import { styled } from "../../../styled-system/jsx";

export const Overlay = styled("div", {
  base: {
    bga: "black/30",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    w: "full",
    h: "full",
    left: "0",
    top: "0",
    p: "4",
    backdropFilter: "blur(2px)",
    animation: "fadein 0.3s",
  },
});

export const Box = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2",
    bg: "white",
    rounded: "md",
    p: "6",
    shadow: "lg",
    w: "full",
    maxW: "md",
    animation: "scalein 0.3s",
  },
});

export const Title = styled("h2", {
  base: {
    fontSize: "lg",
    fontWeight: "bold",
    w: "3/4",
  },
  variants: {
    danger: {
      true: { color: "red.500" },
    },
  },
});

export const Body = styled("h2", {
  base: {},
});

export const Footer = styled("h2", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    mt: "6",
  },
});

export const CancelButton = styled("button", {
  base: {
    pr: "2",
    color: "gray.400",
    _disabled: {
      cursor: "not-allowed",
    },
  },
});
