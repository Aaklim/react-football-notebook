import React,{useContext} from 'react'
import classes from './ChoosePosition.module.scss'

import {Context} from '../../../App'
import PlayerNotebook from '../../../Components/PlayerNotebook/PlayerNotebook'


const ChoosePosition = () => {
  const { state, formHandler, createOption,formOnChangeHandler } = useContext(Context);
  const playersPosition = state.playersPosition;
  const players = state.players.map((player) => (
    <PlayerNotebook
      key={player}
      name={player}
      formHandler={formHandler}
      playersPosition={playersPosition}
      createOption={createOption}
      state={state}
      formOnChangeHandler={formOnChangeHandler}
    />
  ));

  return (
    <div className={classes.main}>
      <ol>{players}</ol>
    </div>
  );
};

export default ChoosePosition;
