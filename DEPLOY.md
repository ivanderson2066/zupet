# Hospedando o Zupet em qualquer plataforma

Este projeto é **TanStack Start** rodando em **Nitro**, então pode ser publicado em qualquer host **sem perder SSR, server functions ou rotas `/api/*`**. Basta escolher o *preset* certo na hora do build via variável de ambiente `NITRO_PRESET`.

## ✅ Opção recomendada (zero config): Lovable

Clica em **Publish** no editor. Pronto — `https://zupet.lovable.app`. SSR, server functions, domínio próprio (Settings → Domains), tudo funciona. **Recomendo essa.**

---

## 🌐 Vercel

1. Conecta o repo do GitHub na Vercel.
2. Em **Project Settings → Environment Variables**, adiciona:
   - `NITRO_PRESET` = `vercel`
3. Em **Build & Development Settings**:
   - Build Command: `bun run build` (ou `npm run build`)
   - Output Directory: `.vercel/output` (deixa a Vercel detectar)
4. Adiciona as suas variáveis do `.env` (Shopify, Meta Pixel, etc).
5. Deploy.

> A Vercel detecta automaticamente o output Nitro. **Não** crie `vercel.json` com rewrites SPA — isso quebra o SSR.

---

## 🌐 Netlify

1. Conecta o repo do GitHub na Netlify.
2. Em **Site settings → Environment variables**:
   - `NITRO_PRESET` = `netlify`
3. Build command: `bun run build`
4. Publish directory: deixa em branco (o preset Nitro já configura).
5. Adiciona suas variáveis de ambiente.
6. Deploy.

> **Não** crie `_redirects` ou `netlify.toml` com fallback SPA — isso quebra o SSR.

---

## 🌐 Cloudflare Pages / Workers

1. `NITRO_PRESET` = `cloudflare-pages` (ou `cloudflare-module` para Workers).
2. Build command: `bun run build`
3. Output directory: `dist`
4. Deploy.

---

## 🌐 Node.js (VPS, Railway, Render, Fly.io, EC2)

1. `NITRO_PRESET` = `node-server`
2. `bun run build`
3. Rode: `node .output/server/index.mjs`
4. Porta padrão: `3000` (configure com `PORT`).

Ideal pra Railway, Render, DigitalOcean App Platform, etc.

---

## 🌐 Docker (qualquer lugar)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json bun.lock* ./
RUN npm install -g bun && bun install
COPY . .
ENV NITRO_PRESET=node-server
RUN bun run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

---

## 📋 Variáveis de ambiente necessárias

Configure no painel do host que você escolher:

| Variável | Onde pegar |
|---|---|
| `VITE_SHOPIFY_STORE_DOMAIN` | seu domínio `.myshopify.com` |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | Shopify Admin → Apps → Headless |
| `VITE_META_PIXEL_ID` | Meta Business Manager (se usar) |

---

## ⚠️ O que NÃO fazer

- ❌ Adicionar `vercel.json` / `netlify.toml` / `_redirects` com fallback SPA (`/* → /index.html`) — quebra o SSR.
- ❌ Usar `vite build` sem `NITRO_PRESET` num host que não é Cloudflare — o build padrão monta para Workers.
- ❌ Misturar React Router DOM com TanStack Router.

## ❓ Estou tendo 404 em todas as rotas

Significa que o host está servindo só os arquivos estáticos sem o servidor Nitro. Confira:
1. `NITRO_PRESET` está setado corretamente?
2. O comando de build é `bun run build` (não `vite build --ssr false`)?
3. O host está executando o output do servidor (`.output/server/`) e não só servindo `dist/` como estático?
