const express = require('express');
const app = express();
const mysql = require('mysql');
const Promise = require('bluebird');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ticTacToe'
});

/*
        ::Models
        __________________________
*/


class Board {
  constuctor(){
    this.state = {
      row0: 0,
      row1: 0,
      row2: 0,
      col0: 0,
      col1: 0,
      col2: 0,
      leadDiagonal: 0,
      antiDiagonal: 0,
      clear: ()=>{
        Object.keys(this).forEach(key => this.key = 0);
      }
    }
  }

  updateState(str) {
    var incrementer = (str[0] * 1) ? -1 : 1;
    var row = str[1];
    var col = str[2];
    this.state['row' + row] += incrementer;
    this.state['col' + col] += incrementer;
    if (row === 1 && col === 1) {
      this.leadDiagonal += incrementer;
      this.antiDiagonal += incrementer;
    } else {
      if (row === col) this.leadDiagonal += incrementer;
      if (Math.abs(row - col) === 2 ) this.antiDiagonal += incrementer;
    }
  }

  newMove(str) {
    con.connect((err)=>{
      if (err) throw err;
      var query = 'insert into turns (turn) value ?'
      con.query(query, [[str]], (err, results)=>{
        if (err) throw err;
        this.updateState(str);
        //call a view function here
        console.log(results);
        con.end();
      });
    });
  }

  restart() {
    con.connect((err)=>{
      if (err) throw err;
      con.query('delete from turns', (err, results)=>{
        if (err) throw err;
        this.state.clear();
        //call a view function here
        con.end();
      });
    });
  }

  initState(){
    con.connect(err=>{
      if (err) throw err;
      con.query('select changes from turns', (err, results) => {
        if (err) throw err;
        if (changes) {
          results.forEach(result=>{
            this.updateState(result.changes);
          });
          console.log('Board state loaded');
        } else {
          console.log('Board state already empty');
        }
        con.end();
      });
    });
  }
}

class Games {
  constuctor(){
  }

  getAll(callback) {
    con.connect(err => {
      if (err) throw err;
      con.query('select * from games', (err, results)=>{
        if (err) throw err;
        if (results) {
          results.forEach(result=>{
            callback(null, result);
          })
        }
        con.end();
      });
    });
  }

  addResult(str) {
    con.connect(err => {
      if (err) throw err;
      var query = 'insert into games (winner) values ?'
      con.query(query, [[str]], (err, results)=>{
        if (err) throw err;
        console.log('winner added to table');
        con.end();
      });
    });
  }

}

/*
        ::Views
        __________________________
*/

/*
        ::Controllers
        __________________________
*/
/*
        ::Routes
        __________________________
*/
app.get('/', (req, res) => {
  res.send('Hello World!')
})























app.listen(3000, ()=>
  console.log('Example app listening at http://localhost:3000')
);