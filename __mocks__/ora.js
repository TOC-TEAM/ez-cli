const ora = jest.genMockFromModule('ora')

ora.promise = () => true

module.exports = ora
