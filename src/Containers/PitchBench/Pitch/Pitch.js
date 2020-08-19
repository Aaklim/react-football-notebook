import React from 'react'
import classes from './Pitch.module.scss'
import PlayerPitch from '../../../Components/PlayerPitch/PlayerPitch'


const Pitch = (props) => {
  let pitchPlayers = props.pitchPlayers;

  const namePosition = pitchPlayers.map((obj) => (
    <PlayerPitch
      key={obj.name}
      name={obj.name}
      position={obj.position}
      state={props.state}
    />
  ));

  return <div className={classes.main}>{namePosition}</div>;
};
export default Pitch;
