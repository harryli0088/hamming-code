import zeroOrOne from "utils/zeroOrOne"

/**
 * given a data array, return whether a double error is detected, the error index, and the overall parity
 * @param  data data array
 * @return      an object that says whether a double error is detected, the error index, and the overall parity
 */
export default function validateDataArray(
  data:number[]
):{
  doubleError: boolean,
  errorIndex: number,
  parity: number,
} {
  let errorIndex = 0
  let parity = 0

  data.forEach((bit, bitIndex) => {
    const value = zeroOrOne(bit)
    if(value === 1) { //if this bit is one
      errorIndex ^= bitIndex //XOR the bit index
    }

    parity ^= value //get the parity of the data (this includes the first overall parity bit)
  })

  return {
    doubleError: parity===0 && errorIndex > 0, //if the parity is correct AND we have an error, this means we detected a 2 bit error
    errorIndex,
    parity,
  }
}
