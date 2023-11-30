import { styled } from "../../../styled-system/jsx";

export const SearchField = styled("input", {
  base: {
    w: "full",
    h: "12",
    bg: "white",
    border: "none",
    rounded: "3xl",
    shadow: "sm",
    outline: "0",
    px: "4",
    _placeholder: {
      color: "gray.300",
    },
  },
});
