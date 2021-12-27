import { v4 as uuidv4 } from 'uuid';

export const createBaseImage = (props) => {
  return {
    id: uuidv4(),
    createdAt: (new Date()).toISOString(),
    w: 0,
    h: 0,
    src: null,
    ...props,
  };
};

export const createIcon = (props) => {
  return {
    id: uuidv4(),
    createdAt: (new Date()).toISOString(),
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    scaleX: 1,
    scaleY: 1,
    color: '#000000',
    ...props,
  };
};
