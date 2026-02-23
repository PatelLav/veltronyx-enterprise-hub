import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";

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
      configureServer(server: ViteDevServer) {
        return () => {
          server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
            const url = req.url || "/";
            if (url === "/" || url.startsWith("/.")) {
              next();
            } else if (!url.includes(".")) {
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
