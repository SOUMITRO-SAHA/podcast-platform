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
			backgroundImage: {
				pg: "linear-gradient(177.7deg, rgba(58, 129, 191, 0.3) 1.63%, rgba(65, 48, 90, 0.009))",
			},
		},
	},
	plugins: [],
};
