import React,{Component,createContext} from 'react';

import classes from'./App.module.scss';
import CreatePlayers from './Containers/CreatePlayers/CreatePlayers';
import PitchBench from './Containers/PitchBench/PitchBench';
import {Test} from './Test/Test'
export const Context=createContext()

class App extends Component {
     state={
       inputValue:'',
       namePosition:[],
       players:Test.players,
       playersPosition:['RF','LF','RD','LD','GK','SUB'],

     }
  buttonHandler=(e)=>{
    e.preventDefault()
    this.setState((state) => ({
      players: [...state.players, state.inputValue],
      inputValue: '',
    }));


  }
  inputHandler=(e)=>{
    let value=e.target.value
    console.log(value)
    this.setState({inputValue:value})

  }
  deletePlayerPosition=(value)=>{
    if(value !== 'SUB'){
    let array=[...this.state.playersPosition]
    let index=array.indexOf(value)
    if(index !== -1){
      array.splice(index,1)
      this.setState({playersPosition:array})
    }
  }
  }
  formHandler=(e)=>{
    e.preventDefault();
    let name = e.target.name;

    let position = e.target.elements[e.target.name].value;
    this.setState((state) => ({
      namePosition: [...state.namePosition, { name: name, position: position }],
      [name]:position
    }));
    this.deletePlayerPosition(position)
  }
  createOption = (option) => {
    let optionlist = option.map((pos) => (
      <option key={pos} value={pos} selected={pos ==='SUB'?true:false}>
        {pos}
      </option>
    ));

    return optionlist;
  };

  render() {
    const fullcontext = {
      state: this.state,
      buttonHandler: this.buttonHandler,
      inputHandler: this.inputHandler,
      formHandler: this.formHandler,
      createOption:this.createOption,
    };

    return (
      <Context.Provider value={fullcontext}>
        <div className={classes.main}>
          <CreatePlayers />
          <PitchBench namePosition={this.state.namePosition}/>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
