'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(
  path.join(process.cwd())
);

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appIndexPath = resolveApp(path.join('src', 'index.js'));
const distPath = resolveApp(path.join('dist'));
const pkgJSONPath = resolveApp(path.join('package.json'));
const watchFiles = resolveApp(path.join('src', '**'));
const nodeModuleFiles = resolveApp(path.join('node_modules', '**'));

module.exports = {
  appIndexPath,
  pkgJSONPath,
  distPath,
  watchFiles,
  nodeModuleFiles
}