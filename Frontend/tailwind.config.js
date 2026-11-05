/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173F35',
          light: '#24594B',
          dark: '#0D2721',
          50: '#F2F7F5',
          100: '#E1EDE9',
          200: '#C2DBD3',
          800: '#173F35',
          900: '#0E2922',
        },
        warmOat: {
          DEFAULT: '#F7F4EC',
          light: '#FBF9F5',
          border: '#E8E3D5',
          dark: '#E2DDCF',
        },
        softSage: {
          DEFAULT: '#E5ECE3',
          light: '#F1F6EF',
          border: '#CCD8CA',
          dark: '#7D9578',
        },
        freshGreen: {
          DEFAULT: '#C9E7A3',
          light: '#E2F4CD',
          accent: '#7FA84A',
          dark: '#587D2A',
        },
        charcoal: {
          DEFAULT: '#252923',
          light: '#3D443A',
          muted: '#636B5F',
          subtle: '#8C9588',
        },
        harvest: {
          DEFAULT: '#E8A66A',
          light: '#F8E4D0',
          dark: '#C8722B',
          badge: '#B85E16',
        },
        softSky: {
          DEFAULT: '#DCE9F3',
          light: '#EFF6FB',
          dark: '#30698F',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(23, 63, 53, 0.05), 0 1px 2px rgba(23, 63, 53, 0.03)',
        'soft-md': '0 4px 16px -2px rgba(23, 63, 53, 0.06), 0 2px 6px -1px rgba(23, 63, 53, 0.04)',
        'soft-lg': '0 12px 32px -4px rgba(23, 63, 53, 0.08), 0 4px 12px -2px rgba(23, 63, 53, 0.04)',
        'glow-green': '0 0 20px -3px rgba(201, 231, 163, 0.45)',
        'glow-forest': '0 8px 24px -4px rgba(23, 63, 53, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
