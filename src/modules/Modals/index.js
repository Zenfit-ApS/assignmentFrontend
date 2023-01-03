import React from 'react';
import Modal from './Modal';
import Recipes from '../Recipes';
import Settings from '../Settings';
import ModalContainer from '../../containers/Modal';
import ModalTypes from '../../constants/ModalTypes';
import SettingTypes from '../../constants/SettingTypes';

const MODAL_TITLES = {
  [ModalTypes.RECIPES]: 'Recipes',
  [SettingTypes.SETTINGS_MAIN]: 'Settings',
  [SettingTypes.SETTINGS_DESCRIPTION]: 'Description',
  [SettingTypes.PDF]: 'PDF',
  [SettingTypes.DELETE]: 'DELETE',
};

const Modals = React.memo(() => {
  const modal = ModalContainer.useContainer();

  let ChilderComponent = null;
  let title = MODAL_TITLES[modal.type] || '';

  if (modal.is(ModalTypes.RECIPES)) {
    ChilderComponent = Recipes;
  } else if (modal.is(ModalTypes.SETTINGS)) {
    ChilderComponent = Settings;
    title = `Meal Plan ${MODAL_TITLES[modal.props.settingsType]}`;
  }

  return (
    <Modal
      contentLabel={`${title} Modal`}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={modal.hide}
      isOpen={!!modal.type}
      title={title}
    >
      {ChilderComponent && <ChilderComponent {...modal.props} onClose={modal.hide}/>}
    </Modal>
  );
});

export default Modals;
