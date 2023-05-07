import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      "@/": "./",
    },
  },
  test: {
    environment: "jsdom",
  },
});
