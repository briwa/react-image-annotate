import * as React from 'react';
import { CanvasContext } from '../hooks';

export const useKeys = () => {
  const { canvas } = React.useContext(CanvasContext);

  React.useEffect(() => {
    if (!canvas) return;

    document.addEventListener('keyup', (e) => {
      const activeObj = canvas.getActiveObject();
      if (!activeObj) return;
  
      switch (e.key) {
        case 'Delete':
        case 'Backspace': {
          canvas.remove(activeObj);
          break;
        }
        default: {
          break;
        }
      }
    });
  }, [canvas]);
};
