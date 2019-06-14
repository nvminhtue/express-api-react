import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({ type: 'SUBMIT_ARTICLE', payload }),
  onEdit: payload => dispatch({ type: 'EDIT_ARTICLE', payload }),
});

const mapStateToProps = state => ({
  articleToEdit: state.home.articleToEdit,
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if(props.articleToEdit) {
      const { title, body, author } = data;
      setData({
        ...data,
        [title]: props.articleToEdit.title,
        [body]: props.articleToEdit.body,
        [author]: props.articleToEdit.author,
      })
    }
  })

  const handleChangeField = (key, event) => {
    setData({
      ...data,
      [key]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const { title, body, author } = data;
    const { onSubmit, onEdit, articleToEdit } = props;
    if(!articleToEdit) {
      return axios.post('http://localhost:8080/api/articles', {
        title,
        body,
        author,
      })
        .catch((err) => alert(err))
        .then((res) => {
          onSubmit(res.data.articles)
        .then(() => setData({
          [title]: '',
          [body]: '',
          [author]: '',
        }));
      })
    } else {
      return axios.patch(`http://localhost:8080/api/articles/${articleToEdit._id}`, {
        title,
        body,
        author,
      })
      .then((res) => onEdit(res.data))
      .then(() => setData({
        [title]: '',
        [body]: '',
        [author]: '',
      }));
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '300px'}}>
      <input style={{width: 'auto', height: '50px', border: '2px solid gray', borderRadius: '4px'}} placeholder="Article Title"
        onChange={(e) => handleChangeField('title', e)}
        value={data.title}
      />
      <textarea style={{width: 'auto', height: '70px', border: '2px solid gray', borderRadius: '4px'}} placeholder="Article Description"
        onChange={(e) => handleChangeField('body', e)}
        value={data.body}
      />
      <input style={{width: 'auto', height: '50px',border: '2px solid gray', borderRadius: '4px'}} placeholder="Article Author"
        onChange={(e) => handleChangeField('author', e)}
        value={data.author}
      />
      <button style={{alignSelf: 'flex-end', height: "35px", width: "70px", backgroundColor: '#3b77d6', border: '2px solid gray', borderRadius: '4px'}}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
});