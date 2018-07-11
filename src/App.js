import React, { Component } from 'react';
import './App.css';
import Chess from 'chess.js'
import Board from './board.jsx'
import Captured from './captured.jsx';
import Promote from './promote.jsx'

//this function takes the possible moves array and strips the elements to only contain a coordinate
const returnSquare = (array, target) => {
  let returnArray =[];
  array.forEach((square) =>{
    let temp = "";
    let newString = ""
    //if the last character denotes check or checkmate, cut it off
    if(square[square.length-1] === '#' || square[square.length-1] === '+'){
      newString = square.slice(0,-1)
    }
    else{
      newString = square;
    }
    //handle pawn promotions
    if(newString.includes('=')){
      temp = newString.substr(newString.length-4, 2);

    }
    //handle castling
    else if(newString === 'O-O'){
      if(target === 'e1'){
        temp = "g1"
      }
      else{
        temp = "g8"
      }
    }
    else if(newString === 'O-O-O'){
      if(target === 'e1'){
        temp = "c1"
      }
      else{
        temp = "c8"
      }
    }
    else{
      temp = newString.substr(newString.length - 2)
    }

    returnArray.push(temp)
  })
  return returnArray;
}



class App extends Component {
  constructor(){
    super();
    this.state = {target: "", fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      gameOver: false, gameOverMessage: "", choosePromo:false, promoLocation: ""}
    this.chess = new Chess();
    this.clickSquare = this.clickSquare.bind(this);
    this.chooseTarget = this.chooseTarget.bind(this);
    this.computerMove = this.computerMove.bind(this);
    this.promote = this.promote.bind(this);
    this.move = this.move.bind(this);
    this.possibleMoves =[];
    this.firstClick = false;
    this.choosing = false;
    this.turn = 'player';
    this.location = '';


  }
  componentDidMount(){
    //load in the starting position from state
    this.chess.load(this.state.fen)
  }
  componentDidUpdate(){
    if(this.state.gameOver){
      setTimeout(()=>alert(this.state.gameOverMessage),250);
    }
    if(!this.state.gameOver){
      //if the game is in checkmate, alert the player
      if(this.chess.in_checkmate()){
        //if the player just moved, the comp must be in checkmate
        if(this.turn === 'computer'){
          this.setState({gameOver: true, gameOverMessage: "Checkmate! You Win"})
        }
        else{
            this.setState({gameOver: true, gameOverMessage: "Checkmate! You Lose"})
        }
      }
      if(this.chess.in_stalemate()){
        alert("Stalemate! Game is a draw!")
      }

      if(this.turn === 'computer'){
        this.computerMove();
      }
    }
  }
  chooseTarget(targeted){
  //if the target is equal to the clicked on square, outline in red
  if(targeted === this.state.target){
    return 'targeted'
  }
  else{
    //if its not the clicked on square, see if its a possible move square
    for(let i=0; i < this.possibleMoves.length; i++){
      //if possible move, turn yellow.
      if(targeted === this.possibleMoves[i].substr(this.possibleMoves[i].length -2)){
        // console.log(this.possibleMoves[i])
        return 'possibleMove'
      }
    }
    //if it has nothing special about it, stay normal
    return 'normal'
  }
}
  clickSquare(e){
    if(this.turn === "player" && !this.choosing){
      //first click,
      if(!this.firstClick){
        //find all the possible moves, just the coordinates
        this.possibleMoves = returnSquare(this.chess.moves({square: e.target.id}), e.target.id);
        //if the piece can move
        if(this.possibleMoves.length > 0){
          this.firstClick = true;
          //console.log(this.possibleMoves);
          //set the clicked on square to state.target
          this.setState({target: e.target.id})
        }
      }
        //second click
      else{
        //setup another chess version with the same fen to check if the move causes a promotion
        let checker = new Chess(this.state.fen)

        //if the click is on a possible move square, move the first click piece to second click location
        this.location = e.target.id;
        //cycle through the possible moves and see if the clicked square is a possible move
        for(let i=0; i < this.possibleMoves.length; i++){
          if(this.location === this.possibleMoves[i].substr(this.possibleMoves[i].length -2)){
            //if the move causes a promotion, we need to get the selected promo
            if(checker.move({from: this.state.target, to: this.location, promotion: 'q'}).flags.includes('p')){
              //set choosePromo to true and store the location of the target in a new state variable so it isn't cleared out
              this.setState({choosePromo: true, promoLocation: this.state.target});
              this.choosing = true;
              break;  //jump out of for loop because it has 1 possible move for each of promotion options
            }
            //if there is no promotion, just move the piece with promo: 'q' since it won't do anything
            else{
              this.move(this.state.target,this.location, 'q');
            }
          }
        }
        //reset possible move squares and target to unhighlights squares
        this.possibleMoves =[];
        this.firstClick = false;
        this.setState({target:""})



      }
    }
  }
  move(target,location,promo){
    //move the chess piece, change turn, and set new state for fen, clear the rest.
    this.chess.move({from: target, to:location, promotion:promo});
    this.turn = 'computer';
    this.setState({fen: this.chess.fen(), target:"", promoLocation:'', choosePromo: false})


  }
  computerMove(){
    if(!this.chess.in_checkmate() && !this.chess.in_stalemate()){
      setTimeout(()=>{
        let moves = this.chess.moves();
        let random = Math.floor(Math.random() * moves.length);
        let computerMove = moves[random]
        //Auto promote to Queen for the time being
        if(computerMove.includes('=')){
          computerMove = computerMove.replace(/N/, 'Q').replace(/B/, 'Q').replace(/R/,'Q');
        }
        this.chess.move(computerMove);
        this.turn = "player";
        this.setState({fen: this.chess.fen()});
      },250);
    }
  }

  promote(e){
    //get the promotion and move the piece
    let choice = e.target.id;
    this.move(this.state.promoLocation,this.location, choice)
    //set choosing to false so the user can click on pieces again
    this.choosing = false;

  }
  render() {
    let promo;
    if(this.state.choosePromo){
      promo = <Promote onClick = {this.promote}/>
    }
    return (
      <div>
        {promo}
        <Captured fen = {this.state.fen} color = 'white'/>
        <Board onClick = {this.clickSquare} chooseClass = {this.chooseTarget} fen = {this.state.fen}/>
        <Captured fen = {this.state.fen} color = 'black'/>
      </div>

    );
  }
}

export default App;
