import { styled } from "../../styled-system/jsx";

export const TextField = styled("input", {
  base: {
    w: "full",
    bg: "white",
    h: "12",
    px: "4",
    shadow: "sm",
    rounded: "md",
    border: "2px solid white",
    outline: "none",
    transition: "all 0.15s ease-in-out",
    _focus: {
      border: "2px solid black",
    },
  },
});
