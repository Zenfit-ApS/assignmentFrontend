import React, { useState } from "react";
import Dish from "./Dish";
import Popup from "../../Popup";
import ModalContainer from "../../containers/Modal";
import ModalTypes from "../../constants/ModalTypes";
import MacroSplitTypes from "../../constants/MacroSplitTypes";
import { DropTarget } from "react-dnd";
import { ReactComponent as AddCircleIcon } from "remixicon/icons/System/add-circle-line.svg";
import { Button, Link } from "../../components/UI";
import {
  BoardActions,
  BoardColumn,
  BoardHeader,
  BoardHeaderMeta,
  BoardTitle,
  BoardItems
} from "../../components/Board";
import * as ItemTypes from "../../constants/ItemTypes";

const macroSplitOptions = Object.keys(MacroSplitTypes).map(value => ({
  value: parseInt(value, 10),
  label: MacroSplitTypes[value],
}));

const Meal = React.memo(({ meal, planId, canDrop, isOver, connectDropTarget, removeDish, moveDish }) => {
  const { show: modalShow } = ModalContainer.useContainer();
  const [macroSplit, setMacroSplit] = useState(2);

  const selectMacroSplit = (event, item) => {
    event.preventDefault();
    setMacroSplit(item.value);
  };

  const renderMacroSplitTrigger = () => {
    let index = macroSplitOptions
      .findIndex(item => item.value === macroSplit);

    if (index < 0) {
      index = 0;
    }
    
    return (
      <Link href="#">{macroSplitOptions[index].label}</Link>
    );
  };

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? "#f6fff5" : "#FFF";

  return (
    <BoardColumn style={{ backgroundColor }}>
      <BoardHeader>
        <BoardTitle>{meal.name}</BoardTitle>
        <BoardHeaderMeta>
          <span>{meal.avg_totals.kcal} kcals</span>
          <Popup
            value={meal.macroSplit}
            options={macroSplitOptions}
            onSelect={selectMacroSplit}
            renderTrigger={renderMacroSplitTrigger}
          />
        </BoardHeaderMeta>
      </BoardHeader>
      <BoardItems ref={instance => connectDropTarget(instance)}>
        {meal.meals.map((dish, index) => {
          return (
            <Dish
              dish={dish}
              index={index}
              mealId={meal.id}
              planId={planId}
              removeDish={removeDish}
              moveDish={moveDish}
              key={`dish_${dish.id}`}
              showRecipes={modalShow.bind(null, ModalTypes.RECIPES, { meal, dish })}
            />
          );
        })}
      </BoardItems>
      <BoardActions>
        <Button type="button" onClick={modalShow.bind(null, ModalTypes.RECIPES, { meal })}>
          <AddCircleIcon/>
          <span>Add alternative</span>
        </Button>
      </BoardActions>
    </BoardColumn>
  );
});

const cardTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    const { meal } = props;

    if (meal.id !== item.mealId) {
      props.pushDish(meal.id, item.dish, item.index);
    }

    if (meal.id !== item.mealId || dropResult) {
      props.save();
    }

    return {
      mealId: meal.id,
    };
  }
};

export default DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Meal);
