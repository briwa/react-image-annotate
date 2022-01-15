import { v4 as uuidv4 } from 'uuid';

export const createBaseImage = (props) => {
  return {
    id: uuidv4(),
    type: 'baseImage',
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
    type: 'icon',
    title: '',
    url: null,
    createdAt: (new Date()).toISOString(),
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    attributes: { color: '#000000' },
    ...props,
  };
};

export const createText = (props) => {
  return {
    id: uuidv4(),
    type: 'text',
    title: 'Text',
    createdAt: (new Date()).toISOString(),
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    attributes: { text: 'Double click to edit', color: '#000000' },
    ...props,
  };
};
