import zeroOrOne from "../zeroOrOne"

it('returns the correct value', () => {
  expect(zeroOrOne(-NaN)).toEqual(0)
  expect(zeroOrOne(-Infinity)).toEqual(0)
  expect(zeroOrOne(-100000000)).toEqual(0)
  expect(zeroOrOne(-10)).toEqual(0)
  expect(zeroOrOne(-2)).toEqual(0)
  expect(zeroOrOne(-1)).toEqual(0)
  expect(zeroOrOne(-0.5)).toEqual(0)
  expect(zeroOrOne(0)).toEqual(0)
  expect(zeroOrOne(0.1)).toEqual(1)
  expect(zeroOrOne(0.5)).toEqual(1)
  expect(zeroOrOne(1)).toEqual(1)
  expect(zeroOrOne(100)).toEqual(1)
  expect(zeroOrOne(10000000)).toEqual(1)
  expect(zeroOrOne(Infinity)).toEqual(1)
});
