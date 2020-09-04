/**
 * given a power of 2 as the number of columns, generate the 2d square data array
 * @param  dimension dimension of the square
 * @return           2d data array
 */
export default function generateData(dimension:number):number[][] {
  const data = []

  while(data.length < dimension) { //while we do not have enough rows
    const row = [] //create an empty row
    while(row.length < dimension) { //while we do not have enough columns
      row.push(Math.random()>0.5 ? 1 : 0) //push a random 0 or 1
    }

    data.push(row) //push the row
  }

  return data
}
