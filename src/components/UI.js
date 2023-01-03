// eslint-disable-next-line
import React from 'react';
import styled, { keyframes } from 'styled-components';

const ball = keyframes`
  from {
    transform: translateY(0) scaleY(.8);
  }
  to {
    transform: translateY(-10px);
  }
`;

const links = {
  default: {
    color: '#2895f1',
    colorHover: '#32325d',
  },
  danger: {
    color: '#d14',
    colorHover: '#d14',
  },
  secondary: {
    color: '#525f7f',
    colorHover: '#32325d',
  },
};

const alerts = {
  warning: {
    color: '#8a6d3b',
    background: '#fcf9e9',
  },
  danger: {
    color: '#d14',
    background: 'rgba(221, 17, 68, .1)',
  },
  info: {
    color: '#fff',
    background: '#f7fafc',
  },
  success: {
    color: '#3c763d',
    background: '#f6fff5',
  },
};

const buttons = {
  default: {
    background: '#fff',
    backgroundActive: '#f2f6fa',
    color: '#32325d',
  },
  primary: {
    background: '#32325d',
    backgroundActive: '#43458b',
    color: '#fff',
  },
  danger: {
    background: '#d14',
    backgroundActive: '#c71e48',
    color: '#fff',
  },
};

export const Badge = styled.span`
  display: inline-block;
  margin-left: 5px;
  vertical-align: 2px;
  color: #fff;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  background: #32325d;
  transition: background .15s;
  border-radius: 10px;
  padding: 3px 6px;
  height: auto;
  top: auto;
  box-shadow: none;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const Link = styled.a`
  color: ${props => links[props.modifier].color};
  transition: color .1s;
  text-decoration: none;

  :hover {
    color: ${props => links[props.modifier].colorHover};
  }
`;

Link.defaultProps = {
  modifier: 'default', 
};

export const FlatButton = styled.button`
  background: none;
  border: 1px solid transparent;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  color: #32325d;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  transition: all .15s ease;
  outline: none;
  min-height: 38px;

  :hover {
    background: #f6f9fc;
    transition-duration: .15s;
  }

  :active {
    background: #f2f6fa;
  }

  svg {
    width: ${props => props.icon ? '24px' : '16px'};
    height: ${props => props.icon ? '24px' : '16px'};
  }

  svg + span {
    margin-left: 6px;
  }
`;

export const Button = styled(FlatButton)`
  border-color: #e6ebf1;
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
  background: ${props => buttons[props.modifier].background};
  color: ${props => buttons[props.modifier].color};

  :focus,
  :hover {
    background: ${props => buttons[props.modifier].backgroundActive};
    color: ${props => buttons[props.modifier].colorActive || buttons[props.modifier].color };
  }
`;

Button.defaultProps = {
  modifier: 'default',
};

export const IconButton = styled.button`
  background: transparent;
  border: 0;
  color: currentColor;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 14px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  width: 24px;
  height: 24px;
`;

export const VerticalDivider = styled.div`
  background: currentColor;
  width: 1px;
  height: 14px;
  display: inline-block;
`;

export const HorizontalDivider = styled.div`
  background: currentColor;
  width: 100%;
  height: 1px;
  display: block;
`;

export const Label = styled.span`
  display: block;
  color: #8898aa;
  font-weight: 700;
`;

export const Alert = styled.div.attrs(props => alerts[props.type])`
  background-color: ${props => props.background};
  border: 0;
  border-radius: 4px;
  color: ${props => props.color};
  padding: 12px;
  font-size: 12px;
`;

Alert.defaultProps = {
  type: 'success',
};

export const TextAlert = styled.h5.attrs(props => alerts[props.type])`
  color: ${props => props.color};
  margin-top: 0;
`;

TextAlert.defaultProps = {
  type: 'success',
};

export const IconBox = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: ${props => props.type ? alerts[props.type].color : '#32325d'};

  svg {
    fill: currentColor;
    width: 16px;
    height: 16px;
  }
`;

export const LoadingDot = styled.div`
  transform: translate(-50%, -50%);
  content: '';
  display: block;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: 50%;
  background: #32325d;
  z-index: 2;
  margin: ${props => `${props.size}px`} 4px 0;
  animation: ${ball} .45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;

  :nth-child(1) {
    animation-delay: .15s;
  }
  
  :nth-child(3) {
    animation-delay: .3s;
  }
`;

LoadingDot.defaultProps = {
  size: 4,
};

export const LoadingBox = styled.div`
  position: relative;
  display: flex;
`;



