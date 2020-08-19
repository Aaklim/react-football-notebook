import React from 'react';
import App from '../../App';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={App} />
        </Switch>
      </Router>
    </div>
  );
};
export default Main;
