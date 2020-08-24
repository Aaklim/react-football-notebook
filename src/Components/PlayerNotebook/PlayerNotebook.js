import React from 'react';
import classes from './PlayerNotebook.module.scss';

const PlayerNotebook = ({
  state,
  name,
  formOnChangeHandler,
  formHandler,
  playersPosition,
  createOption,
  deletePlayerhandler
}) => {
  let positionSelected = state[name];

  let applyClasses = classes.main;
  if (
    typeof positionSelected !== 'undefined' &&
    /SUB/.test(positionSelected[0]) !== true
  ) {
    applyClasses = [classes.main, classes.selected].join(' ');
  } else if (
    typeof positionSelected !== 'undefined' &&
    /SUB/.test(positionSelected[0]) === true
  ) {
    applyClasses = [classes.main, classes.sub].join(' ');
  }

  return (
    <li className={applyClasses}>
      <div className={classes.nameSelected}>
        <span>{name}</span>
        <div className={classes.positionSelected}>{`Поз:${
          positionSelected ? positionSelected[0] : ''
        }`}</div>
      </div>
      <form
        name={name}
        onSubmit={formHandler}
        onChange={formOnChangeHandler}
        onClick={deletePlayerhandler}
      >
        <select
          name={name}
          disabled={positionSelected}
          hidden={positionSelected}
        >
          {createOption(playersPosition)}
        </select>
        <button name='BTN1' disabled={positionSelected}>
          УСТ
        </button>
        <button name='BTN2' type='button' onClick={deletePlayerhandler}>
          X
        </button>

        <label htmlFor='goal'>Гол: </label>
        {positionSelected ? (
          <input
            type='number'
            name='goal'
            value={positionSelected ? state[name + 'goal'] : 0}
          />
        ) : null}
      </form>
    </li>
  );
};

export default PlayerNotebook;
