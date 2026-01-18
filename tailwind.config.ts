import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

// --- Helper Functions untuk Plugin ---

// Fungsi untuk inject warna tailwind ke CSS variables
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

// Fungsi SVG untuk Grid Background
function svgGrid(color: string) {
  return `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='${encodeURIComponent(
    color
  )}'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e`;
}

function svgGridSmall(color: string) {
  return `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8' height='8' fill='none' stroke='${encodeURIComponent(
    color
  )}'%3e%3cpath d='M0 .5H7.5V8'/%3e%3c/svg%3e`;
}

function svgDot(color: string) {
  return `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3e%3ccircle fill='${encodeURIComponent(
    color
  )}' id='pattern-circle' cx='10' cy='10' r='1.6257413380501518'/%3e%3c/svg%3e`;
}

const config: Config = {
  // Pastikan path ini sesuai dengan struktur folder 'src' kamu
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Wajib untuk style dark mode
  theme: {
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "gradient-x": "gradient-x 15s ease infinite", // Untuk teks gradient bergerak
        shimmer: "shimmer 2s linear infinite", // Untuk tombol shimmer
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        gradientX: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [
    // 1. Plugin untuk membuat CSS variable dari warna Tailwind (Wajib untuk Aceternity UI)
    addVariablesForColors,
    
    // 2. Plugin untuk Background Grid & Dot Pattern
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgGrid(value)}")`,
          }),
          "bg-grid-small": (value: string) => ({
            backgroundImage: `url("${svgGridSmall(value)}")`,
          }),
          "bg-dot": (value: string) => ({
            backgroundImage: `url("${svgDot(value)}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

export default config;

