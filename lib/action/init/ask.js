const inquirer = require('inquirer')
const fs = require('fs')
const chalk = require('chalk')
const request = require('../../helper/request')
const { error, log, untildify } = require('../../helper')

module.exports = async function ask(argv) {
  let boilerplates = null
  try {
    boilerplates = await request.getBoilerplates('toc-boilerplate')
  } catch (e) {
    error(e)
    error(`Get available boilerplates failed.`)
    log(`You can clone manually from here: https://github.com/toc-boilerplate`)
    process.exit(1)
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'dir',
      message: 'directory download to',
      default: argv.dir,
    },
    {
      type: 'input',
      name: 'override',
      default: 'y/Y',
      message(answers) {
        return `the target directory ${chalk.yellow(
          answers.dir
        )} has already exists. Do you want to override it?`
      },
      when(answers) {
        return fs.existsSync(untildify(answers.dir))
      },
      validate(input) {
        if (input.toLowerCase() === 'y' || input === 'y/Y') {
          return true
        }
        process.exit(1)
      },
    },
    {
      type: 'input',
      name: 'branch',
      message: 'github branch will be fetched',
      default: argv.branch,
    },
    {
      type: 'list',
      name: 'boilerplate',
      message: 'available boilerplates',
      choices: boilerplates,
    },
  ])
}
