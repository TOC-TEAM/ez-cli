const fse = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const pEachSeries = require('p-each-series')
const ora = require('ora')
const { getAppJson } = require('../../helper')
const _ = require('lodash')
module.exports = async function rmp(argv) {
  const { entries } = argv
  const p = pEachSeries(entries, async entry => {
    const dirname = path.join(process.cwd(), entry)
    if (!dirname || dirname === '.') {
      return console.warn(
        chalk.yellow('Missing module name, ignored this entry\n')
      )
    }
    return fse.removeSync(dirname)
  })
  ora.promise(p, `delete ${entries.join(',')} success`)
  await p
  const jsonPath = path.resolve(process.cwd(), 'app.json')
  return await editAppJson(jsonPath, entries)
}

async function editAppJson(path, entries) {
  const appJson = getAppJson()
  appJson.subpackages = appJson.subpackages || {}
  const entriesInJson = entries.map(item => {
    const name = item.split('/')[1] || 'index'
    return `${item}/${name}`
  })
  const temp = entriesInJson.map(ite => {
    _.pull(appJson.pages, ite)
    appJson.subpackages = appJson.subpackages.map(item => {
      _.pull(item.pages, ite)
      return item
    })
  })
  console.log(appJson, temp)

  await fse.writeJson('./app.json', appJson, { spaces: 2 })
  return appJson
}
