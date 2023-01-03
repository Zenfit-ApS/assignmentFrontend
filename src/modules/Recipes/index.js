import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import { ModalBody } from '../../components/Modal';
import * as api from '../../utils/api';

const Recipes = React.memo(({ meal }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const existing = meal ? meal.meals.map(item => item.recipe) : [];

  useEffect(() => {
    const source = api.CancelToken.source();

    const fetch = async () => {
      setLoading(true);

      try {
        const data = await import('../../mock/recipes.json');
        setData(data.default);
      } catch (e) {}

      setLoading(false);
    };

    fetch();

    return () => {
      if (source) {
        source.cancel('Operation canceled by the user.');
      }
    };
  }, []);

  return (
    <ModalBody>
      {data.map(recipe =>
        <Recipe
          {...recipe}
          key={`recipe_${recipe.id}`}
          selected={existing.includes(recipe.id)}
        />
      )}
    </ModalBody>
  );
});

export default Recipes;
