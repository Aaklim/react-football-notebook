import React from 'react';
import classes from './PlayerNotebook.module.scss';

const PlayerNotebook = ({
  state,
  name,
  formHandler,
  playersPosition,
  createOption,
  deletePlayerhandler,
  goalInputHandler,
}) => {
  let positionSelected = state[name];
  let applyClasses = classes.main;
  if (
    typeof positionSelected !== 'undefined' &&
    /ЗАМ/.test(positionSelected[0]) !== true
  ) {
    applyClasses = [classes.main,classes.selected].join(' ');
  } else if (
    typeof positionSelected !== 'undefined' &&
    /ЗАМ/.test(positionSelected[0]) === true
  ) {
    applyClasses = [classes.main, classes.sub].join(' ');
  }


  return (
    <li className={applyClasses}>
      <div className={classes.name}>{name}</div>
      <div className={classes.selectedform}>
        {positionSelected ?
          <div className={classes.positionselected}>
           { 'поз:' + positionSelected[0]}
          </div>
         : null}

        <form name={name} onSubmit={formHandler} onClick={deletePlayerhandler}>
          <select name={name} hidden={positionSelected}>
            {createOption(playersPosition)}
          </select>
          <button
            name='BTN1'
            className={classes.BTN1}
            hidden={positionSelected}
          >
            УСТ.ПОЗ
          </button>
          <button
            name='BTN2'
            className={classes.BTN2}
            type='button'
            onClick={deletePlayerhandler}
          >
            X
          </button>

          {positionSelected ? (
            <div className={classes.labelgoal}>
              <label htmlFor='goal'>Гол: </label>
              <input
                type='number'
                name={name + 'goal'}
                value={state[name] ? state[name][1] : ''}
                onChange={goalInputHandler}
              />
            </div>
          ) : null}
        </form>
      </div>
    </li>
  );
};

export default PlayerNotebook;
