import * as React from 'react';
import { styled } from '@mui/material/styles';

const StyledSvgIcon = styled((props) => (
  <img
    alt={props.alt}
    {...props}
  />
))({ marginRight: '1rem' });

const CustomIcon = ({ src, alt }) => {
  return (
    <StyledSvgIcon src={src} alt={alt} />
  );
};

export default CustomIcon;
