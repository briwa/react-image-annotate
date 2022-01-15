import { createContext, useState, useContext, useLayoutEffect } from 'react';
import { fabric } from 'fabric';

export const CanvasContext = createContext({ canvas: null, setCanvas: null });

export const WithCanvasContext = (props) => {
  const [canvas, setCanvas] = useState(null);

  return (
    <CanvasContext.Provider value={{ canvas, setCanvas }}>
      {props.children}
    </CanvasContext.Provider>
  );
}

export const useInitializeCanvas = () => {
  const { setCanvas } = useContext(CanvasContext);

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas('canvas');
    setCanvas(canvas);

    return () => {
      canvas.dispose();
      setCanvas(null);
    };
  }, [setCanvas]);
};
