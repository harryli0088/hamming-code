import getCorrectParityBitValues from "utils/getCorrectParityBitValues"

/**
 * given a power of 2 as the number of columns, generate a valid data array
 * @param  dimension dimension of the square
 * @return           2d data array
 */
export default function generateData(bits:number):number[] {
  const data = []

  while(data.length < bits) { //while we do not have enough rows
    data.push(Math.random()>0.5 ? 1 : 0) //push the bit
  }

  getCorrectParityBitValues(data).forEach((value, powerOf2) => {
    data[Math.pow(2, powerOf2)] = value //set the parity bit
  })

  return data
}
