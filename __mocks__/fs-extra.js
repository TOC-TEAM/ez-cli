const path = require('path')
const { vol } = require('memfs')

const fse = jest.genMockFromModule('fs-extra')

fse.mkdirpSync = function mkdirpSync(dir) {
  vol.mkdirSync(dir, {
    recursive: true,
  })
}

fse.mkdirp = function mkdirp(dir, callback = () => {}) {
  vol.mkdirp(dir, callback)
}

fse.createFileSync = function createFileSync(file, data = '') {
  const dir = path.dirname(file)
  if (dir) {
    fse.mkdirpSync(dir)
  }
  vol.writeFileSync(file, data)
}

fse.writeFile = function writeFile(_path, data, options, callback) {
  vol.writeFile(_path, data, options, callback)
}

fse.readFile = function readFile(_path, options) {
  console.log(_path)
  return vol.readFileSync(_path, options)
}

fse.renameSync = function renameSync(oldPath, newPath) {
  vol.renameSync(oldPath, newPath)
}

fse.removeSync = function removeSync(_path) {
  try {
    vol.unlinkSync(_path)
  } catch (e) {
    // statements
  }
}

fse.rmdirSync = function rmdirSync(_path) {
  const files = vol.readdirSync(_path)
  if (files && files.length < 1) {
    vol.rmdirSync(_path)
  } else {
    files.forEach(file => vol.unlinkSync(path.join(_path, file)))
  }
}

fse.readFileSync = function readFileSync(_path, options) {
  return vol.readFileSync(_path, options)
}

fse.ensureDir = function ensureDir(_path) {
  return vol.existsSync(_path)
}

module.exports = fse
