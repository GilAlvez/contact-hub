import { defineGlobalStyles } from "@pandacss/dev";

export default defineGlobalStyles({
  "html, body": {
    bg: "gray.100",
    color: "gray.900",
    fontSize: { base: "14px", sm: "16px" },
    fontFamily: "Sora Variable, sans-serif",
    lineHeight: "1.25",
  },
  button: {
    cursor: "pointer",
  },
});
