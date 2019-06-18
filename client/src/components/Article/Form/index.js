import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { createArticle, updateArticle } from '../../../actions/articleAction'

const mapStateToProps = state => ({
  articleToEdit: state.home.articleToEdit,
})

export default connect(mapStateToProps, { createArticle, updateArticle })((props) => {
  const { setOpen, isEdit } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    if (props.articleToEdit) {
      const { title, body, author } = data;
      setData({
        ...data,
        [title]: props.articleToEdit.title,
        [body]: props.articleToEdit.body,
        [author]: props.articleToEdit.author,
      })
    }
  }, [])

  const handleChangeField = (key, event) => {
    setData({
      ...data,
      [key]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const { createArticle, updateArticle, isEdit, setOpen, selectedArticle } = props;
    const resetForm = () => {
      setData({
        ['title']: '',
        ['body']: '',
        ['author']: '',
      })
    }
    if (!isEdit) {
      createArticle(data, resetForm)
    } else {
      // debugger
      updateArticle({...data, _id: selectedArticle})
      setOpen(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '300px' }}>
      <input style={{ width: 'auto', height: '50px', border: '2px solid gray', borderRadius: '4px' }} placeholder="Article Title"
        onChange={(e) => handleChangeField('title', e)}
        value={data.title}
      />
      <textarea style={{ width: 'auto', height: '70px', border: '2px solid gray', borderRadius: '4px' }} placeholder="Article Description"
        onChange={(e) => handleChangeField('body', e)}
        value={data.body}
      />
      <input style={{ width: 'auto', height: '50px', border: '2px solid gray', borderRadius: '4px' }} placeholder="Article Author"
        onChange={(e) => handleChangeField('author', e)}
        value={data.author}
      />
      <button style={{ alignSelf: 'flex-end', height: "35px", width: "70px", backgroundColor: '#3b77d6', border: '2px solid gray', borderRadius: '4px' }}
        onClick={handleSubmit}
      >
        Submit
      </button>
      {isEdit && <button style={{ alignSelf: 'flex-end', height: "35px", width: "70px", backgroundColor: '#3b77d6', border: '2px solid gray', borderRadius: '4px' }}
        onClick={() => setOpen(false)}
      >
        Cancel
      </button>}
    </div>
  )
});