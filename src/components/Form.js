// eslint-disable-next-line
import React from 'react';
import styled, { css } from 'styled-components';

const input = css`
  display: block;
  background-color: #fff;
  box-shadow: 0 0 0 1px #e6ebf1;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 2px;
  color: #32325d;
  font-family: Camphor,Open Sans,Segoe UI,sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  transition: background-color .1s ease-in,color .1s ease-in;
`;

export const FormGroup = styled.div`
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label`
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: normal;
  text-transform: none;
  color: #424770;
  display: inline-block;
  margin-bottom: .375rem;
`;

export const Input = styled.input`
  ${input}
`;

export const Select = styled.select`
  ${input}
  word-wrap: normal;
`;