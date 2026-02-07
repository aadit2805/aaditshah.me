/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Warm neutral palette
        bone: {
          50: '#FDFCFA',
          100: '#FAF7F2',
          200: '#F5F0E6',
          300: '#EBE4D6',
          400: '#DDD3C0',
          500: '#CFC2AA',
          600: '#B8A88C',
          700: '#9C8A6E',
          800: '#7A6B55',
          900: '#5C5041',
        },
        espresso: {
          50: '#F7F5F3',
          100: '#EDE8E3',
          200: '#DDD4CA',
          300: '#C4B5A5',
          400: '#A8927A',
          500: '#8C7560',
          600: '#75604D',
          700: '#5F4D3F',
          800: '#4A3C32',
          900: '#3D3229',
          950: '#2A231C',
        },
        terracotta: {
          50: '#FBF6F3',
          100: '#F5EAE3',
          200: '#EBD5C7',
          300: '#DDB9A2',
          400: '#CB9577',
          500: '#B87A58',
          600: '#A66748',
          700: '#8A533B',
          800: '#714534',
          900: '#5D3B2E',
          950: '#321D17',
        },
        sage: {
          50: '#F6F7F4',
          100: '#E9ECE4',
          200: '#D4DACA',
          300: '#B5C0A5',
          400: '#94A37E',
          500: '#788862',
          600: '#5E6C4C',
          700: '#4A553E',
          800: '#3D4534',
          900: '#353C2F',
          950: '#1A1E16',
        },
        // Landing page palette
        landing: {
          bg: '#f5f2e9',
          primary: '#1A1A1A',
          secondary: '#4A4A4A',
          muted: '#6A6A6A',
          border: '#E8E8E6',
          hover: '#2A2A2A',
        },
        // Shadcn color system
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
