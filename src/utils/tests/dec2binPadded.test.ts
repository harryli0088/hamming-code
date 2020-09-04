import dec2binPadded from "../dec2binPadded"

it('returns the correct padded binary strings', () => {
  expect(dec2binPadded(0,4)).toEqual("0000")
  expect(dec2binPadded(1,4)).toEqual("0001")
  expect(dec2binPadded(2,4)).toEqual("0010")
  expect(dec2binPadded(3,4)).toEqual("0011")
  expect(dec2binPadded(4,4)).toEqual("0100")
  expect(dec2binPadded(5,4)).toEqual("0101")
  expect(dec2binPadded(6,4)).toEqual("0110")
  expect(dec2binPadded(7,4)).toEqual("0111")
});
