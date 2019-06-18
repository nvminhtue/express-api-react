import { handleActions } from 'redux-actions';

import { saveDataArticles, addArticle, editArticle, removeArticle } from '../actions/articleAction'

export default handleActions({
  [saveDataArticles]: (state, { payload }) => {
    const {  articles = [] } = payload;
    return {
      ...state,
      articles
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

// export default (state = {}, action) => {
//   switch(action.type) {
//     case 'HOME_PAGE_LOADED':
//       const { payload: { articles = [] } = [] } = action;
//       return {
//         ...state,
//         articles
//       };
//     case 'SUBMIT_ARTICLE':
//       return {
//         ...state,
//         articles: [
//           action.payload,
//           ...state.articles,
//         ]
//       };
//     case 'DELETE_ARTICLE':
//       return {
//         ...state,
//         articles: state.articles.filter((article) => article._id !== action.id),
//       };
//     case 'SET_EDIT':
//       return {
//         ...state,
//         articleToEdit: action.article,
//       };
//     case 'EDIT_ARTICLE':
//       return {
//         ...state,
//         articles: state.articles.map((article) => {
//           if(article._id === action.payload.article._id) {
//             return {
//               ...action.payload.article,
//             }
//           }
//           return article;
//         }),
//         articleToEdit: undefined,
//       }
//     default:
//       return state;
//   }
// };