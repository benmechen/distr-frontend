const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', ...defaultTheme.fontFamily.sans],
			},
			spacing: {
				100: '25rem',
				104: '26rem',
				108: '27rem',
				112: '28rem',
				120: '30rem',
				132: '33rem',
			},
		},
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
};
