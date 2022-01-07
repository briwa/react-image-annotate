import { useContext, useEffect, useCallback } from 'react';
import { CanvasContext } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, setActiveItemId, setItemProps } from '../store/slices/canvas';

export const useActiveItemColor = () => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();
  const activeItemId = useSelector((state) => state.canvas.activeItemId);
  const activeItemColor = useSelector((state) => {
    if (!activeItemId) return;

    return state.canvas.items.byId[activeItemId]?.attributes?.color;
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
    dispatch(setItemProps({
      id: activeItemId,
      props: { attributes: { color } },
    }));
  }, [dispatch, activeItemId]);

  return [activeItemColor, setActiveItemColor];
};

export const useTriggerDeleteActiveItem = () => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();

  return useCallback(() => {
    if (!canvas) return;

    const activeObj = canvas.getActiveObject();
    if (!activeObj) return;

    dispatch(removeItem({ id: activeObj.id }));
  }, [dispatch, canvas]);
};
