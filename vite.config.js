import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["node:child_process"],
    },
    minify: true
  },
  plugins: [react()],
});
