import React from 'react';
import { RecipeItem, RecipeTitle, RecipeImage } from '../../components/Recipe';
import { Badge, Button } from '../../components/UI';

const Recipe = React.memo(({ name, image, selected }) => (
  <RecipeItem>
    <RecipeImage>
      <img src={image} alt={name}/>
    </RecipeImage>
    <RecipeTitle>{name}</RecipeTitle>
    {selected ? (
      <Badge>Current</Badge>
    ) : (<Button type="button">
      <span onClick={() => alert("HEJ")}>Select</span>
    </Button>)}
  </RecipeItem>
));

export default Recipe;
