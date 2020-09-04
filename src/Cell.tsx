import React from 'react';

import dec2binPadded from "utils/dec2binPadded"
import getCellIndex from "utils/getCellIndex"
import powerOf2 from "utils/powerOf2"
import "./cell.scss"

interface CellProps {
  columnIndex: number,
  data: number[][],
  mousedOverCellIndex:number,
  onMouseOverCell: Function,
  rowIndex: number,
  showBinary: boolean,
  value: number,
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
        return "#28B463"
      }
      return "#82E0AA"
    }
    else if( //if the moused over cell is a parity bit for this cell
      mousedOverCellIndex>=0 //there is a cell being moused over
      && powerOf2(mousedOverCellIndex) //the moused over cell is a parity bit
      && cellIndex & mousedOverCellIndex //the ANDed bitwise operation produces a number
    )
       {
      return "#D5F5E3"
    }
    else if(cellIndex === mousedOverCellIndex) { //if this is the cell being moused over
      return "#ddd"
    }
    return "transparent"
  }

  render() {
    const {
      value,
      columnIndex,
      data,
      mousedOverCellIndex,
      onMouseOverCell,
      rowIndex,
      showBinary,
    } = this.props

    const cellIndex = getCellIndex(data, rowIndex, columnIndex)

    return (
      <div className="cell" style={{
        backgroundColor: this.getColor(cellIndex, mousedOverCellIndex)
      }} onMouseOver={e => onMouseOverCell(cellIndex)}>
        <div className="value">{value}</div>
        <div>{showBinary ? dec2binPadded(getCellIndex(data, rowIndex, columnIndex), data[0].length) : null}</div>
        <div className="cellIndex">{cellIndex}</div>
      </div>
    )
  }
}

export default Cell
