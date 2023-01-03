// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';
import { FlatButton } from './UI';

export const ModalDialog = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgba(50,50,93,.05), 0 2px 5px 0 rgba(50,50,93,.1), 0 1px 1px 0 rgba(0,0,0,.07);
  padding: 0;
  max-width: 500px;
  margin: 1.75rem auto;
`;

export const ModalHeader = styled.div`
  background-color: #fff;
  border-radius: 6px 6px 0 0;
  border-bottom: 1px solid #e6ebf1;
  padding: 16px;
  display: flex;
  align-items: center;
  position: ${props => props.sticky ? 'sticky' : 'static'};
  top: 0;
  z-index: 200;
`;

export const ModalFooter = styled(ModalHeader)`
  border-radius: 0 0 6px 6px;
  border-top: 1px solid #e6ebf1;
  border-bottom-width: 0;
  justify-content: flex-end;
  top: auto;
  bottom: 0;

  button + button {
    margin-left: 8px;
  }
`;

export const ModalTitle = styled.h2`
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  color: #4f566b;
  font-size: 14px;
  letter-spacing: .5px;
  flex: 1;
`;

export const ModalClose = styled(FlatButton)`
  position: absolute;
  top: 50%;
  right: -8px;
  transform: translate(-50%, -50%);
`;

export const ModalBody = styled.div`
  padding: 16px;
`;
