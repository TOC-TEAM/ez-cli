import rmpAction from '../lib/action/wx/rm'
import path from 'path'
import addpAction from '../lib/action/wx/add'
import { expectPrompts } from 'inquirer'
import helper from '../lib/helper'
jest.unmock('fs-extra')

describe('ez rmwx', () => {
  let cwd = null
  beforeEach(async () => {
    cwd = process.cwd()
    const basePath = path.join(__dirname, 'fixtures')
    const wxPath = path.join(basePath, 'wxMineProgram')
    process.chdir(wxPath)
  })
  afterEach(async () => {
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
    await addpAction({
      entries: ['pages/index', 'pages/logs'],
    })
    process.chdir(cwd)
  })

  it('positional <entires..>/single file', async () => {
    const jso = await rmpAction({
      entries: ['pages/index'],
    })
    expect(jso.pages.length).toBe(1)
  })

  it('positional <entires..>/multiple files', async () => {
    const jso = await rmpAction({
      entries: ['pages/logs', 'pages/index'],
    })
    expect(jso.pages.length).toBe(0)
  })
})
