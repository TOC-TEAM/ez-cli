const path = require('path')
const { vol } = require('memfs')

const fse = jest.genMockFromModule('fs-extra')

fse.mkdirpSync = function mkdirpSync(dir) {
  vol.mkdirSync(dir, { recursive: true })
}

fse.createFileSync = function createFileSync(file, data = '') {
  const dir = path.dirname(file)
  if (dir) {
    fse.mkdirpSync(dir)
  }
  vol.writeFileSync(file, data)
}

fse.renameSync = function renameSync(oldPath, newPath) {
  vol.renameSync(oldPath, newPath)
}

module.exports = fse
