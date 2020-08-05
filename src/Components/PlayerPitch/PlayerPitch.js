import React from 'react'
import classes from './PlayerPitch.module.scss'

const PlayerPitch =({name,position})=>{

    console.log(position)

    return (
        <div className={[classes.main,classes[position]].join(' ')}>
            <img src="player.png" alt="Player"/><br/>
            <span>{name}</span>

        </div>
    )

}
export default PlayerPitch;
