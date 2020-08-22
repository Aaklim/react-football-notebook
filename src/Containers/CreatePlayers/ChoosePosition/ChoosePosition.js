import React,{useContext} from 'react'
import classes from './ChoosePosition.module.scss'

import {Context} from '../../../App'
import PlayerNotebook from '../../../Components/PlayerNotebook/PlayerNotebook'


const ChoosePosition = () => {
  const { changingState, formHandler, createOption,formOnChangeHandler,deletePlayerhandler } = useContext(Context);
  const playersPosition = changingState.playersPosition;
  const players = changingState.players.map((player) => (
    <PlayerNotebook
      key={player}
      name={player}
      formHandler={formHandler}
      playersPosition={playersPosition}
      createOption={createOption}
      state={changingState}
      formOnChangeHandler={formOnChangeHandler}
      deletePlayerhandler={deletePlayerhandler}
    />
  ));

  return (
    <div className={classes.main}>
      <ol>{players}</ol>
    </div>
  );
};

export default ChoosePosition;
