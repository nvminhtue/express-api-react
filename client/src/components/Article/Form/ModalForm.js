import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { transparentize } from 'polished';

import Form from '.';

const modalStyle = {
    display: 'none',
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    overflow: 'auto',
    backgroundColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
};

const FormModal = styled(ReactModal).attrs({
  style: modalStyle,
  ariaHideApp: false,
})`
  width: 50%;
  height: 50%;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

export const EditModal = ({isOpen, setOpen, selectedArticle} = props) => (
    <FormModal isOpen={isOpen}>
      <Form isOpen={isOpen} setOpen={setOpen} isEdit={true} selectedArticle={selectedArticle} />
    </FormModal>
);
