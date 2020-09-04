import powerOf2 from "../powerOf2"

it('returns the correct padded strings', () => {
  expect(powerOf2(0)).toEqual(false)
  expect(powerOf2(1)).toEqual(true)
  expect(powerOf2(2)).toEqual(true)
  expect(powerOf2(3)).toEqual(false)
  expect(powerOf2(4)).toEqual(true)
  expect(powerOf2(5)).toEqual(false)
  expect(powerOf2(6)).toEqual(false)
  expect(powerOf2(7)).toEqual(false)
  expect(powerOf2(8)).toEqual(true)
});
