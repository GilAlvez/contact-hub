import { styled } from "../../../../../styled-system/jsx";

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
