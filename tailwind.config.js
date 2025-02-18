export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        logoText: "var(--color-logoText)",
        successText: "var(--color-successText)",
        accentColor: "var(--color-accentColor)",
        shadeAccent: "#CC5500",
        shadeVenues: "#eee",
        customPurple: {
          50: "#eef9ff",
          100: "#d9f1ff",
          200: "#bce7ff",
          300: "#8ed9ff",
          400: "#58c2ff",
          500: "#32a5ff",
          600: "#1a86f5",
          700: "#146ee1",
          800: "#1759b6",
          900: "#194c8f",
          950: "#142f57",
        },
      },
    },
  },
  plugins: [],
};
