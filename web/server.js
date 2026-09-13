const { spawn } = require("child_process");

process.env.DATABASE_URL ||= "file:./prisma/dev.db";
process.env.AUTH_SECRET ||= "yasin-dava-khana-change-this-secret-key-2026";

const port = String(process.env.PORT || 3000);
const nextBin = require.resolve("next/dist/bin/next");

const child = spawn(
  process.execPath,
  [nextBin, "start", "-H", "0.0.0.0", "-p", port],
  { stdio: "inherit", env: process.env, cwd: __dirname },
);

child.on("exit", (code) => process.exit(code ?? 1));
