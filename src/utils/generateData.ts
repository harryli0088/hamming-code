/**
 * given a power of 2 as the number of columns, generate the 2d square data array
 * @param  dimension dimension of the square
 * @return           2d data array
 */
export default function generateData(dimension:number):number[] {
  const data = []

  const bits = dimension * dimension

  while(data.length < bits) { //while we do not have enough rows
    data.push(Math.random()>0.5 ? 1 : 0) //push the bit
  }

  return data
}
