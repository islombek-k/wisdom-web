import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        theme_color: "#8936FF",
        background_color: "#2EC6FE",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/desktop.png",
            type: "image/png",
            sizes: "3024x1554",
            form_factor: "wide",
          },
          {
            src: "/screenshots/mobile.png",
            type: "image/png",
            sizes: "650x1398",
            form_factor: "narrow",
          },
        ],
        orientation: "any",
        display: "standalone",
        lang: "en-GB",
        name: "Wisdom",
        short_name: "Wisdom",
        start_url: "wisdomapp.uz",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
