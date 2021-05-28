import Row from './Row.jsx';
import View from './View.jsx';

var Column = ({rowValues, column, clickHandler, currentPlayer}) => {

    var rows = []
    var i = 0
    var colors = ['empty', 'black', 'red']
    while(i < 6) {

      rows.push(<Row key={i} row={i} color={colors[rowValues[i]]}/>)
      i++;
    }
    return (
      <div className="column" column={column} onClick={clickHandler}>
        <View currentPlayer={currentPlayer}/>
        {rows}
      </div>
    )
}

export default Column;