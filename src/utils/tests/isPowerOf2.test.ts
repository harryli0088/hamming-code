import isPowerOf2 from "../isPowerOf2"

it('returns the correct padded strings', () => {
  expect(isPowerOf2(0)).toEqual(false)
  expect(isPowerOf2(1)).toEqual(true)
  expect(isPowerOf2(2)).toEqual(true)
  expect(isPowerOf2(3)).toEqual(false)
  expect(isPowerOf2(4)).toEqual(true)
  expect(isPowerOf2(5)).toEqual(false)
  expect(isPowerOf2(6)).toEqual(false)
  expect(isPowerOf2(7)).toEqual(false)
  expect(isPowerOf2(8)).toEqual(true)
});
