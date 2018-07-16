
import React, { Component } from 'react';
import './App.css';
import Chess from 'chess.js'
import Board from './board.js'
import Captured from './captured.js';
import Promote from './promote.js';

//import stockfish.js as a worker so it can run in the background per the instructions in the readme.
//used https://medium.com/@danilog1905/how-to-use-web-workers-with-react-create-app-and-not-ejecting-in-the-attempt-3718d2a1166b
//to format the app to run a worker.
import myWorker from './stockfish.worker';


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
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      gameOver: false,
      gameOverMessage: '',
      choosePromo:false,
      promoLocation: '',
      difficulty: '10'
    };

    this.chess = new Chess();
    this.possibleMoves = [];
    this.hasMadeFirstClick = false;
    this.choosing = false;
    this.turn = 'player';
    this.location = '';
  }

  componentDidMount() {
    this.chess.load(this.state.fen);
    this.worker = new myWorker();
    //add the event listener for the stockfish web worker
    this.worker.addEventListener('message', event => {
      if(this.turn === 'computer'){
        let engineString = event.data;
        if (engineString.includes('bestmove')){
          let bestMove = engineString.substr(9,5);
          //if the last character is a space, cut it off. If not, its a promotion and we need it.
          bestMove = (bestMove[5]===' ')? bestMove.slice(0,-1) : bestMove;
          this.chess.move(bestMove, {sloppy: true});
          this.setState({fen: this.chess.fen()});
          this.turn = 'player';
        }
      }

    });
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

  computerMove = () => {
    if (!this.chess.game_over()) {
      //setTimeout so the moves don't happen so quickly
      setTimeout(()=>{
        //uci messages for the stockfish js worker.
        this.worker.postMessage('position fen ' + this.state.fen)
        this.worker.postMessage('go depth ' + this.state.difficulty)
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
