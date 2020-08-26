import React, { useContext } from 'react';
import { Context } from '../../App';
import classes from './Results.module.scss';
import { Link } from 'react-router-dom';

const Results = () => {
  const context = useContext(Context);
  const setResultFromLocalStorage = context.setResultFromLocalStorage;
  const clearHandler = context.clearHandler;
  const games = context.state.gamesList;
  return (
    <div className={classes.main}>
      <form action='' onSubmit={setResultFromLocalStorage}>
        <select name='results' id=''>
          {games}
        </select>

        <button className={classes.buttonChoice}>Выбрать</button>
        <Link to='/'>
          <button type='button' onClick={clearHandler}>
            Очистить историю
          </button>
        </Link>
      </form>
    </div>
  );
};
export default Results;
