import React from 'react'
import classes from './BenchPlayer.module.scss'

const BenchPlayer = ({ name }) => {
  return (
    <div className={classes.main}>
      <span>{name}</span><br />
      <img src='benchplayer.png' alt='Player' />

    </div>
  );
};
export default BenchPlayer;
