export default (state = {}, action) => {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.payload.articles,
      };
    case 'SUBMIT_ARTICLE':
      return {
        ...state,
        articles: [
          action.payload,
          ...state.articles,
        ]
      };
    case 'DELETE_ARTICLE':
      return {
        ...state,
        articles: state.articles.filter((article) => article._id !== action.id),
      };
    case 'SET_EDIT':
      return {
        ...state,
        articleToEdit: action.article,
      };
    case 'EDIT_ARTICLE':
      return {
        ...state,
        articles: state.articles.map((article) => {
          if(article._id === action.payload.article._id) {
            return {
              ...action.payload.article,
            }
          }
          return article;
        }),
        articleToEdit: undefined,
      }
    default:
      return state;
  }
};