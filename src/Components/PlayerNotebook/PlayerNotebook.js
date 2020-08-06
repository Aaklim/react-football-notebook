import React from 'react';
import classes from './PlayerNotebook.module.scss';

const PlayerNotebook = ({ state,name,formButton, formHandler, playersPosition, createOption }) => {

  let positionSelected = state[name];
  console.log(state[name]);
  let applyClasess = classes.main;
  if (typeof positionSelected !== 'undefined' && positionSelected !== 'SUB') {
    applyClasess = [classes.main, classes.selected].join(' ');
  }


  return (
    <li className={applyClasess}>
      <span>{name}{`-ПОЗ:${positionSelected?positionSelected:''}`}</span>
      <form name={name} onSubmit={formHandler}>
        <select name={name} disabled={positionSelected} defaultValue='SUB'>
            {createOption(playersPosition)}
        </select>
        <button name='BTN1' disabled={positionSelected}>ПОЗ</button>
        <button name='BTN2' onClick={formButton}>X</button>
      </form>
    </li>
  );
};
export default PlayerNotebook;
