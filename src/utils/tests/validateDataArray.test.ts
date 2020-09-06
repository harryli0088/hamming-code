import validateDataArray from "../validateDataArray"

it('validates 16 bit data array #1', () => {
  const data = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 0,
    parity: 0,
  })
});

it('validates 16 bit data array #2', () => {
  const data = [
    1,1,0,0,
    0,1,1,0,
    0,0,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 0,
    parity: 0,
  })
});

it('validates 16 bit data array #3', () => {
  const data = [
    0,0,0,0,
    0,1,1,0,
    1,1,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 0,
    parity: 0,
  })
});

it('validates 16 bit data array #4', () => {
  const data = [
    0,0,1,0,
    1,1,1,0,
    1,0,1,1,
    0,1,1,1,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 0,
    parity: 0,
  })
});

it('validates 16 bit data array #5', () => {
  const data = [
    0,1,1,0,
    1,1,0,0,
    1,0,0,1,
    0,0,1,1,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 0,
    parity: 0,
  })
});

it('validates 16 bit data array #5 with non 0 or 1 values', () => {
  const data = [
    0,1,1,-1,
    1,13,0,-100,
    100,0,-0.1,1,
    0,0,2,11,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 0,
    parity: 0,
  })
});






it('invalidates 16 bit data array #1', () => {
  const data = [
    0,0,0,1,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 3,
    parity: 1,
  })
});

it('invalidates 16 bit data array #2', () => {
  const data = [
    1,1,0,0,
    0,0,1,0,
    0,0,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 5,
    parity: 1,
  })
});

it('detects a 2 bit error in 16 bit data array #2', () => {
  const data = [
    1,0,0,0,
    0,0,1,0,
    0,0,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: true,
    errorIndex: 4,
    parity: 0,
  })
});

it('invalidates 16 bit data array #3', () => {
  const data = [
    0,0,0,0,
    0,1,0,0,
    1,1,1,1,
    0,1,1,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 6,
    parity: 1,
  })
});

it('invalidates 16 bit data array #4', () => {
  const data = [
    0,0,1,0,
    1,1,1,0,
    0,0,1,1,
    0,1,1,1,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 8,
    parity: 1,
  })
});

it('invalidates 16 bit data array #5', () => {
  const data = [
    0,1,1,0,
    1,1,0,0,
    1,0,0,1,
    0,0,1,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 15,
    parity: 1,
  })
});

it('detects a 2 bit error in 16 bit data array #5', () => {
  const data = [
    0,1,1,0,
    1,1,0,0,
    1,0,0,1,
    0,0,0,0,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: true,
    errorIndex: 1,
    parity: 0,
  })
});

it('invalidates 16 bit data array #5 with non 0 or 1 values', () => {
  const data = [
    0,1,3,0,
    10.1,1,0,0,
    1,-0.5,0,1,
    0,0,7,-2,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 15,
    parity: 1,
  })
});




it('validates 64 bit data array #6', () => {
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

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 0,
    parity: 0,
  })
});

it('validates 64 bit data array #6 with non 0 or 1 values', () => {
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

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 0,
    parity: 0,
  })
});




it('invalidates 64 bit data array #6', () => {
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

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 37,
    parity: 1,
  })
});

it('detects 2 errors in 64 bit data array #6', () => {
  const data = [
    0,1,1,1,0,0,1,0,
    0,0,1,0,1,0,0,1,
    1,0,1,0,0,0,0,0,
    0,0,1,0,1,0,1,0,
    1,0,0,1,0,0,0,1,
    0,0,1,0,0,1,1,1,
    1,1,0,0,1,0,0,0,
    0,0,0,0,1,0,0,1,
  ]

  expect(validateDataArray(data)).toEqual({
    doubleError: true,
    errorIndex: 1,
    parity: 0,
  })
});



it('invalidates 64 bit data array #6 with non 0 or 1 values', () => {
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

  expect(validateDataArray(data)).toEqual({
    doubleError: false,
    errorIndex: 37,
    parity: 1,
  })
});
