import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#000000',         // Apple pure black
        carbon: '#111111',           // Apple elevated surface
        elevated: '#1C1C1E',         // Apple secondary background
        'aurum-gold': '#C9A84C',     // Brand gold accent — keep
        'pale-gold': '#F5F5F7',      // Apple near-white (main text)
        'muted-gold': '#6E6E73',     // Apple tertiary text
        'off-white': '#F5F5F7',
        'border-gold': 'rgba(255,255,255,0.09)',
        'apple-blue': '#0071E3',
        gain: '#30D158',             // Apple system green
        loss: '#FF453A',             // Apple system red
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        dm: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        lora: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #8B6E2E 100%)',
        'dark-radial': 'radial-gradient(ellipse at center, rgba(120,119,198,0.06) 0%, transparent 70%)',
      },
      animation: {
        'ticker-scroll': 'ticker-scroll 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'draw-line': 'drawLine 1s ease forwards',
      },
      keyframes: {
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
      },
      transitionTimingFunction: {
        'aurum': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
