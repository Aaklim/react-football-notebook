import React, { Component, createContext } from 'react';
import classes from './App.module.scss';
import CreatePlayers from './Containers/CreatePlayers/CreatePlayers';
import PitchBench from './Containers/PitchBench/PitchBench';
import StartPage from './Components/StartPage/StartPage';
import Allstar from './All-star/all-star';
export const Context = createContext();

class App extends Component {
  state = {
    gamesList: [],
    gamesFullstate: [Allstar],
    team: '',
    modalWindowOpen: false,
    errorResult: false,
    errorTeam: false,
    changingState: {
      saved: false,
      games: [],
      inputValue: '',
      namePosition: [],
      players: [],
      playersPosition: [
        'ПН',
        'ЛН',
        'ПЗ',
        'ЛЗ',
        'ВР',
        'ЗАМ1',
        'ЗАМ2',
        'ЗАМ3',
        'ЗАМ4',
      ],
      team: '',
      inputValueStartPage: '',
      inputValueModalWindowOpponent: '',
      inputValueModalWindowResult: '',
      date: [],
      result: '',
      opponent: '',
      playersCounter: true,
      playerNameControl: false,
      playerNameControlLength: false,
    },
  };
  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }
  componentDidMount() {
    if (!localStorage.getItem('APP2')) {
      localStorage.setItem('APP2', JSON.stringify([]));
      localStorage.setItem('APP', JSON.stringify([]));
      localStorage.setItem('Team', JSON.stringify(''));
      localStorage.setItem('StartLine', JSON.stringify([]));
      localStorage.setItem(
        'playersPosition',
        JSON.stringify([...this.state.changingState.playersPosition])
      );
      localStorage.setItem(
        'startState',
        JSON.stringify({ ...this.state.changingState })
      );
    } else {
      let results = [...JSON.parse(localStorage.getItem('APP'))];
      let startLine = [...JSON.parse(localStorage.getItem('StartLine'))];
      let playersPosition = [
        ...JSON.parse(localStorage.getItem('playersPosition')),
      ];
      let matches = results.map((item, index) => (
        <option key={index} value={index}>
          {item.dateNow}
        </option>
      ));
      this.setState({
        team: JSON.parse(localStorage.getItem('Team')),
        gamesList: [...matches],
        gamesFullstate: [...results],
        changingState: {
          ...this.state.changingState,
          players: [...startLine],
          playersPosition: [...playersPosition],
        },
      });
    }
  }
  componentWillUnmount() {
    document.body.style.overflow = 'visible';
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
            playerNameControlLength: false,
          },
        }));
      } else {
        this.setState((state) => ({
          changingState: {
            ...state.changingState,
            playersCounter: false,
            playerNameControlLength: false,
          },
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
    value.length <= 15
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
        changingState: { ...state.changingState, playersPosition: [...array] },
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
      changingState: { ...state.changingState, inputValueStartPage: value },
    }));
  };
  createTeamHandler = (e) => {
    e.preventDefault();
    let name = e.target.elements[0].value;
    let startState = JSON.parse(localStorage.getItem('startState'));
    localStorage.setItem('Team', JSON.stringify(name));
    this.setState({
      team: name,
      changingState: { ...startState, team: name },
    });
  };
  saveResult = (e) => {
    this.handleOpenModalWindow();
  };
  setResultFromLocalStorage = (e) => {
    e.preventDefault();
    let gameNumber = e.target.elements['results'].value;
    let newstate = { ...this.state.gamesFullstate[gameNumber] };
    this.setState((state) => ({
      changingState: { ...newstate },
    }));
  };
  clearHandler = () => {
    let startState = { ...JSON.parse(localStorage.getItem('startState')) };
    localStorage.setItem('APP', JSON.stringify([]));
    localStorage.setItem('Team', JSON.stringify(''));
    localStorage.setItem('StartLine', JSON.stringify([]));
    this.setState({
      changingState: { ...startState },
      gamesFullstate: [],
      gamesList: [],
      team: '',
    });
  };
  onLinkMatchHandler = () => {
    let startState = { ...JSON.parse(localStorage.getItem('startState')) };
    let startLine = [...JSON.parse(localStorage.getItem('StartLine'))];
    let playersPosition = [
      ...JSON.parse(localStorage.getItem('playersPosition')),
    ];
    this.setState({
      changingState: {
        ...startState,
        players: [...startLine],
        playersPosition: [...playersPosition],
      },
    });
  };
  clearStartLine = () => {
    let startstate = { ...JSON.parse(localStorage.getItem('startState')) };
    this.setState((state) => ({
      changingState: { ...startstate },
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
      /ЗАП/.test(positionToAdd)
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
    let startLine = [...this.state.changingState.players];
    localStorage.setItem('StartLine', JSON.stringify(startLine));
    localStorage.setItem('Team', JSON.stringify(this.state.team));
  };
  exampleHandler = () => {
    this.setState({
      changingState: { ...Allstar },
    });
  };
  goalInputHandler = (e) => {
    let name = e.target.name;
    let partName = name.split('goal')[0];
    let value = e.target.value;
    this.setState((state) => ({
      changingState: {
        ...state.changingState,
        [partName]: [state.changingState[partName][0], value],
      },
    }));
  };
  createPlayersList = (players) => {
    return <ol>{players}</ol>;
  };
  handleCloseModalWindow = () => {
    this.setState((state) => ({
      modalWindowOpen: false,
      errorResult: false,
      errorTeam: false,
      changingState: {
        ...state.changingState,
        inputValueModalWindowOpponent: '',
        inputValueModalWindowResult: '',
      },
    }));
  };
  handleOpenModalWindow = () => {
    this.setState({ modalWindowOpen: true });
  };
  valueTeamHandler = (e) => {
    let team = e.target.value;
    this.setState((state) => ({
      errorTeam: false,
      changingState: {
        ...state.changingState,
        inputValueModalWindowOpponent: team,
      },
    }));
  };
  valueResultHandler = (e) => {
    let result = e.target.value;
    this.setState((state) => ({
      errorResult: false,
      changingState: {
        ...state.changingState,
        inputValueModalWindowResult: result,
      },
    }));
  };
  handleSaveTeamResult = () => {
    let opponentTeam = this.state.changingState.inputValueModalWindowOpponent;
    let matchResult = this.state.changingState.inputValueModalWindowResult;
    if (!opponentTeam.trim().length > 0) {
      this.setState({
        errorTeam: true,
      });
    } else if (!matchResult.trim().length > 0) {
      this.setState({
        errorResult: true,
      });
    } else {
      let dateNow = new Date().toLocaleDateString();
      localStorage.setItem('Team', JSON.stringify(this.state.team));
      let playersPosition = [
        ...JSON.parse(localStorage.getItem('playersPosition')),
      ];
      let copyState = {
        dateNow,
        ...this.state.changingState,
        result: matchResult,
        opponent: opponentTeam,
        saved: true,
        team: this.state.team,
        playersPosition: [...playersPosition],
      };
      if (localStorage.getItem('APP')) {
        let fullstate = [...JSON.parse(localStorage.getItem('APP'))];
        let startLine = [...JSON.parse(localStorage.getItem('StartLine'))];
        fullstate.push(copyState);
        localStorage.setItem('APP', JSON.stringify(fullstate));
        let startState = { ...JSON.parse(localStorage.getItem('startState')) };
        let results = [...JSON.parse(localStorage.getItem('APP'))];
        let matches = results.map((item, index) => (
          <option key={index} value={index}>
            {item.dateNow}
          </option>
        ));
        this.setState((state) => ({
          gamesFullstate: [...fullstate],
          gamesList: [...matches],
          modalWindowOpen: false,
          changingState: { ...startState, players: [...startLine] },
        }));
      }
    }
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
      goalInputHandler: this.goalInputHandler,
      createPlayersList: this.createPlayersList,
      handleCloseModalWindow: this.handleCloseModalWindow,
      handleOpenModalWindow: this.handleOpenModalWindow,
      valueTeamHandler: this.valueTeamHandler,
      valueResultHandler: this.valueResultHandler,
      handleSaveTeamResult: this.handleSaveTeamResult,
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
                inputValueStartPage={
                  this.state.changingState.inputValueStartPage
                }
                createTeamInputHandler={this.createTeamInputHandler}
                exampleHandler={this.exampleHandler}
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
