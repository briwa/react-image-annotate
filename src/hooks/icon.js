import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import { CanvasContext } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setItemProps } from '../store/slices/canvas';

export const useCreateIcon = (icon) => {
  const { canvas } = useContext(CanvasContext);
  const { url, width, height, id, scaleX, scaleY, x, y } = icon;
  const dispatch = useDispatch();
  const baseImage = useSelector((state) => state.canvas.baseImage);

  useEffect(() => {
    if (!canvas || !baseImage) return;

    fabric.loadSVGFromURL(url, (icons) => {
      const currentIcon = icons[0];

      if (!width && !height && scaleX === 1 && scaleY === 1) {
        currentIcon.scaleToWidth(50);

        dispatch(setItemProps({
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

      if (!x && !y) {
        currentIcon
          .set('left', baseImage.width / 2 - currentIcon.width / 2)
          .set('top', baseImage.height / 2 - currentIcon.height / 2);
      } else {
        currentIcon
          .set('left', x)
          .set('top', y);
      }

      currentIcon.set('id', id);
      canvas.add(currentIcon).setActiveObject(currentIcon).renderAll();

      currentIcon.on('moved', () => {
        dispatch(setItemProps({
          id,
          props: {
            x: currentIcon.left,
            y: currentIcon.top,
          }
        }));
      });

      currentIcon.on('scaled', () => {
        dispatch(setItemProps({
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
  }, [dispatch, canvas, !!icon]);
};

export const useSetIconColorOnCanvas = (icon) => {
  const { canvas } = useContext(CanvasContext);
  const { id, attributes } = icon;

  useEffect(() => {
    if (!canvas) return;

    const object = canvas.getObjects().find((o) => o.id === id);
    if (object) {
      object.set('fill', attributes.color);
      canvas.renderAll();
    }
  }, [canvas, id, attributes.color]);
};
