import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
import * as ItemTypes from "../../constants/ItemTypes";
import { ReactComponent as NotificationIcon } from "remixicon/icons/Media/notification-2-fill.svg";
import { Dish, DishCaption, DishImageBox, DishImage, DishActions, DishPopover, DishOverlay } from "../../components/Dish";
import { IconButton, VerticalDivider } from "../../components/UI";
import thumbnail from "../../assets/meal_thumbnail.png";

class Card extends Component {
  render() {
    const {
      dish,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;

    const opacity = isDragging ? 0 : 1;
    const diff = Math.round(Math.abs(dish.ideal_kcals - dish.totals.kcal));

    return (
      <Dish
        ref={instance => connectDragSource(connectDropTarget(instance))}
        style={{ opacity }}>
        <DishImageBox>
          <DishImage src={dish.image} />
          {diff > 25 && (
            <DishOverlay>
              <NotificationIcon/>
              <span>{diff} kcals off</span>
            </DishOverlay>
          )}
        </DishImageBox>
        <DishCaption>
          <h5>{dish.name}</h5>
          <span>{dish.totals.kcal} kcals</span>
        </DishCaption>
        <DishActions>
          <span onClick={() => {alert("delete")}}>Delete</span>
        </DishActions>
        <DishPopover hidden={isDragging}>{dish.totals.kcal} kcals: {dish.name} (#{dish.order})</DishPopover>
      </Dish>
    );
  }

  handleRecipes = () => {
    const { dish, onClickRecipes } = this.props;

    if (onClickRecipes) {
      onClickRecipes(dish);
    }
  };
}

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      // index: props.dish.order,
      mealId: props.mealId,
      dish: props.dish,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult && dropResult.mealId !== item.mealId) {
      props.removeDish(props.mealId, item.index);
    }
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    const dragIndex = item.index;
    const hoverIndex = props.index;
    const sourceListId = item.mealId;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if (props.mealId === sourceListId) {
      props.moveDish(props.mealId, dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  }
};

export default flow(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card);
