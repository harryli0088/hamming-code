import React from 'react';

import dec2binPadded from "utils/dec2binPadded"
import isPowerOf2 from "utils/isPowerOf2"
import "./bit.scss"

interface BitProps {
  absolutePositioned:boolean,
  bit: number,
  bitIndex: number,
  doubleError: boolean,
  errorIndex: number,
  height: number,
  isCell: boolean,
  mousedOverBitIndex:number,
  numColumns: number,
  numRows: number,
  onClickBit: Function,
  onMouseOverBit: Function,
  paddedBinaryLength: number,
  showBinary: boolean,
  width: number,
}

interface AbsolutePosition {
  position: "absolute" | "relative",
  left?: string,
  top?: string,
}

class Bit extends React.Component<BitProps,{}> {
  getColorClassName = () => {
    const {
      bitIndex,
      doubleError,
      errorIndex,
    } = this.props

    if(bitIndex === 0) { //if this is the 0th cell
      return "colorZerothBit"
    }
    else if(doubleError===false && errorIndex===bitIndex) {
      return "colorErrorBit"
    }
    else if(isPowerOf2(bitIndex)) { //if this is a parity bit
      // if( //if this is a parity bit for the moused over cell
      //   mousedOverBitIndex>=0
      //   && bitIndex & mousedOverBitIndex
      // ) {
      //   return "relatedParityBit"
      // }

      return "colorParityBit"
    }
    // else if( //if the moused over cell is a parity bit for this cell
    //   mousedOverBitIndex>=0 //there is a cell being moused over
    //   && isPowerOf2(mousedOverBitIndex) //the moused over cell is a parity bit
    //   && bitIndex & mousedOverBitIndex //the ANDed bitwise operation produces a number
    // ) {
    //   return "colorDataBit" //return "coveredByParityBit"
    // }
    // else if(bitIndex === mousedOverBitIndex) { //if this is the cell being moused over
    //   return "colorMousedOver"
    // }

    return "colorDataBit"
  }

  getOpacityClassName = () => {
    const {
      bitIndex,
      mousedOverBitIndex,
    } = this.props

    if(bitIndex === 0) { //if this is the 0th cell
      if(mousedOverBitIndex > 0) {
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
      absolutePositioned,
      bit,
      bitIndex,
      height,
      isCell,
      numRows,
      numColumns,
      onClickBit,
      onMouseOverBit,
      paddedBinaryLength,
      showBinary,
      width,
    } = this.props

    const colorClassName = this.getColorClassName()
    const opacityClassName = this.getOpacityClassName()

    if(isCell) {
      const absolutePosition:AbsolutePosition = {position: "relative"}
      if(absolutePositioned) {
        absolutePosition.position = "absolute"
        absolutePosition.left = (100 * (bitIndex % numColumns) / numColumns).toString()+"%" //TODO memoize this
        absolutePosition.top = (100 * Math.floor(bitIndex/numColumns) / numRows).toString()+"%"
      }

      return (
        <span
          className={`bit cell ${colorClassName} ${opacityClassName}` }
          onClick={e => onClickBit(bitIndex)}
          onMouseOver={e => onMouseOverBit(bitIndex)}
          style={{
            height: height - 2,
            width: width - 2,
            ...absolutePosition,
          }}
        >
          <div className="value">{bit}</div>
          <div className="binaryBitIndex">{showBinary ? dec2binPadded(bitIndex, paddedBinaryLength) : null}</div>
          <div className="bitIndex">{bitIndex}</div>
        </span>
      )
    }

    return (
      <span
        className={`bit messageBit ${colorClassName} ${opacityClassName}`}
        onClick={e => onClickBit(bitIndex)}
        onMouseOver={e => onMouseOverBit(bitIndex)}
      >
        {bit}
      </span>
    )
  }
}

export default Bit
