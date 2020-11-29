const {
  watch
} = require('rollup');

const paths = require('../paths');

const startWatch = (config) => {
  console.log('')
  console.log('Building start and watching...')
  console.log('')
  const watcher = watch({
    ...config,
    watch: {
      include: [paths.watchFiles],
      exclude: [paths.nodeModuleFiles],
    }
  })
  watcher.on('change', async evt => {
    console.log('changed.')
  })
  return new Promise((resolve, reject) => {
    watcher.on('event', async evt => {
      if (evt.code === 'START') {
        console.log('rebuilding...')
      }
      if (evt.code === 'END') {
        console.log('rebuilding done.')
        console.log('')
      }
      if (evt.code === 'ERROR') {
        console.log(evt);
      }
    })

    watcher.on('close', () => {
      resolve();
    })
  });
}

module.exports = startWatch;