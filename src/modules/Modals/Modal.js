import React from 'react';
import ReactModal from 'react-modal';
import { ReactComponent as CloseIcon } from 'remixicon/icons/System/close-line.svg';
import {
  ModalDialog,
  ModalClose,
  ModalHeader,
  ModalTitle
} from '../../components/Modal';

const style = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 5000,
  },
  content: {
    background: 'none',
    border: 0,
    borderRadius: '6px',
    padding: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
};

const Modal = React.memo(({ title, Footer, children, ...props }) => {
  return (
    <ReactModal
      {...props}
      ariaHideApp={false}
      style={style}
    >
      <ModalDialog>
        <ModalHeader sticky="true">
          <ModalTitle>{title}</ModalTitle>
          <ModalClose type="button" onClick={props.onRequestClose}>
            <CloseIcon/>
          </ModalClose>
        </ModalHeader>
        {children}
      </ModalDialog>
    </ReactModal>
  );
});

Modal.defaultProps = {
  onRequestClose: () => {},
};

export default Modal;
