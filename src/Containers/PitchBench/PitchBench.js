import React from 'react'
import classes from './PitchBench.module.scss'
import Pitch from './Pitch/Pitch'
import Bench from './Bench/Bench';

const PitchBench = (props) => {
let namePosition=props.state.namePosition
const pitchPlayers=[]
const subPlayers=[]

namePosition.forEach(obj=>{
  if(obj.position ==='SUB'){
subPlayers.push(obj)
  } else {
    pitchPlayers.push(obj)
  }
})



  return (
    <div className={classes.main}>
      <Pitch pitchPlayers={pitchPlayers} state={props.state}/>
      <Bench subPlayers={subPlayers} state={props.state}/>
    </div>
  );
};
export default PitchBench;
