/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./components/**/*.{js, ts, jsx, tsx}", "./pages/**/*.{js, ts, jsx, tsx}"
  ],
  theme: {
    extend: {
      lineClamp: {
        10: '10',
        16: '16',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
