const ask = require('./ask')
const fse = require('fs-extra')
const pEachSeries = require('p-each-series')
const ora = require('ora')
const path = require('path')
const { getAppJson } = require('../../helper')

module.exports = async function addpAction(argv) {
  const { entries } = argv
  const { packageName, newPackageName } = await ask(argv)

  const appJsonPath = await createFiles(entries)
  const dat = await editAppJson(newPackageName || packageName, entries)
  return dat
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

    return Promise.all(
      ['.js', '.wxml', '.wxss', '.json'].map(async item => {
        let content = fse.readFileSync(`${srcPath}${item}`, 'utf8')
        try {
          await fse.mkdirp(destPath)
        } catch (e) {
          console.log('mkdirp', e)
        }

        return new Promise((resolve, reject) => {
          const name = fileItem.split('/')[1] || 'index'
          fse.writeFile(`${destPath}/${name}${item}`, content, 'utf8', err => {
            if (err) return reject(err)
            resolve()
          })
        })
      })
    )
  })
  ora.promise(promise, `Create ${fileList.join(',')} success`)
  await promise
  return path.join(process.cwd())
}

async function editAppJson(pkg, entries) {
  const appJson = getAppJson()
  appJson.subpackages = appJson.subpackages || []
  const entriesInJson = entries.map(item => {
    const name = item.split('/')[1] || 'index'
    return path.join(item, name)
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
    if (!flag)
      appJson.subpackages.push({
        root: pkg,
        pages: entriesInJson,
      })
  }
  try {
    await fse.writeJson('./app.json', appJson, {
      spaces: 2,
    })
    return appJson
  } catch (e) {
    return e
  }
}
