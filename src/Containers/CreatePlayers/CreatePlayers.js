import React from 'react';
import classes from './CreatePlayers.module.scss';
import CreatePlayer from './CreatePlayer/CreatePlayer';
import ChoosePosition from './ChoosePosition/ChoosePosition';
import { Route, Switch } from 'react-router-dom';
import StartPage from '../../Components/StartPage/StartPage';

const CreatePlayers = () => {
  return (
    <div className={classes.main}>
      <CreatePlayer />
      <ChoosePosition />
    </div>
  );
};
export default CreatePlayers;
