const { rollup } = require('rollup');

const bundleWithConf  = (config) => {
  console.log();
  console.log('start bundle file:');
  console.log(config.input);
  console.log();

  return rollup(config)
    .then(async (bundle) => {
      await bundle.write(config.output)
      console.log('bundle done.')
      return bundle;
    })
    .catch((e) => {
      console.log('rollup error', e)
    })
}

module.exports = bundleWithConf;