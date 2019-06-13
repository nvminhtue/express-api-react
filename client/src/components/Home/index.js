import React from 'react';

import Form from '../../components/Article/Form';

export default () => {
  return (
    <div style={{ background: '#e6e6e6', height: '100vh'}}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{ textAlign: 'center', alignSelf: 'center', width: '600px' }}>
          <div>
            <h1 style={{ textAlign: 'center'}}>LightBlog</h1>
          </div>
          <Form />
        </div>
      </div>
    </div>
  )
}
