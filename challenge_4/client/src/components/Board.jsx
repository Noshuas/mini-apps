import Row from './Row.jsx';
import Column from './Column.jsx';

class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentPlayer: 'black',
      moves: 0,
      col0: '000000',
      col1: '000000',
      col2: '000000',
      col3: '000000',
      col4: '000000',
      col5: '000000',
      col6: '000000',
      gameOver: false

    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    //get space on board
    var thisColumn = e.target.parentElement;
    var column = thisColumn.getAttribute('column');
    //get next area in column where piece would go
    var row = 6

    while (row >= 0 && targetSpace === undefined) {
      var currentSpace = thisColumn.children[row]
      if (currentSpace.getAttribute('color') === 'empty') {
        var targetSpace = currentSpace;
      }
      row--;
    }
    if (targetSpace === undefined) {
      alert('Please choose another column');
      return;
    }


    //check for number of matching spaces on all axis
    if (
      (this.spaces('below', targetSpace) === 3) ||
      (this.spaces('leftOf', targetSpace) + this.spaces('rightOf', targetSpace) >= 3) ||
      (this.spaces('downLeftOf', targetSpace) + this.spaces('upRightOf', targetSpace) >= 3) ||
      (this.spaces('upLeftOf', targetSpace) + this.spaces('downRightOf', targetSpace) >= 3)){
        //end game if four in a row detected
        alert(this.state.currentPlayer + ' wins!')

        this.setState(this.updateBoard(this.state['col' + column], targetSpace, true))
    } else {
      //otherwise update in memory board model
      this.setState(this.updateBoard(this.state['col' + column], targetSpace))
    }
  }

  getInfoFor(domElement){
    var row = domElement.getAttribute('row');
    var column = domElement.parentElement.getAttribute('column');
    var color = domElement.getAttribute('color');
    return {
      row: row,
      column: column,
      color: color
    }
  }

  updateBoard(colorString, domElement, gameOver = false){
    var newPlayer = (this.state.currentPlayer === 'black') ? 'red' : 'black';
    var {row, column} = this.getInfoFor(domElement);
    var colorNum = ['empty', 'black', 'red'].indexOf(this.state.currentPlayer).toString();
    var colors = colorString.split('')
    colors.splice(row, 1, colorNum);
    var colorString = colors.join('');
    var result = {};
    result['col' + column] = colorString;
    result.currentPlayer = newPlayer;
    result.moves = this.state.moves + 1;

    if (result.moves === 42 && !gameOver) {
      alert('The game has ended in a tie');
      gameOver = true;
    }
    if (gameOver) result.gameOver = true;

    return result;
  }

  spaces(direction, domElement){
    var {row, column, color} = this.getInfoFor(domElement);
    row = parseInt(row) + 1;
    column = parseInt(column);
    var neighbors = 0;
    var nextSpace;
    switch (direction) {
      case 'below':
        nextSpace = document.querySelectorAll('div.column')[column].children[row + 1];
        break;
      case 'leftOf':
        nextSpace = document.querySelectorAll('div.column')[column - 1]
        nextSpace = (nextSpace === undefined) ? undefined : nextSpace.children[row];
        break;
      case 'rightOf':
        nextSpace = document.querySelectorAll('div.column')[column + 1]
        nextSpace = (nextSpace === undefined) ? undefined : nextSpace.children[row];
        break;
      case 'upLeftOf':
        nextSpace = document.querySelectorAll('div.column')[column - 1]
        nextSpace = (nextSpace === undefined) ? undefined : nextSpace.children[row - 1];
        break;
      case 'downRightOf':
        nextSpace = document.querySelectorAll('div.column')[column + 1]
        nextSpace = (nextSpace === undefined) ? undefined : nextSpace.children[row + 1];
        break;
      case 'downLeftOf':
        nextSpace = document.querySelectorAll('div.column')[column - 1]
        nextSpace = (nextSpace === undefined) ? undefined : nextSpace.children[row + 1];
        break;
      case 'upRightOf':
        nextSpace = document.querySelectorAll('div.column')[column + 1]
        nextSpace = (nextSpace === undefined) ? undefined : nextSpace.children[row - 1];
        break;
      default:
        console.error('invalid argument provided for direction: ' + direction);
    }

    if (nextSpace !== undefined && nextSpace.getAttribute('color') === this.state.currentPlayer) {
      neighbors++
      neighbors += this.spaces(direction, nextSpace);
    }
    return neighbors;
  }


  render(){
    var columns = []
    var i = 0
    var clickHandler = (this.state.gameOver) ? ()=>{alert('the game is over :(')} : this.handleClick;
    while(i < 7) {
      columns.push(<Column key={i} column={i} rowValues={this.state['col' + i]} clickHandler={clickHandler} currentPlayer={this.state.currentPlayer}/>)
      i++;
    }

    return (
      <div id="board">
        {columns}
      </div>
    )
  }
}

export default Board;
