import React, { Suspense } from 'react';
import MealPlansContainer from '../../containers/MealPlans';
import PlansLoading from './PlansLoading';

const Plan = React.lazy(() => import('./Plan'));

const Plans = React.memo(() => {
  const container = MealPlansContainer.useContainer();

  if (container.loading) {
    return <PlansLoading/>;
  }

  return (
    <Suspense fallback={<PlansLoading/>}>
      {Object.values(container.data.plans).map(plan => 
        <Plan key={`plan_${plan.id}`} plan={plan} />
      )}
    </Suspense>
  );
});

export default Plans;
