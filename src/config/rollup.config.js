const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const json = require('@rollup/plugin-json');

const svgr = require('@svgr/rollup').default;

const paths = require('../paths');

const createRollupConfig = (opts = {}) => {

  const {
    input = paths.appIndexPath,
    outputPath = paths.distPath,
    outputName = 'index.js',
    outputFormat = 'es',
    packageJsonPath = paths.pkgJSONPath
  } = opts;

  return {
    input,
    output: {
      name: outputName,
      sourcemap: true,
      file: path.join(outputPath, outputName),
      format: outputFormat,
      globals: { react: 'React' },
    },

    watch: {
      exclude: 'node_modules/**'
    },

    plugins: [
      peerDepsExternal({
        packageJsonPath
      }),
      postcss({
        extract: false,
        modules: true,
        use: ['sass'],
      }),
      resolve(),
      svgr(),
      json(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          "@babel/plugin-syntax-export-default-from",
          "@babel/plugin-proposal-class-properties"
        ]
      }),
      commonjs(),
    ],
    external: [
      'react',
      'react-dom'
    ],
  };
}

module.exports = createRollupConfig;