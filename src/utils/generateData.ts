import getCorrectParityBitValues from "utils/getCorrectParityBitValues"

/**
 * given a number of bits, generate a valid data array
 * @param  numberBits number of bits
 * @return            2d data array
 */
export default function generateData(numberBits:number):number[] {
  const data = []

  while(data.length < numberBits) { //while we do not have enough rows
    data.push(Math.random()>0.5 ? 1 : 0) //push the bit
  }

  getCorrectParityBitValues(data).forEach((value, powerOf2) => {
    data[Math.pow(2, powerOf2)] = value //set the parity bit
  })

  return data
}
