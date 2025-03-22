import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for src directory
      three: path.resolve(
        __dirname,
        "node_modules/three/build/three.module.js"
      ), // Explicit path to three.module.js
    },
  },
  optimizeDeps: {
    include: ["three"], // Ensure three is pre-bundled by Vite
  },
});
