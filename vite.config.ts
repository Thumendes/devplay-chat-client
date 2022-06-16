import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: process.env.PORT,
  },
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
