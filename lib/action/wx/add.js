const ask = require('./ask')
const fse = require('fs-extra')
const pEachSeries = require('p-each-series')
const ora = require('ora')
const path = require('path')
const { getAppJson } = require('../../helper')

module.exports = async function addpAction(argv) {
  const { entries } = argv
  const { package, newPackageName } = await ask(argv)
  const appJsonPath = await createFiles(entries)
  await editAppJson(appJsonPath, newPackageName || package, entries)
}

async function createFiles(fileList) {
  const rootPath = path.join(process.cwd())

  const promise = pEachSeries(fileList, async (fileItem, i) => {
    const destPath = path.join(rootPath, fileItem)
    const srcPath = path.join(
      __dirname,
      '../../../',
      'boilerplate/wxMineProgram',
      'pages/index/index'
    )

    return ['.js', '.wxml', '.wxss', '.json'].map(async item => {
      const content = await fse.readFile(`${srcPath}${item}`, 'utf8')
      await fse.ensureDir(destPath)
      return new Promise((resolve, reject) => {
        const name = fileItem.split('/')[1] || 'index'
        fse.writeFile(`${destPath}/${name}${item}`, content, 'utf8', err => {
          if (err) return reject(err)
          resolve()
        })
      })
    })
  })
  ora.promise(promise, `Create ${fileList.join(',')} success`)
  await promise
  return path.join(process.cwd())
}
async function editAppJson(path, pkg, entries) {
  const appJson = getAppJson()
  appJson.subpackages = appJson.subpackages || {}
  const entriesInJson = entries.map(item => {
    const name = item.split('/')[1] || 'index'
    return `${item}/${name}`
  })
  if (pkg === 'pages') {
    appJson.pages = Array.from(new Set(appJson.pages.concat(entriesInJson)))
  } else {
    let flag = false
    appJson.subpackages = appJson.subpackages.map(item => {
      if (item.root === pkg) {
        flag = true
        item.pages = Array.from(new Set(item.pages.concat(entriesInJson)))
      }
      return item
    })
    if (!flag) appJson.subpackages.push({ root: pkg, pages: entriesInJson })
  }
  return fse.writeJson('./app.json', appJson, { spaces: 2 })
}
