import { Link } from "react-router-dom";

import { styled } from "../../../styled-system/jsx";

export const BackLinkButton = styled(Link, {
  base: {
    display: "flex",
    alignItems: "center",
    w: "fit",
    p: "0.5",
    gap: "0.5",
    rounded: "sm",
    color: "primary.main",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    _hover: {
      bg: "primary.lighter",
    },
  },
});

export const HeaderTitle = styled("h2", {
  base: {
    fontSize: "2xl",
    fontWeight: "black",
  },
});
