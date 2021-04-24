#!/usr/bin/env node

"use strict";

const commander = require("commander");

const program = new commander.Command();
const packageJson = require("../../package.json");
const createRollupConfig = require("../config/rollup.config");
const bundleWithConf = require("../actions/build");
const startWatch = require("../actions/watch");

program.option(
  "-f, --format <format>",
  "Type of output (amd, cjs, es, iife, umd, system)"
);

program
  .version(packageJson.version)
  .arguments("[command] [options]")
  .usage("[command] [options]")
  .action((cmd) => {
    if (cmd) {
      return;
    }

    const { format: outputFormat } = program.opts();

    bundleWithConf(
      createRollupConfig({
        outputFormat,
      })
    ).then(() => {
      console.log(":)");
    });
  });

program
  .command("dev")
  .description("watch changes")
  .action(async () => {
    const devConf = {
      treeshake: false,
    };
    const bundleConf = createRollupConfig({
      production: false,
    });
    startWatch({
      ...bundleConf,
      ...devConf,
    }).then(() => {
      process.exit();
    });
  });

program.parse(process.argv);
