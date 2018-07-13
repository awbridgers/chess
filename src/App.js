import React, { Component } from 'react';
import './App.css';
import Chess from 'chess.js'
import Board from './board.js'
import Captured from './captured.js';
import Promote from './promote.js'

// this function takes the possible moves array and strips the elements to only contain a coordinate
const returnSquare = (array, target) => {
  let returnArray = [];
  array.forEach((square) => {
    let temp = '';

    // if the last character denotes check or checkmate, cut it off
    const inCheckOrCheckmate = square[square.length - 1] === '#' || square[square.length-1] === '+';
    let newString = inCheckOrCheckmate ? square.slice(0, -1) : square

    if (newString.includes('=')) {
      // handle pawn promotions
      temp = newString.substr(newString.length - 4, 2);
    }

    else if (newString === 'O-O') {
      // handle castling
      temp = (target === 'e1') ?'g1' : 'g8';
    }

    else if (newString === 'O-O-O') {
      temp = (target === 'e1') ? 'c1' : 'c8';
    }

    else {
      temp = newString.substr(newString.length - 2)
    }

    returnArray.push(temp)
  });
  return returnArray;
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      target: '',
      fen: '7k/6pp/8/6N1/1r6/2q5/8/5K2 w - - 0 1',
      gameOver: false,
      gameOverMessage: '',
      choosePromo:false,
      promoLocation: '',
    };

    this.chess = new Chess();
    this.possibleMoves = [];
    this.hasMadeFirstClick = false;
    this.choosing = false;
    this.turn = 'player';
    this.location = '';
  }

  componentDidMount() {
    // load in the starting position from state
    this.chess.load(this.state.fen);
  }

  componentDidUpdate() {
    if (this.state.gameOver) {
      setTimeout(
        () => alert(this.state.gameOverMessage),
        250,
      );
    }

    if (!this.state.gameOver) {
      // if the game is in checkmate, alert the player
      if (this.chess.in_checkmate()) {
        // if the player just moved, the comp must be in checkmate
        this.setState({
          gameOver: true,
          gameOverMessage: `Checkmate! You ${this.turn === 'computer' ? 'Win' : 'Lose'}.`,
        });
      } else if (this.chess.in_stalemate()) {
        this.setState({
          gameOver: true,
          gameOverMessage: 'Stalemate! Game is a draw.',
        });
      } else if (this.turn === 'computer') {
        this.computerMove();
      }
    }
  }

  chooseTarget = (targeted) => {
  // if the target is equal to the clicked on square, outline in red
  if (targeted === this.state.target) {
    return 'targeted';
  }

  // if its not the clicked on square, see if its a possible move square
  for (let i = 0; i < this.possibleMoves.length; i++) {
    // if possible move, turn yellow.
    if (targeted === this.possibleMoves[i].substr(this.possibleMoves[i].length - 2)) {
      return 'possibleMove';
    }
  }
  // if it has nothing special about it, stay normal
  return 'normal';
}
  clickSquare = (e) => {
    if (this.turn === 'player' && !this.choosing) {
      if (!this.hasMadeFirstClick) { // first click
        // find all the possible moves, just the coordinates
        this.possibleMoves = returnSquare(this.chess.moves({square: e.target.id}), e.target.id);
        // if the piece can move
        if (this.possibleMoves.length > 0) {
          this.hasMadeFirstClick = true;
          // set the clicked on square to state.target
          this.setState({target: e.target.id})
        }
      } else { // second click
        // setup another chess version with the same fen to check if the move causes a promotion
        let checker = new Chess(this.state.fen)

        // if the click is on a possible move square, move the first click piece to second click location
        this.location = e.target.id;
        // cycle through the possible moves and see if the clicked square is a possible move
        for(let i = 0; i < this.possibleMoves.length; i++) {
          if (this.location === this.possibleMoves[i].substr(this.possibleMoves[i].length - 2)) {
            // if the move causes a promotion, we need to get the selected promo
            if (checker.move({from: this.state.target, to: this.location, promotion: 'q'}).flags.includes('p')) {
              // set choosePromo to true and store the location of the target in a new state variable so it isn't cleared out
              this.setState({
                choosePromo: true,
                promoLocation: this.state.target,
              });
              this.choosing = true;
              break;  // jump out of for loop because it has 1 possible move for each of promotion options
            } else {
              // if there is no promotion, just move the piece with promo: 'q' since it won't do anything
              this.move(this.state.target,this.location, 'q');
            }
          }
        }
        // reset possible move squares and target to unhighlights squares
        this.possibleMoves = [];
        this.hasMadeFirstClick = false;
        this.setState({ target: '' });
      }
    }
  }
  move = (target,location,promo) => {
    // move the chess piece, change turn, and set new state for fen, clear the rest.
    this.chess.move({
      from: target,
      to:location,
      promotion:promo,
    });
    this.setState({
      fen: this.chess.fen(),
      target:'',
      promoLocation:'',
      choosePromo: false,
    })
    this.turn = 'computer';
  }

  evaluateScore = (fen) => {
    let game = new Chess(fen);


    let score = 0;

    // the fen might have an extra 'b' for black after the list of codes, e.g.
    // rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1, so we strip out only the codes to count
    const boardPieceCodes = fen.split(' ')[0];

    // just loop through all the pieces and update the point value;
    for (let pieceCode of boardPieceCodes) {
      switch (pieceCode) {
        case ('Q'): {
          score += 9;
          break;
        }

        case ('R'): {
          score += 5;
          break;
        }

        case ('N'): {
          score += 3;
          break;
        }

        case ('B'): {
          score += 3;
          break;
        }

        case ('P'): {
          score ++;
          break;
        }

        case ('q'): {
          score -= 9;
          break;
        }

        case ('r'): {
          score -= 5;
          break;
        }

        case ('n'): {
          score -= 3;
          break;
        }

        case ('b'): {
          score -= 3;
          break;
        }

        case ('p'): {
          score --;
          break;
        }

        default: {
          break;
        }
      };
    }
    return score;
  }

  calculateBestMove = () => {
    this.positions = 0;
    // get all the moves
    let possibleMoves = this.chess.moves();
    // keep a list of all equally best moves to choose from
    let bestMoves = [];
    let bestValue = 9999;
    // use negative because black winning is a negative score
    let currentScore = this.evaluateScore(this.state.fen);
    // for each possible move, make the move and calculate the score
    possibleMoves.forEach((move) => {
      this.chess.move(move);
      let value = this.findBestMove(1, true) ;
      this.chess.undo();
      // if the value of the move is better than or equal the current best move, update
      if (value < bestValue) {
        bestValue = value;
        bestMoves = [move];
      } else if (value === bestValue) {
        bestMoves.push(move);
      }
    });

    // pick a random move from the set of best moves (stops comp from making first move every time)
    if (bestMoves.length) {
      return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }
    // if no best moves, pick a random move
    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }
  findBestMove = (depth, whiteToMove) => {
    this.positions++;
    if(depth === 0){
      console.log('Going')
      return this.evaluateScore(this.chess.fen());
    }
    let possibleMoves = this.chess.moves();
    if(whiteToMove){
      let bestMove = -5000
      possibleMoves.forEach((move)=>{
        this.chess.move(move);
        if(this.chess.in_checkmate()){
          bestMove = 100000
        }
        bestMove = Math.max(bestMove, this.findBestMove(depth - 1, !whiteToMove));
        this.chess.undo();
      });
      return bestMove;
    }
    else{
      let bestMove = 5000
      possibleMoves.forEach((move)=>{
        this.chess.move(move);
        if(this.chess.in_checkmate()){
          bestMove = -100000
        }
        //the best move for white is the one that evals to the biggest negative
        bestMove = Math.min(bestMove, this.findBestMove(depth - 1, !whiteToMove));
        this.chess.undo();
      });
      return bestMove;
    }
  }
  computerMove = () => {
    if (!this.chess.in_checkmate() && !this.chess.in_stalemate()) {
      setTimeout(() => {
        let computerMove = this.calculateBestMove();
        //Auto promote to Queen for the time being
        if (computerMove.includes('=')) {
          computerMove = computerMove.replace(/N/, 'Q').replace(/B/, 'Q').replace(/R/,'Q');
        }
        this.chess.move(computerMove);
        this.turn = 'player';
        this.setState({fen: this.chess.fen()});
      },250);
    }
  }

  promote = (e) => {
    // get the promotion and move the piece
    let choice = e.target.id;
    this.move(this.state.promoLocation, this.location, choice);
    // set choosing to false so the user can click on pieces again
    this.choosing = false;
  }

  render() {
    console.log(this.positions)
    const {
      choosePromo,
      fen,
    } = this.state;

    return (
      <div>
        {choosePromo && (
          <Promote onClick={this.promote}/>
        )}
        <Captured fen={fen} color ="white"/>
        <Board onClick={this.clickSquare} chooseClass={this.chooseTarget} fen={fen}/>
        <Captured fen={fen} color="black"/>
      </div>
    );
  }
}

export default App;
