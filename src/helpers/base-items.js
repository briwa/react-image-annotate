import { v4 as uuidv4 } from 'uuid';

export const createBaseImage = (props) => {
  return {
    id: uuidv4(),
    createdAt: (new Date()).toISOString(),
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0,
    url: null,
    ...props,
  };
};

export const createIcon = (props) => {
  return {
    id: uuidv4(),
    url: null,
    createdAt: (new Date()).toISOString(),
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scaleX: 1,
    scaleY: 1,
    color: '#000000',
    ...props,
  };
};
