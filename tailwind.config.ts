import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./1774206540634580782.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Golos Text', 'sans-serif'],
				mono: ['IBM Plex Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				nova: {
					blue: '#4f9cf9',
					purple: '#a259ff',
					cyan: '#00d4ff',
					pink: '#ff6b9d',
					dark: '#070b14',
					panel: '#0d1321',
					glass: 'rgba(255,255,255,0.04)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-ring': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
					'50%': { transform: 'scale(1.15)', opacity: '0.2' },
				},
				'pulse-ring2': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
					'50%': { transform: 'scale(1.3)', opacity: '0.1' },
				},
				'wave-bar': {
					'0%, 100%': { transform: 'scaleY(0.3)' },
					'50%': { transform: 'scaleY(1)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' },
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(16px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in': {
					from: { opacity: '0', transform: 'translateX(-16px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(79,156,249,0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(162,89,255,0.6), 0 0 60px rgba(79,156,249,0.3)' },
				},
				'particle': {
					'0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
					'100%': { transform: 'translateY(-60px) translateX(20px)', opacity: '0' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
				'pulse-ring2': 'pulse-ring2 2.5s ease-in-out infinite',
				'wave-bar': 'wave-bar 0.8s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'slide-in': 'slide-in 0.4s ease-out forwards',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'particle': 'particle 2s ease-out forwards',
				'shimmer': 'shimmer 3s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
