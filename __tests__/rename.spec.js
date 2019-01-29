import renameAction from '../lib/action/rename'
import addAction from '../lib/action/add'
import config from '../lib/config'
import path from 'path'
import { vol } from 'memfs'

jest.mock('../lib/config')

describe('ez rename', () => {
  beforeAll(() => {
    config.set('ezConfig', {
      modules: ['account', 'position'],
      jsAsset: 'js',
      imgAsset: 'images',
      fontAsset: 'fonts',
    })
  })
  beforeEach(() => {
    const argv = {
      entries: ['account/login.js'],
      css: 'scss',
      only: true,
    }
    addAction(argv)
  })

  afterEach(() => {
    vol.reset()
  })

  it('positional [oldname] [newname]', () => {
    renameAction({
      oldname: 'account/login.js',
      newname: 'account/index.js',
    })
    expect(vol.toJSON()).toMatchObject(
      getConstructure({
        entries: ['account/index.js'],
        css: 'scss',
      })
    )
  })

  it('support shorthand for [newname]', () => {
    renameAction({
      oldname: 'account/login.js',
      newname: 'index.js',
    })
    expect(vol.toJSON()).toMatchObject(
      getConstructure({
        entries: ['account/index.js'],
        css: 'scss',
      })
    )
  })
})

function getConstructure({ entries = [], css = 'scss' }) {
  const result = {}
  const basePagePath = path.join(process.cwd(), 'src/pages')
  const infos = entries.map(entry => ({
    basename: path.basename(entry, '.js'),
    dir: path.dirname(entry),
  }))

  infos.forEach(({ basename, dir }) => {
    result[path.join(basePagePath, dir, basename + '.js')] = ''
    result[path.join(basePagePath, dir, basename + '.html')] = ''
    result[path.join(basePagePath, dir, basename + `.${css}`)] = ''
  })
  return result
}
