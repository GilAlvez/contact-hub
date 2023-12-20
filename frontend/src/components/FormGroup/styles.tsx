import { Spinner } from "@phosphor-icons/react";

import { styled } from "../../../styled-system/jsx";

export const Container = styled("div", {
  base: {},
});

export const Error = styled("small", {
  base: {
    display: "block",
    color: "red.500",
    fontSize: "xs",
    lineHeight: "none",
    mt: "2",
  },
});

export const FormItem = styled("div", {
  base: {
    position: "relative",
  },
});

export const LoaderWrapper = styled("div", {
  base: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
  },
});

export const ItemLoading = styled(Spinner, {
  base: {
    h: "5",
    w: "5",
    animation: "spin 2s linear infinite",
  },
});
