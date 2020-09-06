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

  swapIncorrectBit = (errorIndex: number) => {
    if(errorIndex!==0 && errorIndex!==this.state.data.length) { //if this is a 1-bit error to swap
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
        returnArray.push(
          <span>
            It tracks the parity of the rest of the message. Including this bit, the overall parity of the message should be 0 (even). If the other parity bits detect an error AND the parity of the whole message is odd, we assume there is a 1-bit error. If the other parity bits detect an error AND the parity of the whole message is even, we assume there is a 2-bit error.
          </span>
        )
      }
      else if(isPowerOf2(mousedOverBitIndex)) { //the moused over bit is a parity bit
        returnArray.push(
          <span>It tracks all bits with a 1 in binary position {Math.log(mousedOverBitIndex)/Math.log(2) + 1}</span>
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
                It is tracked by parity bit {bitIndex}
                <span className="floatRight">(binary {dec2binPadded(bitIndex, paddedBinaryLength)})</span>
              </span>
            )
          }
        })
      }

      return returnArray.map((element, index) => <div key={index}>{element}</div>)
    }

    return "Hover over a bit to learn more!"
  }

  onMouseOverBit = (bitIndex: number) => this.setState({mousedOverBitIndex:bitIndex})

  generateNewData = (numberBits: number) => this.setState({
    data: generateData(numberBits),
    numberBits,
  })

  getValidityStatus = (errorIndex:number) => {
    //if we have a 2-bit error
    if(errorIndex === this.state.data.length) {
      return `There is 2-bit error. SECDED Hamming Code by itself cannot determine which bits were flipped.`
    }
    else if(errorIndex > 0) { //if there is a 1-bit error
      return `There is a 1-bit error with bit ${errorIndex}! Swap it's value to fix the error.`
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

    const numParityBits = Math.ceil(Math.log(data.length)/Math.log(2)) + 1
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
          <h1>Hamming Code</h1>
          <div><i>Detecting and correcting 1-bit errors</i></div>
          <br/>
          <div>Computers represent data digitally as 1s and 0s, called 'bits'. Sometimes these bits are mistakenly swapped, for example a message garbled in transit between computers or a scratched CD. Invented in 1950 by Richard Hamming, Hamming Code can correct 1-bit errors and detect 2-bit errors, making data transfer and saving more resilient.</div>
          <div>A <span className="colorParityBit">&nbsp;<strong>parity bit</strong>&nbsp;</span> is a single bit that tracks whether the number of 1's is odd or even. If the number of 1's is odd, the parity bit is 1; if the number of 1's is even, the parity bit is 0. Hamming cleverly arranged parity bits to track certain rows or columns, so that you will be able to correct 1-bit errors and detect 2-bit errors, known as Single Error Correction, Double Error Detection (SECDED)</div>
        </header>

        <section id="content">
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
                Enter a custom number of bits <input type="number" step="1" min="1" value={this.state.numberBits} onChange={e => this.generateNewData(parseInt(e.target.value))}/>
              </div>
            </div>

            <hr/>

            <div>
              Efficiency: {data.length - numParityBits}/{data.length} = {(100*efficiency).toFixed(2)}%
            </div>

            <div>
              Show Binary Position <input type="checkbox" checked={showBinary} onChange={e => this.setState({showBinary:!showBinary})}/>
            </div>

            <hr/>

            <div>Click on a bit to swap its value</div>

            <div>{this.getValidityStatus(errorIndex)}</div>

            <div>
              <button
                onClick={e => this.swapIncorrectBit(errorIndex)}
                disabled={errorIndex===0 || errorIndex===data.length}
              >
                Swap Incorrect Bit
              </button>
            </div>

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
        </section>

        <section id="video">
          <h2>3Blue1Brown's Explanation</h2>
          <iframe title="3blue1brown" width="560" height="315" src="https://www.youtube.com/embed/X8jsijhllIA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </section>

        <section>
          <h3>Efficiency and Limitations</h3>

          <div>
            Of course, by having some parity bits, not all bits can be used to transmit data. In this case, you need {numParityBits} parity bits to track {data.length - numParityBits} bits of data. Generally, the longer the message, the more efficient the Hamming Code become. The longer the message, however, the more likely the chance of bit errors, rendering Hamming Code insufficient since it cannot detect 3 or more errors.
          </div>

          <div>From Wikiepdia:</div>
          <div>
            <i>"If the decoder does not attempt to correct errors, it can reliably detect triple bit errors. If the decoder does correct errors, some triple errors will be mistaken for single errors and "corrected" to the wrong value. Error correction is therefore a trade-off between certainty (the ability to reliably detect triple bit errors) and resiliency (the ability to keep functioning in the face of single bit errors)."</i>
          </div>
        </section>

        <footer>
          <div>Thank you to 3Blue1Brown for the inspiration and explanation!</div>

          <div>
            Read more about Hamming Code: <a href="https://en.wikipedia.org/wiki/Hamming_code" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Hamming_code</a>
          </div>

          <div>
            Read more about error-correcting code: <a href="https://en.wikipedia.org/wiki/Linear_code" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Linear_code</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
