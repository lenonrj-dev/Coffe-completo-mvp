import express from "express";
import cors from "cors";
import { env } from "./config/env";
import apiRouter from "./routes";

const app = express();

// JSON
app.use(express.json({ limit: "1mb" }));

// CORS (frontend + admin)
const allowedOrigins = new Set(
  [env.FRONTEND_URL, env.ADMIN_URL].filter(Boolean)
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  return res.status(200).json({
    ok: true,
    service: "coffee-backend",
    version: "1.0.0",
  });
});

app.use("/api", apiRouter);

export default app;
