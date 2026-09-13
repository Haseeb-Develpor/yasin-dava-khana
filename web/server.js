const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = String(process.env.PORT || 3000);
const dbFile = [
  path.join(root, "prisma", "dev.db"),
  path.join(root, ".next", "standalone", "prisma", "dev.db"),
].find((file) => fs.existsSync(file)) || path.join(root, "prisma", "dev.db");

process.env.PORT = port;
process.env.HOSTNAME = "0.0.0.0";
process.env.AUTH_SECRET ||= "yasin-dava-khana-change-this-secret-key-2026";
process.env.DATABASE_URL = `file:${dbFile}`;

const standalone = path.join(root, ".next", "standalone", "server.js");
if (fs.existsSync(standalone)) {
  require(standalone);
} else {
  const nextBin = require.resolve("next/dist/bin/next");
  const child = spawn(process.execPath, [nextBin, "start", "-H", "0.0.0.0", "-p", port], {
    cwd: root,
    env: process.env,
    stdio: "inherit",
  });
  child.on("exit", (code) => process.exit(code ?? 1));
}
