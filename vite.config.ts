import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    // @ts-ignore
    port: process.env.PORT,
  },
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
