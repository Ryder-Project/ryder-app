// tailwind.config.js
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./public/index.html",
  // Add other paths as needed
];
export const theme = {
  extend: {
    colors: {
      orange: {
        500: '#ff9900', // Adjust the hex color code as needed
      },
    },
  },
};
