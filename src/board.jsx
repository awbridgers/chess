import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chess from 'chess.js'


export default class Board extends Component{
  constructor(){
    super();
    this.readFEN = this.readFEN.bind(this);
    this.state = {fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 2", pieceArray: [], highlighted: 'none'}
    this.showPossibleMoves = this.showPossibleMoves.bind(this);
  }
  componentDidMount(){
    this.readFEN();
  }
  readFEN(){
    let fenArray = [];
    let piecePlacement =[];

    let temp = "";
    //separate the FEN by row and info
    for(let i=0;  i < this.state.fen.length; i++){
      if(this.state.fen[i] === "/" || this.state.fen[i] === " "){
        fenArray.push(temp);
        temp = "";
      }
      else{
        temp += this.state.fen[i];
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
  showPossibleMoves(e){

  }

  render(){
    return(
      <div  className = 'board'>
        <table className = 'table'>
          <tbody>
            <tr>
              <td id = 'a8' onClick = {this.props.onClick}>{this.state.pieceArray[0]}</td>
              <td id = 'b8' onClick = {this.props.onClick}>{this.state.pieceArray[1]}</td>
              <td id = 'c8' onClick = {this.props.onClick}>{this.state.pieceArray[2]}</td>
              <td id = 'd8' onClick = {this.props.onClick}>{this.state.pieceArray[3]}</td>
              <td id = 'e8' onClick = {this.props.onClick}>{this.state.pieceArray[4]}</td>
              <td id = 'f8' onClick = {this.props.onClick}>{this.state.pieceArray[5]}</td>
              <td id = 'g8' onClick = {this.props.onClick}>{this.state.pieceArray[6]}</td>
              <td id = 'h8' onClick = {this.props.onClick}>{this.state.pieceArray[7]}</td>
            </tr>
            <tr>
              <td id = 'a7' onClick = {this.props.onClick}>{this.state.pieceArray[8]}</td>
              <td id = 'b7' onClick = {this.props.onClick}>{this.state.pieceArray[9]}</td>
              <td id = 'c7' onClick = {this.props.onClick}>{this.state.pieceArray[10]}</td>
              <td id = 'd7' onClick = {this.props.onClick}>{this.state.pieceArray[11]}</td>
              <td id = 'e7' onClick = {this.props.onClick}>{this.state.pieceArray[12]}</td>
              <td id = 'f7' onClick = {this.props.onClick}>{this.state.pieceArray[13]}</td>
              <td id = 'g7' onClick = {this.props.onClick}>{this.state.pieceArray[14]}</td>
              <td id = 'h7' onClick = {this.props.onClick}>{this.state.pieceArray[15]}</td>
            </tr>
            <tr>
              <td id = 'a6' onClick = {this.props.onClick}>{this.state.pieceArray[16]}</td>
              <td id = 'b6' onClick = {this.props.onClick}>{this.state.pieceArray[17]}</td>
              <td id = 'c6' onClick = {this.props.onClick}>{this.state.pieceArray[18]}</td>
              <td id = 'd6' onClick = {this.props.onClick}>{this.state.pieceArray[19]}</td>
              <td id = 'e6' onClick = {this.props.onClick}>{this.state.pieceArray[20]}</td>
              <td id = 'f6' onClick = {this.props.onClick}>{this.state.pieceArray[21]}</td>
              <td id = 'g6' onClick = {this.props.onClick}>{this.state.pieceArray[22]}</td>
              <td id = 'h6' onClick = {this.props.onClick}>{this.state.pieceArray[23]}</td>
            </tr>
            <tr>
              <td id = 'a5' onClick = {this.props.onClick}>{this.state.pieceArray[24]}</td>
              <td id = 'b5' onClick = {this.props.onClick}>{this.state.pieceArray[25]}</td>
              <td id = 'c5' onClick = {this.props.onClick}>{this.state.pieceArray[26]}</td>
              <td id = 'd5' onClick = {this.props.onClick}>{this.state.pieceArray[27]}</td>
              <td id = 'e5' onClick = {this.props.onClick}>{this.state.pieceArray[28]}</td>
              <td id = 'f5' onClick = {this.props.onClick}>{this.state.pieceArray[29]}</td>
              <td id = 'g5' onClick = {this.props.onClick}>{this.state.pieceArray[30]}</td>
              <td id = 'h5' onClick = {this.props.onClick}>{this.state.pieceArray[31]}</td>
            </tr>
            <tr>
              <td id = 'a4' onClick = {this.props.onClick}>{this.state.pieceArray[32]}</td>
              <td id = 'b4' onClick = {this.props.onClick}>{this.state.pieceArray[33]}</td>
              <td id = 'c4' onClick = {this.props.onClick}>{this.state.pieceArray[34]}</td>
              <td id = 'd4' onClick = {this.props.onClick}>{this.state.pieceArray[35]}</td>
              <td id = 'e4' onClick = {this.props.onClick}>{this.state.pieceArray[36]}</td>
              <td id = 'f4' onClick = {this.props.onClick}>{this.state.pieceArray[37]}</td>
              <td id = 'g4' onClick = {this.props.onClick}>{this.state.pieceArray[38]}</td>
              <td id = 'h4' onClick = {this.props.onClick}>{this.state.pieceArray[39]}</td>
            </tr>
            <tr>
              <td id = 'a3' onClick = {this.props.onClick}>{this.state.pieceArray[40]}</td>
              <td id = 'b3' onClick = {this.props.onClick}>{this.state.pieceArray[41]}</td>
              <td id = 'c3' onClick = {this.props.onClick}>{this.state.pieceArray[42]}</td>
              <td id = 'd3' onClick = {this.props.onClick}>{this.state.pieceArray[43]}</td>
              <td id = 'e3' onClick = {this.props.onClick}>{this.state.pieceArray[44]}</td>
              <td id = 'f3' onClick = {this.props.onClick}>{this.state.pieceArray[45]}</td>
              <td id = 'g3' onClick = {this.props.onClick}>{this.state.pieceArray[46]}</td>
              <td id = 'h3' onClick = {this.props.onClick}>{this.state.pieceArray[47]}</td>
            </tr>
            <tr>
              <td id = 'a2' onClick = {this.props.onClick}>{this.state.pieceArray[48]}</td>
              <td id = 'b2' onClick = {this.props.onClick}>{this.state.pieceArray[49]}</td>
              <td id = 'c2' onClick = {this.props.onClick}>{this.state.pieceArray[50]}</td>
              <td id = 'd2' onClick = {this.props.onClick}>{this.state.pieceArray[51]}</td>
              <td id = 'e2' onClick = {this.props.onClick}>{this.state.pieceArray[52]}</td>
              <td id = 'f2' onClick = {this.props.onClick}>{this.state.pieceArray[53]}</td>
              <td id = 'g2' onClick = {this.props.onClick}>{this.state.pieceArray[54]}</td>
              <td id = 'h2' onClick = {this.props.onClick}>{this.state.pieceArray[55]}</td>
            </tr>
            <tr>
              <td id = 'a1' onClick = {this.props.onClick}>{this.state.pieceArray[56]}</td>
              <td id = 'b1' onClick = {this.props.onClick}>{this.state.pieceArray[57]}</td>
              <td id = 'c1' onClick = {this.props.onClick}>{this.state.pieceArray[58]}</td>
              <td id = 'd1' onClick = {this.props.onClick}>{this.state.pieceArray[59]}</td>
              <td id = 'e1' onClick = {this.props.onClick}>{this.state.pieceArray[60]}</td>
              <td id = 'f1' onClick = {this.props.onClick}>{this.state.pieceArray[61]}</td>
              <td id = 'g1' onClick = {this.props.onClick}>{this.state.pieceArray[62]}</td>
              <td id = 'h1' onClick = {this.props.onClick}>{this.state.pieceArray[63]}</td>
            </tr>
            </tbody>
          </table>

      </div>
    )
  }
}
