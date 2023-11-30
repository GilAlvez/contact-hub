import { styled } from "../../../styled-system/jsx";

export const TextField = styled("input", {
  base: {
    w: "full",
    h: "12",
    bg: "white",
    border: "none",
    rounded: "3xl",
    shadow: "xs",
    outline: "0",
    px: "4",
    _placeholder: {
      color: "gray.300",
    },
  },
});
