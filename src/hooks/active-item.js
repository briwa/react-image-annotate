import { useContext, useEffect, useCallback } from 'react';
import { CanvasContext } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveItemId, setIconProp } from '../store/slices/canvas';

export const useActiveItemColor = () => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();
  const activeItemId = useSelector((state) => state.canvas.activeItemId);
  const activeItemColor = useSelector((state) => {
    if (!activeItemId) return;

    return state.canvas.icons.byId[activeItemId]?.color;
  });

  useEffect(() => {
    if (!canvas) return;

    const updateActiveItemId = (id) => () => {
      if (id !== undefined) {
        dispatch(setActiveItemId({ id }))
      } else {
        const object = canvas.getActiveObject();
        if (object) {
          dispatch(setActiveItemId({ id: object.id }));
        }
      }
    }

    canvas.on('selection:created', updateActiveItemId());
    canvas.on('selection:updated', updateActiveItemId());
    canvas.on('selection:cleared', updateActiveItemId(null));

    return () => {
      canvas.off('selection:created');
      canvas.off('selection:updated');
      canvas.off('selection:cleared');
    };
  }, [dispatch, canvas]);

  const setActiveItemColor = useCallback((color) => {
    dispatch(setIconProp({
      id: activeItemId,
      key: 'color',
      value: color,
    }));
  }, [dispatch, activeItemId]);

  return [activeItemColor, setActiveItemColor];
};
