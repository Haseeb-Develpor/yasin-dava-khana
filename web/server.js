const { createServer } = require("http");
const { parse } = require("url");
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const next = require("next");

const root = __dirname;
const dbFile = path.join(root, "prisma", "dev.db");
process.env.DATABASE_URL ||= `file:${dbFile}`;
process.env.AUTH_SECRET ||= "yasin-dava-khana-change-this-secret-key-2026";

const port = Number(process.env.PORT) || 3000;
const hostname = "0.0.0.0";

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    env: process.env,
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed`);
  }
}

if (!fs.existsSync(dbFile) || fs.statSync(dbFile).size < 1024) {
  console.log("Preparing database...");
  run("npx", ["prisma", "db", "push", "--accept-data-loss"]);
  run("npx", ["tsx", "prisma/seed.ts"]);
}

const app = next({ dev: false, hostname, port, dir: root });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res, parse(req.url, true));
    }).listen(port, hostname, () => {
      console.log(`Ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
