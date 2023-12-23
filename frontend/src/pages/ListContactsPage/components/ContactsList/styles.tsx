import { styled } from "../../../../../styled-system/jsx";

export const OrderByNameButton = styled("button", {
  base: {
    all: "unset",
    display: "flex",
    alignItems: "center",
    mt: "6",
    mb: "2",
    gap: "0.5",
    fontWeight: "bold",
    color: "primary.main",
  },
});

export const ContactCard = styled("div", {
  base: {
    w: "full",
    p: "4",
    bg: "white",
    shadow: "sm",
    rounded: "md",
  },
});

export const ContactName = styled("h3", {
  base: {
    fontWeight: "black",
  },
});

export const ContactCategory = styled("small", {
  base: {
    bg: "primary.lighter",
    color: "primary.main",
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    py: "0.5",
    px: "1",
    rounded: "sm",
  },
});

export const ContactValue = styled("span", {
  base: {
    fontSize: "sm",
    color: "gray.500",
  },
});
