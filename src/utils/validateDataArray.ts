import zeroOrOne from "utils/zeroOrOne"

/**
 * given a data array, return the error index and whether a double error is detected
 * @param  data data array
 * @return      the error index and whether a double error is detected
 */
export default function validateDataArray(
  data:number[]
):{
  doubleError: boolean,
  errorIndex: number,
} {
  let doubleError = false
  let errorIndex = 0
  let paritySum = 0

  data.forEach((bit, bitIndex) => {
    if(zeroOrOne(bit) === 1) { //if this bit is one
      errorIndex = errorIndex ^ bitIndex //XOR the bit index
      ++paritySum //increment the parity sum (this includes the first overall parity bit)
    }
  })

  //if the parity is correct AND we have an error, this means we detected a 2 bit error
  doubleError = paritySum%2===0 && errorIndex > 0

  return {
    doubleError,
    errorIndex,
  }
}
