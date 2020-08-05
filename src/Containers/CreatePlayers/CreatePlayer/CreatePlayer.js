import React,{useContext} from 'react'


import classes from './CreatePlayer.module.scss'
import {Context} from '../../../App'

const CreatePlayer = () => {
  const context = useContext(Context);

  return (
    <div className={classes.main}>
      <h1>Создание игрока</h1>
      <form action='' name='createPlayerForm' onSubmit={context.buttonHandler}>
        <input
          type='text'
          value={context.state.inputValue}
          placeholder='Введите имя'
          onChange={context.inputHandler}
        />
        <br />
        <button>Заявить игрока</button>
      </form>
    </div>
  );
};
export default CreatePlayer;
