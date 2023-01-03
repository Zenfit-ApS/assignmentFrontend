import React, { Suspense, useCallback } from 'react';
import SettingTypes from '../../constants/SettingTypes';
import { ModalBody, ModalFooter } from '../../components/Modal';
import { Button, FlatButton } from '../../components/UI';

const MainForm = React.lazy(() => import('./MainForm'));
const DescriptionForm = React.lazy(() => import('./DescriptionForm'));
const PdfDownloader = React.lazy(() => import('./PdfDownloader'));

const PRIMARY_ACTIONS = {
  [SettingTypes.SETTINGS_MAIN]: {
    title: 'Save',
    type: 'primary',
  },
  [SettingTypes.SETTINGS_DESCRIPTION]: {
    title: 'Save',
    type: 'primary',
  },
  [SettingTypes.DELETE]: {
    title: 'Yes, delete it!',
    type: 'danger',
  },
}

const Settings = React.memo(({ plan, settingsType, onClose }) => {
  const action = PRIMARY_ACTIONS[settingsType];
  const isType = (type) => type === settingsType;

  const onCancel = useCallback(() => {
    
    onClose();
  }, [plan, settingsType]);

  const onSubmit = useCallback(() => {
    
  }, [plan, settingsType]);

  return (
    <>
      <ModalBody>
        {isType(SettingTypes.SETTINGS_MAIN) && (
          <Suspense fallback={<div>Loading...</div>}>
            <MainForm plan={plan}/>
          </Suspense>
        )}
        {isType(SettingTypes.SETTINGS_DESCRIPTION) && (
          <Suspense fallback={<div>Loading...</div>}>
            <DescriptionForm plan={plan}/>
          </Suspense>
        )}
        {isType(SettingTypes.PDF) && (
          <Suspense fallback={<div>Loading...</div>}>
            <PdfDownloader plan={plan}/>
          </Suspense>
        )}
      </ModalBody>
      {action && (
        <ModalFooter>
          <FlatButton onClick={onCancel} type="button">Cancel</FlatButton>
          <Button onClick={onSubmit} type="button" modifier={action.type}>
            {action.title}
          </Button>
        </ModalFooter>
      )}
    </>
  );
}); 

export default Settings;
