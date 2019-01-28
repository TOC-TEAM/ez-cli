import rmAction from '../lib/action/rm'
import addAction from '../lib/action/add'
import { vol } from 'memfs'
import config from '../lib/config'
import path from 'path'

describe('ez rm', () => {
  beforeAll(() => {
    config.set({
      jsAsset: 'js',
    })
  })
  beforeEach(() => {
    addAction({
      entries: ['account/add.js', 'position/add.js'],
      css: 'scss',
    })
  })
  afterEach(() => {
    vol.reset()
  })

  it('<entries..>', () => {
    const dir = path.join(process.cwd(), 'src/pages/account')
    expect(vol.readdirSync(dir)).toHaveLength(3)
    rmAction({
      entries: ['account/add.js'],
    })
    expect(vol.readdirSync(dir)).toHaveLength(0)
  })

  it('should support deleting multi entries once', () => {
    const dirAccount = path.join(process.cwd(), 'src/pages/account')
    const dirPosition = path.join(process.cwd(), 'src/pages/position')
    expect(vol.readdirSync(dirAccount)).toHaveLength(3)
    expect(vol.readdirSync(dirPosition)).toHaveLength(3)
    rmAction({
      entries: ['account/add.js', 'position/add.js'],
    })
    expect(vol.readdirSync(dirAccount)).toHaveLength(0)
    expect(vol.readdirSync(dirPosition)).toHaveLength(0)
  })

  it('option -a/--all', () => {
    const dir = path.join(process.cwd(), 'src/pages/account')
    const assetDir = path.join(process.cwd(), 'src/assets/js/account/index')
    vol.writeFileSync(path.join(assetDir, 'button.js'), '')
    expect(vol.readdirSync(dir)).toHaveLength(3)
    expect(vol.readdirSync(assetDir)).toHaveLength(1)
    rmAction({
      entries: ['account/add.js'],
      all: true,
    })
    expect(vol.readdirSync(dir)).toHaveLength(0)
    expect(vol.readdirSync(assetDir)).toHaveLength(0)
  })
})
