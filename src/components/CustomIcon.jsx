import * as React from 'react';
import { styled } from '@mui/material/styles';

const StyledSvgIcon = styled((props) => (
  <img
    alt="some icon"
    {...props}
  />
))({ marginRight: '1rem' });

export default function CustomIcon({ src }) {

  return (
    <StyledSvgIcon src={src} />
  );
}
