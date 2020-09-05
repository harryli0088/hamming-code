import zeroOrOne from "utils/zeroOrOne"

/**
 * given an array of data, return the correct parity bit values as an array, where the index n matches the 2^n parity bit
 * @param  data data array
 * @return      array of parity bit values
 */
export default function getCorrectParityBitValues(data:number[]):number[] {
  const correctParityBitValues = []

  let powerOf2 = 0
  let parityBitIndex = Math.pow(2, powerOf2)
  const length = data.length

  while(parityBitIndex < length) { //while the parity bit is still in the data array
    //iterate through all subsequent bits
    let paritySum = 0
    for(let compareBitIndex=parityBitIndex+1; compareBitIndex<length; ++compareBitIndex) {
      if(compareBitIndex & parityBitIndex) { //if this is a parity bit for this compare bit
        paritySum += zeroOrOne(data[compareBitIndex]) //increment by the bit value
      }
    }

    correctParityBitValues.push(paritySum%2) //push the correct value

    ++powerOf2 //increment to the next power of 2
    parityBitIndex = Math.pow(2, powerOf2) //move to the next parity bit
  }

  return correctParityBitValues
}
