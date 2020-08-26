import React, { useContext } from 'react';
import classes from './ChoosePosition.module.scss';
import { Context } from '../../../App';
import PlayerNotebook from '../../../Components/PlayerNotebook/PlayerNotebook';

const ChoosePosition = () => {
  const {
    changingState,
    formHandler,
    createOption,
    formOnChangeHandler,
    deletePlayerhandler,
    goalInputHandler,
    createPlayersList,
  } = useContext(Context);
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
      goalInputHandler={goalInputHandler}
    />
  ));

  return (
    <div className={classes.main}>
      {createPlayersList(players)}
    </div>
  );
};

export default ChoosePosition;
