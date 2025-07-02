/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Warm & Inviting
        'peach': '#FFB085',           // peachy-apricot (CTAs, highlights)
        'cream': '#FFF2E1',           // creamy-beige (background)
        'cinnamon': '#A0522D',        // toasty-cinnamon (text, headers)
        'biscuit': '#FFD59E',         // buttery-biscuit (cards)
        
        // Secondary - Fresh Ingredients
        'sage': '#8EB695',            // sage-green (accents, tags)
        'mint': '#D9EAD3',            // mint-cream (hover states)
        
        // Neutrals - Clean but Not Cold
        'charcoal': '#2C3A47',        // charcoal blue-grey (headings)
        'eggshell': '#FDFDFC',        // off-white (base background)
        'light-grey': '#E2E2E2',      // light-grey (dividers)
        
        // Optional Pop
        'rosy': '#EF9A9A',            // rosy-pink (notifications, hearts)
      }
    },
  },
  plugins: [],
}