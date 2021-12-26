import * as React from 'react';
import { CanvasContext } from './context';

export const useKeys = () => {
  const { canvas } = React.useContext(CanvasContext);

  document.addEventListener('keyup', (e) => {
    if (!canvas) return;

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
}
