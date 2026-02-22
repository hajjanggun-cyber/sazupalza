import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9ee',
          100: '#fdf0d3',
          200: '#fadda6',
          300: '#f7c56e',
          400: '#f3a63a',
          500: '#f08a18',
          600: '#e06e0e',
          700: '#b9510f',
          800: '#944014',
          900: '#773614',
          950: '#401a07',
        },
        gold: '#c9a84c',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
