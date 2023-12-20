import { Link } from "react-router-dom";

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

export const NewContactLink = styled(Link, {
  base: {
    py: "2",
    px: "4",
    bg: "transparent",
    color: "primary.main",
    borderColor: "primary.main",
    borderWidth: "3px",
    textDecoration: "none",
    fontWeight: "bold",
    rounded: "md",
    transition: "all 0.2s ease-in-out",
    _hover: {
      bg: "primary.main",
      color: "primary.xlighter",
    },
  },
});

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

export const ErrorContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2",
    mt: "12",
  },
});

export const ErrorMessage = styled("h2", {
  base: {
    textAlign: "center",
    fontSize: "xl",
    color: "red.500",
  },
});

export const EmptyListContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    w: "3/4",
    mt: "12",
    mx: "auto",
    gap: "2",
    textAlign: "center",
    color: "primary.light",
  },
});

export const EmptyListCTA = styled("strong", {
  base: {
    color: "primary.main",
  },
});

export const SearchNotFoundContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    w: "3/4",
    mt: "12",
    mx: "auto",
    gap: "2",
    textAlign: "center",
    color: "primary.light",
  },
});
