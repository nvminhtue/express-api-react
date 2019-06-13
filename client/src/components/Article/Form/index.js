import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [data, setData] = useState({});

  const handleChangeField = (key, event) => {
    setData({
      ...data,
      [key]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const { title, body, author } = data;

    return axios.post('http://localhost:8080/api/articles', {
      title,
      body,
      author,
    });
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
      <button style={{alignSelf: 'flex-end', height: "35px", width: "70px", backgroundColor: '#3b77d6', border: '1px solid', borderRadius: '2px'}}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
}