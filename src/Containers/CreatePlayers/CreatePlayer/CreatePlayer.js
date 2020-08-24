import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import classes from './CreatePlayer.module.scss';
import { Context } from '../../../App';
import Results from '../../../Components/Results/Results';

const CreatePlayer = () => {
  const context = useContext(Context);
  const playersCounter = context.changingState.playersCounter;
  const playerNameControl = context.changingState.playerNameControl;
  const playerNameControlLength = context.changingState.playerNameControlLength;
  const onLinkMatchHandler=context.onLinkMatchHandler;
  const clearStartLine=context.clearStartLine;
  const saveStartline=context.saveStartline;



  return (
    <Router>
      <div className={classes.main}>
        <nav>
          <ul>
            <li>
              <Link className={classes.link}  to='/'onClick={onLinkMatchHandler}>
                Матч
              </Link>
            </li>
            <li>
              <Link className={classes.link} to='/results'>Результаты</Link>
            </li>

          </ul>
        </nav>
        <Switch>
          <Route exact path='/'>
        <h1>{context.state.team}</h1>

        <form
          action=''
          name='createPlayerForm'
          autoComplete='on'
          onSubmit={context.buttonHandler}
        >
          <span>{playerNameControl ? 'Ошибка имени!!!' : null}</span>
          <span>
            {playerNameControlLength ? 'Максимальная длинна!!!' : null}
          </span>
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
        <button className={classes.innerbutton1} onClick={saveStartline}>Сохранить состав</button>
        <button className={classes.innerbutton2} onClick={clearStartLine}>Очистить состав</button>
        <button onClick={context.saveResult}>Сохранить результат</button>
        </Route>
        <Route path='/results' component={Results} />
        </Switch>
      </div>
    </Router>
  );
};
export default CreatePlayer;
