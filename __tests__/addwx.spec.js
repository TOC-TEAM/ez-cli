import addpAction from '../lib/action/wx/add'
import { vol } from 'memfs'
import { expectPrompts } from 'inquirer'
import helper from '../lib/helper'
import path from 'path'
import fse from 'fs-extra'

describe('ez addwx', () => {
  let cwd = null
  beforeEach(async () => {
    cwd = process.cwd()
    const basePath = path.join(__dirname, 'fixtures')
    const wxPath = path.join(basePath, 'wxMineProgram')
    process.chdir(wxPath)
    // load local files to memory
    const files = await helper.getTargetFiles(
      path.join(__dirname, '..', 'boilerplate/wxMineProgram')
    )
    if (files && files.length > 0) {
      files.forEach(file => fse.createFileSync(file))
    }
    console.log(path.join(__dirname, 'fixtures', 'wxMineProgram/app.json'))
    fse.createFileSync(
      path.join(__dirname, 'fixtures', 'wxMineProgram/app.json'),
      helper.getAppJson()
    )

    expectPrompts([
      {
        type: 'list',
        name: 'packageName',
        message: 'Package',
        choices: helper.handlerSubpackages(helper.getAppJson()),
        default: 'pages',
        choose: 0,
      },
    ])
  })
  afterEach(() => {
    vol.reset()
    process.chdir(cwd)
  })
  it('positional <entires..>/single file', async () => {
    const jso = await addpAction({
      entries: ['pages/index1'],
    })

    expect(Object.keys(vol.toJSON()).length).toBe(13 + 4)
    expect(jso.pages.length).toBe(3)
  })

  it('positional <entires..>/multiple files', async () => {
    const jso = await addpAction({
      entries: ['pages/index1', 'pages/logs1'],
    })
    expect(Object.keys(vol.toJSON()).length).toBe(13 + 8)
    expect(jso.pages.length).toBe(4)
  })
})
