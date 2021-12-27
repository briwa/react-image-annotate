import * as React from 'react';
import Color from 'color';
import { CanvasContext } from '../hooks';

export const useActiveItemColor = () => {
  const { canvas } = React.useContext(CanvasContext);
  const [activeItemColor, setActiveItemColor] = React.useState(null);

  React.useEffect(() => {
    if (!canvas) return;

    const updateSelectedColor = (c) => () => {
      if (c !== undefined) {
        setActiveItemColor(c);  
      } else {
        const object = canvas.getActiveObject();
        if (object) {
          const color = new Color(canvas.getActiveObject().fill);
          setActiveItemColor(color.hex());  
        }  
      }
    }

    canvas.on('selection:created', updateSelectedColor());
    canvas.on('selection:updated', updateSelectedColor());
    canvas.on('selection:cleared', updateSelectedColor(null));
  }, [canvas]);

  const setColorAndUpdateActiveItem = React.useCallback((color) => {
    if (!canvas) return;

    const object = canvas.getActiveObject();
    if (!object) return;

    setActiveItemColor(color);
    object.set('fill', color);
    canvas.renderAll();
  }, [canvas, setActiveItemColor]);

  return [activeItemColor, setColorAndUpdateActiveItem];
};
