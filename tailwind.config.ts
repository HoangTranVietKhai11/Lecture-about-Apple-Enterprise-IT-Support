import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--outline)",
        "border-subtle": "var(--outline-variant)",
        background: "var(--background)",
        foreground: "var(--on-surface)",
        secondary: "var(--on-surface-variant)",
        sidebar: "var(--sidebar-background)",
        card: "var(--card-background)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--on-primary)",
          container: "var(--primary-container)",
          "on-container": "var(--on-primary-container)",
        },
        surface: {
          low: "var(--sidebar-background)",
          DEFAULT: "var(--card-background)",
          high: "var(--outline-variant)",
        },
        positive: {
          DEFAULT: "var(--positive)",
          container: "var(--positive-container)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          container: "var(--warning-container)",
        },
        error: {
          DEFAULT: "var(--error)",
          container: "var(--error-container)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        headline: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        lg: "var(--rounded-lg)",
        md: "var(--rounded-md)",
        sm: "var(--rounded-sm)",
      },
    },
  },
  plugins: [],
};
export default config;
