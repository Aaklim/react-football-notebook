import React from 'react';
import classes from './PlayerNotebook.module.scss';

const PlayerNotebook = ({ state,name, formHandler, playersPosition, createOption }) => {

  let positionSelected = state[name];
  console.log(state[name]);
  let applyClasess = classes.main;
  if (typeof positionSelected != 'undefined' && positionSelected != 'SUB') {
    applyClasess = [classes.main, classes.selected].join(' ');
  }


  return (
    <li className={applyClasess}>
      <span>{name}{`-ПОЗ:${positionSelected?positionSelected:''}`}</span>
      <form name={name} onSubmit={formHandler}>
        <select name={name} disabled={positionSelected}>
            {createOption(playersPosition)}
        </select>
        <button disabled={positionSelected}>ПОЗ</button>
        <button onClick>X</button>
      </form>
    </li>
  );
};
export default PlayerNotebook;
