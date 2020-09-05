import React from 'react';

import dec2binPadded from "utils/dec2binPadded"
import isPowerOf2 from "utils/isPowerOf2"
import "./bit.scss"

interface BitProps {
  bit: number,
  bitIndex: number,
  data: number[],
  dimension: number,
  height: number,
  isCell: boolean,
  mousedOverBitIndex:number,
  onClickBit: Function,
  onMouseOverBit: Function,
  showBinary: boolean,
  width: number,
}

class Bit extends React.Component<BitProps,{}> {
  getColor = (bitIndex:number, mousedOverBitIndex:number) => {
    if(bitIndex === 0) { //if this is the 0th cell
      return "gray"
    }
    else if(isPowerOf2(bitIndex)) { //if this is a parity bit
      if( //if this is a parity bit for the moused over cell
        mousedOverBitIndex>=0
        && bitIndex & mousedOverBitIndex
      ) {
        return "#28B463"
      }
      return "#82E0AA"
    }
    else if( //if the moused over cell is a parity bit for this cell
      mousedOverBitIndex>=0 //there is a cell being moused over
      && isPowerOf2(mousedOverBitIndex) //the moused over cell is a parity bit
      && bitIndex & mousedOverBitIndex //the ANDed bitwise operation produces a number
    )
       {
      return "#D5F5E3"
    }
    else if(bitIndex === mousedOverBitIndex) { //if this is the cell being moused over
      return "#ddd"
    }
    return "transparent"
  }

  render() {
    const {
      bit,
      bitIndex,
      data,
      dimension,
      height,
      isCell,
      mousedOverBitIndex,
      onClickBit,
      onMouseOverBit,
      showBinary,
      width,
    } = this.props

    const backgroundColor = this.getColor(bitIndex, mousedOverBitIndex)
    const renderBit = bitIndex>0 ? bit : "-"

    if(isCell) {
      return (
        <div
          className="cell"
          onClick={e => onClickBit(bitIndex)}
          onMouseOver={e => onMouseOverBit(bitIndex)}
          style={{
            backgroundColor,
            height: height - 2,
            left: (100 * (bitIndex % dimension) / dimension).toString()+"%", //TODO memoize this
            top: (100 * Math.floor(bitIndex/dimension) / dimension).toString()+"%",
            width: width - 2,
          }}
        >
          <div className="value">{renderBit}</div>
          <div>{showBinary ? dec2binPadded(bitIndex, dimension) : null}</div>
          <div className="bitIndex">{bitIndex}</div>
        </div>
      )
    }

    return (
      <span
        className="messageBit"
        onClick={e => onClickBit(bitIndex)}
        onMouseOver={e => onMouseOverBit(bitIndex)}
        style={{backgroundColor}}
      >
        {renderBit}
      </span>
    )
  }
}

export default Bit
