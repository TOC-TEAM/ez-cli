const inquirer = require('inquirer')
const fse = require('fs-extra')
const chalk = require('chalk')
const request = require('../../helper/request')
const { error, log } = require('../../helper')
const path = require('path')

module.exports = async function ask(argv) {
  let boilerplates = null
  try {
    boilerplates = await request.getBoilerplates(argv.repo)
  } catch (e) {
    error(e)
    error(`Get available boilerplates failed.`)
    log(`You can clone manually from here: https://github.com/toc-boilerplate`)
    process.exit(1)
  }
  return inquirer.prompt([
    {
      type: 'list',
      name: 'boilerplate',
      message: 'available boilerplates(project)',
      choices: boilerplates,
    },
    {
      type: 'input',
      name: 'dir',
      message(answers) {
        const repoName = (answers.boilerplate || '').split('/').pop()
        const targetDir = path.join(process.cwd(), repoName || '')
        const files = fse.readdirSync(targetDir)
        if (files.length) {
          return `the target directory ${chalk.yellow(
            targetDir
          )} is not empty. Please input another name：`
        }
        return 'You can input an `.` or an valid name：'
      },
      when(answers) {
        const repoName = answers.boilerplate.split('/').pop()
        return fse.existsSync(path.join(process.cwd(), repoName))
      },
    },
    {
      type: 'list',
      name: 'branch',
      message: 'github branch will be fetched',
      choices: async function(answer) {
        return request.getBranchList(argv.repo, answer.boilerplate)
      },
    },
  ])
}
