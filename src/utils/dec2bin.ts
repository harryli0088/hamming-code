/**
 * converts a base 10 number into it's binary string representation
 * taken from https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
 * @param  dec base 10 number
 * @return     binary string representation
 */
export default function dec2bin(dec:number) {
  return (dec >>> 0).toString(2)
}
