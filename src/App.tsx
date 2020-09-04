import React from 'react';

import Cell from "Cell"
import generateData from "utils/generateData"
import './App.scss';

interface AppState {
  data: number[][],
  mousedOverCellIndex: number,
  showBinary: boolean,
}

class App extends React.Component<{},AppState> {
  constructor(props:{}) {
    super(props)

    this.state = {
      data: generateData(4),
      mousedOverCellIndex: -1,
      showBinary: true,
    }
  }

  getMousedOverText = () => {
    if(this.state.mousedOverCellIndex >= 0) {
      return `You are hovering over cell ${this.state.mousedOverCellIndex}`
    }

    return "Hover over a cell!"
  }

  onMouseOverCell = (cellIndex: number) => this.setState({mousedOverCellIndex:cellIndex})

  render() {
    const {
      data,
      mousedOverCellIndex,
      showBinary,
    } = this.state

    return (
      <div>
        <h1>Hamming Codes</h1>

        <div>
          Number of bits: {[2,4,8].map(dimension => <button onClick={e => this.setState({data: generateData(dimension)})}>{dimension*dimension}</button>)}
        </div>

        <div>
          Show Binary <input type="checkbox" checked={showBinary} onChange={e => this.setState({showBinary:!showBinary})}/>
        </div>

        <table onMouseLeave={e => this.setState({mousedOverCellIndex:-1})}>
          <tbody>
            {data.map((row, rowIndex) =>
              <tr key={rowIndex}>
                {row.map((value, columnIndex) =>
                  <td key={columnIndex}>
                    <Cell
                      key={columnIndex}

                      columnIndex={columnIndex}
                      data={data}
                      mousedOverCellIndex={mousedOverCellIndex}
                      onMouseOverCell={this.onMouseOverCell}
                      rowIndex={rowIndex}
                      showBinary={showBinary}
                      value={value}
                    />
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>

        <div>{this.getMousedOverText()}</div>

      </div>
    );
  }
}

export default App;
