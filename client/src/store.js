import { createStore, combineReducers } from 'redux';

import home from './reducers/home';

const reducers = combineReducers({
  home
});

export default createStore(reducers);