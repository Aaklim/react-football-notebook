import React from 'react'
import classes from './BenchPlayer.module.scss'

const BenchPlayer = ({ name,state }) => {
  return (
    <div className={classes.main}>
      <span>{name}</span><br />
      <img src='benchplayer.png' alt='Player' /><br/>
      <span className={classes.goals}>{state[name+'goal']?state[name+'goal']+'⚽':null}</span>

    </div>
  );
};
export default BenchPlayer;
