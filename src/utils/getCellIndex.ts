/**
 * given a 2d array of numbers, assuming all the rows are the same length, return the index of the cell in the 2d array
 * @param  data        2d array of numbers
 * @param  rowIndex    row index
 * @param  columnIndex column index
 * @return             index of the cell in the full 2d array
 */
export default function getCellIndex(data:number[][], rowIndex:number, columnIndex:number) {
  if(data[0]) {
    return data[0].length*rowIndex + columnIndex
  }

  return 0
}
