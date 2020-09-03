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
      <div className={classes.title}>Введите название команды</div>
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
