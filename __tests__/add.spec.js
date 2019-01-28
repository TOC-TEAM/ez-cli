import addAction from '../lib/action/add'
import { vol } from 'memfs'
import config from '../lib/config'
import path from 'path'

describe('ez add', () => {
  beforeAll(() => {
    config.set('ezConfig', {
      modules: ['account', 'position'],
      jsAsset: 'js',
      imgAsset: 'img',
      fontAsset: 'font',
    })
  })
  afterEach(() => {
    vol.reset()
  })

  it('positional <entires..>/single file', () => {
    addAction({
      entries: ['account/add.js'],
      css: 'scss',
    })

    expect(Object.keys(vol.toJSON())).toHaveLength(4)
  })

  it('positional <entires..>/multiple files', () => {
    addAction({
      entries: ['account/add.js', 'position/add.js'],
      css: 'scss',
    })

    expect(Object.keys(vol.toJSON())).toHaveLength(8)
  })

  it('option -o/--only', () => {
    addAction({
      entries: ['account/add.js'],
      css: 'scss',
      only: true,
    })
    expect(Object.keys(vol.toJSON())).toHaveLength(3)
  })

  it('option --css stylus', () => {
    addAction({
      entries: ['account/add.js'],
      only: true,
      css: 'stylus',
    })
    const keys = Object.keys(vol.toJSON())
    expect(
      keys.includes(path.join(process.cwd(), 'src/pages/account/index.stylus'))
    ).toBeTruthy()
  })

  it('option --scss', () => {
    addAction({
      entries: ['account/add.js'],
      only: true,
      scss: true,
    })
    const keys = Object.keys(vol.toJSON())
    expect(
      keys.includes(path.join(process.cwd(), 'src/pages/account/index.scss'))
    ).toBeTruthy()
  })

  it('option --less', () => {
    addAction({
      entries: ['account/add.js'],
      only: true,
      less: true,
    })
    const keys = Object.keys(vol.toJSON())
    expect(
      keys.includes(path.join(process.cwd(), 'src/pages/account/index.less'))
    ).toBeTruthy()
  })

  it('option --styl', () => {
    addAction({
      entries: ['account/add.js'],
      only: true,
      styl: true,
    })
    const keys = Object.keys(vol.toJSON())
    expect(
      keys.includes(path.join(process.cwd(), 'src/pages/account/index.styl'))
    ).toBeTruthy()
  })
})
