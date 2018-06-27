import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chess from './chess.jsx'

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
  }
  render() {
    return (
      <div>
        <div  className = 'board'>
          <table className = 'table'>
            <tbody>
              {this.state.board.map((x,i)=>{
                return(
                  <tr key = {i} className = {"row" + i}>
                    {x.map((y,j) => {
                      if((i % 2 === 0 && j % 2 !=0) || (i % 2 != 0 && j % 2 === 0)){
                        return (
                          <td key ={j} className = {'dark-square'}>

                          </td>
                        )
                      }
                      else{
                        return (
                          <td key ={j} className = {'light-square'}>
                            Q
                          </td>
                        )
                      }
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
        </div>
      </div>

    );
  }
}

export default App;
