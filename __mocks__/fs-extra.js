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

fse.removeSync = function removeSync(_path) {
  vol.unlinkSync(_path)
}

fse.rmdirSync = function rmdirSync(_path) {
  const files = vol.readdirSync(_path)
  if (files && files.length < 1) {
    vol.rmdirSync(_path)
  } else {
    files.forEach(file => vol.unlinkSync(path.join(_path, file)))
  }
}

module.exports = fse
