import * as React from 'react';
import { fabric } from 'fabric';

export const CanvasContext = React.createContext({ canvas: null, setCanvas: null });

export const WithCanvasContext = (props) => {
  const [canvas, setCanvas] = React.useState(null);

  return (
    <CanvasContext.Provider value={{ canvas, setCanvas }}>
      {props.children}
    </CanvasContext.Provider>
  );
}

export const useInitializeCanvas = () => {
  const { setCanvas } = React.useContext(CanvasContext);

  React.useLayoutEffect(() => {
    const canvas = new fabric.Canvas('canvas');
    setCanvas(canvas);
  }, [setCanvas]);
};
