// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const nitroPreset =
  process.env.NITRO_PRESET ??
  (process.env.VERCEL ? "vercel" : process.env.NETLIFY ? "netlify" : undefined);

const nitroOutput =
  nitroPreset === "vercel"
    ? {
        dir: ".vercel/output",
        serverDir: ".vercel/output/functions/__server.func",
        publicDir: ".vercel/output/static",
      }
    : nitroPreset === "netlify"
      ? {
          dir: ".netlify/functions-internal",
          serverDir: ".netlify/functions-internal/server",
          publicDir: "dist",
        }
      : undefined;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Force Nitro on outside Lovable too. Without this, Git-based Vercel/Netlify builds can
  // skip the SSR server bundle and deploy only static files, causing platform-level 404s.
  nitro: {
    ...(nitroPreset ? { preset: nitroPreset } : {}),
    ...(nitroOutput ? { output: nitroOutput } : {}),
  },
});
