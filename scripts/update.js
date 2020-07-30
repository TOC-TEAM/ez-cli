const ncu = require('npm-check-updates')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const templatePath = path.join(__dirname, '../boilerplate')
const templateDirs = fs.readdirSync(templatePath)

;(async () => {
  try {
    for await (let dir of templateDirs) {
      const packageFile = path.join(templatePath, dir, 'package.json')
      console.log()
      console.log(chalk.blue(`Will upgrade "${packageFile}"`))
      const upgraded = await ncu.run({
        packageFile,
        timeout: 60000,
        upgrade: true,
      })
      console.log(upgraded)
    }
    console.log(chalk.green('All Complete!'))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
