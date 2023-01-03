import React from 'react';
import { FormGroup, FormLabel, Input } from '../../components/Form';
import { Badge } from '../../components/UI';

const MainForm = React.memo(({ plan }) => (
  <>
    <FormGroup>
      <FormLabel>Title of meal plan</FormLabel>
      <Input defaultValue={plan.name} type="text" />
    </FormGroup>
    <FormGroup>
      <FormLabel>
        Desired
        <Badge>kcals</Badge>
      </FormLabel>
      <Input type="number" min={0} step={1} defaultValue={plan.desired_kcals} />
    </FormGroup>
  </>
));

export default MainForm;
