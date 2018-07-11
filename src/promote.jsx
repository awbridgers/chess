import React, { Component } from 'react';
import whiteQueen from './images/whiteQueen2.png';
import whiteRook from './images/whiteRook2.png';
import whiteKnight from './images/whiteKnight2.png';
import whiteBishop from './images/whiteBishop2.png';




export default class Promote extends Component{
  render(){
    return(
      <div className = 'choosePromotion'>
        <img id ='q' src = {whiteQueen} alt = "white queen" onClick = {this.props.onClick} />
        <img id = 'r' src = {whiteRook} alt = "white rook" onClick = {this.props.onClick}/>
        <img id = 'b' src = {whiteBishop} alt = "white bishop" onClick = {this.props.onClick}/>
        <img id = 'n' src = {whiteKnight} alt = "white knight" onClick = {this.props.onClick}/>


      </div>
    )
  }
}
