import { Link } from "react-router-dom";

import { styled } from "../../../../../styled-system/jsx";

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
