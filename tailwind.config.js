/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            one: ["Matter SQ Light"],
            two: ["Matter SQ Regular"],
        },
        extend: {
            backgroundImage: {
                bg: "url('./assets/bg.png')",
            },
        },
    },
    plugins: [],
};
