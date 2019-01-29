import rmpAction from '../lib/action/wx/rmp'
import { vol } from 'memfs'
import { expectPrompts } from 'inquirer'
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
    console.log(files)
    if (files && files.length > 0) {
      files.forEach(file =>
        fse.createFileSync(file.replace('/boilerplate/wxMineProgram', ''))
      )
    }
  })
  afterEach(() => {
    vol.reset()
  })
  it('positional <entires..>/single file', async () => {
    const jso = await rmpAction({
      entries: ['pages/index'],
    })
    console.log(jso)
    expect(jso.pages.length).toBe(2)
  })

  // it('positional <entires..>/multiple files', async () => {
  //   const jso =await rmpAction({
  //     entries: ['pages/index1', 'pages/index2']
  //   })
  //   expect(jso.pages.length).toBe(0)
  // })
})
