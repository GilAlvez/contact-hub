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
    transition: "all 0.3s ease-in-out",
    _placeholder: {
      color: "gray.300",
    },
    _hover: {
      shadow: "md",
    },
    _focus: {
      shadow: "md",
    },
  },
});
