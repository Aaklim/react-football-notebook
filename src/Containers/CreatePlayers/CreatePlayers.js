import React from 'react'
import classes from './CreatePlayers.module.scss'
import CreatePlayer from './CreatePlayer/CreatePlayer'
import ChoosePosition from './ChoosePosition/ChoosePosition'

const CreatePlayers = () => {
  return (
    <div className={classes.main}>
      <CreatePlayer/>
      <ChoosePosition/>
    </div>
  );
};
export default CreatePlayers;
