import React from 'react';

import Bit from "Bit"
import generateData from "utils/generateData"
import './App.scss';

interface AppState {
  bitHeight: number,
  bitWidth: number,
  data: number[],
  mousedOverBitIndex: number,
  showBinary: boolean,
}

class App extends React.Component<{},AppState> {
  constructor(props:{}) {
    super(props)

    this.state = {
      bitHeight: 100,
      bitWidth: 100,
      data: generateData(4),
      mousedOverBitIndex: -1,
      showBinary: true,
    }
  }

  onClickBit = (bitIndex: number) => {
    const dataCopy = this.state.data.slice()
    dataCopy[bitIndex] = dataCopy[bitIndex]>0 ? 0 : 1 //switch the bit
    this.setState({data: dataCopy})
  }

  getMousedOverText = () => {
    if(this.state.mousedOverBitIndex >= 0) {
      return `You are hovering over cell ${this.state.mousedOverBitIndex}`
    }

    return "Hover over a cell!"
  }

  onMouseOverBit = (bitIndex: number) => this.setState({mousedOverBitIndex:bitIndex})

  render() {
    const {
      bitHeight,
      bitWidth,
      data,
      mousedOverBitIndex,
      showBinary,
    } = this.state

    const dimension = Math.sqrt(data.length)

    const numBits = data.length - 1
    const numParityBits = Math.ceil(Math.log(numBits)/Math.log(2))
    const efficiency = (numBits - numParityBits) / numBits

    return (
      <div>
        <h1>Hamming Codes</h1>

        <div>
          Number of bits: {[2,4,8,16].map(newDimension => <button onClick={e => this.setState({data: generateData(newDimension)})}>{newDimension*newDimension-1}</button>)}
        </div>

        <div>
          Efficiency: {numBits - numParityBits}/{numBits} = {(100*efficiency).toFixed(2)}%
        </div>

        <div><button>Correct Parity Bits</button></div>

        <div>
          Show Binary <input type="checkbox" checked={showBinary} onChange={e => this.setState({showBinary:!showBinary})}/>
        </div>

        <div id="bitsContainer" onMouseLeave={e => this.setState({mousedOverBitIndex:-1})} style={{
          height: bitHeight * dimension,
          width: bitWidth * dimension,
        }}>
          {data.map((bit, bitIndex) =>
            <Bit
              key={bitIndex}

              bit={bit}
              bitIndex={bitIndex}
              data={data}
              dimension={dimension}
              height={bitHeight}
              isCell
              mousedOverBitIndex={mousedOverBitIndex}
              onClickBit={this.onClickBit}
              onMouseOverBit={this.onMouseOverBit}
              showBinary={showBinary}
              width={bitWidth}
            />
          )}
        </div>

        <br/>

        <div>
          Message:
          <br/>
          <span id="rawMessageContainer">
            {data.map((bit, bitIndex) =>
              <Bit
                key={bitIndex}

                bit={bit}
                bitIndex={bitIndex}
                data={data}
                dimension={dimension}
                height={bitHeight}
                isCell={false}
                mousedOverBitIndex={mousedOverBitIndex}
                onClickBit={this.onClickBit}
                onMouseOverBit={this.onMouseOverBit}
                showBinary={showBinary}
                width={bitWidth}
              />
            )}
          </span>
        </div>


        <div>{this.getMousedOverText()}</div>
      </div>
    );
  }
}

export default App;
