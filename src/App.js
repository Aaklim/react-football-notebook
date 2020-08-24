import React, { Component, createContext } from 'react';
import classes from './App.module.scss';
import CreatePlayers from './Containers/CreatePlayers/CreatePlayers';
import PitchBench from './Containers/PitchBench/PitchBench';
import StartPage from './Components/StartPage/StartPage';
import Allstar from './All-star/all-star'
export const Context = createContext();

class App extends Component {
  state = {
    gamesList: [],
    gamesFullstate: [],
    team: '',
    changingState: {
      saved: false,
      games: [],
      inputValue: '',
      namePosition: [],
      players: [],
      playersPosition: [
        'RF',
        'LF',
        'RD',
        'LD',
        'GK',
        'SUB1',
        'SUB2',
        'SUB3',
        'SUB4',
      ],
      team: '',
      inputValue2: '',
      date: [],
      result: '',
      opponent: '',
      playersCounter: true,
      playerNameControl: false,
      playerNameControlLength: false,
    },
  };

  componentDidMount() {
    if (!localStorage.getItem('APP')) {
      localStorage.setItem('APP', JSON.stringify([]));
      localStorage.setItem('Team', JSON.stringify(''));
      localStorage.setItem('StartLine', JSON.stringify([]));
      localStorage.setItem(
        'startState',
        JSON.stringify(this.state.changingState)
      );
    } else {
      let results = JSON.parse(localStorage.getItem('APP'));
      let startLine = JSON.parse(localStorage.getItem('StartLine'));

      let matches = results.map((item, index) => (
        <option key={index} value={index}>
          {item.dateNow}
        </option>
      ));
      this.setState({
        team: JSON.parse(localStorage.getItem('Team')),
        gamesList: matches,
        gamesFullstate: results,
        changingState: {...this.state.changingState,players:startLine},
      });
    }
  }

  buttonHandler = (e) => {
    e.preventDefault();
    if (
      this.state.changingState.inputValue.length > 0 &&
      isNaN(this.state.changingState.inputValue) &&
      !this.state.changingState.players.find(
        (item) => item === this.state.changingState.inputValue
      )
    ) {
      if (this.state.changingState.players.length < 9) {
        this.setState((state) => ({
          changingState: {
            ...state.changingState,
            players: [
              ...state.changingState.players,
              state.changingState.inputValue,
            ],
            inputValue: '',
          },
        }));
      } else {
        this.setState((state) => ({
          changingState: { ...state.changingState, playersCounter: false },
        }));
      }
    } else {
      this.setState((state) => ({
        changingState: { ...state.changingState, playerNameControl: true },
      }));
    }
  };
  inputHandler = (e) => {
    let value = e.target.value;
    value.length < 14
      ? this.setState((state) => ({
          changingState: {
            ...state.changingState,
            inputValue: value,
            playerNameControl: false,
            playerNameControlLength: false,
          },
        }))
      : this.setState((state) => ({
          changingState: {
            ...state.changingState,
            playerNameControlLength: true,
          },
        }));
  };
  deletePlayerPosition = (value) => {
    let array = [...this.state.changingState.playersPosition];
    let index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState((state) => ({
        changingState: { ...state.changingState, playersPosition: array },
      }));
    }
  };
  formHandler = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let position = e.target.elements[e.target.name].value;
    this.setState((state) => ({
      changingState: {
        ...state.changingState,
        namePosition: [
          ...state.changingState.namePosition,
          { name: name, position: position },
        ],
        [name]: [position, 0],
      },
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
    this.setState((state) => ({
      changingState: { ...state.changingState, inputValue2: value },
    }));
  };
  createTeamHandler = (e) => {
    e.preventDefault();
    let name = e.target.elements[0].value;
    localStorage.setItem('Team',JSON.stringify(name))
    this.setState((state) => ({
      team: name,
      changingState: { ...state.changingState, team: name },
    }));
  };
  formOnChangeHandler = (e) => {
    if (e.target.name === 'goal') {
      let name = e.currentTarget.name;
      let event = e.currentTarget.elements['goal'].value;
      console.log(name, event);
      this.setState((state) => ({
        changingState: { ...state.changingState, [name + 'goal']: event },
      }));
    }
  };
  saveResult = (e) => {
    let opponentTeam = prompt('Введите название команды соперника');
    let matchresult = prompt('Введите результат матча');
   //
    let dateNow = new Date().toLocaleDateString();
    localStorage.setItem('Team', JSON.stringify(this.state.team));
    let copyState = {
      dateNow,
      ...this.state.changingState,
      result: matchresult,
      opponent: opponentTeam,
      saved: true,
      team: this.state.team,
    };
    if (localStorage.getItem('APP')) {
      let fullstate = JSON.parse(localStorage.getItem('APP'));
      let startLine=JSON.parse(localStorage.getItem('StartLine'))
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
        changingState: { ...startState,players:startLine },
      });
    }
  };
  stateTolocalStorage = (state) => {
    let copyState = Array.isArray(state) ? [...state] : { ...state };
    console.log(copyState);
    let jsonCopystate = JSON.stringify(copyState);
    return jsonCopystate;
  };
  setResultFromLocalStorage = (e) => {
    e.preventDefault();
    let startState = JSON.parse(localStorage.getItem('startState'));
    console.log('StartState', startState);
    let gameNumber = e.target.elements['results'].value;
    console.log(gameNumber);
    if (gameNumber === 'initial') {
      this.setState((state) => ({
        changingState: { ...startState },
      }));
    } else {
      this.setState((state) => ({
        changingState: { ...state.gamesFullstate[gameNumber] },
      }));
    }
  };
  clearHandler = () => {
    let startState = JSON.parse(localStorage.getItem('startState'));
    localStorage.setItem('APP', JSON.stringify([]));
    localStorage.setItem('Team', JSON.stringify(''));
    this.setState((state) => ({
      changingState: { ...startState },
      gamesFullstate: [],
      gamesList: [],
      team: '',
    }));
  };
  onLinkMatchHandler = () => {
    let startState = JSON.parse(localStorage.getItem('startState'));
    let startLine = JSON.parse(localStorage.getItem('StartLine'));
    this.setState((state) => ({
      changingState: { ...startState,players:startLine },
    }));
  };
  clearStartLine = () => {
    this.setState((state) => ({
      changingState: { ...state.changingState, namePosition: [], players: [] },
    }));
  };
  deleteFromstate = (player, changingState) => {
    let name = player;
    if (this.state.changingState[name]) {
      let workState = { ...changingState };
      let playersFromState = workState.players;
      let positionsFromState = [...this.state.changingState.playersPosition];
      let positionToAdd = this.state.changingState[name][0];
      //
      let indexofName = playersFromState.lastIndexOf(name);
      playersFromState.splice(indexofName, 1);
      //
      let namePositionfromstate = workState.namePosition;
      let indexOFposition = namePositionfromstate.findIndex(
        (item) => item.name === name
      );
      namePositionfromstate.splice(indexOFposition, 1);
      //
      /SUB/.test(positionToAdd)
        ? positionsFromState.push(positionToAdd)
        : positionsFromState.unshift(positionToAdd);
      this.setState((state) => ({
        changingState: {
          ...state.changingState,
          players: [...playersFromState],
          namePosition: [...namePositionfromstate],
          [name]: undefined,
          playersPosition: [...positionsFromState],
          playersCounter: true,
          inputValue: '',
        },
      }));
    } else {
      let workState = { ...changingState };
      let playersFromState = workState.players;
      let indexofName = playersFromState.lastIndexOf(name);
      playersFromState.splice(indexofName, 1);
      this.setState((state) => ({
        changingState: {
          ...state.changingState,
          players: [...playersFromState],
          playersCounter: true,
          inputValue: '',
        },
      }));
    }
  };
  deletePlayerhandler = (e) => {
    if (e.currentTarget.name !== e.target.name && e.target.name === 'BTN2') {
      let name = e.currentTarget.name;
      this.deleteFromstate(name, this.state.changingState);
    }
  };
  saveStartline = () => {
    let startLine = this.state.changingState.players ;
    localStorage.setItem('StartLine', JSON.stringify(startLine));
    localStorage.setItem('Team', JSON.stringify(this.state.team));
  };
  render() {
    const fullcontext = {
      state: this.state,
      changingState: this.state.changingState,
      buttonHandler: this.buttonHandler,
      inputHandler: this.inputHandler,
      formHandler: this.formHandler,
      createOption: this.createOption,
      formButton: this.formButton,
      saveResult: this.saveResult,
      formOnChangeHandler: this.formOnChangeHandler,
      setResultFromLocalStorage: this.setResultFromLocalStorage,
      clearHandler: this.clearHandler,
      onLinkMatchHandler: this.onLinkMatchHandler,
      deletePlayerhandler: this.deletePlayerhandler,
      clearStartLine: this.clearStartLine,
      saveStartline: this.saveStartline,
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
