import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    middlewareMode: false,
  },
  plugins: [
    {
      name: "spa-fallback",
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (req.url === "/" || req.url.startsWith("/.")) {
              next();
            } else if (!req.url.includes(".")) {
              req.url = "/";
              next();
            } else {
              next();
            }
          });
        };
      },
    },
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
