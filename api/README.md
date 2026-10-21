# Prometheus Server API

A minimal Node.js HTTP API for the Prometheus Global Technologies project. It uses only Node.js built-in modules, so there are no third-party runtime dependencies.

## Endpoints

- `GET /` — service information and endpoint list
- `GET /health` — machine-readable health check
- `GET /api/v1/status` — API status and current prototype capabilities
- Other paths return JSON `404`

## Run locally

Requires Node.js 20 or newer.

```sh
npm start
```

The server listens on `PORT` supplied by the hosting platform, or port `3000` locally.

Test in a browser:

- `http://localhost:3000/health`
- `http://localhost:3000/api/v1/status`

## Deploy on Render

1. Sign in to Render and create a **New Web Service**.
2. Connect the GitHub repository `arifroan/prometheus-global`.
3. Set **Root Directory** to `api`.
4. Set **Runtime** to **Node**.
5. Set **Build Command** to `npm install` (there are no external packages).
6. Set **Start Command** to `npm start`.
7. Choose the free instance option if it is available in your account/region, then create the service.
8. Once deployed, open `https://YOUR-SERVICE.onrender.com/health` and confirm the JSON response has `"status": "ok"`.

Optional environment variable:
- `ALLOWED_ORIGIN`: browser origin allowed to call the API. Defaults to `https://arifroan.github.io`.

## Important limits

This is a starter API, not a production hosting platform. It does not create virtual machines, host customer sites, store accounts, or connect to a database. Free hosting providers may sleep services when idle and may change free-tier limits. Never put passwords, API keys, or other secrets in source control.
