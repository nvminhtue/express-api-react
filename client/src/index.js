import React from 'react';
import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>, document.getElementById('root')
);
