import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Form from '../../components/Article/Form';
import { fetchArticles, deleteArticle } from '../../actions/articleAction'
import ArticleTable from '../Article/ArticleTable'

const mapStateToProps = state => {
  return {
    articles: state.home.articles,
    countData: state.home.articlesCount,
  }
};

// const mapDispatchToProps = dispatch => ({
//   onLoad: () => {
//     dispatch({ type: 'HOME_PAGE_LOADED' })
//   },
//   onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
//   setEdit: article => dispatch({ type: 'SET_EDIT', article }),
// });

export default connect(mapStateToProps, { fetchArticles, deleteArticle })((props) => {
  const { articles = [], fetchArticles, deleteArticle, countData} = props;
  // useEffect(() => {
  //   fetchArticles();
  // }, [])

  const [isOpen, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null)

  const handleDelete = (article) => {
    setSelectedArticle(article._id);
    deleteArticle(article)
  }

  const handleEdit = (id) => {
    setSelectedArticle(id);
    setOpen(true);
  }

  return (
    <div style={{ background: '#e6e6e6', height: 'auto'}}>
      <div style={{ display: 'flex', textAlign: 'center', alignSelf: 'center',justifyContent: 'center'}}>
        <div style={{ width: '600px' }}>
          <div>
            <h1 style={{ textAlign: 'center'}}>LightBlog</h1>
          </div>
          <Form  />
          <ArticleTable {...{countData, handleDelete, handleEdit, selectedArticle, isOpen, setOpen, articles, fetchArticles}}/>
        </div>
      </div>
    </div>
  )
});
