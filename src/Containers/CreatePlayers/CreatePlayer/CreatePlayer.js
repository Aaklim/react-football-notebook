import React, { useContext,useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import classes from './CreatePlayer.module.scss';
import { Context } from '../../../App';
import Results from '../../../Components/Results/Results';
import ModalWindow from '../../../Components/ModalWindow/ModalWindow';

const CreatePlayer = () => {
  const context = useContext(Context);
  const playersCounter = context.changingState.playersCounter;
  const playerNameControl = context.changingState.playerNameControl;
  const playerNameControlLength = context.changingState.playerNameControlLength;
  const onLinkMatchHandler = context.onLinkMatchHandler;
  const clearStartLine = context.clearStartLine;
  const saveStartline = context.saveStartline;

  return (
    <Router>
      <div className={classes.main}>
        <nav>
          <ul>
            <li>
              <Link
                className={classes.link}
                to='/'
                onClick={onLinkMatchHandler}
              >
                Матч
              </Link>
            </li>
            <li>
              <Link className={classes.link} to='/results'>
                Результаты
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/'>
            <div className={classes.teamName}>{context.state.team}</div>
            <form
              name='createPlayerForm'
              autoComplete='on'
              onSubmit={context.buttonHandler}
            >
              <div className={classes.message}>{playerNameControl ? 'Ошибка имени!!!' : null}</div>
              <div className={classes.message}>
                {playerNameControlLength ? 'Максимальная длинна!!!' : null}
              </div>
              <div className={classes.message}>
              {playersCounter?null:'Макс кол-во 9 игроков'}
              </div>
              <input
                type='text'
                value={playersCounter ? context.changingState.inputValue : ''}
                placeholder= {playersCounter?'Введите имя игрока':null}
                onChange={context.inputHandler}
                disabled={!playersCounter}
              />
              <br />
              <button>Заявить игрока</button>
            </form>
            <button className={classes.innerbutton1} onClick={saveStartline}>
              Сохранить состав
            </button>
            <button className={classes.innerbutton2} onClick={clearStartLine}>
              Очистить состав
            </button>
            <button onClick={context.saveResult}>Сохранить результат</button>
            <ModalWindow context={context}/>
          </Route>
          <Route path='/results' component={Results} />
        </Switch>
      </div>
    </Router>
  );
};
export default CreatePlayer;
