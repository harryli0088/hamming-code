import React from 'react';

import dec2binPadded from "utils/dec2binPadded"
import getCellIndex from "utils/getCellIndex"
import powerOf2 from "utils/powerOf2"


interface CellProps {
  column: number,
  columnIndex: number,
  data: number[][],
  mousedOverCellIndex:number,
  onMouseOverCell: Function,
  rowIndex: number,
  showBinary: boolean,
}

class Cell extends React.Component<CellProps,{}> {
  getColor = (cellIndex:number, mousedOverCellIndex:number) => {
    if(cellIndex === 0) { //if this is the 0th cell
      return "orange"
    }
    else if(powerOf2(cellIndex)) { //if this is a parity bit
      if( //if this is a parity bit for the moused over cell
        mousedOverCellIndex>=0
        && cellIndex & mousedOverCellIndex
      ) {
        return "darkgreen"
      }
      return "green"
    }
    else if( //if the moused over cell is a parity bit for this cell
      mousedOverCellIndex>=0 //there is a cell being moused over
      && powerOf2(mousedOverCellIndex) //the moused over cell is a parity bit
      && cellIndex & mousedOverCellIndex //the ANDed bitwise operation produces a number
    )
       {
      return "lightgreen"
    }
    else if(cellIndex === mousedOverCellIndex) { //if this is the cell being moused over
      return "#eee"
    }
    return "transparent"
  }

  render() {
    const {
      column,
      columnIndex,
      data,
      mousedOverCellIndex,
      onMouseOverCell,
      rowIndex,
      showBinary,
    } = this.props

    const cellIndex = getCellIndex(data, rowIndex, columnIndex)

    return (
      <div style={{
        backgroundColor: this.getColor(cellIndex, mousedOverCellIndex)
      }} onMouseOver={e => onMouseOverCell(cellIndex)}>
        <div>{column}</div>
        <div>{cellIndex}</div>
        <div>{showBinary ? dec2binPadded(getCellIndex(data, rowIndex, columnIndex), data[0].length) : null}</div>
      </div>
    )
  }
}

export default Cell
