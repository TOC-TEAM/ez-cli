const fse = require('fs-extra')
const path = require('path')

module.exports = function generate(anwsers) {
  const { modules, jsAsset, fontAsset, imgAsset, targetDir = '' } = anwsers
  const cwd = process.cwd()

  const pagePath = modules.map(m => {
    return path.join(cwd, targetDir, 'src', 'pages', m)
  })
  const assetPath = [jsAsset, fontAsset, imgAsset].map(asset => {
    return path.join(cwd, targetDir, 'src', 'assets', asset)
  })
  return Promise.all(
    pagePath.concat(assetPath).map(p => {
      return new Promise((resolve, reject) => {
        fse.mkdirp(p, err => {
          if (err) reject(err)
          else resolve()
        })
      })
    })
  )
}
