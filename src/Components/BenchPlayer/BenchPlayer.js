import React from 'react'
import classes from './BenchPlayer.module.scss'

const BenchPlayer = ({ name }) => {
  return (
    <div className={classes.main}>
      <img src='benchplayer.png' alt='Player' />
      <br />
      <span>{name}</span>
    </div>
  );
};
export default BenchPlayer;
