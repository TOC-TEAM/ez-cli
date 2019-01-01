const fse = require('fs-extra')
const path = require('path')

module.exports = function generate(anwsers) {
  const { modules, cssPreprossor, jsAsset, fontAsset, imgAsset } = anwsers
  const cwd = process.cwd()

  const pagePath = modules.map(m => {
    return path.join(cwd, 'src', 'pages', m)
  })
  const assetPath = [jsAsset, fontAsset, imgAsset].map(asset => {
    return path.join(cwd, 'src', 'assets', asset)
  })
  return Promise.all(
    pagePath.concat(assetPath).map(p => {
      return fse.mkdirp(p)
    })
  )
}
