const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

const root = path.join(__dirname, "..");
const stand = path.join(root, ".next", "standalone");
if (!fs.existsSync(stand)) {
  console.log("No standalone output; skip copy.");
  process.exit(0);
}

copyDir(path.join(root, "public"), path.join(stand, "public"));
copyDir(path.join(root, ".next", "static"), path.join(stand, ".next", "static"));

const dbSrc = path.join(root, "prisma", "dev.db");
const dbDestDir = path.join(stand, "prisma");
if (fs.existsSync(dbSrc)) {
  fs.mkdirSync(dbDestDir, { recursive: true });
  fs.copyFileSync(dbSrc, path.join(dbDestDir, "dev.db"));
}

console.log("Standalone files copied.");
