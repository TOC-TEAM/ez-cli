import renameAction from '../lib/action/rename'
import config from '../lib/config'
import path from 'path'
import fs from 'fs'
import transform from '../lib/helper/transform-name'

jest.unmock('fs-extra')

describe('ez rename', () => {
  let cwd = ''
  beforeAll(() => {
    cwd = process.cwd()
    config.set('ezConfig', {
      modules: ['account', 'position'],
      jsAsset: 'js',
      imgAsset: 'images',
      fontAsset: 'fonts',
    })
  })
  afterAll(() => {
    process.chdir(cwd)
  })

  it('option -s/--style camel', () => {
    compare('hyphen', 'camel')
  })
  it('option -s/--style hyphen', () => {
    compare('camel', 'hyphen')
  })
  it('option -s/--style pascal', () => {
    compare('hyphen', 'pascal')
  })
  it('option -s/--style underscore', () => {
    compare('camel', 'underscore')
  })

  it('option -f/--file', () => {
    const basePath = path.join(__dirname, 'fixtures')
    const testPath = path.join(basePath, 'test')
    const camelPath = path.join(basePath, 'camel')
    process.chdir(basePath)
    const prev = fs.readdirSync(testPath)[0]
    const prevCamel = fs.readdirSync(camelPath)[0]
    renameAction({
      style: 'underscore',
      file: ['test/*.js'],
    })
    const now = fs.readdirSync(testPath)[0]
    const nowCamel = fs.readdirSync(camelPath)[0]
    expect(now).not.toBe(prev)
    expect(now).toBe(transform.underscore(prev))
    expect(nowCamel).toBe(prevCamel)
    renameAction({
      style: 'hyphen',
      file: ['test/*.js'],
    })
  })
})

function compare(to, from) {
  const targetPath = path.join(__dirname, `fixtures/${from}`)
  process.chdir(targetPath)
  const prev = fs.readdirSync(targetPath)[0]
  renameAction({
    style: to,
  })
  const now = fs.readdirSync(targetPath)[0]
  expect(now).not.toBe(prev)
  expect(now).toBe(transform[to](prev))
  renameAction({
    style: from,
  })
}
