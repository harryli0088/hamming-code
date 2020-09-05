import React from 'react';

import dec2binPadded from "utils/dec2binPadded"
import isPowerOf2 from "utils/isPowerOf2"
import "./bit.scss"

interface BitProps {
  bit: number,
  bitIndex: number,
  dimension: number,
  errorIndex: number,
  height: number,
  isCell: boolean,
  mousedOverBitIndex:number,
  onClickBit: Function,
  onMouseOverBit: Function,
  paddedBinaryLength: number,
  showBinary: boolean,
  width: number,
}

class Bit extends React.Component<BitProps,{}> {
  getColorClassName = () => {
    const {
      bitIndex,
      errorIndex,
      mousedOverBitIndex,
    } = this.props

    if(bitIndex === 0) { //if this is the 0th cell
      return "zeroBit"
    }
    else if(errorIndex === bitIndex) {
      return "errorBit"
    }
    else if(isPowerOf2(bitIndex)) { //if this is a parity bit
      // if( //if this is a parity bit for the moused over cell
      //   mousedOverBitIndex>=0
      //   && bitIndex & mousedOverBitIndex
      // ) {
      //   return "relatedParityBit"
      // }

      return "parityBit"
    }
    else if( //if the moused over cell is a parity bit for this cell
      mousedOverBitIndex>=0 //there is a cell being moused over
      && isPowerOf2(mousedOverBitIndex) //the moused over cell is a parity bit
      && bitIndex & mousedOverBitIndex //the ANDed bitwise operation produces a number
    ) {
      return "" //return "coveredByParityBit"
    }
    else if(bitIndex === mousedOverBitIndex) { //if this is the cell being moused over
      return "mousedOver"
    }

    return ""
  }

  getOpacityClassName = () => {
    const {
      bitIndex,
      mousedOverBitIndex,
    } = this.props

    if(bitIndex === 0) { //if this is the 0th cell
      if(mousedOverBitIndex >= 0) {
        return "opacityDimmed"
      }
      return ""
    }
    else if( //if this is a parity bit for the moused over cell
      isPowerOf2(bitIndex)
      && mousedOverBitIndex>=0
      && bitIndex & mousedOverBitIndex
    ) {
      return ""
    }
    else if( //if the moused over cell is a parity bit for this cell
      mousedOverBitIndex>=0 //there is a cell being moused over
      && isPowerOf2(mousedOverBitIndex) //the moused over cell is a parity bit
      && bitIndex & mousedOverBitIndex //the ANDed bitwise operation produces a number
    ) {
      return ""
    }
    else if(
      mousedOverBitIndex >= 0
      && mousedOverBitIndex !== bitIndex
    ) {
      return "opacityDimmed"
    }

    return ""
  }

  render() {
    const {
      bit,
      bitIndex,
      dimension,
      height,
      isCell,
      onClickBit,
      onMouseOverBit,
      paddedBinaryLength,
      showBinary,
      width,
    } = this.props

    const colorClassName = this.getColorClassName()
    const opacityClassName = this.getOpacityClassName()
    const renderBit = bitIndex>0 ? bit : "-"

    if(isCell) {
      return (
        <div
          className={`bit cell ${colorClassName} ${opacityClassName}` }
          onClick={e => onClickBit(bitIndex)}
          onMouseOver={e => onMouseOverBit(bitIndex)}
          style={{
            height: height - 2,
            left: (100 * (bitIndex % dimension) / dimension).toString()+"%", //TODO memoize this
            top: (100 * Math.floor(bitIndex/dimension) / dimension).toString()+"%",
            width: width - 2,
          }}
        >
          <div className="value">{renderBit}</div>
          <div>{showBinary ? dec2binPadded(bitIndex, paddedBinaryLength) : null}</div>
          <div className="bitIndex">{bitIndex}</div>
        </div>
      )
    }

    return (
      <span
        className={`bit messageBit ${colorClassName} ${opacityClassName}`}
        onClick={e => onClickBit(bitIndex)}
        onMouseOver={e => onMouseOverBit(bitIndex)}
      >
        {renderBit}
      </span>
    )
  }
}

export default Bit
