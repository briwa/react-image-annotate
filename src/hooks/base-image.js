import * as React from 'react';
import { fabric } from 'fabric';
import { useSelector } from 'react-redux';

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

export const useSetBaseImage = () => {
  const { canvas } = React.useContext(CanvasContext);
  const canvasSize = useSelector((state) => state.canvas.size);
  const baseImage = useSelector((state) => state.canvas.baseImage);

  React.useEffect(() => {
    if (!baseImage?.src || !canvas) {
      return;
    }

    const image = new Image();
    image.src = baseImage.src;

    image.onload = function() {
      const img = new fabric.Image(image, { selectable: false, evented: false, hoverCursor: 'pointer' });

      // Fit to either width or height of the canvas depending on the image ratio.
      if (img.width > img.height) {
        img.scaleToWidth(canvasSize.w);
      } else {
        img.scaleToHeight(canvasSize.h);
      }
      if (img.scaleY * img.height > canvasSize.h) {
        img.scaleToHeight(canvasSize.h);
      } else if (img.scaleX * img.width > canvasSize.w) {
        img.scaleToWidth(canvasSize.w);
      }

      canvas.add(img).renderAll();

      const imgWidth = img.width * img.scaleX;
      const imgHeight = img.height * img.scaleY;

      canvas.setDimensions({ width: imgWidth, height: imgHeight });
    }
  }, [canvas, baseImage?.src, canvasSize]);
};
