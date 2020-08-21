import React from 'react';
import classes from './Pitch.module.scss';
import PlayerPitch from '../../../Components/PlayerPitch/PlayerPitch';

const Pitch = (props) => {
  let pitchPlayers = props.pitchPlayers;
  console.log('PitchProps',props)

  const namePosition = pitchPlayers.map((obj) => (
    <PlayerPitch
      key={obj.name}
      name={obj.name}
      position={obj.position}
      state={props.state}
    />
  ));

  return (
    <div className={classes.main}>
      {props.state.saved ? (
        <div className={classes.scoreBoard}>
          <span>
            {props.state.team} VS {props.state.opponent}
          </span>
          <br />
          <span>{props.state.result}</span>
        </div>
      ) : null}
      {namePosition}
    </div>
  );
};
export default Pitch;
