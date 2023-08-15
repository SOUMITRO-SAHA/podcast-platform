/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				theme: "#20062e",
				blue: "#18b2de",
				gray: "#d7d7d7",
				"purple-gray": "#8f8297",
			},
		},
	},
	plugins: [],
};
