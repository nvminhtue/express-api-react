import { all, fork } from 'redux-saga/effects';

import articlesSaga from './articlesSaga';

export default function *() {
  yield all ([
    fork(articlesSaga)
  ])
}