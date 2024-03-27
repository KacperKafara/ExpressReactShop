/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                dancing: ["Dancing-Script", "cursive"],
            },
            colors: {
                dark_gray: "#0f111a",
                nice_green: "#38d8a8",
                white_text: "#efefef",
                nice_red: "#A9182B",
            }
        },
    },
    plugins: [],
};