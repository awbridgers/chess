import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chess from 'chess.js'
import Board from './board.jsx'

const buildArray = () => {
  const innerArray = [1,2,3,4,5,6,7,8]
  const outerArray = []
  for(let i = 0; i < 8; i++){
    outerArray.push(innerArray);
  }
  return outerArray;
}



class App extends Component {
  constructor(){
    super();
    this.state = {board: buildArray()}
    this.chess = new Chess();
    this.clickSquare = this.clickSquare.bind(this)
  }
  clickSquare(e){
    let possibleMoves = this.chess.moves({square: e.target.id})
    console.log(possibleMoves)

  }
  render() {
    return (
      <div>
        <Board onClick = {this.clickSquare}/>
      </div>

    );
  }
}

export default App;
