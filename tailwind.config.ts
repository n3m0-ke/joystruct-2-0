import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        goldenrod: '#DAA520',
        teal: { 500: "#009999", 600: "#00A8A8" },
        dark: { 900: "#2C2C2C", 950: "#1A1A1A" },
        red: { 500: "#E53935", 600: "#FF3B30" },
        gray: { 100: "#F8F9FA", 200: "#E0E0E0" },
      },
      borderColor: {
        goldenrod: '#DAA520',
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      }
    },
  },
  plugins: [],
}
export default config
