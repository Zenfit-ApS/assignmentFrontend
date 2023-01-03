import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import MealPlansContainer from "../../containers/MealPlans";
import Meal from "./Meal";
import { Board } from "../../components/Board";

const PlanBoard = React.memo(({ planId }) => {
  const container = MealPlansContainer.useContainer();
  const meals = container.mealsByPlan(planId);

  return (
    <Board>
      {meals.map(meal => 
        <Meal 
          id={meal.id}
          meal={meal} 
          planId={planId}
          save={container.save}
          pushDish={container.pushDish}
          removeDish={container.removeDish}
          moveDish={container.moveDish}
          key={`meal_${meal.id}`}
        />
      )}
    </Board>
  );
});

export default DragDropContext(HTML5Backend)(PlanBoard);
