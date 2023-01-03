// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';

export const RecipeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;

  & + & {
    border-top: 1px solid #f2f6fa;
  }
`;

export const RecipeTitle = styled.h4`
  font-size: 15px;
  color: #4f566b;
  text-transform: capitalize;
  font-weight: 400;
  margin: 0 16px;
  flex: 1 1 auto;
`;

export const RecipeImage = styled.div`
  border-radius: 4px;
  width: 44px;
  height: 44px;
  overflow: hidden;

  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
