import { useContext, useEffect, useCallback } from 'react';
import { CanvasContext } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, setActiveItemId, setItemProps } from '../store/slices/canvas';

export const useActiveItemColor = () => {
  const dispatch = useDispatch();
  const activeItemId = useSelector((state) => state.canvas.activeItemId);
  const activeItemColor = useSelector((state) => {
    if (!activeItemId) return;

    return state.canvas.items.byId[activeItemId]?.attributes?.color;
  });

  const setActiveItemColor = useCallback((color) => {
    dispatch(setItemProps({
      id: activeItemId,
      props: { attributes: { color } },
    }));
  }, [dispatch, activeItemId]);

  return [activeItemColor, setActiveItemColor];
};

export const useActiveItem = () => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!canvas) return;

    const updateActiveItemId = (id) => () => {
      if (id !== undefined) {
        dispatch(setActiveItemId({ id }))
      } else {
        const fabricObj = canvas.getActiveObject();
        if (fabricObj) {
          dispatch(setActiveItemId({ id: fabricObj.id }));
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
};

export const useItemModifications = () => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!canvas) return;

    canvas.on('object:modified', ({ action, target }) => {
      switch(action) {
        case 'drag': {
          dispatch(
            setItemProps({ id: target.id, props: { x: target.left, y: target.top } }),
          );
          break;
        }
        case 'scale':
        case 'scaleX':
        case 'scaleY': {
          dispatch(
            setItemProps({ id: target.id, props: { scaleX: target.scaleX, scaleY: target.scaleY } }),
          );
          break;
        }
        case 'rotate': {
          dispatch(
            setItemProps({ id: target.id, props: { angle: target.angle, x: target.left, y: target.top } }),
          );
          break;
        }
        default: {
          break;
        }
      }
    });

    return () => {
      canvas.off('object:modified');
    };
  }, [dispatch, canvas]);
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

export const useSetInitialItemProps = () => {
  const dispatch = useDispatch();

  return (item, fabricObj, baseImage) => {
    const {
      id, type,
      x, y,
      width, height,
      scaleX, scaleY,
      angle,
      attributes
    } = item;

    if (!width && !height && scaleX === 1 && scaleY === 1) {
      switch (type) {
        case 'icon': {
          fabricObj.scaleToWidth(50);
          break;
        }
        default:
      }
    } else {
      fabricObj
        .set('width', width)
        .set('height', height)
        .set('scaleX', scaleX)
        .set('scaleY', scaleY);
    }

    fabricObj
      .set('left', x || baseImage.width / 2 - fabricObj.width / 2)
      .set('top', y || baseImage.height / 2 - fabricObj.height / 2)
      .set('angle', angle || 0);

    dispatch(setItemProps({
      id,
      props: {
        x: fabricObj.left,
        y: fabricObj.top,
        scaleX: fabricObj.scaleX,
        scaleY: fabricObj.scaleY,
        width: fabricObj.width,
        height: fabricObj.height,
      }
    }));

    if (attributes.color) {
      fabricObj.set('fill', attributes.color);
    }

    fabricObj.set('id', id);

    return fabricObj;
  };
};