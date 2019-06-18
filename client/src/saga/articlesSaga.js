import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { fetchArticles, saveDataArticles, addArticle, createArticle,
  updateArticle, editArticle, deleteArticle, removeArticle } from '../actions/articleAction'

function* fetchArticlesSaga() {
  try {
    const respone = yield call(axios.get, 'http://localhost:8080/api/articles')
    yield put(saveDataArticles(respone.data))
  } catch (e) {
    //do nothing
  }
}

function* createArticleSaga(action) {
  const { data: { body, title, author }, callback } = action.payload;
  try {
    const respone = yield call(axios.post, 'http://localhost:8080/api/articles', {title, body, author})
    yield put(addArticle(respone.data.articles))
  } catch(e) {
    //do nothing
  } finally {
    callback();
  }
}

function* updateArticleSaga(action) {
  const { data: { body, title, author, _id } } = action.payload;
  try {
    const respone = yield call(axios.patch, `http://localhost:8080/api/articles/${_id}`, {
      title,
      body,
      author,
    })
    yield put(editArticle(respone.data.article))
  }
  catch(e) {
    //do nothing
  }
}

function* deleteArticleSaga(action) {
  const { data: { _id } } =  action.payload;
  try {
    const respone = yield call(axios.delete, `http://localhost:8080/api/articles/${_id}`)
    yield put(removeArticle(respone.data.id))
  }
  catch(e) {
    //do nothing
  }
}

export default function*() {
  yield takeLatest (fetchArticles, fetchArticlesSaga),
  yield takeEvery (createArticle, createArticleSaga),
  yield takeEvery (updateArticle, updateArticleSaga),
  yield takeEvery (deleteArticle, deleteArticleSaga)
}
