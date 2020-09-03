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
      {games.length > 0 ? (
        <form action='' onSubmit={setResultFromLocalStorage}>
          <select name='results' id=''>
            {games}
          </select>
          <button className={classes.buttonChoice}>Выбрать</button>
        </form>
      ) : (
        <div className={classes.noresult}>Нет сохраненных результатов</div>
      )}
      <Link to='/'>
        <button type='button' onClick={clearHandler}>
        {games.length > 0 ? <span>Очистить историю</span> : <span>Cменить команду</span>}
        </button>
      </Link>
    </div>
  );
};
export default Results;
