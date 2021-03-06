import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
const TitleComp = ()=>{
  return <div>
            <h1>{this.props.title}</h1>
          </div>
          ;
}
*/
class TitleComp extends React.Component {
    render () {
        return(
            <div>
                <h1>Hola {this.props.title}</h1>
            </div>
        );
    }
}
ReactDOM.render(<TitleComp title='Luis Hernán'/>, document.querySelector('#title'));
export default TitleComp;


/*
  Square component
*/
/*
class Square extends React.Component {
  render() {
    //console.log('Hola, soy React Square, estoy siendo llamado <'+this.pros+'>');
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }

}
*/
//de esta nueva manera (functional compopnent), no usa this
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/*
Board Component
*/
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

handleClick(i){
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
                  squares:squares,
                  xIsNext: !this.state.xIsNext,
                  });
}

  renderSquare(i) {
    //return <Square value={this.state.squares[i]}/>;
    return (
      <Square
        value = {this.state.squares[i]}
        onClick= {() => this.handleClick(i)}
        />
    );
  }



  render() {
    //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/*
Game Component
*/
class Game extends React.Component {
    constructor(props){
      super(props);
      this.stae = {
        history : [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true
      }
    }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);




function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
