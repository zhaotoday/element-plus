import helpers from '../../../src/utils/helpers'

describe('add', () => {
  it('1 + 1 应该等于 2', () => {
    expect(helpers.returnTwo()).to.be.equal(2)
  })
})