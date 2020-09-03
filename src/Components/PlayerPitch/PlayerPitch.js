import React from 'react';
import classes from './PlayerPitch.module.scss';

const PlayerPitch = ({ name, position, state }) => {
  let positionEng=null;
  switch(position){
    case'ПН':
    positionEng='RF';
    break;
    case'ЛН':
    positionEng='LF';
    break;
    case'ЛЗ':
    positionEng='LD';
    break;
    case'ПЗ':
    positionEng='RD';
    break;
    case'ВР':
    positionEng='GK';
    break;
    default:
      break;

  }
  let imgSrc = positionEng === 'GK' ? 'playerGK.png' : 'player.png';
  return (
    <div className={[classes.main, classes[positionEng]].join(' ')}>
      <img  src={imgSrc} alt='Player' />

      <br />
      <div className={classes.name}>{name}</div>
      <span>{state[name][1] === 0 ? null : state[name][1] + '⚽'}</span>
    </div>
  );
};
export default PlayerPitch;
