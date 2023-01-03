// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';
import { PopupBox } from './Popup';

export const Card = styled.div`
  background: white;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(50,50,93,.05), 0 2px 5px 0 rgba(50,50,93,.1), 0 1px 1px 0 rgba(0,0,0,.07);
`;

export const CardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #e6ebf1;
  padding: 9px 16px;
  position: relative;
  z-index: 30;

  button + ${styled.button},
  button + ${PopupBox},
  ${PopupBox} + button {
    margin-left: 6px;
  }
`;
export const CardTitle = styled.h4`
  display: flex;
  flex: 1;
  font-weight: 500;
  margin: 0;
`;

export const CardBody = styled.div`
  padding: 16px;
`;