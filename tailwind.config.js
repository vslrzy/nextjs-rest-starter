/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      fontSize: {
        logo: '1.7rem',
        header: '1.5rem',
        cardheader: '1.3rem',
        pageheader: '2.2rem',
      },
      boxShadow: {
        normal: '0px 0px 10px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
