const fs = require("fs"); // Or `import fs from "fs";` with ESM
const paths = require("../paths");
const replace = require("@rollup/plugin-replace");

const browserEnvReplacer = (isProd) => {
  const envFilePath = isProd ? paths.prodDotEnvPath : paths.devDotEnvPath;

  if (!fs.existsSync(envFilePath)) {
    return {};
  }

  const envFileContent = fs.readFileSync(envFilePath, { encoding: "utf-8" });
  const replaceParam = {};
  const envFileContentLines = envFileContent.split("\n").filter(Boolean);
  envFileContentLines.forEach((envAssignStatement) => {
    const [key = "", value = ""] = envAssignStatement.split("=");
    if (!key || !value) {
      return;
    }
    const paramKey = `browser.env.${key.trim()}`;
    replaceParam[paramKey] = value.trim();
  });
  return replace(replaceParam);
};

module.exports = browserEnvReplacer;
