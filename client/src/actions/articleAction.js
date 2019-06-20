import { createActions } from 'redux-actions';

export const {
  fetchArticles,
  saveDataArticles,
  createArticle,
  addArticle,
  updateArticle,
  editArticle,
  deleteArticle,
  removeArticle,
  getArticle,
} = createActions({
  'FETCH ARTICLES': page => ({ page }),
  'CREATE ARTICLE': (data, callback) => ({ data, callback }),
  'UPDATE ARTICLE': (data) => ({ data }),
  'DELETE ARTICLE': (data) => ({ data }),
  'SAVE DATA ARTICLES': articles =>  articles ,
  'ADD ARTICLE': article => ({ article }),
  'EDIT ARTICLE': article => ({ article }),
  'REMOVE ARTICLE': id => ({id}),
  'GET ARTICLE': id => ({id})
});
