/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        header: ['"DM Sans"', "serif"],
      },
    },
  },
  plugins: [],
};
