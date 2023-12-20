import { styled } from "../../../../styled-system/jsx";

export const Container = styled("div", {
  base: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    py: "4",
    px: "8",
    rounded: "sm",
    shadow: "md",
    color: "white",
    "& > svg": {
      fill: "white",
    },
    "& + &": {
      mt: "3",
    },
    _focus: {
      shadow: "xl",
    },
  },
  variants: {
    variant: {
      default: {
        bg: "primary.main",
      },
      success: {
        bg: "green.500",
      },
      danger: {
        bg: "red.500",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Title = styled("strong", {
  base: {
    fontWeight: "bold",
  },
});
