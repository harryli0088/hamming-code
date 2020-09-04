import dec2bin from "../dec2bin"

it('returns the correct binary string values', () => {
  expect(dec2bin(1)).toEqual("1")
  expect(dec2bin(2)).toEqual("10")
  expect(dec2bin(3)).toEqual("11")
  expect(dec2bin(4)).toEqual("100")
  expect(dec2bin(17)).toEqual("10001")
  expect(dec2bin(256)).toEqual("100000000")
});
