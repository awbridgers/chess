import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chess from 'chess.js'

import blackKing from './images/blackKing2.png'
import blackQueen from './images/blackQueen2.png'
import blackRook from './images/blackRook2.png'
import blackKnight from './images/blackKnight2.png'
import blackBishop from './images/blackBishop2.png'
import blackPawn from './images/blackPawn2.png'

import whiteKing from './images/whiteKing2.png'
import whiteQueen from './images/whiteQueen2.png'
import whiteRook from './images/whiteRook2.png'
import whiteKnight from './images/whiteKnight2.png'
import whiteBishop from './images/whiteBishop2.png'
import whitePawn from './images/whitePawn2.png'

export default class Board extends Component{
  constructor(){
    super();
    this.readFEN = this.readFEN.bind(this);
    this.state = {fen: "rnbqkbnr/p1ppppp1/7p/1pP5/8/8/PP1PPPPP/RNBQKBNR w KQkq b6 0 3", pieceArray: [], target: "", moves:[]}
    this.returnPiece = this.returnPiece.bind(this)
  }
  componentDidUpdate(prevProps){
    //read in the props on update and convert them into array form
    if(this.props.fen !== prevProps.fen){
      this.readFEN();
    }

  }
  componentDidMount(){
    this.readFEN();
  }
  returnPiece(char){
    let image = null;
    if(char === 'k'){image = blackKing;}
    if(char === 'q'){image = blackQueen;}
    if(char === 'r'){image = blackRook;}
    if(char === 'n'){image = blackKnight;}
    if(char === 'b'){image = blackBishop;}
    if(char === 'p'){image = blackPawn;}
    if(char === 'K'){image = whiteKing;}
    if(char === 'Q'){image = whiteQueen;}
    if(char === 'R'){image = whiteRook;}
    if(char === 'N'){image = whiteKnight;}
    if(char === 'B'){image = whiteBishop;}
    if(char === 'P'){image = whitePawn;}

    return {backgroundImage:"url(" + image + ")", backgroundSize: "45px", backgroundRepeat: "no-repeat", backgroundPosition: "center"}


  }
  readFEN(){
    let fenArray = [];
    let piecePlacement =[];
    console.log(this.props.fen)
    let temp = "";
    //separate the FEN by row and info
    for(let i=0;  i < this.props.fen.length; i++){
      if(this.props.fen[i] === "/" || this.props.fen[i] === " "){
        fenArray.push(temp);
        temp = "";
      }
      else{
        temp += this.props.fen[i];
      }
    }
    //once we have an array of each row, interpret the FEN
    fenArray.forEach((row) => {
      for(let i=0; i < row.length; i++){
        //if the current char isn't a number, its a piece, push to array
        if(isNaN(row[i])){
          piecePlacement.push(row[i]);
        }
        //the char is a number, fill that number of blanks in the array
        else{
          let blankSpaces = parseInt(row[i],10);
          for(let j=0; j < blankSpaces; j++){
            piecePlacement.push("");
          }
        }
      }

    })
    this.setState({pieceArray: piecePlacement})

  }
  render(){
    return(
      <div  className = 'board'>
        <table className = 'table'>
          <tbody>
            <tr>
              <td id = 'a8' onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[0])}></td>
              <td id = 'b8' className = {this.props.chooseClass('b8')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[1])}></td>
              <td id = 'c8' className = {this.props.chooseClass('c8')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[2])}></td>
              <td id = 'd8' className = {this.props.chooseClass('d8')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[3])}></td>
              <td id = 'e8' className = {this.props.chooseClass('e8')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[4])}></td>
              <td id = 'f8' className = {this.props.chooseClass('f8')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[5])}></td>
              <td id = 'g8' className = {this.props.chooseClass('g8')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[6])}></td>
              <td id = 'h8' className = {this.props.chooseClass('h8')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[7])}></td>
            </tr>
            <tr>
              <td id = 'a7' className = {this.props.chooseClass('a7')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[8])}></td>
              <td id = 'b7' className = {this.props.chooseClass('b7')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[9])}></td>
              <td id = 'c7' className = {this.props.chooseClass('c7')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[10])}></td>
              <td id = 'd7' className = {this.props.chooseClass('d7')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[11])}></td>
              <td id = 'e7' className = {this.props.chooseClass('e7')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[12])}></td>
              <td id = 'f7' className = {this.props.chooseClass('f7')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[13])}></td>
              <td id = 'g7' className = {this.props.chooseClass('g7')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[14])}></td>
              <td id = 'h7' className = {this.props.chooseClass('h7')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[15])}></td>
            </tr>
            <tr>
              <td id = 'a6' className = {this.props.chooseClass('a6')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[16])}></td>
              <td id = 'b6' className = {this.props.chooseClass('b6')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[17])}></td>
              <td id = 'c6' className = {this.props.chooseClass('c6')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[18])}></td>
              <td id = 'd6' className = {this.props.chooseClass('d6')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[19])}></td>
              <td id = 'e6' className = {this.props.chooseClass('e6')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[20])}></td>
              <td id = 'f6' className = {this.props.chooseClass('f6')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[21])}></td>
              <td id = 'g6' className = {this.props.chooseClass('g6')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[22])}></td>
              <td id = 'h6' className = {this.props.chooseClass('h6')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[23])}></td>
            </tr>
            <tr>
              <td id = 'a5' className = {this.props.chooseClass('a5')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[24])}></td>
              <td id = 'b5' className = {this.props.chooseClass('b5')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[25])}></td>
              <td id = 'c5' className = {this.props.chooseClass('c5')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[26])}></td>
              <td id = 'd5' className = {this.props.chooseClass('d5')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[27])}></td>
              <td id = 'e5' className = {this.props.chooseClass('e5')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[28])}></td>
              <td id = 'f5' className = {this.props.chooseClass('f5')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[29])}></td>
              <td id = 'g5' className = {this.props.chooseClass('g5')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[30])}></td>
              <td id = 'h5' className = {this.props.chooseClass('h5')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[31])}></td>
            </tr>
            <tr>
              <td id = 'a4' className = {this.props.chooseClass('a4')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[32])}></td>
              <td id = 'b4' className = {this.props.chooseClass('b4')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[33])}></td>
              <td id = 'c4' className = {this.props.chooseClass('c4')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[34])}></td>
              <td id = 'd4' className = {this.props.chooseClass('d4')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[35])}></td>
              <td id = 'e4' className = {this.props.chooseClass('e4')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[36])}></td>
              <td id = 'f4' className = {this.props.chooseClass('f4')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[37])}></td>
              <td id = 'g4' className = {this.props.chooseClass('g4')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[38])}></td>
              <td id = 'h4' className = {this.props.chooseClass('h4')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[39])}></td>
            </tr>
            <tr>
              <td id = 'a3' className = {this.props.chooseClass('a3')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[40])}></td>
              <td id = 'b3' className = {this.props.chooseClass('b3')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[41])}></td>
              <td id = 'c3' className = {this.props.chooseClass('c3')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[42])}></td>
              <td id = 'd3' className = {this.props.chooseClass('d3')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[43])}></td>
              <td id = 'e3' className = {this.props.chooseClass('e3')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[44])}></td>
              <td id = 'f3' className = {this.props.chooseClass('f3')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[45])}></td>
              <td id = 'g3' className = {this.props.chooseClass('g3')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[46])}></td>
              <td id = 'h3' className = {this.props.chooseClass('h3')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[47])}></td>
            </tr>
            <tr>
              <td id = 'a2' className = {this.props.chooseClass('a2')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[48])}></td>
              <td id = 'b2' className = {this.props.chooseClass('b2')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[49])}></td>
              <td id = 'c2' className = {this.props.chooseClass('c2')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[50])}></td>
              <td id = 'd2' className = {this.props.chooseClass('d2')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[51])}></td>
              <td id = 'e2' className = {this.props.chooseClass('e2')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[52])}></td>
              <td id = 'f2' className = {this.props.chooseClass('f2')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[53])}></td>
              <td id = 'g2' className = {this.props.chooseClass('g2')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[54])}></td>
              <td id = 'h2' className = {this.props.chooseClass('h2')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[55])}></td>
            </tr>
            <tr>
              <td id = 'a1' className = {this.props.chooseClass('a1')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[56])}></td>
              <td id = 'b1' className = {this.props.chooseClass('b1')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[57])}></td>
              <td id = 'c1' className = {this.props.chooseClass('c1')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[58])}></td>
              <td id = 'd1' className = {this.props.chooseClass('d1')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[59])}></td>
              <td id = 'e1' className = {this.props.chooseClass('e1')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[60])}></td>
              <td id = 'f1' className = {this.props.chooseClass('f1')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[61])}></td>
              <td id = 'g1' className = {this.props.chooseClass('g1')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[62])}></td>
              <td id = 'h1' className = {this.props.chooseClass('h1')} onClick = {this.props.onClick} style = {this.returnPiece(this.state.pieceArray[63])}></td>
            </tr>
            </tbody>
          </table>

      </div>
    )
  }
}
