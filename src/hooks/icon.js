import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import { CanvasContext } from '../hooks';
import { useDispatch } from 'react-redux';
import { setIconProps } from '../store/slices/canvas';

export const useCreateIcon = (icon) => {
  const { canvas } = useContext(CanvasContext);
  const { url, width, height, id, scaleX, scaleY, x, y } = icon;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!canvas) return;

    fabric.loadSVGFromURL(url, (icons) => {
      const currentIcon = icons[0];

      if (!width && !height && scaleX === 1 && scaleY === 1) {
        currentIcon.scaleToWidth(50);

        dispatch(setIconProps({
          id,
          props: {
            scaleX: currentIcon.scaleX,
            scaleY: currentIcon.scaleY,
            width: currentIcon.width,
            height: currentIcon.height,
          }
        }));
      } else {
        currentIcon
          .set('width', width)
          .set('height', height)
          .set('scaleX', scaleX)
          .set('scaleY', scaleY);
      }

      currentIcon.set('id', id)
        .set('left', x)
        .set('top', y);

      canvas.add(currentIcon).setActiveObject(currentIcon).renderAll();

      currentIcon.on('moved', () => {
        dispatch(setIconProps({
          id,
          props: {
            x: currentIcon.left,
            y: currentIcon.top,
          }
        }));
      });

      currentIcon.on('scaled', () => {
        dispatch(setIconProps({
          id,
          props: {
            scaleX: currentIcon.scaleX,
            scaleY: currentIcon.scaleY,
          }
        }));
      });
    });

    return () => {
      const deletedIcon = canvas.getObjects().find((o) => o.id === id);
      if (deletedIcon) canvas.remove(deletedIcon);
    };

  // Trigger hook only once in order to avoid flickering on re-rendering.
  }, [dispatch, !!icon]);
};

export const useSetIconColorOnCanvas = (icon) => {
  const { canvas } = useContext(CanvasContext);
  const { id, color } = icon;

  useEffect(() => {
    if (!canvas) return;

    const object = canvas.getObjects().find((o) => o.id === id);
    if (object) {
      object.set('fill', color);
      canvas.renderAll();
    }
  }, [canvas, id, color]);
};
