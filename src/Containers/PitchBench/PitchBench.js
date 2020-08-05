import React from 'react'
import classes from './PitchBench.module.scss'
import Pitch from './Pitch/Pitch'
import Bench from './Bench/Bench';

const PitchBench = ({namePosition}) => {

const pitchPlayers=[]
const subPlayers=[]

namePosition.forEach(obj=>{
  if(obj.position ==='SUB'){
subPlayers.push(obj)
  } else {
    pitchPlayers.push(obj)
  }
})

  console.log('pitchPlayers',pitchPlayers,'subplayers',subPlayers)

  return (
    <div className={classes.main}>
      <Pitch pitchPlayers={pitchPlayers}/>
      <Bench subPlayers={subPlayers}/>
    </div>
  );
};
export default PitchBench;
