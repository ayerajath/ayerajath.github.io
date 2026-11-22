import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // Feature flags as literal booleans, so code behind a flag that is off is
  // dropped from the bundle. See src/lib/flags.js.
  define: {
    __FLAG_REDESIGN__: JSON.stringify(process.env.VITE_FLAG_REDESIGN === 'true'),
  },
  esbuild: {
    loader: "jsx",
    include: [
      // Add this for ESBuild to operate on js files in the src directory
      "src/**/*.js",
      "src/**/*.jsx", // Also include jsx if you plan to use it later
    ],
    exclude: [],
  },
  // The prerender build (src/entry-server.jsx) bundles its dependencies and
  // writes .mjs, so Node loads it as an ES module.
  ssr: { noExternal: true },
  build: isSsrBuild
    ? { rollupOptions: { output: { entryFileNames: '[name].mjs' } } }
    : {},
  server: {
    port: 3000, // Optional: keep the same port as create-react-app
    open: true    // Optional: automatically open in browser
  }
}));
