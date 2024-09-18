/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                // light
                light: '#f6f8fc', // 246, 248, 252 - primary
                secondaryLight: '#ffffff', // 255, 255, 255 - secondary
                accentLight: '#c2e7ff', // 246, 248, 252 - accent

                // dark
                dark: '#18181b', // 24, 24, 27 - primary
                secondaryDark: '#27272a', // 45, 47, 49 - secondary
                accentDark: '#004a77', // 0, 74, 119 - accent
            },
            textColor: {
                // light
                light: '#000',
                lightSecondary: '#252525',
                lightTernary: '#252525',

                // dark
                dark: '#ffffff',
                darkSecondary: '#d2d2d2',
                darkTernary: '#d2d2d2',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontSize: {
                '15px': '15px',
            },
        },
    },
    darkMode: "class",
    // darkMode: "media",
    plugins: [nextui()],
};
