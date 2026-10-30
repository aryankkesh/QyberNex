/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        qyber: {
          dark: '#0A0E1A',
          card: '#111827',
          border: '#1F293D',
          hover: '#1E293B',
          blue: '#00F0FF',
          blueDim: 'rgba(0, 240, 255, 0.15)',
          violet: '#7000FF',
          violetDim: 'rgba(112, 0, 255, 0.15)',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444',
          textMuted: '#94A3B8'
        }
      }
    },
  },
  plugins: [],
}
