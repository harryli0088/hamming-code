/**
 * given a number, return true/false whether it is a power of 2, including 1, excluding 0
 * taken from https://stackoverflow.com/questions/1053582/how-does-this-bitwise-operation-check-for-a-power-of-2/1053594#1053594
 * @param  num input number
 * @return     true/false whether the number is a power of 2
 */
export default function isPowerOf2(num:number) {
  if(num === 0) {
    return false
  }

  return !(num & (num - 1)) //bitwise AND the number and one less than it
}
