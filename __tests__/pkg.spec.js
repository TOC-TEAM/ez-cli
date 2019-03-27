import createPkg from '../lib/action/pkg'
import parseArgv from '../lib/argv'
import helper, {
  getGitUser,
  getManager,
  getTargetFiles,
  tildify,
} from '../lib/helper'
import { expectPrompts } from 'inquirer'
import { vol } from 'memfs'
import validateNpmName from 'validate-npm-package-name'
import path from 'path'
import fse from 'fs-extra'

const spy = jest.spyOn(helper, 'initGitRepo').mockImplementation(() => true)

describe('ez pkg', () => {
  let argv = null
  beforeEach(async () => {
    argv = parseArgv(
      '--pkgname',
      'test-pkg',
      '--author',
      getGitUser().name,
      '--license',
      'MIT',
      '--manager',
      getManager(),
      '--test',
      'jest',
      '--template',
      'default',
      '--repo',
      'xxxxxMiss/test-pkg',
      '--git'
    )

    expectPrompts([
      {
        type: 'input',
        name: 'pkgName',
        message: 'Package Name',
        validate: input => {
          if (input && validateNpmName(input).validForNewPackages) {
            return true
          }
          return 'Invalid package name'
        },
        default: argv.pkgname,
        useDefault: true,
      },
      {
        type: 'input',
        name: 'description',
        message: 'Package Description',
      },
      {
        type: 'input',
        name: 'author',
        message: "Author's GitHub",
        default: argv.author,
        useDefault: true,
      },
      {
        type: 'input',
        name: 'repo',
        message: 'GitHub Repo Path',
        default(answers) {
          return answers.author + '/' + answers.pkgName.replace(/^@\w+\//, '')
        },
        useDefault: true,
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: argv.license,
        useDefault: true,
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Package Manager',
        choices: ['npm', 'yarn'],
        choose: 1,
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template',
        choices: [
          'default',
          'react',
          'typescript',
          'react-typescript',
          'custom',
        ],
        default: argv.template,
        choose: 0,
      },
      {
        type: 'list',
        name: 'test',
        message: 'Test Framework',
        choices: ['jest', 'ava'],
        default: argv.test,
        choose: 0,
      },
      {
        type: 'confirm',
        name: 'git',
        message: 'Init git automatically',
        default: argv.git,
        confirm: true,
      },
    ])

    // load local files to memory
    const files = await getTargetFiles(
      path.join(__dirname, '..', 'boilerplate', argv.template)
    )
    if (files && files.length > 0) {
      files.forEach(file => fse.createFileSync(file))
    }
  })

  afterEach(() => {
    vol.reset()
  })

  it('should create package correctly', async () => {
    const toDir = await createPkg(argv)
    const pkgjson = vol.existsSync(
      path.join(process.cwd(), argv.pkgname, 'package.json')
    )
    expect(pkgjson).toBe(true)
    expect(toDir).toBe(tildify(path.join(process.cwd(), argv.pkgname)))
  })

  it('should comiple nujunks template', async () => {
    await createPkg(argv)
    const pkgContent = vol.readFileSync(
      path.join(process.cwd(), argv.pkgname, 'package.json'),
      'utf8'
    )
    expect(pkgContent).not.toMatch(/{{pkgName}}/)
  })

  it('should init automatically with --git option', async () => {
    await createPkg(argv)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveReturnedWith(true)
  })
})
