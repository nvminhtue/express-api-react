import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import { createArticle, updateArticle, getArticle } from '../../../actions/articleAction'

const FormikForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { article = {}, isEdit = false } = props;
    if (isEdit) return article;
    return {}
  },
  handleSubmit: (values, {props}) => {
    const { createArticle, updateArticle, isEdit, setOpen, selectedArticle } = props;
    if (!isEdit) {
      createArticle(values)
    } else {
      updateArticle({...values, _id: selectedArticle})
      setOpen(false)
    }
  }
});

const FormComponent = (props) => {
  const { setOpen, isEdit, setFieldValue, values, selectedArticle, getArticle  } = props;
  
  useEffect(() => {
    if(isEdit) getArticle(selectedArticle)
  }, [])
  // const handleSubmit = () => {
  //   const { createArticle, updateArticle, isEdit, setOpen, selectedArticle } = props;
  //   const resetForm = () => {
  //     setData({
  //       ['title']: '',
  //       ['body']: '',
  //       ['author']: '',
  //     })
  //   }
  //   if (!isEdit) {
  //     createArticle(data, resetForm)
  //   } else {
  //     updateArticle({...data, _id: selectedArticle})
  //     setOpen(false)
  //   }
  // }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '300px' }}>
      <input name={'title'} style={{ width: 'auto', height: '50px', border: '2px solid gray', borderRadius: '4px' }} placeholder="Article Title"
        onChange={(e) => setFieldValue('title', e.target.value)}
        value={values.title}
      />
      <input name={'body'} style={{ width: 'auto', height: '70px', border: '2px solid gray', borderRadius: '4px' }} placeholder="Article Description"
        onChange={(e) => setFieldValue('body', e.target.value)}
        value={values.body}
      />
      <input name={'author'} style={{ width: 'auto', height: '50px', border: '2px solid gray', borderRadius: '4px' }} placeholder="Article Author"
        onChange={(e) => setFieldValue('author', e.target.value)}
        value={values.author}
      />
      <button style={{ alignSelf: 'flex-end', height: "35px", width: "70px", backgroundColor: '#3b77d6', border: '2px solid gray', borderRadius: '4px' }}
        onClick={props.handleSubmit}
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
};

const mapStateToProps = (state) => {
  return {
    article: state.home.selectedArticle,
  }
}
export default connect(mapStateToProps, { createArticle, updateArticle, getArticle })(FormikForm(FormComponent))
