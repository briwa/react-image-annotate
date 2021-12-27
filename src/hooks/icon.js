import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import { CanvasContext } from '../hooks';

export const useTriggerBaseImageUpload = () => {
  return () => {
    const imageInput = document.getElementById('image-input');
    if (imageInput) {
      imageInput.value = null;
      imageInput.click();
    }
  };
};

export const useCreateIcon = (icon) => {
  const { canvas } = useContext(CanvasContext);
  const { url, width, id } = icon;

  useEffect(() => {
    if (!canvas) return;

    fabric.loadSVGFromURL(url, (icons) => {
      const currentIcon = icons[0];
      currentIcon.scaleToWidth(width).set('id', id);
      
      canvas.add(currentIcon).setActiveObject(currentIcon).renderAll();
    });

    return () => {
      const deletedIcon = canvas.getObjects().find((o) => o.id === id);
      if (deletedIcon) canvas.remove(deletedIcon);
    };
  }, [canvas, url, width, id]);
};

export const useUpdateIconColor = (icon) => {
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
