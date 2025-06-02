import aspectRatio, { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
        'xsm': '325px',
        '3xl': '1600px',
        '4xl': '1920px'
      },
      colors: {
        primary: {
          '400': '#5962b9',
          '500': '#4d56b7',
          '600': '#414bb2',
        },
        secondary: {
          '500': '#131313',
          '600': '#131313',
          '800': '#131313'
        },
        black: '#1a1919',
        background: '#fff',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  variants: {
    fluidType: ['responsive']
  },
  plugins: [
    aspectRatio,
    require('tailwindcss-fluid-type')({
      settings: {
        prefix: 'fluid-',
      },
      values: {
        'lg': [0.1, {
          lineHeight: 1.3
        }]
      }
    }),
  ],
} satisfies Config
