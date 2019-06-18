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
} = createActions({
  'FETCH ARTICLES': undefined,
  'CREATE ARTICLE': (data, callback) => ({ data, callback }),
  'UPDATE ARTICLE': (data) => ({ data }),
  'DELETE ARTICLE': (data) => ({ data }),
  'SAVE DATA ARTICLES': articles =>  articles ,
  'ADD ARTICLE': article => ({ article }),
  'EDIT ARTICLE': article => ({ article }),
  'REMOVE ARTICLE': id => ({id}),
});
