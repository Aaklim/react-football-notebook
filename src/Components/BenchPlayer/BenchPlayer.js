import React from 'react';
import classes from './BenchPlayer.module.scss';

const BenchPlayer = ({ name, state }) => {
  return (
    <div className={classes.main}>
      <span>{name}</span>
      <br />
      <img src='benchplayer.png' alt='Player' />
      <br />
      <span className={classes.goals}>
        {state[name][1] === 0 ? null : state[name][1] + '⚽'}
      </span>
    </div>
  );
};
export default BenchPlayer;
