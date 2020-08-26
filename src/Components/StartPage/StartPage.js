import React from 'react';
import classes from './StartPage.module.scss';

const StartPage = ({
  createTeamHandler,
  inputValue2,
  createTeamInputHandler,
  exampleHandler,
}) => {
  return (
    <div className={classes.main}>
      <h1>Введите название команды</h1>
      <form action='createTeam' autoComplete='on' onSubmit={createTeamHandler}>
        <input
          type='text'
          value={inputValue2}
          onChange={createTeamInputHandler}
          name='createTeam'
        />
        <br />
        <button>Сохранить</button>
      </form>
      <button
        type='button'
        className={classes.example}
        onClick={exampleHandler}
      >
        Посмотреть пример
      </button>
    </div>
  );
};
export default StartPage;
