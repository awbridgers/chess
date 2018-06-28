import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chess from 'chess.js'
import Board from './board.jsx'

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
    //handle castling
    if(newString === 'O-O'){
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
    this.state = {target: "", fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
    this.chess = new Chess();
    this.clickSquare = this.clickSquare.bind(this);
    this.chooseTarget = this.chooseTarget.bind(this);
    this.possibleMoves =[];
    this.firstClick = false;
    this.secondClick = false;
    this.turn = 'player';

  }
  componentDidMount(){
    this.chess.load(this.state.fen)
  }
  componentDidUpdate(){
    if(this.turn === 'computer'){
      console.log("computer turn")
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
    //first click
    if(this.turn === "player"){
      if(!this.firstClick){
        //find all the possible moves
        this.possibleMoves = returnSquare(this.chess.moves({square: e.target.id}), e.target.id);
        //if the piece can move
        if(this.possibleMoves.length > 0){
          this.firstClick = true;
          console.log(this.possibleMoves);
          //set the clicked on square to state.target
          this.setState({target: e.target.id})
        }
      }
        //second click
      else{
        //if the click is on a possible move square, move the first click piece to second click location
        let location = e.target.id;
        for(let i=0; i < this.possibleMoves.length; i++){
          if(location === this.possibleMoves[i].substr(this.possibleMoves[i].length -2)){
            this.chess.move({from: this.state.target, to: location});
            this.turn = 'computer';
          }
        }

        this.possibleMoves =[];
        this.firstClick = false;
        this.setState({fen: this.chess.fen(), target:""})


      }
    }
  }
  render() {
    return (
      <div className = 'App'>
        <Board onClick = {this.clickSquare} chooseClass = {this.chooseTarget} fen = {this.state.fen}/>
      </div>

    );
  }
}

export default App;
