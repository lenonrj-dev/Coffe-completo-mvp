import "dotenv/config";
import app from "./app";
import { env } from "./config/env";

const port = env.PORT || 3333;

app.listen(port, () => {
  console.log(`✅ Backend rodando em http://localhost:${port}`);
});
