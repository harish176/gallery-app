// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   server: {
//     proxy: {
//       '/api': { // If your backend routes start with /api (e.g., /api/v1/get/images)
//         target: 'http://localhost:8000', // Your backend server address
//         changeOrigin: true, // Needed for virtual hosted sites
//         rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite if needed, here it's just keeping /api
//         // If your backend routes are like /v1/get/images and you want to proxy /api/v1 to /v1
//         // rewrite: (path) => path.replace(/^\/api\/v1/, '/v1'),
//       },
//     },
//   },
// });

// vite.config.js (for local development with deployed backend)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Correct import for v4

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://gallery-app-1-r18o.onrender.com', // <--- Changed to your Render backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});