import zeroOrOne from "utils/zeroOrOne"

/**
 * given a data array, return 0 if the data array is valid, else the index of the wrong bit
 * @param  data data array
 * @return      0 if valid, else the index of the bit with an error if invalid
 */
export default function validateDataArray(data:number[]):number {
  let errorIndex = 0

  data.forEach((bit, bitIndex) => {
    if(zeroOrOne(bit) === 1) { //if this bit is one
      errorIndex = errorIndex ^ bitIndex //XOR the bit index
    }
  })

  return errorIndex
}
