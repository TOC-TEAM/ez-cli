const ora = jest.genMockFromModule('ora')

ora.promise = () => true

ora.mockReturnValue({
  start: text => text,
  succeed: text => text,
  fail: text => text,
})

module.exports = ora
