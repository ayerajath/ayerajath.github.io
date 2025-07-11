import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: [
      // Add this for ESBuild to operate on js files in the src directory
      "src/**/*.js",
      "src/**/*.jsx", // Also include jsx if you plan to use it later
    ],
    exclude: [],
  },
  server: {
    port: 3000, // Optional: keep the same port as create-react-app
    open: true    // Optional: automatically open in browser
  }
}); 