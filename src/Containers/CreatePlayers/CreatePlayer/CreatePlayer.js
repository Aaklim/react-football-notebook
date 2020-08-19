import React, { useContext } from 'react';

import classes from './CreatePlayer.module.scss';
import { Context } from '../../../App';

const CreatePlayer = () => {
  const context = useContext(Context);
  const playersCounter = context.state.playersCounter;
  const playerNameControl = context.state.playerNameControl;
  const playerNameControlLength=context.state.playerNameControlLength

  console.log('playersCounter', playersCounter);

  return (
    <div className={classes.main}>
      <h1>{context.state.team}</h1>
      <form action='' name='createPlayerForm' onSubmit={context.buttonHandler}>
        <span>{playerNameControl ? 'Ошибка имени!!!' : null}</span>
        <span>{playerNameControlLength? 'Максимальная длинна!!!' : null}</span>
        <input
          type='text'
          value={playersCounter ? context.state.inputValue : ''}
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
      <form action=''>
        <select name='' id=''>
          this.state.team
        </select>
      </form>
    </div>
  );
};
export default CreatePlayer;
