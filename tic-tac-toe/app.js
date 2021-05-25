// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const Promise = require('bluebird');
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'ticTacToe'
// });
// debugger;

/*
        ::Models
        __________________________
*/


class Board {
  constructor(){
    this.state = {
      row0: 0,
      row1: 0,
      row2: 0,
      col0: 0,
      col1: 0,
      col2: 0,
      leadDiagonal: 0,
      antiDiagonal: 0,
      turn: 0
    }
    this.currentPlayer = 'x';
    this.history = [];
  }

  updateState(target) {
    view.addSymbol(target);

    var rowCol = target.classList[1];
    var player = game.currentPlayer;
    var incrementer = (player === 'o') ? -1 : 1;
    var row = rowCol[0];
    var col = rowCol[1];

    this.state['row' + row] += incrementer;
    this.state['col' + col] += incrementer;
    if (row * 1 === 1 && col * 1 === 1) {
      this.state.leadDiagonal += incrementer;
      this.state.antiDiagonal += incrementer;
    } else {
      if (row === col) this.state.leadDiagonal += incrementer;
      if (Math.abs(row - col) === 2 ) this.state.antiDiagonal += incrementer;
    }
    this.state.turn++;
    this.checkForWin(player);
  }

  // newMove(str) {
  //   con.connect((err)=>{
  //     if (err) throw err;
  //     var query = 'insert into turns (turn) value ?'
  //     con.query(query, [[str]], (err, results)=>{
  //       if (err) throw err;
  //       this.updateState(str);
  //       //call a view function here
  //       console.log(results);
  //       con.end();
  //     });
  //   });
  // }

  // restart() {
  //   con.connect((err)=>{
  //     if (err) throw err;
  //     con.query('delete from turns', (err, results)=>{
  //       if (err) throw err;
  //       Object.keys(this.state).forEach(key => this.state.key = 0);
  //       //call a view function here
  //       con.end();
  //     });
  //   });
  // }

  // initState(){
  //   con.connect(err=>{
  //     if (err) throw err;
  //     con.query('select changes from turns', (err, results) => {
  //       if (err) throw err;
  //       if (changes) {
  //         results.forEach(result=>{
  //           this.updateState(result.changes);
  //         });
  //         console.log('Board state loaded');
  //       } else {
  //         console.log('Board state already empty');
  //       }
  //       con.end();
  //     });
  //   });
  // }

  reset() {
    Object.keys(this.state).forEach(key => this.state[key] = 0);
    view.clearBoard();
  }

  checkForWin(player) {
    var gameover, winner;
    var goal = (player === 'x') ? 3 : -3;

    Object.keys(this.state).forEach(key=>{
      if (this.state[key] === goal && key !== 'turn') {
        gameover = true;
        winner = player;
      } else if (this.state.turn === 9) {
        gameover = true;
        winner = 't';
      }
    });
    this.currentPlayer = (this.currentPlayer === 'x') ? 'o' : 'x';
    if (gameover) {
      if (winner !== 't') this.currentPlayer = winner;
      this.reset();
      view.displayWinner(winner);
    }
  }
}

// class Game {
//   constructor(player = 'x', prevGames = []){
//     this.currentPlayer = player;
//     this.history = prevGames;
//   }

  // getAll(callback) {
  //   con.connect(err => {
  //     if (err) throw err;
  //     con.query('select * from games', (err, results)=>{
  //       if (err) throw err;
  //       if (results) {
  //         results.forEach(result=>{
  //           callback(null, result);
  //         })
  //       }
  //       con.end();
  //     });
  //   });
  // }

  // addResult(str) {
  //   con.connect(err => {
  //     if (err) throw err;
  //     var query = 'insert into games (winner) values ?'
  //     con.query(query, [[str]], (err, results)=>{
  //       if (err) throw err;
  //       console.log('winner added to table');
  //       con.end();
  //     });
  //   });
  // }

// }



/*
        ::Views
        __________________________
*/

class View {
  constructor(){

  }

  addSymbol(target) {
    target.innerHTML = game.currentPlayer;
  }

  clearBoard() {
    var spaces = document.getElementsByClassName('space');
    for (var i = 0; i < spaces.length; i++) {
      var space = spaces[i];
      space.innerHTML = '';
    }
  }

  displayWinner(winner) {
    var winMessage = "The game was a tie";
    if (winner === 'x') {
      winMessage = "Player 1 (x) has won the game";
    } else if (winner === 'o') {
      winMessage = "Player 2 (o) has won the game";
    }

    var middleSquare = document.getElementsByClassName('11')[0];
    setTimeout(()=>{middleSquare.innerHTML = ''}, 2000);
    middleSquare.innerHTML = winMessage;

    game.history.push(winMessage);
    var history = document.getElementsByClassName('hist')[0];
    var p = document.createElement('p');
    p.innerHTML = winMessage;
    history.prepend(p)
  }
}
/*
        ::Controllers
        __________________________
*/
class Controller {
  constructor(){
     this.spaces = document.getElementsByClassName('space');
     this.resetButton = document.getElementById('reset');

     for (var i = 0; i < this.spaces.length; i++) {
      var space = this.spaces[i];
      space.addEventListener('click', this.playerMove);
    }

    this.resetButton.addEventListener('click', this.reset);
  }

  playerMove = function (e) {
    var target = e.target;
    game.updateState(target);
  }

  reset(){
    game.reset();
    game.currentPlayer = 'x';
  }
}

var game = new Board();
var view = new View();
var controller = new Controller();

// spaces.addEventListener('click', getClicked);

/*
        ::Routes
        __________________________
*/
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })























// app.listen(3000, ()=>
//   console.log('Example app listening at http://localhost:3000')
// );