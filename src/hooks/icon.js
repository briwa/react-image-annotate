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

  useEffect(() => {
    if (!canvas || !icon) return;

    fabric.loadSVGFromURL(icon.url, (icons) => {
      const currentIcon = icons[0];
      currentIcon.scaleToWidth(icon.width).set('id', icon.id);
      
      canvas.add(currentIcon).setActiveObject(currentIcon).renderAll();
    });

    return () => {
      const deletedIcon = canvas.getObjects().find((o) => o.id === icon.id);
      if (deletedIcon) canvas.remove(deletedIcon);
    };
  }, [canvas, icon]);
};
