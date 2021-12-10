class DeleteSourceMapPlugin {
    constructor () {
    }
  
    apply (compiler) {
      const { webpack } = compiler;
  
      const { Compilation } = webpack;
  
      let countMatchAssets = 0;
      
      compiler.hooks.compilation.tap(
        'ReplacerPlugin',
        (compilation) => {
          compilation.hooks.processAssets.tap(
            {
              name: 'ReplaceSourceMapLeftoversProcessAssetsPlugin',
              stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE, // summarize the list of existing assets.
            },
            (assets) => {
              Object.entries(assets).forEach(([ pathname, source]) => {
                if (!pathname.endsWith('.js')) {
                  return 
                }
                countMatchAssets+= 1;
                const newSource = source.source().replace(/\/\/# sourceMappingURL=.*/, '')
                assets[pathname] = Object.assign(assets[pathname], {
                          source: () => newSource
                        });
              });
  
              
            }
          );
          return true
        }
      );
  
      compiler.hooks.done.tap(
        'RemoveSourceMapsFilesPlugin',
        (stats) => {
          const fs = require('fs')
          let countMatchMapAssets = 0
          
          const outputPath = stats.compilation.getPath(compiler.outputPath)
  
          Object.keys(stats.compilation.assets)
          .filter(name => /\.js\.map$/.test(name))
          .forEach((name) => {
            countMatchMapAssets += 1
           const existsAt = `${outputPath}/${name}`
          
           fs.unlinkSync(existsAt)
  
          })
          console.log('✨ Succesfuly removed sourcemap url from files, count: ', countMatchAssets)
          console.log('✨ Succesfuly removed sourcemap files, count: ', countMatchMapAssets)
        }
      );
  
    }
  }
  
  module.exports = DeleteSourceMapPlugin