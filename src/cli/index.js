#!/usr/bin/env node

'use strict';

const commander = require('commander');

const program = new commander.Command();
const packageJson = require('../../package.json');
const createRollupConfig = require('../config/rollup.config');
const bundleWithConf = require('../actions/build');
const startWatch = require('../actions/watch');

const bundleConf = createRollupConfig();

program
  .version(packageJson.version)
  .arguments('[command] [options]')
  .usage("[command] [options]")
  .action((cmd) => {
    if (cmd) { return; }

    bundleWithConf(bundleConf).then(() => {
      console.log(':)')
    });

  })

program
  .command('dev')
  .description('watch changes')
  .action(async () => {
    startWatch(bundleConf).then(() => {
      process.exit();
    });
  })

program.parse(process.argv);