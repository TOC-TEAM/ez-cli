import addpAction from '../lib/action/wx/add'
import { vol } from 'memfs'
import { expectPrompts } from 'inquirer'
import parseArgv from '../lib/argv'
import helper from '../lib/helper'
import path from 'path'
import fse from 'fs-extra'

jest.spyOn(helper, 'getAppJson').mockImplementation(() => {
  return {
    name: 'name',
    pages: ['pages/index/index', 'pages/logs/logs'],
    subpackages: [
      {
        root: 'packageA',
        pages: ['pages/cat', 'pages/dog'],
      },
      {
        root: 'packageB',
        name: 'pack2',
        pages: ['pages/apple', 'pages/banana'],
      },
    ],
  }
})

jest.spyOn(helper, 'isMiniProgramProject').mockImplementation(() => {
  return true
})

describe('ez addp', () => {
  let argv = null
  beforeEach(async () => {
    // load local files to memory
    const files = await helper.getTargetFiles(
      path.join(__dirname, '..', 'boilerplate/wxMineProgram')
    )
    if (files && files.length > 0) {
      files.forEach(file => fse.createFileSync(file))
    }

    // argv = parseArgv('--package', 'pages')
    expectPrompts([
      {
        type: 'list',
        name: 'packageName',
        message: 'Package',
        choices: helper.handlerSubpackages(helper.getAppJson()),
        default: 'pages',
        choose: 0,
      },
      // {
      //   type: 'input',
      //   name: 'newPackageName',
      //   message:
      //     'please input the new subpackage name,\n' +
      //     " don't input the keyword newPackage or the" +
      //     ' exits subpackage ',
      //   when: answer => {
      //     return 'newPackage' === answer.package
      //   },
      //   validate: input => {
      //     return !fse.existsSync(`${process.cwd()}/${input}`)
      //   },
      // },
    ])
  })
  afterEach(() => {
    vol.reset()
  })
  // it('positional <entires..>/single file', async() => {
  //   const jso =await addpAction({
  //     entries: ['pages/index']
  //   })
  //   expect(jso.pages.length).toBe(3)
  // })

  it('positional <entires..>/multiple files', async () => {
    const jso = await addpAction({
      entries: ['pages/index/index', 'pages/logs/logs'],
    })
    expect(jso.pages.length).toBe(4)
  })
})
