import React, { cloneElement, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PopupBox, PopupMenu, PopupOptions, PopupOption } from './components/Popup';
import { HorizontalDivider, Link } from './components/UI';

const Popup = React.memo(props => {
  const node = useRef();
  const [isOpened, setOpened] = useState(false);

  const handleClickOutside = event => {
    if (!node.current.contains(event.target)) {
      setOpened(false);
    }
  };

  const handleTriggerClick = (event) => {
    event.preventDefault();
    setOpened(!isOpened);
  };

  const handleOptionSelect = (event, item, index) => {
    if (props.closeOnSelect) {
      setOpened(false);
    }
    props.onSelect(event, item, index);
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpened]);

  const trigger = cloneElement(props.renderTrigger(props), { 
    onClick: handleTriggerClick,
  });

  const options = props.options.map((item, index) => (
    <PopupOption selected={item.value === props.value} key={`option_${index}`}>
      {cloneElement(props.renderOption(item, index), { 
        onClick: event => handleOptionSelect(event, item, index),
      })}
    </PopupOption>
  ));

  return (
    <PopupBox ref={node}>
        {trigger}
        <PopupMenu opened={isOpened}>
          <PopupOptions>
            {options}
          </PopupOptions>
        </PopupMenu>
    </PopupBox>
  );
});

Popup.propTypes = {
  closeOnSelect: PropTypes.bool,
  value: PropTypes.any,
  options: PropTypes.array,
  onSelect: PropTypes.func,
  renderTrigger: PropTypes.func,
  renderOption: PropTypes.func,
};

Popup.defaultProps = {
  closeOnSelect: true,
  options: [],
  onSelect: () => {},
  renderTrigger: () => (
    <button type="button">Open</button>
  ),
  renderOption: (item) => (
    item.divider 
      ? <HorizontalDivider/> 
      : <Link href={item.href || '#'} modifier={item.modifier || 'secondary'}>{item.label}</Link>
  ),
};



export default Popup;
