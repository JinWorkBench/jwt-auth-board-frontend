/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 커스텀 그리드 (grid-cols-header)
      gridTemplateColumns: {
        header: "1fr 1fr 1.7fr",
      },
    },
  },
  plugins: [],
};
