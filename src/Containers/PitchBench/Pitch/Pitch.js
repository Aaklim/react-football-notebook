import React from 'react'
import classes from './Pitch.module.scss'
import PlayerPitch from '../../../Components/PlayerPitch/PlayerPitch'


const Pitch = ({ pitchPlayers }) => {
  const namePosition = pitchPlayers.map((obj) => (
    <PlayerPitch name={obj.name} position={obj.position} />
  ));

  console.log('PITCH', namePosition);

  return <div className={classes.main}>{namePosition}</div>;
};
export default Pitch;
