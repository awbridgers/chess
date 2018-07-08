import React, { Component } from 'react';
import whitePawn from './images/whitePawn2.png'
import whiteRook from './images/whiteRook2.png'
import whiteKnight from './images/whiteKnight2.png'
import whiteQueen from './images/whiteQueen2.png'
import whiteBishop from './images/whiteBishop2.png'


export default class Captured extends Component {
  constructor(){
    super();
    this.state = {whitePawnsCaptured:0, whiteRooksCaptured:0, whiteKnightsCaptured:0, whiteBishopsCaptured:0, whiteQueensCaptured:0,
      blackPawnsCaptured:0, blackRooksCaptured:0, blackKnightsCaptured:0, blackBishopsCaptured:0, blackQueensCaptured:0}
      this.promotedWhitePawns = 0;
    this.captured = this.captured.bind(this);
    this.display = this.display.bind(this);

  }
  componentDidMount(){
    this.captured();
  }

  componentDidUpdate(prevProps){
    //read in the props on update and count the pieces
    if(this.props.fen !== prevProps.fen){
      console.log('queens' + this.state.whiteQueensCaptured);
      console.log('promoted' + this.promotedWhitePawns)
      this.captured();

    }

  }
  //basic idea is to just go through the fen and count number of pieces
  captured(){
    //set the number of pieces to the number at the start of the game
    let whitePawns, blackPawns, whiteQueens, blackQueens, whiteRooks, whiteKnights, whiteBishops, blackRooks, blackKnights, blackBishops, wpromotedPawns;
    whitePawns = 8 - this.promotedWhitePawns
    blackPawns = 8;
    whiteQueens = 1 + this.promotedWhitePawns
    blackQueens = 1;
    whiteRooks = whiteKnights = whiteBishops = blackRooks = blackKnights = blackBishops = 2;
    wpromotedPawns = 0;


    //subtract 1 from each piece for every piece on the board = how many captured
    for(let x of this.props.fen){
      if(x === 'P'){
        whitePawns--;
      }
      else if(x === 'Q'){
        whiteQueens--;
      }
      else if(x === 'R'){
        whiteRooks--;
      }
      else if(x === 'N'){
        whiteKnights--;
      }
      else if(x === 'B'){
        whiteBishops--;
      }
      else if(x === 'p'){
        blackPawns--;
      }
      else if(x === 'q'){
        blackQueens--;
      }
      else if(x === 'r'){
        blackRooks--;
      }
      else if(x === 'n'){
        blackKnights--;
      }
      else if(x === 'b'){
        blackBishops--;
      }
      //stop when you get to the space in the FEN
      else if(x === ' '){
        break;
      }
    }

    if(whiteQueens < this.promotedWhitePawns - 1){
      this.promotedWhitePawns++;
      whitePawns--;
      //this.captured();


    }
    if(blackQueens < 0){

    }

    //update the state with the new number of captured pieces
    this.setState({whitePawnsCaptured:whitePawns, whiteRooksCaptured:whiteRooks, whiteKnightsCaptured:whiteKnights,
      whiteBishopsCaptured:whiteBishops, whiteQueensCaptured:whiteQueens, blackPawnsCaptured:blackPawns,blackRooksCaptured:blackRooks,
      blackKnightsCaptured:blackKnights, blackBishopsCaptured:blackBishops, blackQueensCaptured:blackQueens})

  }
  display(piece){
    let pieceArray = []
    if(piece === 'whitePawn'){
      for(let i = 0; i < this.state.whitePawnsCaptured; i++){
          pieceArray.push(<img className = "captured" style = {{marginBottom: "-2.5px"}} key = {i} src = {whitePawn} alt = 'whitePawn' />)
      }
    }
    if(piece === 'whiteKnight'){
      for(let i = 0; i < this.state.whiteKnightsCaptured; i++){
          pieceArray.push(<img className = "captured" key = {i} src = {whiteKnight} alt = 'whitePawn' />)
      }
    }
    if(piece === 'whiteRook'){
      for(let i = 0; i < this.state.whiteRooksCaptured; i++){
          pieceArray.push(<img className = "captured" key = {i} src = {whiteRook} alt = 'whitePawn' />)
      }
    }
    if(piece === 'whiteBishop'){
      for(let i = 0; i < this.state.whiteBishopsCaptured; i++){
          pieceArray.push(<img className = "captured" key = {i} src = {whiteBishop} alt = 'whitePawn' />)
      }
    }
    if(piece === 'whiteQueen'){
      for(let i = 0; i < this.state.whiteQueensCaptured; i++){
          pieceArray.push(<img className = "captured" key = {i} src = {whiteQueen} alt = 'whitePawn' />)
      }
    }
    return pieceArray;
  }
  render(){

    return(
      <div style = {{position: "absolute", paddingLeft: '20px', color: 'white'}}>
        <span>
          {this.display('whitePawn')}
          {this.display('whiteKnight')}
          {this.display('whiteBishop')}
          {this.display('whiteRook')}
          {this.display('whiteQueen')}
        </span>
        </div>
    )
  }
}
