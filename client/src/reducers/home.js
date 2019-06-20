import { handleActions } from 'redux-actions';

import { saveDataArticles, addArticle, editArticle, removeArticle, getArticle } from '../actions/articleAction'

export default handleActions({
  [saveDataArticles]: (state, { payload }) => {
    const {  articles = [], articlesCount } = payload;
    return {
      ...state,
      articles,
      articlesCount,
    };
  },
  [addArticle]: (state, { payload }) => {
    const { article } = payload;
    return {
      ...state,
      articles: [
        article,
        ...state.articles
      ]
    }
  },
  [getArticle]: (state, { payload } ) => {
    const { id } = payload;
    const { articles = [] } = state;
    
    return {
      ...state,
      selectedArticle: articles.find((val) => {
        return val._id === id;
      })
    }
  },
  [editArticle]: (state, { payload }) => {
    return {
      ...state,
      articles: state.articles.map((article) => {
        if(article._id === payload.article._id) {
          return {
            ...payload.article,
          }
        }
        return article;
      }),
    }
  },
  [removeArticle]: (state, { payload }) => {
    return {
      ...state,
      articles: state.articles.filter((article) => article._id !== payload.id )
    }
  }
}, {})
