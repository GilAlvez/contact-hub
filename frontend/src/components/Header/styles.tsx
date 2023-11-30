import { styled } from "../../../styled-system/jsx";

export const Header = styled("header", {
  base: {
    textAlign: "center",
    mt: "20",
    mb: "12",
    display: "flex",
    flexDir: "column",
    gap: "8",
  },
});

export const Logo = styled("h1", {
  base: {
    fontSize: "5xl",
    fontWeight: "black",
    letterSpacing: "tight",
  },
});
