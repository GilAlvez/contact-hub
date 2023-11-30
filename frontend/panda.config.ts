import { defineConfig } from "@pandacss/dev";

import baseStyles from "./styled-system/base-styles";

export default defineConfig({
  preflight: true,
  strictTokens: false,
  jsxFramework: "react",
  globalCss: baseStyles,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: "styled-system",
});
