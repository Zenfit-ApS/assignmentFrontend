// eslint-disable-next-line
import React, { useState } from 'react';
import update from 'react-addons-update';
import { createContainer } from '../utils/unstated';

function useModal() {
  const [modal, setModal] = useState({
    type: null,
    props: {},
  });

  const is = (type) => type === modal.type;

  const show = (type, props) => setModal(
    update(modal, {
      type: {
        $set: type,
      },
      props: {
        $set: props,
      },
    })
  );

  const hide = () => setModal(
    update(modal, {
      type: {
        $set: null,
      },
      props: {
        $set: {},
      },
    })
  );

  return { ...modal, is, show, hide };
}

const ModalContainer = createContainer(useModal);

export default ModalContainer;
