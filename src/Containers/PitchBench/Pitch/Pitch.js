import React from 'react';
import classes from './Pitch.module.scss';
import PlayerPitch from '../../../Components/PlayerPitch/PlayerPitch';

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

  return (
    <div className={classes.main}>
      {props.state.saved ? (
        <div className={classes.scoreBoard}>
          <div className={classes.team}>{props.state.team}</div>
          <div className={classes.result}>{props.state.result}</div>
          <div className={classes.team}>{props.state.opponent}</div>
        </div>
      ) : null}
      {namePosition}
    </div>
  );
};
export default Pitch;
