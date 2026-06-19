const fs = require("node:fs");
const path = require("node:path");

function loadEnvFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) return {};

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((line) => !line.trim().startsWith("#"))
    .reduce((env, line) => {
      const index = line.indexOf("=");
      if (index === -1) return env;
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      env[key] = value;
      return env;
    }, {});
}

const fileEnv = loadEnvFile(".env.production");

module.exports = {
  apps: [
    {
      name: "proj-shab-api",
      script: "server/index.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        DATA_DIR: "./data",
        ...fileEnv
      }
    }
  ]
};
