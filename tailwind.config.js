module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                rochester: ['Rochester', 'cursive'],
                satisfy: ['Satisfy', 'cursive'],
            },
            backgroundImage: {
                'hero-home': "url('/images/merry.webp')",
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
