import React from 'react'

import dec2binPadded from "utils/dec2binPadded"
import "./colorBinary.scss"

interface ColorBinaryProps {
  number: number,
  paddedBinaryLength: number,
}

const ColorBinary = (props:ColorBinaryProps) => {
  const chars = dec2binPadded(props.number, props.paddedBinaryLength).split("")

  return (
    <span>{chars.map((char, charIndex) =>
      <span className={"colorBinary" + char} key={charIndex}>{char}</span>
    )}</span>
  )
}

export default ColorBinary
