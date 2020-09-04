import React from 'react';

import Cell from "Cell"
import './App.scss';


const data = [
  [1,0,1,0],
  [1,1,1,0],
  [0,1,0,0],
  [0,0,1,1],
]

// const data = [
//   [1,0,1,0,0,0,0,0],
//   [1,1,1,0,0,0,0,0],
//   [0,1,0,0,0,0,0,0],
//   [0,0,1,1,0,0,0,0],
//   [0,0,1,1,0,0,0,0],
//   [0,0,1,1,0,0,0,0],
//   [0,0,1,1,0,0,0,0],
//   [0,0,1,1,0,0,0,0],
// ]

interface AppState {
  mousedOverCellIndex: number,
  showBinary: boolean,
}

class App extends React.Component<{},AppState> {
  constructor(props:{}) {
    super(props)

    this.state = {
      mousedOverCellIndex: -1,
      showBinary: true,
    }
  }

  onMouseOverCell = (cellIndex: number) => this.setState({mousedOverCellIndex:cellIndex})

  render() {
    const {
      mousedOverCellIndex,
      showBinary,
    } = this.state

    return (
      <div>
        <h1>Hamming Codes</h1>

        <div>
          Show Binary <input type="checkbox" checked={showBinary} onChange={e => this.setState({showBinary:!showBinary})}/>
        </div>

        <div>{this.state.mousedOverCellIndex}</div>

        <table onMouseLeave={e => this.setState({mousedOverCellIndex:-1})}>
          <tbody>
            {data.map((row, rowIndex) =>
              <tr key={rowIndex}>
                {row.map((column, columnIndex) =>
                  <td key={columnIndex}>
                    <Cell
                      key={columnIndex}

                      column={column}
                      columnIndex={columnIndex}
                      data={data}
                      mousedOverCellIndex={mousedOverCellIndex}
                      onMouseOverCell={this.onMouseOverCell}
                      rowIndex={rowIndex}
                      showBinary={showBinary}
                    />
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
