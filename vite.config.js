import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    plugins: [react()],
    resolve: {
      preserveSymlinks: true,
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      headers: {
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-frame-options": "DENY",
        "x-xss-protection": "1; mode=block",
        "referrer-policy": "strict-origin",
      },
      proxy: {
        "/api": env.API_URL,
        "/upload": env.API_URL,
        "/download": env.API_URL,
        "^/request/.*": {
          target: env.API_URL,
          rewrite: (path) => path.replace(/^\/request/, ""),
        },
      },
    },
    preview: {
      port: 8081,
    },
  });
};
