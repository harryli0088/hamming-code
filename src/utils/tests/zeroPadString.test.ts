import zeroPadString from "../zeroPadString"

it('returns the correct padded strings', () => {
  expect(zeroPadString("0",4)).toEqual("0000")
  expect(zeroPadString("1",4)).toEqual("0001")
  expect(zeroPadString("10",4)).toEqual("0010")
  expect(zeroPadString("11",4)).toEqual("0011")
  expect(zeroPadString("100",4)).toEqual("0100")
  expect(zeroPadString("101",4)).toEqual("0101")
  expect(zeroPadString("110",4)).toEqual("0110")
  expect(zeroPadString("111",4)).toEqual("0111")


  expect(zeroPadString("0",4, true)).toEqual("0000")
  expect(zeroPadString("1",4, true)).toEqual("1000")
  expect(zeroPadString("10",4, true)).toEqual("1000")
  expect(zeroPadString("11",4, true)).toEqual("1100")
  expect(zeroPadString("100",4, true)).toEqual("1000")
  expect(zeroPadString("101",4, true)).toEqual("1010")
  expect(zeroPadString("110",4, true)).toEqual("1100")
  expect(zeroPadString("111",4, true)).toEqual("1110")
});
