import React from 'react';

import Bit from "Bit"
import dec2binPadded from "utils/dec2binPadded"
import generateData from "utils/generateData"
import isPowerOf2 from "utils/isPowerOf2"
import validateDataArray from "utils/validateDataArray"
import './App.scss';

interface AppState {
  bitHeight: number,
  bitWidth: number,
  data: number[],
  mousedOverBitIndex: number,
  numberBits: number,
  showBinary: boolean,
}

class App extends React.Component<{},AppState> {
  constructor(props:{}) {
    super(props)

    const numberBits = 16

    this.state = {
      bitHeight: 100,
      bitWidth: 100,
      data: generateData(numberBits),
      mousedOverBitIndex: -1,
      numberBits,
      showBinary: true,
    }
  }

  rectifyIncorrectBit = (errorIndex: number) => {
    if(errorIndex > 0) { //if this is a bit to switch
      this.switchBit(errorIndex)
    }
  }

  switchBit = (bitIndex: number) => {
    const dataCopy = this.state.data.slice()
    dataCopy[bitIndex] = dataCopy[bitIndex]>0 ? 0 : 1 //switch the bit
    this.setState({data: dataCopy})
  }

  getMousedOverText = (paddedBinaryLength:number) => {
    const {
      mousedOverBitIndex,
    } = this.state

    if(this.state.mousedOverBitIndex >= 0) { //if there is a bit being hovered over
      const returnArray = [
        <span>
          You are hovering over bit {mousedOverBitIndex}
          <span className="floatRight">(binary {dec2binPadded(mousedOverBitIndex, paddedBinaryLength)})</span>
        </span>
      ]

      if(mousedOverBitIndex === 0) {
        //TODO
      }
      else if(isPowerOf2(mousedOverBitIndex)) { //the moused over bit is a parity bit
        returnArray.push(
          <span>It covers all bits with a 1 in binary position {Math.log(mousedOverBitIndex)/Math.log(2) + 1}</span>
        )
      }
      else { //else this is a regular bit. find it's parity bits
        this.state.data.forEach((bit, bitIndex) => {
          if(
            bitIndex !== mousedOverBitIndex //ignore the bit we are currently moused over
            && isPowerOf2(bitIndex) //if this is a parity bit
            && bitIndex & mousedOverBitIndex //this bit is a parity bit for our moused over bit
          ) {
            returnArray.push(
              <span>
                It is covered by parity bit number {bitIndex}
                <span className="floatRight">(binary {dec2binPadded(bitIndex, paddedBinaryLength)})</span>
              </span>
            )
          }
        })
      }

      return returnArray.map((element, index) => <div key={index}>{element}</div>)
    }

    return "Hover over a bit!"
  }

  onMouseOverBit = (bitIndex: number) => this.setState({mousedOverBitIndex:bitIndex})

  generateNewData = (numberBits: number) => this.setState({
    data: generateData(numberBits),
    numberBits,
  })

  getValidityStatus = (errorIndex:number) => {
    if(errorIndex > 0) { //if there is an error
      return `There is an error with bit ${errorIndex}! Swap it's value to fix the error.`
    }

    return "There is no error in the message."
  }

  render() {
    const {
      bitHeight,
      bitWidth,
      data,
      mousedOverBitIndex,
      showBinary,
    } = this.state

    const errorIndex = validateDataArray(data)
    const numColumns = Math.ceil(Math.sqrt(data.length))
    const numRows = Math.ceil(data.length/numColumns)
    const paddedBinaryLength = Math.ceil(Math.log(data.length)/Math.log(2))

    const numParityBits = Math.ceil(Math.log(data.length)/Math.log(2))
    const efficiency = (data.length - numParityBits) / data.length

    const sharedBitProps = {
      errorIndex,
      height: bitHeight,
      mousedOverBitIndex,
      numColumns,
      numRows,
      onClickBit: this.switchBit,
      onMouseOverBit: this.onMouseOverBit,
      paddedBinaryLength,
      showBinary,
      width: bitWidth,
    }

    return (
      <div id="App">
        <header>
          <h1>Hamming Codes</h1>
          <div>Description...</div>
        </header>

        <div id="content">
          <div id="sidebar">
            <div>
              <div>Generate new data for these number of bits:</div>
              <div>
                {[2,4,8,16].map(newDimension =>
                  <button
                    key={newDimension}
                    onClick={e => this.generateNewData(newDimension*newDimension)}
                  >
                    {newDimension*newDimension}
                  </button>
                )}
              </div>
              <div>- or -</div>
              <div>
                Enter a custom number of bits <input type="number" value={this.state.numberBits} onChange={e => this.generateNewData(parseInt(e.target.value))}/>
              </div>
            </div>

            <hr/>

            <div>
              Efficiency: {data.length - numParityBits}/{data.length} = {(100*efficiency).toFixed(2)}%
            </div>

            <div>
              Show Binary <input type="checkbox" checked={showBinary} onChange={e => this.setState({showBinary:!showBinary})}/>
            </div>

            <hr/>

            <div>
              <button
                onClick={e => this.rectifyIncorrectBit(errorIndex)}
                disabled={errorIndex === 0}
              >
                Rectify Incorrect Bit
              </button>
            </div>

            <div>{this.getValidityStatus(errorIndex)}</div>

            <div>Click on a bit to swap its value</div>

            <hr/>

            <div>{this.getMousedOverText(paddedBinaryLength)}</div>
          </div>


          <div id="data">
            <div id="bitsContainer" onMouseLeave={e => this.setState({mousedOverBitIndex:-1})} style={{
              height: bitHeight * numRows,
              width: bitWidth * numColumns,
            }}>
              {data.map((bit, bitIndex) =>
                <Bit
                  key={bitIndex}

                  bit={bit}
                  bitIndex={bitIndex}
                  isCell={true}

                  {...sharedBitProps}
                />
              )}
            </div>

            <br/>

            <div>
              <span id="rawMessageContainer">
                {data.map((bit, bitIndex) =>
                  <Bit
                    key={bitIndex}

                    bit={bit}
                    bitIndex={bitIndex}
                    isCell={false}

                    {...sharedBitProps}
                  />
                )}
              </span>
            </div>
          </div>
        </div>

        <footer>
          <div>
            Inspired by 3Blue1Brown: <a href="https://www.youtube.com/watch?v=X8jsijhllIA" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=X8jsijhllIA</a>
          </div>

          <div>
            Wikipedia: <a href="https://en.wikipedia.org/wiki/Hamming_code" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Hamming_code</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
