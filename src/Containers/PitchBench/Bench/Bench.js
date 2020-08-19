import React from 'react'
import classes from './Bench.module.scss'
import BenchPlayer from '../../../Components/BenchPlayer/BenchPlayer'


const Bench =({subPlayers,state})=>{
   const players=subPlayers.map(obj=><BenchPlayer key={obj.name} name={obj.name} state={state}/>)
    return (
        <div className={classes.main}>
            <div className={classes.players}>
              {players}
            </div>

        </div>
    )
}
export default Bench;
