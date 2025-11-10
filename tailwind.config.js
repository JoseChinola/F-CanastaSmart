/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
        './app/**/*.{js,ts,tsx}',      // todas las rutas en app
        './src/components/**/*.{js,ts,tsx}', // componentes reutilizables
        './src/screens/**/*.{js,ts,tsx}',    // pantallas si las tienes
        './src/hooks/**/*.{js,ts,tsx}',      // hooks personalizados
        './src/context/**/*.{js,ts,tsx}',    // contextos
    ],
    presets: [require("nativewind/preset")],
    darkMode: "class",
    theme: {
        extend: {},
    },
    plugins: [],
}