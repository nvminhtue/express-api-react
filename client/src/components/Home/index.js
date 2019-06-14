import React, { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import Form from '../../components/Article/Form';

const mapStateToProps = state => {
  return {
    articles: state.home.articles
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'HOME_PAGE_LOADED', payload }),
  onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
  setEdit: article => dispatch({ type: 'SET_EDIT', article }),
});

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
  const { onLoad, articles = [] } = props;

  useEffect(() => {
    axios.get('http://localhost:8080/api/articles')
      .then((res) => onLoad(res.data))
  }, [])

  const handleDelete = (id) => {
   const { onDelete } = props;

   return axios.delete(`http://localhost:8080/api/articles/${id}`)
    .then(() => onDelete(id));
  }

  const handleEdit = (article) => {
    const { setEdit } = props;

    setEdit(article);
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
                      <div onClick={() => handleEdit(article)}>EDIT</div>
                      <div onClick={() => handleDelete(article._id)}>DELETE</div>
                    </div>
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
