import getCorrectParityBitValues from "utils/getCorrectParityBitValues"
import zeroOrOne from "utils/zeroOrOne"

/**
 * given a data array, return 0 if the data array is valid, else the index of the wrong bit
 * @param  data data array
 * @return      0 if valid, else the index of the bit with an error if invalid
 */
export default function validateDataArray(data:number[]):number {
  let errorIndex = 0

  getCorrectParityBitValues(data).forEach((value, powerOf2) => {
    const parityBitIndex = Math.pow(2, powerOf2)

    if(value !== zeroOrOne(data[parityBitIndex])) {
      errorIndex +=  parityBitIndex //increment by the parity bits index
    }
  })

  return errorIndex
}
