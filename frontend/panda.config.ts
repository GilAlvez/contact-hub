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
    extend: {
      tokens: {
        colors: {
          primary: {
            xlighter: { value: "{colors.gray.100}" },
            lighter: { value: "{colors.gray.400}" },
            light: { value: "{colors.gray.700}" },
            main: { value: "{colors.gray.900}" },
            dark: { value: "{colors.gray.950}" },
          },
        },
      },
    },
  },
  outdir: "styled-system",
});
