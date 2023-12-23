import { styled } from "../../../../../styled-system/jsx";

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
