import React from 'react';
import classes from './PlayerPitch.module.scss';

const PlayerPitch = ({ name, position, state }) => {
  let imgSrc = position === 'GK' ? 'playerGK.png' : 'player.png';
  return (
    <div className={[classes.main, classes[position]].join(' ')}>
      <img src={imgSrc} alt='Player' />

      <br />
      <span>{name}</span>
      <br />
      <span>{state[name][1] === 0 ? null : state[name][1] + '⚽'}</span>
    </div>
  );
};
export default PlayerPitch;
