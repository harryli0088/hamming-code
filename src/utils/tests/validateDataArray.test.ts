import validateDataArray from "../validateDataArray"

it('validates a 16 bit data array', () => {
  const data = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
  ]

  expect(validateDataArray(data)).toEqual(0)
});

it('validates a 16 bit data array', () => {
  const data = [
    0,1,0,0,
    0,1,1,0,
    0,0,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual(0)
});

it('validates a 16 bit data array', () => {
  const data = [
    0,0,0,0,
    0,1,1,0,
    1,1,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual(0)
});

it('validates a 16 bit data array', () => {
  const data = [
    0,0,1,0,
    1,1,1,0,
    1,0,1,1,
    0,1,1,1,
  ]

  expect(validateDataArray(data)).toEqual(0)
});

it('validates a 16 bit data array', () => {
  const data = [
    0,1,1,0,
    1,1,0,0,
    1,0,0,1,
    0,0,1,1,
  ]

  expect(validateDataArray(data)).toEqual(0)
});

it('validates a 16 bit data array with non 0 or 1 values', () => {
  const data = [
    0,1,1,-1,
    1,13,0,-100,
    100,0,-0.1,1,
    0,0,2,11,
  ]

  expect(validateDataArray(data)).toEqual(0)
});






it('invalidates a 16 bit data array', () => {
  const data = [
    0,0,0,1,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
  ]

  expect(validateDataArray(data)).toEqual(3)
});

it('invalidates a 16 bit data array', () => {
  const data = [
    0,1,0,0,
    0,0,1,0,
    0,0,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual(5)
});

it('invalidates a 16 bit data array', () => {
  const data = [
    0,0,0,0,
    0,1,0,0,
    1,1,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual(6)
});

it('invalidates a 16 bit data array', () => {
  const data = [
    0,0,1,0,
    1,1,1,0,
    0,0,1,1,
    0,1,1,1,
  ]

  expect(validateDataArray(data)).toEqual(8)
});

it('invalidates a 16 bit data array', () => {
  const data = [
    0,1,1,0,
    1,1,0,0,
    1,0,0,1,
    0,0,1,0,
  ]

  expect(validateDataArray(data)).toEqual(15)
});

it('invalidates a 16 bit data array with non 0 or 1 values', () => {
  const data = [
    0,1,3,0,
    10.1,1,0,0,
    1,-0.5,0,1,
    0,0,7,-2,
  ]

  expect(validateDataArray(data)).toEqual(15)
});




it('validates a 64 bit data array', () => {
  const data = [
    0,1,1,1,0,0,1,0,
    0,0,1,0,1,0,0,1,
    1,0,1,0,0,0,0,0,
    0,0,1,0,1,0,1,0,
    1,0,0,1,0,0,0,1,
    0,0,1,0,0,1,0,0,
    1,1,0,0,1,0,0,0,
    0,0,0,0,1,0,0,1,
  ]

  expect(validateDataArray(data)).toEqual(0)
});

it('validates a 64 bit data array with non 0 or 1 values', () => {
  const data = [
    0,1,39,1,0,0,1,0,
    0,0,1,0,2,0,0,27,
    1,0,1,NaN,0,0,0,0,
    0,0,1,0,1,0,1000,0,
    1,0,0,13,0,0,0,1,
    -17,0,1,0,0,1,0,-2,
    1,1,0,0,1,0,0,-Infinity,
    0,0,-100,0,1,0,0,1,
  ]

  expect(validateDataArray(data)).toEqual(0)
});




it('invalidates a 64 bit data array', () => {
  const data = [
    0,1,1,1,0,0,1,0,
    0,0,1,0,1,0,0,1,
    1,0,1,0,0,0,0,0,
    0,0,1,0,1,0,1,0,
    1,0,0,1,0,1,0,1,
    0,0,1,0,0,1,0,0,
    1,1,0,0,1,0,0,0,
    0,0,0,0,1,0,0,1,
  ]

  expect(validateDataArray(data)).toEqual(37)
});



it('invalidates a 64 bit data array with non 0 or 1 values', () => {
  const data = [
    0,1,1,1,-20,0,14,0,
    0,0,1,0,1,0,0,1,
    1,0,1,0,0,0,0,0,
    0,0,1,0,1,0,1,0,
    1,0,0,17,0,1,0,0.1,
    0,0,1,0,0,Infinity,0,0,
    1,1,0,0,1,0,0,0,
    0,0,0,0,1,0,-1,1,
  ]

  expect(validateDataArray(data)).toEqual(37)
});
