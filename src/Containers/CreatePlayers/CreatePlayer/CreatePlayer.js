import React, { useContext } from 'react';

import classes from './CreatePlayer.module.scss';
import { Context } from '../../../App';

const CreatePlayer = () => {
  const context = useContext(Context);
  const playersCounter = context.changingState.playersCounter;
  const playerNameControl = context.changingState.playerNameControl;
  const playerNameControlLength = context.changingState.playerNameControlLength;
  const games = context.state.gamesList;
  const setResultFromLocalStorage = context.setResultFromLocalStorage;
  const clearHandler=context.clearHandler

  console.log('gameList', games);

  return (
    <div className={classes.main}>
      <h1>{context.state.team}</h1>
      <form
        action=''
        name='createPlayerForm'
        autoComplete='on'
        onSubmit={context.buttonHandler}
      >
        <span>{playerNameControl ? 'Ошибка имени!!!' : null}</span>
        <span>{playerNameControlLength ? 'Максимальная длинна!!!' : null}</span>
        <input
          type='text'
          value={playersCounter ? context.changingState.inputValue : ''}
          placeholder={
            playersCounter ? 'Введите имя игрока' : 'Макс кол-во 9 игроков'
          }
          onChange={context.inputHandler}
          disabled={!playersCounter}
        />
        <br />

        <button>Заявить игрока</button>
      </form>
      <button onClick={context.saveResult}>Сохранить результат</button>
      <form action='' onSubmit={setResultFromLocalStorage}>
        <label htmlFor='results'>Результаты:</label>
        <select name='results' id=''>
          <option value='initial'>Новый матч</option>
          {games}
        </select>

        <button>Х</button>
        <button type='button' onClick={clearHandler}>
          Очистить историю
        </button>
      </form>
    </div>
  );
};
export default CreatePlayer;
