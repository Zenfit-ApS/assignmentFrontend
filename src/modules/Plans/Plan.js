import React from "react";
import { DateTime } from 'luxon';
import { ReactComponent as CheckboxCircleIcon } from 'remixicon/icons/System/checkbox-circle-fill.svg';
import { ReactComponent as EyeOffIcon } from 'remixicon/icons/System/eye-off-fill.svg';
import { ReactComponent as EyeIcon } from 'remixicon/icons/System/login-circle-line.svg';
import { ReactComponent as MoreIcon } from 'remixicon/icons/System/more-fill.svg';
import ModalContainer from '../../containers/Modal';
import MacroSplitTypes from '../../constants/MacroSplitTypes';
import ModalTypes from '../../constants/ModalTypes';
import SettingTypes from '../../constants/SettingTypes';
import PlanBoard from "./PlanBoard";
import Popup from "../../Popup";
import { Card, CardHeader, CardTitle, CardBody } from '../../components/Card';
import { Alert, Label, FlatButton, Button, IconBox } from '../../components/UI';
import {
  PlanInfo,
  PlanInfoItem
} from '../../components/Plan';

const items = [
  {
    label: 'Target kcals',
    value(plan) {
      return plan.desired_kcals;
    },
  },
  {
    label: 'Macro split',
    value(plan) {
      return MacroSplitTypes[plan.macro_split] || '--';
    },
  },
  {
    label: 'Status',
    value(plan) {
      return plan.active ? (
        <>
          <IconBox type="success">
            <CheckboxCircleIcon/>
          </IconBox>
          Plan is visible
        </>
      ) : (
        <>
          <IconBox type="danger">
            <EyeOffIcon/>
          </IconBox>
          Plan is hidden
        </>
      );
    },
  },
  {
    label: 'Created',
    value(plan) {
      return DateTime.fromSQL(plan.created).toFormat('DD');
    },
  }
];

const actions = [
  {
    value: SettingTypes.SETTINGS_DESCRIPTION,
    label: 'Change Description',
  },
  {
    value:  SettingTypes.SETTINGS_MAIN,
    label: 'Settings',
  },
  {
    value: SettingTypes.PDF,
    label: 'Save as PDF',
  },
  {
    divider: true,
  },
  {
    value: SettingTypes.DELETE,
    label: 'Delete',
    modifier: 'danger',
  },
];

const actionSelect = (modal, plan) => {
  return (event, item) => {
    event.preventDefault();

    switch (item.value) {
      case SettingTypes.SETTINGS_DESCRIPTION:
      case SettingTypes.SETTINGS_MAIN:
      case SettingTypes.PDF:
      case SettingTypes.DELETE:
        modal.show(ModalTypes.SETTINGS, { plan, settingsType: item.value });
        break;
      default:
    }
  };
};

const renderActionTrigger = () => (
  <FlatButton type="button" icon>
    <MoreIcon/>
  </FlatButton>
);

const Plan = React.memo(({ plan }) => {
  const modal = ModalContainer.useContainer();

  let alert = null;

  if (!plan.meals_fit_kcals) {
    alert = {
      type: 'danger',
      children: `One or more of your meals don't hit the target kcal amount. Replace the meal or edit it manually.`,
    };
  } else if (!plan.explaination) {
    alert = {
      type: 'warning',
      children: 'Your plan does not have a description. Click above to create one.',
    };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
          <Popup
            options={actions}
            onSelect={actionSelect(modal, plan)}
            renderTrigger={renderActionTrigger}
          />
        <Button type="button">
          <EyeIcon />
          <span>Details</span>
        </Button>
      </CardHeader>
      <PlanInfo>
        {items.map((item, index) => (
          <PlanInfoItem key={`col_${index}`}>
            <Label>{item.label}</Label>
            <span>{item.value(plan)}</span>
          </PlanInfoItem>
        ))}
        {alert && (
          <PlanInfoItem fill="true">
            <Alert {...alert}/>
          </PlanInfoItem>
        )}
      </PlanInfo>
      <CardBody>
        <PlanBoard planId={plan.id}/>
      </CardBody>
    </Card>
  );
});

export default Plan;
