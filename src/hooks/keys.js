import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CanvasContext } from '../hooks';
import { removeIcon } from '../store/slices/canvas';

export const useKeys = () => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!canvas) return;

    document.addEventListener('keyup', (e) => {
      const activeObj = canvas.getActiveObject();
      if (!activeObj) return;
  
      switch (e.key) {
        case 'Delete':
        case 'Backspace': {
          dispatch(removeIcon({ id: activeObj.id }));
          break;
        }
        default: {
          break;
        }
      }
    });
  }, [dispatch, canvas]);
};
