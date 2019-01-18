const inquirer = require('inquirer')
const fse = require('fs-extra')
const chalk = require('chalk')
const request = require('../../helper/request')
const { error, log, untildify, tildify } = require('../../helper')
const path = require('path')

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
      message: 'download to',
      default: path.isAbsolute(untildify(argv.dir))
        ? argv.dir
        : tildify(path.join(process.cwd(), argv.dir)),
    },
    {
      type: 'input',
      name: 'override',
      default: 'y/Y',
      message(answers) {
        const targetDir = untildify(answers.dir)
        const targets = fse.readdirSync(targetDir)
        if (Array.isArray(targets) && targets.length > 0) {
          return `the target directory ${chalk.yellow(
            answers.dir
          )} is not empty. Do you want to overwrite it?`
        }
      },
      when(answers) {
        return fse.existsSync(untildify(answers.dir))
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
