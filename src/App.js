import React,{Component,createContext} from 'react';
import classes from'./App.module.scss';
import CreatePlayers from './Containers/CreatePlayers/CreatePlayers';
import PitchBench from './Containers/PitchBench/PitchBench';
import {Test} from './Test/Test'
import StartPage from './Components/StartPage/StartPage';
import stateLocal from './statejs'
export const Context=createContext()

class App extends Component {
  state = {
    gamesList:[],
    gamesFullstate:[],
    team:'',
    changingState:{
    reload:true,
    games:[],
    inputValue: '',
    namePosition: [],
    players: [],
    playersPosition: ['RF', 'LF', 'RD', 'LD', 'GK', 'SUB'],
    team: '',
    inputValue2: '',
    date: [],
    result: [],
    playersCounter: true,
    playerNameControl: false,
    playerNameControlLength: false,
    }
  }

  componentDidMount() {
    console.log('componentDidmount')
 if (!localStorage.getItem('APP')) {
   localStorage.setItem('APP', JSON.stringify([]))
   localStorage.setItem('Team', JSON.stringify(''))
   localStorage.setItem('startState', JSON.stringify(this.state.changingState))
 } else {
   let results = JSON.parse(localStorage.getItem('APP'));
   let matches = results.map((item,index) => <option key={index} value={index}>{item.dateNow}</option>);
   this.setState({
     team: JSON.parse(localStorage.getItem('Team')),
     gamesList: matches,
     gamesFullstate:results,
   });
 }

  }

  buttonHandler = (e) => {
    e.preventDefault();
    console.log('ISNAN', isNaN(this.state.changingState.inputValue));
    if (this.state.changingState.inputValue.length > 0 && isNaN(this.state.changingState.inputValue)) {
      if (this.state.changingState.players.length < 9) {
        this.setState((state) => ({
          changingState:{...state.changingState, players: [...state.changingState.players, state.changingState.inputValue],
          inputValue: '',
        }}));
      } else {
        this.setState(state=>({
          changingState:{...state.changingState, playersCounter: false }}));
      }
    } else {
      this.setState(state=>({
        changingState:{...state.changingState, playerNameControl: true }}));
    }
  };
  inputHandler = (e) => {
    let value = e.target.value;

    console.log(value.length);
    value.length < 14
      ? this.setState(state=>({
          changingState:{...state.changingState,inputValue: value,
          playerNameControl: false,
          playerNameControlLength: false,
      }}))
      : this.setState(state=>({changingState:{...state.changingState, playerNameControlLength: true }}));
  };
  deletePlayerPosition = (value) => {
    if (value !== 'SUB') {
      let array = [...this.state.changingState.playersPosition];
      let index = array.indexOf(value);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState(state=>({changingState:{...state.changingState,playersPosition: array }}));
      }
    }
  };
  formHandler = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let position = e.target.elements[e.target.name].value;
    this.setState((state) => ({changingState:{...state.changingState,
      namePosition: [...state.changingState.namePosition, { name: name, position: position }],
      [name]: [position, 0],
    }}));
    this.deletePlayerPosition(position);
  };
  createOption = (option) => {
    let optionlist = option.map((pos) => (
      <option key={pos} value={pos}>
        {pos}
      </option>
    ));

    return optionlist;
  };
  createTeamInputHandler = (e) => {
    let value = e.target.value;
    this.setState(state=>({changingState:{...state.changingState,inputValue2: value }}));
  };
  createTeamHandler = (e) => {
    e.preventDefault();
    let name = e.target.elements[0].value;
    this.setState(state=>({
      team:name,
      changingState:{...state.changingState, team: name }}));
  };
  formOnChangeHandler = (e) => {
    if (e.target.name === 'goal') {
      let name = e.currentTarget.name;
      let event = e.currentTarget.elements['goal'].value;
      console.log(name, event);
      this.setState(state=>({
        changingState:{...state.changingState,[name + 'goal']: event,  }}))


    }
  };
  saveResult = (e) => {

    let dateNow = new Date().toLocaleDateString();
    localStorage.setItem('Team', JSON.stringify(this.state.changingState.team));
    let copyState = { dateNow, ...this.state.changingState };
    if (localStorage.getItem('APP')) {
      let fullstate = JSON.parse(localStorage.getItem('APP'));
      fullstate.push(copyState);
      localStorage.setItem('APP', JSON.stringify(fullstate));
      let startState = JSON.parse(localStorage.getItem('startState'));
      let results = JSON.parse(localStorage.getItem('APP'));
      let matches = results.map((item, index) => (
        <option key={index} value={index}>
          {item.dateNow}
        </option>
      ));
      this.setState({
        gamesFullstate: fullstate,
        gamesList: matches,
        changingState: { ...startState },
      });
    }

  };

  stateTolocalStorage = (state) => {
    let copyState = Array.isArray(state) ? [...state] : { ...state };
    console.log(copyState);
    let jsonCopystate = JSON.stringify(copyState);
    return jsonCopystate;
  };
  setResultFromLocalStorage=(e)=>{
    e.preventDefault();
    let startState = JSON.parse(localStorage.getItem('startState'));
    console.log('StartState',startState)
    let gameNumber = e.target.elements['results'].value;
    console.log(gameNumber)
    if (gameNumber === 'initial') {
      this.setState((state) => ({
        changingState: { ...startState },
      }));
    } else {
      this.setState((state) => ({
        changingState: { ...state.gamesFullstate[gameNumber] },
      }));
    }

  }
  clearHandler=()=>{
    let startState=JSON.parse(localStorage.getItem('startState'))
    localStorage.removeItem('Team')
    localStorage.removeItem('APP')
    this.setState(state=>({
      changingState:{...startState},
      gamesFullstate:[],
      gamesList:[],
      team:''
    }))
  }
  render() {

    const fullcontext = {
      state: this.state,
      changingState:this.state.changingState,
      buttonHandler: this.buttonHandler,
      inputHandler: this.inputHandler,
      formHandler: this.formHandler,
      createOption: this.createOption,
      formButton: this.formButton,
      saveResult: this.saveResult,
      formOnChangeHandler: this.formOnChangeHandler,
      setResultFromLocalStorage:this.setResultFromLocalStorage,
      clearHandler:this.clearHandler
    };

    return (
      <Context.Provider value={fullcontext}>
        <div className={classes.wrapper}>
          <div className={classes.main}>

            {this.state.team.length > 1 ? (
              <CreatePlayers />
            ) : (
              <StartPage
                createTeamHandler={this.createTeamHandler}
                inputValue2={this.state.changingState.inputValue2}
                createTeamInputHandler={this.createTeamInputHandler}
              />
            )}
            <PitchBench state={this.state.changingState} />
          </div>
        </div>
      </Context.Provider>
    );
  }
}
export default App;
