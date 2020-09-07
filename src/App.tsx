import React from 'react';
import memoize from 'memoize-one'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import Bit from "Components/Bit/Bit"
import ColorBinary from "Components/ColorBinary/ColorBinary"
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

interface RegularParityBit {
  bit: number,
  bitIndex: number,
}

interface SharedBitProps {
  doubleError: boolean,
  errorIndex: number,
  height: number,
  mousedOverBitIndex: number,
  numColumns: number,
  numRows: number,
  onClickBit: Function,
  onMouseOverBit: Function,
  paddedBinaryLength: number,
  width: number,
}

const MAX_ROW_BIT_SHOW_BINARY = 6

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

  calculations = memoize(
    (data:number[]) => {
      const numColumns = Math.ceil(Math.sqrt(data.length))

      //pull out the regular parity bits
      const regularParityBits:RegularParityBit[] = data.filter(
        (bit, bitIndex) => isPowerOf2(bitIndex)
      ).map((bit, powerOf2) => ({
        bit, //track the bit value
        bitIndex: Math.pow(2, powerOf2), //track the original bit index
      })).reverse() //reverse them so we can put them in binary order
      const totalNumParityBits = regularParityBits.length + 1

      return {
        ...validateDataArray(this.state.data), //doubleError, errorIndex, parity
        efficiency: (100 * (data.length - totalNumParityBits) / data.length).toFixed(2),
        numColumns,
        numRows: Math.ceil(data.length/numColumns),
        paddedBinaryLength: Math.ceil(Math.log(data.length)/Math.log(2)),
        regularParityBits,
        totalNumParityBits,
      }
    }
  )

  generateNewData = (numberBits: number) => this.setState({
    data: generateData(numberBits),
    numberBits,
  })

  getMousedOverText = (paddedBinaryLength:number) => {
    const {
      mousedOverBitIndex,
    } = this.state

    if(this.state.mousedOverBitIndex >= 0) { //if there is a bit being hovered over
      const returnArray = [
        <span>
          You are hovering over bit {mousedOverBitIndex}
          <span className="floatRight">(binary <ColorBinary number={mousedOverBitIndex} paddedBinaryLength={paddedBinaryLength}/>)</span>
        </span>,
        <br/>
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
          <span>It tracks all bits with a 1 in binary position {Math.log(mousedOverBitIndex)/Math.log(2)}</span>
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
                <span className="floatRight">(binary <ColorBinary number={bitIndex} paddedBinaryLength={paddedBinaryLength}/>)</span>
              </span>
            )
          }
        })
      }

      return returnArray.map((element, index) => <div key={index}>{element}</div>)
    }

    return "Hover over a bit to learn more!"
  }

  getRegularParityBitsExplanation = (
    doubleError: boolean,
    errorIndex: number,
    paddedBinaryLength: number,
    regularParityBits: RegularParityBit[],
    sharedBitProps: SharedBitProps,
  ) => {
    if(doubleError) { //if there is a 2-bit error
      return (
        <React.Fragment>
          <br/>
          <div className="colorErrorBit errorDetected">Double Error Detected!</div>
          <div>This is what the values of the parity bits should be. Since the overall parity of the message is odd, this means that there is a 2-bit error!</div>
          <div className="regularParityBitsContainer" onMouseLeave={e => this.setState({mousedOverBitIndex:-1})}>
            {regularParityBits.map((regularParityBit) =>
              <Bit
                key={regularParityBit.bitIndex}

                absolutePositioned={false}
                bit={regularParityBit.bitIndex&errorIndex ? 1 : 0}
                bitIndex={regularParityBit.bitIndex}
                isCell={true}
                showBinary={regularParityBits.length <= MAX_ROW_BIT_SHOW_BINARY}

                {...sharedBitProps}
              />
            )}
          </div>
        </React.Fragment>
      )
    }
    else if(errorIndex > 0) { //else if there is a single bit error
      return (
        <React.Fragment>
          <br/>
          <div className="colorErrorBit errorDetected">Single Error to be Corrected!</div>
          <div>This is what the values of the parity bits should be. Since the overall parity of the message is odd, this means that there is a 1-bit error in binary position {dec2binPadded(errorIndex, paddedBinaryLength)}, ie position {errorIndex}</div>
          <div className="regularParityBitsContainer" onMouseLeave={e => this.setState({mousedOverBitIndex:-1})}>
            {regularParityBits.map((regularParityBit) =>
              <Bit
                key={regularParityBit.bitIndex}

                absolutePositioned={false}
                bit={regularParityBit.bitIndex&errorIndex ? 1 : 0}
                bitIndex={regularParityBit.bitIndex}
                isCell={true}
                showBinary={regularParityBits.length <= MAX_ROW_BIT_SHOW_BINARY}

                {...sharedBitProps}
              />
            )}
          </div>

          <br/>

          <div>
            <button
              onClick={e => this.swapIncorrectBit(doubleError, errorIndex)}
              disabled={errorIndex===0 || doubleError}
            >
              Swap Incorrect Bit ({errorIndex})
            </button>
          </div>
        </React.Fragment>
      )
    }
  }

  highlightBit = (bitIndex: number) => this.setState({mousedOverBitIndex:bitIndex})

  swapIncorrectBit = (doubleError:boolean, errorIndex: number) => {
    if(errorIndex>0 && doubleError===false) { //if this is a 1-bit error to swap
      this.switchBit(errorIndex)
    }
  }

  switchBit = (bitIndex: number) => {
    const dataCopy = this.state.data.slice()
    dataCopy[bitIndex] = dataCopy[bitIndex]>0 ? 0 : 1 //switch the bit
    this.setState({data: dataCopy})
  }



  render() {
    const {
      bitHeight,
      bitWidth,
      data,
      mousedOverBitIndex,
      showBinary,
    } = this.state

    const {
      doubleError,
      efficiency,
      errorIndex,
      numColumns,
      numRows,
      paddedBinaryLength,
      regularParityBits,
      totalNumParityBits,
      parity,
    } = this.calculations(data)

    const sharedBitProps:SharedBitProps = {
      doubleError,
      errorIndex,
      height: bitHeight,
      mousedOverBitIndex,
      numColumns,
      numRows,
      onClickBit: this.switchBit,
      onMouseOverBit: this.highlightBit,
      paddedBinaryLength,
      width: bitWidth,
    }

    return (
      <div id="App">
        <header>
          <h1>Hamming Code</h1>
          <div id="github">
            <a href="https://github.com/harryli0088/hamming-code" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub}/>
            </a>
          </div>
          <p><i>Single Error Correction, Double Error Detection</i></p>
          <p>Computers represent data digitally as 1s and 0s, called 'bits'. Sometimes these bits are mistakenly swapped, for example: a scratched CD or a message garbled in transit between computers. Invented in 1950 by Richard Hamming, Hamming Code can correct 1-bit errors and detect 2-bit errors, making data transfer and saving more robust.</p>
          <p>A <span className="colorZerothBit" style={{color: "black"}}>&nbsp;<b>parity bit</b>&nbsp;</span> is a single bit that tracks whether the number of 1's is odd or even. If the number of 1's is odd, the parity bit is 1; if the number of 1's is even, the parity bit is 0. Hamming cleverly arranged parity bits to track certain rows or columns, so that we will be able to correct 1-bit errors and, with an extra step, detect 2-bit errors.</p>
        </header>

        <section id="content">
          <div id="interactiveContainer">
            <div id="clickSwapMessage">
              Click on a bit to swap its value!

              <div id="toggleShowBinary">
                Show Binary Positions <input type="checkbox" checked={showBinary} onChange={e => this.setState({showBinary:!showBinary})}/>
              </div>
            </div>

            <div id="dataContainer">
              <div id="cellsContainer" onMouseLeave={e => this.setState({mousedOverBitIndex:-1})} style={{
                height: bitHeight * numRows,
                width: bitWidth * numColumns,
              }}>
                {data.map((bit, bitIndex) =>
                  <Bit
                    key={bitIndex}

                    absolutePositioned={true}
                    bit={bit}
                    bitIndex={bitIndex}
                    isCell={true}
                    showBinary={showBinary}

                    {...sharedBitProps}
                  />
                )}
              </div>

              <br/>

              <br/>

              <div>
                <span id="rawMessageContainer" onMouseLeave={e => this.setState({mousedOverBitIndex:-1})}>
                  {data.map((bit, bitIndex) =>
                    <Bit
                      key={bitIndex}

                      absolutePositioned={false}
                      bit={bit}
                      bitIndex={bitIndex}
                      isCell={false}

                      {...sharedBitProps}
                    />
                  )}
                </span>
              </div>
            </div>

            <div id="legend">
              <span className="legendKey"><span className="legendSquare colorZerothBit"></span> <span className="legendText">Overall Parity Bit</span></span>
              <span className="legendKey"><span className="legendSquare colorParityBit"></span> <span className="legendText">Regular Parity Bit</span></span>
              <span className="legendKey"><span className="legendSquare colorDataBit"></span> <span className="legendText">Data Bit</span></span>
              <span className="legendKey"><span className="legendSquare colorErrorBit"></span> <span className="legendText">Error Bit</span></span>
            </div>
          </div>

          <div id="sidebar">
            <div>
              <div>
                <b>Generate new data:</b>
              </div>

              <br/>

              <div>
                <span>
                  {[2,4,8,16].map(newDimension =>
                    <button
                      key={newDimension}
                      className="grouped"
                      onClick={e => this.generateNewData(newDimension*newDimension)}
                    >
                      {newDimension*newDimension}
                    </button>
                  )}
                </span> | <input id="customNumberBits" type="number" step="1" min="1" value={this.state.numberBits} onChange={e => this.generateNewData(parseInt(e.target.value))}/> bits
              </div>
            </div>

            <hr/>

            <b>Efficiency</b>
            <p>Since we have some parity bits, not all of the bits can be used to transfer data. Our current efficiency is:</p>
            <div>{data.length - totalNumParityBits} data bits /{data.length} total = <b>{efficiency}%</b></div>

            <hr/>

            <div><b>Overall Message Parity:</b> {parity} ({parity===1 ? "odd" : "even"})</div>

            <br/>

            <div><b>Current values of the regular parity bits</b></div>
            <div className="regularParityBitsContainer" onMouseLeave={e => this.setState({mousedOverBitIndex:-1})}>
              {regularParityBits.map((parityBit) =>
                <Bit
                  key={parityBit.bitIndex}

                  absolutePositioned={false}
                  bit={parityBit.bit}
                  bitIndex={parityBit.bitIndex}
                  isCell={true}
                  showBinary={regularParityBits.length <= MAX_ROW_BIT_SHOW_BINARY}

                  {...sharedBitProps}
                />
              )}
            </div>

            {this.getRegularParityBitsExplanation(doubleError, errorIndex, paddedBinaryLength, regularParityBits, sharedBitProps)}

            <hr/>

            <div>{this.getMousedOverText(paddedBinaryLength)}</div>
          </div>
        </section>

        <section id="video">
          <h2>3Blue1Brown's Explanation</h2>

          <div id="limitWidth">
            <div id="videoContainer">
              <iframe title="3blue1brown" src="https://www.youtube.com/embed/X8jsijhllIA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </section>

        <section>
          <h3>How to Arrange the Parity Bits</h3>

          <div>In everyday base-10 counting, powers-of-10 (1, 10, 100, etc...) are written with 0s and a single 1. Similarly, in binary, powers-of-2 (1, 2, 4, 8, 16, etc...) are written with 0s and a single 1 (0001, 0010, 0100, 1000, etc...). In a message, the bits in a powers-of-2 position will be our <span className="colorZerothBit" style={{color: "black"}}>&nbsp;<b>parity bits</b>&nbsp;</span>. These parity bits track the parity of the other bits in the message whose position have a 1 in the same place. If one of bits is flipped, the parity will be wrong. If you select a data length that makes a square, you can visually see that each parity bit tracks certain rows and columns, splitting the message in halves to efficiently locate where the error is, like a game of "20 questions" or like a binary search. After calculating what the parity bits should equal, the parity bits point to the location of the error!</div>
        </section>

        <section>
          <h3>Single Error Correction, Double Error Detection</h3>

          <div>
            Hamming Code by itself can correct 1-bit errors, but will become confused when there are 2-bit errors. Single Error Correction, Double Error Detection (SECDED) extends Hamming Code with an additional parity bit (ie the first dark green parity bit). This bit tracks the parity of the whole message, so that we can detect 2-bit errors (without being able to correct them). With this additional parity bit, the overall parity of the message should be even. If there is a 1-bit error, the regular parity bits will detect an error and the overall parity of the message is 1; we can assume there is a 1-bit error. If there is a 2-bit error, the regular parity bits will detect an error BUT the overall parity of the message is 0; we have detected a double error.
          </div>
        </section>

        <section>
          <h3>Efficiency and Limitations</h3>

          <p>
            Of course, by having some parity bits, not all bits can be used to transmit data. In this case, we need {totalNumParityBits} parity bits to track {data.length - totalNumParityBits} bits of data for an overall efficiency of {efficiency}%. Longer messages loosely correlate with higher efficiency. The longer the message, however, the more likely the chance of bit errors, rendering Hamming Code insufficient, since it cannot detect 3 or more errors.
          </p>

          <p>From Wikiepdia:</p>
          <p>
            <i>"If the decoder does not attempt to correct errors, it can reliably detect triple bit errors. If the decoder does correct errors, some triple errors will be mistaken for single errors and "corrected" to the wrong value. Error correction is therefore a trade-off between certainty (the ability to reliably detect triple bit errors) and resiliency (the ability to keep functioning in the face of single bit errors)."</i>
          </p>
        </section>

        <footer>
          <p>Thank you to 3Blue1Brown for the inspiration and explanation! <a href="https://www.3blue1brown.com/" target="_blank" rel="noopener noreferrer">https://www.3blue1brown.com/</a></p>

          <p>Github Repo: <a href="https://github.com/harryli0088/hamming-code" target="_blank" rel="noopener noreferrer">https://github.com/harryli0088/hamming-code</a></p>

          <p>
            Read more about Hamming Code: <a href="https://en.wikipedia.org/wiki/Hamming_code" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Hamming_code</a>
          </p>

          <p>
            Read more about error-correcting code: <a href="https://en.wikipedia.org/wiki/Linear_code" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Linear_code</a>
          </p>
        </footer>
      </div>
    );
  }
}




export default App;
