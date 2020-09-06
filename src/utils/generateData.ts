import getCorrectParityBitValues from "utils/getCorrectParityBitValues"

/**
 * given a number of bits, generate a valid data array
 * @param  numberBits number of bits
 * @return            2d data array
 */
export default function generateData(numberBits:number):number[] {
  const data = [0] //set the first bit to zero for now

  while(data.length < numberBits) { //while we do not have enough rows
    data.push(Math.random()>0.5 ? 1 : 0) //push the bit
  }

  //set the value of each parity bit
  getCorrectParityBitValues(data).forEach((value, powerOf2) => {
    data[Math.pow(2, powerOf2)] = value //set the parity bit
  })

  //set the first bit to the parity of the whole data array
  data[0] = data.reduce((accumulator, currentValue) => accumulator^=currentValue, 0)

  return data
}
