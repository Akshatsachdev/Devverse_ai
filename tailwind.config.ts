import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
				'spiritual': ['Rasa', 'serif'],
				'body': ['Inter', 'sans-serif'],
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
				// Refined spiritual palette
				'ivory-sand': 'hsl(var(--ivory-sand))',
				'soft-parchment': 'hsl(var(--soft-parchment))',
				'saffron-gold': 'hsl(var(--saffron-gold))',
				'sage-green': 'hsl(var(--sage-green))',
				'deep-charcoal': 'hsl(var(--deep-charcoal))',
				'earth-brown': 'hsl(var(--earth-brown))',
				'light-almond': 'hsl(var(--light-almond))',
				'chip-bg': 'hsl(var(--chip-bg))',
				'cta-start': 'hsl(var(--cta-start))',
				'cta-end': 'hsl(var(--cta-end))',
				'hover-glow': 'hsl(var(--hover-glow))'
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
				'float-gentle': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(2deg)' }
				},
				'float-petals': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: '0.7' },
					'25%': { transform: 'translateY(-8px) translateX(2px) rotate(90deg)', opacity: '1' },
					'50%': { transform: 'translateY(-15px) translateX(0px) rotate(180deg)', opacity: '0.8' },
					'75%': { transform: 'translateY(-8px) translateX(-2px) rotate(270deg)', opacity: '1' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: 'var(--shadow-divine)' },
					'50%': { boxShadow: 'var(--shadow-wisdom)' }
				},
				'om-spin': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float-gentle': 'float-gentle 6s ease-in-out infinite',
				'float-petals': 'float-petals 8s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'om-spin': 'om-spin 20s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
