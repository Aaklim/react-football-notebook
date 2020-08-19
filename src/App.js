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
    inputValue: '',
    namePosition: [],
    players: [],
    playersPosition: ['RF', 'LF', 'RD', 'LD', 'GK', 'SUB'],
    team: '',
    inputValue2: '',
    games: [],
    date: [],
    result: [],
    playersCounter: true,
    playerNameControl: false,
    playerNameControlLength: false,
  };

  componentDidMount() {
   const temporaryState=JSON.parse(stateLocal)
   this.setState({...temporaryState})
  }

  buttonHandler = (e) => {
    e.preventDefault();
    console.log('ISNAN', isNaN(this.state.inputValue));
    if (this.state.inputValue.length > 0 && isNaN(this.state.inputValue)) {
      if (this.state.players.length < 9) {
        this.setState((state) => ({
          players: [...state.players, state.inputValue],
          inputValue: '',
        }));
      } else {
        this.setState({ playersCounter: false });
      }
    } else {
      this.setState({ playerNameControl: true });
    }
  };
  inputHandler = (e) => {
    let value = e.target.value;

    console.log(value.length);
    value.length < 14
      ? this.setState({
          inputValue: value,
          playerNameControl: false,
          playerNameControlLength: false,
        })
      : this.setState({ playerNameControlLength: true });
  };
  deletePlayerPosition = (value) => {
    if (value !== 'SUB') {
      let array = [...this.state.playersPosition];
      let index = array.indexOf(value);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ playersPosition: array });
      }
    }
  };
  formHandler = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let position = e.target.elements[e.target.name].value;
    this.setState((state) => ({
      namePosition: [...state.namePosition, { name: name, position: position }],
      [name]: [position, 0],
    }));
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
    this.setState({ inputValue2: value });
  };
  createTeamHandler = (e) => {
    e.preventDefault();
    let name = e.target.elements[0].value;
    this.setState({ team: name });
  };
  formOnChangeHandler = (e) => {
    if (e.target.name === 'goal') {
      let name = e.currentTarget.name;
      let event = e.currentTarget.elements['goal'].value;
      console.log(name, event);
      this.setState({
        [name + 'goal']: event,
      });
    }
  };
  saveResult = (e) => {
    localStorage.setItem('Team', JSON.stringify(`${this.state.team}`));
    localStorage.setItem(`${this.state.team}`,this.stateTolocalStorage(this.state))
    this.setState((state) => ({
      games: [...state.games, state.team],
      date: [...state.date, new Date().toDateString()],
    }));
  };

  stateTolocalStorage = (state) => {
    let copyState = Array.isArray(state) ? [...state] : { ...state };
    console.log(copyState);
    let jsonCopystate = JSON.stringify(copyState);
    return jsonCopystate;
  };
  render() {
    console.log('render');
    const fullcontext = {
      state: this.state,
      buttonHandler: this.buttonHandler,
      inputHandler: this.inputHandler,
      formHandler: this.formHandler,
      createOption: this.createOption,
      formButton: this.formButton,
      saveResult: this.saveResult,
      formOnChangeHandler: this.formOnChangeHandler,
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
                inputValue2={this.state.inputValue2}
                createTeamInputHandler={this.createTeamInputHandler}
              />
            )}
            <PitchBench state={this.state} />
          </div>
        </div>
      </Context.Provider>
    );
  }
}
export default App;
