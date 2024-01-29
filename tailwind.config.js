/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'black-opacity-40': 'rgba(0, 0, 0, 0.4)',
				'white-opacity-80': 'rgba(255, 255, 255, 0.8)',
			}
		},
	},
	plugins: [],
}