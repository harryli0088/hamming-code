import dec2bin from "utils/dec2bin"
import zeroPadString from "utils/zeroPadString"

/**
 * given a number a desired length, return the zero padded binary string representation
 * @param  number input number
 * @param  length desired string length to zero pad to
 * @return        zero padded binary string
 */
export default function dec2binPadded(number:number, length:number) {
  return zeroPadString(dec2bin(number), length)
}
