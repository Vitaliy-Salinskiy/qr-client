/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
			},
			colors: {
				'black-opacity-40': 'rgba(0, 0, 0, 0.4)',
				'white-opacity-50': 'rgba(255, 255, 255, 0.5)',
				'white-opacity-80': 'rgba(255, 255, 255, 0.8)',
				'darkBlue': '#262534',
				'mainOrange': '#F5A006',
				'darkGrey': '#42424C',
				'lightGrey': '#F4F4F5',
				'semiGrey': '#B2B1B7',
				'darkSkyBlue': '#6EACCF',
				'lightPurple': '#9D6ECF',
				'midDarkGrey': '#3F3D56'
			}
		},
	},
	plugins: [],
}