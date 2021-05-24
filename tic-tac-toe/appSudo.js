/*
      MODEL (will call methods defined in views)
      --------------------------------------
      Need an inmemory board model
        -is an object where keys are rows,cols, and diags and values are ints from -3 to 3

      Need a table for keeping track of game state
        -each row is a turn, columns are:
          -turnID
          -boardStateChange (format = "021" or "200" first digit is piece, second is row and, last is col)

        -should have an post method for when new pieces are placed
          -params: row and column name player turn;
          -description: parse params into a string and post to board and update in memory model of board
        -should have a wipe method for when new games are created
          -params: none
          -description: should clear all entries from table and reset in memory model of board
        -should have a init method for setting up an in memory model of board
          -params: none
          -description: get all boardStateChange values and map to in memory model of board;

      Need a table for keeping track of game history
        -columns will contain gameid (int) and winner(0 "x"|| 1 "o"|| null "tie");
        -should have a getAll method for displaying game hist
          -params: none
          -description: should read all values and post to the DOM the results
        -should have a post method for adding game results
          -params: winner
          -description: should add a winner to the table


*/


/*
      Views
      --------------------------------------
      need to have a method for changing html within a specific space on board
      need to have a method for emptying html from all space.
      need to have a method for displaying current turn
      need to have a mothod for displaying previous games and their winners.


*/

/*
      Controllers (will call methods defined in models)
      --------------------------------------
      need to trigger on refresh click
        -board state wipe
        -set player turn to x

      need to trigger on game completion
        - check for win
          -if true, set player turn to winner
          -else player turn is 'x'
        - board state wipe
        - create a new game in game history.

      need to trigger on board click
        -update table,
        -get game state information
        -check for game completion
          -if true, trigger game completion
*/