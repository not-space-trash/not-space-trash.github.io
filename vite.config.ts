import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entryHtml = path.resolve(__dirname, "app.html");

function githubPagesEntryPlugin(): Plugin[] {
  let outDir = path.resolve(__dirname, "dist");

  return [
    {
      name: "github-pages-dev-entry",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const urlPath = req.url?.split("?")[0];
          if (req.method === "GET" && (urlPath === "/" || urlPath === "/index.html")) {
            try {
              const raw = fs.readFileSync(entryHtml, "utf-8");
              const html = await server.transformIndexHtml(req.url ?? "/", raw);
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/html; charset=utf-8");
              res.end(html);
              return;
            } catch (err) {
              next(err);
              return;
            }
          }
          next();
        });
      },
    },
    {
      name: "github-pages-build-entry",
      apply: "build",
      enforce: "post",
      configResolved(config) {
        outDir = path.resolve(__dirname, config.build.outDir);
      },
      generateBundle(_, bundle) {
        const entry = bundle["app.html"];
        if (entry && entry.type === "asset") {
          for (const [fileName, asset] of Object.entries(bundle)) {
            if (asset.type === "asset" && /^favicon-[^/]+\.(ico|svg)$/.test(fileName)) {
              const cleanName = `favicon${path.extname(fileName)}`;
              if (typeof entry.source === "string") {
                entry.source = entry.source.split(fileName).join(cleanName);
              }
              delete bundle[fileName];
            }
          }
          entry.fileName = "index.html";
          bundle["index.html"] = entry;
          delete bundle["app.html"];
        }
      },
      closeBundle() {
        const builtHtml = path.join(outDir, "index.html");
        if (fs.existsSync(builtHtml)) {
          fs.copyFileSync(builtHtml, path.resolve(__dirname, "index.html"));
        }
        for (const icon of ["favicon.ico", "favicon.svg"]) {
          const srcIcon = path.resolve(__dirname, icon);
          if (fs.existsSync(srcIcon)) {
            fs.copyFileSync(srcIcon, path.join(outDir, icon));
          }
        }
      },
    },
  ];
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), ...githubPagesEntryPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: entryHtml,
    },
  },
});
