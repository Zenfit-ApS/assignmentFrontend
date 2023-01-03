// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import memoize from 'lodash/memoize';
import update from 'react-addons-update';
import { createContainer } from '../utils/unstated';
import * as api from '../utils/api';

function useMealPlans() {
  const [data, setData] = useState({
    plans: {},
    meals: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = api.CancelToken.source();

    const fetch = async () => {
      setLoading(true);

      try {
        const response = await import('../mock/meals.json');
        const meals = {};

        const plans = response.default
          .filter(plan => plan.contains_alternatives)
          .reduce((collection, plan) => {
            const { meal_plans, ...props } = plan;

            collection[plan.id] = props;

            Object.values(meal_plans).forEach(meal => {
              meals[meal.id] = meal;
              meals[meal.id].planId = plan.id;
            });

            return collection;
          }, {});

        console.log('fetch', { plans, meals });

        setData(update(data, {
          plans: {
            $set: plans,
          },
          meals: {
            $set: meals,
          },
        }));
      } catch (e) {
        console.error('fetch', e);
      }

      setLoading(false);
    };

    fetch();

    return () => {
      if (source) {
        source.cancel('Operation canceled by the user.');
      }
    }
  }, []);

  const mealsByPlan = memoize((planId) => Object.values(data.meals).filter(meal => meal.planId === planId));

  const save = () => {
    console.log('Save changes.....');
  };

  const pushDish = (mealId, dish, index) => {
    setData(
      update(data, {
        meals: {
          [mealId]: {
            meals: {
              $push: [dish],
            },
          },
        },
      })
    );
  };

  const removeDish = (mealId, index) => {
    setData(
      update(data, {
        meals: {
          [mealId]: {
            meals: {
              $splice: [[index, 1]],
            },
          },
        },
      })
    );
  };

  const moveDish = (mealId, dragIndex, hoverIndex) => {
    const dragDish = data.meals[mealId].meals[dragIndex];

    setData(
      update(data, {
        meals: {
          [mealId]: {
            meals: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragDish]],
            },
          },
        },
      })
    );
  };

  return {
    data,
    loading,
    save,
    pushDish,
    removeDish,
    moveDish,
    mealsByPlan,
  };
}

const MealPlansContainer = createContainer(useMealPlans);

export default MealPlansContainer;
