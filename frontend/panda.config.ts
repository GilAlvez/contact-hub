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
      keyframes: {
        fadein: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scalein: {
          from: { transform: "scale(0.9)" },
          to: { transform: "scale(1)" },
        },
      },
      tokens: {
        colors: {
          primary: {
            xlighter: { value: "{colors.gray.100}" },
            lighter: { value: "{colors.gray.300}" },
            light: { value: "{colors.gray.700}" },
            main: { value: "{colors.gray.900}" },
            dark: { value: "{colors.gray.950}" },
          },
        },
      },
    },
  },
  utilities: {
    backgroundColorTransparentize: {
      shorthand: ["bgca", "bga"],
      property: "backgroundColor",
      className: "transparentize_bgc",
      transform: (value, { token }) => {
        const lastIndex = value?.lastIndexOf("/");
        if (!lastIndex) {
          return {};
        }
        if (typeof value?.substring !== "function") {
          return {};
        }
        const color = value?.substring(0, lastIndex);
        if (!color) {
          return {};
        }
        const amount = value.split("/").at(-1);
        const colorValue = token(`colors.${color}`);

        const opacityValue = token(`opacity.${amount}`);
        const amountValue = opacityValue ? 100 - (opacityValue as any) * 100 : 100 - Number(amount);
        return {
          backgroundColor: `color-mix(in srgb, transparent ${amountValue}%, ${colorValue})`,
        };
      },
    },
  },
  outdir: "styled-system",
});
