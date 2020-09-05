import getCorrectParityBitValues from "../getCorrectParityBitValues"

it('calculates the parity bits for a 16 bit data array', () => {
  const data = [
    0,   null,null,0,
    null,0,   0,   0,
    null,0,   0,   0,
    0,   0,   0,   0,
  ]

  expect(getCorrectParityBitValues(data)).toEqual([0,0,0,0])
});


it('calculates the parity bits for a 16 bit data array', () => {
  const data = [
    0,   null,null,0,
    null,0,   0,   0,
    null,0,   1,   1,
    0,   0,   0,   1,
  ]

  expect(getCorrectParityBitValues(data)).toEqual([0,1,1,1])
});


it('calculates the parity bits for a 16 bit data array', () => {
  const data = [
    0,   null,null,0,
    null,0,   0,   0,
    null,0,   1,   1,
    0,   1,   1,   1,
  ]

  expect(getCorrectParityBitValues(data)).toEqual([1,0,1,1])
});

it('calculates the parity bits for a 16 bit data array', () => {
  const data = [
    0,   null,null,0,
    null,0,   0,   0,
    null,0,   1,   1,
    1,   1,   0,   0,
  ]

  expect(getCorrectParityBitValues(data)).toEqual([0,0,0,0])
});

it('calculates the parity bits for a 16 bit data array', () => {
  const data = [
    0,   null,null,1,
    null,1,   1,   1,
    null,1,   1,   1,
    1,   1,   1,   1,
  ]

  expect(getCorrectParityBitValues(data)).toEqual([1,1,1,1])
});




it('calculates the parity bits for a 64 bit data array', () => {
  const data = [
    0,   null,null,0,null,1,0,0,
    null,1,   0,   0,1,   0,1,1,
    null,0,   0,   0,0,   0,0,0,
    0,   1,   1,   1,0,   0,0,1,
    null,1,   0,   0,0,   0,1,0,
    0,   0,   0,   1,1,   0,0,0,
    0,   0,   1,   0,0,   0,0,0,
    1,   0,   0,   1,1,   0,0,1,
  ]

  expect(getCorrectParityBitValues(data)).toEqual([0,0,1,0,1,1])
});

it('calculates the parity bits for a 64 bit data array', () => {
  const data = [
    0,   null,null,1,null,1,0,0,
    null,0,   1,   0,1,   0,1,1,
    null,0,   1,   0,0,   0,0,1,
    1,   1,   1,   0,1,   1,0,0,
    null,1,   0,   0,1,   0,1,0,
    0,   0,   1,   1,1,   1,1,1,
    0,   1,   0,   0,0,   1,1,0,
    0,   0,   1,   1,1,   0,0,0,
  ]

  expect(getCorrectParityBitValues(data)).toEqual([1,1,0,0,1,1])
});
