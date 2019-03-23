import { add } from '../src/index'

describe('add(x, y)', () => {
  it('should get a sum of x and y', () => {
    expect(add(3, 8)).toBe(11)
  })
})
