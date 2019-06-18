import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import Form from '../../components/Article/Form';
import { fetchArticles, deleteArticle } from '../../actions/articleAction'
import {EditModal} from '../Article/Form/ModalForm';

const mapStateToProps = state => {
  return {
    articles: state.home.articles
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
  const { articles = [], fetchArticles, deleteArticle} = props;
  useEffect(() => {
    fetchArticles();
  }, [])

  const [isOpen, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null)

  const handleDelete = (article) => {
    setSelectedArticle(article._id);
    deleteArticle(article)
  }

  const handleEdit = (id) => {
    // const { setEdit } = props;

    // setEdit(article);
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
          <Form />
          <div>
            <div>
              {
                articles && articles.map((article, index) => {
                return(
                  <div key={index} style={{ border: '2px solid brown', borderRadius: '4px', margin: '10px 0'}} >
                    <div>{article.title}</div>
                    <div style={{borderTop: '2px solid gray', background: 'white'}}>{article.body}</div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', background: 'white'}} >
                      <span>{article.author}</span>
                      <span>{moment(new Date(article.updatedAt)).fromNow()}</span>
                    </div>
                    <div>
                      <div onClick={() => handleEdit(article._id)}>EDIT</div>
                      <div onClick={() => handleDelete(article)}>DELETE</div>
                    </div>
                    <EditModal {...{ isOpen, setOpen, selectedArticle}} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
