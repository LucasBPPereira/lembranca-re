/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
import { withTV } from "tailwind-variants/transformer";

const config = withTV({
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(date-picker|form|button|ripple|spinner|calendar|date-input|popover).js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["var(--font-lexend-variable)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        light: "hsl(var(--light))",
        dark: "hsl(var(--dark))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        toggle: "hsl(var(--toggle))",
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          fg: "hsl(var(--tertiary-fg))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          fg: "hsl(var(--accent-fg))",
          subtle: "hsl(var(--accent-subtle))",
          "subtle-fg": "hsl(var(--accent-subtle-fg))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          fg: "hsl(var(--info-fg))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          fg: "hsl(var(--muted-fg))",
        },
        overlay: {
          DEFAULT: "hsl(var(--overlay))",
          fg: "hsl(var(--overlay-fg))",
        },
      },
      borderRadius: {
        "3xl": "calc(var(--radius) + 7.5px)",
        "2xl": "calc(var(--radius) + 5px)",
        xl: "calc(var(--radius) + 2.5px)",
        lg: "calc(var(--radius))",
        md: "calc(var(--radius) - 2.5px)",
        sm: "calc(var(--radius) - 5px)",
      },
      screens: {
        "min-mobile": '370px',
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
    }),
    require("tailwindcss-animate"),
    require("tailwindcss-react-aria-components"),
  ],
});

export default config;
