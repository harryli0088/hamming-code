import powerOf2 from "utils/powerOf2"
import zeroOrOne from "utils/zeroOrOne"

/**
 * given a data array, return 0 if the data array is valid, else the index of the wrong bit
 * @param  data data array
 * @return      0 if valid, else the index of the bit with an error if invalid
 */
export default function validateDataArray(data:number[]):number {
  let errorIndex = 0
  let powerOf2 = 0
  let parityBitIndex = Math.pow(2, powerOf2)

  const totalNumberOfBits = data.length

  while(parityBitIndex < totalNumberOfBits) { //while the parity bit is still in the data array
    //iterate through all subsequent bits
    let paritySum = 0
    for(let compareBitIndex=parityBitIndex+1; compareBitIndex<totalNumberOfBits; ++compareBitIndex) {
      if(compareBitIndex & parityBitIndex) { //if this is a parity bit for this compare bit
        paritySum += zeroOrOne(data[compareBitIndex]) //increment by the bit value
      }
    }

    //invalid if the parity sum mod 2 does not equal the parity bit
    if(paritySum%2 !== zeroOrOne(data[parityBitIndex])) {
      errorIndex += parityBitIndex //increment the parity bits value
    }

    ++powerOf2 //increment to the next power of 2
    parityBitIndex = Math.pow(2, powerOf2) //move to the next parity bit
  }

  return errorIndex
}
