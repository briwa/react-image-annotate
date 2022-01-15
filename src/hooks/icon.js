import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import { CanvasContext, useSetInitialItemProps } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';

export const useCreateIcon = (icon) => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();
  const baseImage = useSelector((state) => state.canvas.baseImage);
  const setInitialItemProps = useSetInitialItemProps();

  useEffect(() => {
    if (!canvas || !baseImage) return;

    fabric.loadSVGFromURL(icon.url, (icons) => {
      const fabricIcon = icons[0];

      setInitialItemProps(icon, fabricIcon, baseImage);
      canvas.add(fabricIcon).setActiveObject(fabricIcon).renderAll();
    });

    return () => {
      const deletedIcon = canvas.getObjects().find((o) => o.id === icon.id);
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
