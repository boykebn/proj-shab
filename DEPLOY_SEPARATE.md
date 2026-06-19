# Deploy Terpisah

## Arsitektur

- Frontend React + Vite: deploy ke Vercel
- Backend Express API: deploy ke VPS
- Database: menyusul, backend tetap jadi pintu akses data

## Frontend

Set environment variable di Vercel:

```bash
VITE_API_BASE_URL=https://api-sstt.khasanahsari-bakery.com
```

Build settings:

```bash
Build Command: npm run build
Output Directory: dist
Root Directory: .
```

## Backend

Set environment variable di VPS:

```bash
PORT=4000
CORS_ORIGIN=https://nama-project.vercel.app,https://app.domainanda.com
DATA_DIR=./data
```

`CORS_ORIGIN` bisa diisi lebih dari satu domain, pisahkan dengan koma.

Contoh file env:

```bash
.env.production.example
```

PM2 config sudah disiapkan di:

```bash
ecosystem.config.cjs
```

Contoh config nginx ada di:

```bash
deploy/nginx-proj-shab.conf.example
```

Health check backend:

```bash
GET /health
```

## Langkah VPS Tercepat

```bash
git clone https://github.com/boykebn/proj-shab.git
cd proj-shab
npm install
npm run build
cp .env.production.example .env.production
pm2 start ecosystem.config.cjs
pm2 save
```

Lalu arahkan nginx ke `127.0.0.1:4000`.

## Local Development

Frontend lokal tetap bisa pakai proxy Vite.

Jika ingin eksplisit, buat file `client/.env.local`:

```bash
VITE_API_BASE_URL=http://127.0.0.1:4000
```
