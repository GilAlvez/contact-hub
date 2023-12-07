import { styled } from "../../styled-system/jsx";

export const Button = styled("button", {
  base: {
    h: "12",
    px: "4",
    bg: "primary.main",
    color: "white",
    border: "none",
    fontSize: "md",
    fontWeight: "bold",
    rounded: "md",
    shadow: "sm",
    userSelect: "none",
    transition: "all 0.15s ease-in-out",
    _hover: {
      bg: "primary.light",
    },
    _active: {
      bg: "primary.dark",
    },
    _disabled: {
      pointerEvents: "none",
      bg: "gray.500!",
      opacity: "0.5",
      cursor: "default",
    },
  },
});
