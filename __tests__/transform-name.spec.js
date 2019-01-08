import { camel, pascal, underscore, hyphen } from '../lib/helper/transform-name'

describe('transform file name', () => {
  describe('camel', () => {
    it('should transform `a-b`', () => {
      expect(camel('came-case')).toBe('cameCase')
    })
    it('should transform `a_b`', () => {
      expect(camel('came_case')).toBe('cameCase')
    })
    it('should transform a--b', () => {
      expect(camel('came--case')).toBe('cameCase')
    })
    it('should transform a__b', () => {
      expect(camel('came__case')).toBe('cameCase')
    })
  })

  describe('pascal', () => {
    it('should transform `a-b`', () => {
      expect(pascal('came-case')).toBe('CameCase')
    })
    it('should transform `a_b`', () => {
      expect(pascal('came_case')).toBe('CameCase')
    })
    it('should transform `a--b`', () => {
      expect(pascal('came--case')).toBe('CameCase')
    })
    it('should transform `a__b`', () => {
      expect(pascal('came__case')).toBe('CameCase')
    })
  })

  describe('underscore', () => {
    it('should transform `a-b`', () => {
      expect(underscore('came-case')).toBe('came_case')
    })
    it('should transform `a-B`', () => {
      expect(underscore('came-Case')).toBe('came_case')
    })
    it('should transform `A-B`', () => {
      expect(underscore('Came-Case')).toBe('came_case')
    })
    it('should transform `AB`', () => {
      expect(underscore('CameCase')).toBe('came_case')
    })
  })

  describe('hyphen', () => {
    it('should transform `a_b`', () => {
      expect(hyphen('came_case')).toBe('came-case')
    })
    it('should transform `aB`', () => {
      expect(hyphen('cameCase')).toBe('came-case')
    })
    it('should transform `AB`', () => {
      expect(hyphen('CameCase')).toBe('came-case')
    })
  })
})
