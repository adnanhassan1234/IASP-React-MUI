import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "./src/components"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@interfaces": resolve(__dirname, "./src/interfaces"),
      "@services": resolve(__dirname, "./src/services"),
    },
  },
});
