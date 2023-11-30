import { styled } from "../../../styled-system/jsx";

export const Container = styled("section", {
  base: {
    mt: "8",
  },
});

export const PageTitle = styled("h2", {
  base: {
    fontSize: "2xl",
    fontWeight: "bold",
  },
});

export const Link = styled("a", {
  base: {
    py: "2",
    px: "4",
    bg: "transparent",
    color: "primary.main",
    borderColor: "primary.main",
    borderWidth: "3px",
    textDecoration: "none",
    fontWeight: "bold",
    rounded: "sm",
    transition: "all 0.2s ease-in-out",
    _hover: {
      bg: "primary.main",
      color: "primary.xlighter",
    },
  },
});
