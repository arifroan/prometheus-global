const http = require("node:http");

const PORT = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://arifroan.github.io";

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(JSON.stringify(payload, null, 2));
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin;

  if (origin && origin === ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/") {
    return sendJson(res, 200, {
      service: "Prometheus Server API",
      version: "0.1.0",
      message: "The Prometheus Server API is running.",
      endpoints: ["/health", "/api/v1/status"]
    });
  }

  if (req.method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, {
      status: "ok",
      service: "prometheus-server-api",
      timestamp: new Date().toISOString(),
      uptime_seconds: Math.floor(process.uptime())
    });
  }

  if (req.method === "GET" && url.pathname === "/api/v1/status") {
    return sendJson(res, 200, {
      service: "Prometheus Server",
      state: "operational",
      api_version: "v1",
      checks: {
        http_server: "ok",
        health_endpoint: "ok",
        database: "not_configured"
      },
      note: "This is an initial API prototype. No database or hosting infrastructure is provisioned yet.",
      timestamp: new Date().toISOString()
    });
  }

  return sendJson(res, 404, {
    error: "not_found",
    message: "Endpoint not found. Try /health or /api/v1/status."
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Prometheus Server API listening on port ${PORT}`);
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
