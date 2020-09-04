/**
 * given a string and desired length, zero pad the string if it is shorted than the desired length
 * @param  string input string
 * @param  length desired length
 * @param  right  if true, pad on the right, else pad on the left
 * @return        zero padded string
 */
export default function zeroPadString(string:string, length:number, right?:boolean) {
  while(string.length < length) {
    if(right) {
      string = string + "0"
    }
    else {
      string = "0" + string
    }
  }

  return string
}
