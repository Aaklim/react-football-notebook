import React from 'react'
import classes from './Bench.module.scss'
import BenchPlayer from '../../../Components/BenchPlayer/BenchPlayer'


const Bench =({subPlayers})=>{
   const players=subPlayers.map(obj=><BenchPlayer name={obj.name}/>)
    return (
        <div className={classes.main}>
            <div className={classes.players}>
              {players}
            </div>

        </div>
    )
}
export default Bench;
