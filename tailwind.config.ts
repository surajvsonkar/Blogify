import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				xsm: '500px',
				sm: '600px',
				md: '690px',
				lg: '988px',
				xlg: '1078px',
				xxl: '1265px',
			},
			colors: {
				textGray: '#757575',
			},
            fontFamily: {
                roboto: 'var(--font-roboto)',
                montserrat: 'var(--font-montserrat)'
            }
		},
	},
	plugins: [],
} satisfies Config;
