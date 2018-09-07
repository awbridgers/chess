import React from 'react';
import './App.css';


const Controller = (props) => (
  <div>
    <button onClick = {props.newGame}>New Game</button>
    <p>
      <button onClick = {props.undo}>Undo</button>
      <button onClick = {props.hint}>Hint</button>
    </p>
  </div>
)

export default Controller
