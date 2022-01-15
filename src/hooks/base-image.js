import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { useDispatch, useSelector } from 'react-redux';

import { CanvasContext } from '../hooks';
import { setBaseImageSize } from '../store/slices/canvas';

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
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();
  const canvasSize = useSelector((state) => state.canvas.size);
  const baseImage = useSelector((state) => state.canvas.baseImage);

  useEffect(() => {
    if (!baseImage?.url || !canvas) return;

    const image = new Image();
    image.src = baseImage.url;

    image.onload = function() {
      const img = new fabric.Image(image, { selectable: false, evented: false, hoverCursor: 'pointer' });
      const canvasWidth = canvasSize.width;
      const canvasHeight = canvasSize.height;

      // Fit to either width or height of the canvas depending on the image ratio.
      if (img.width > img.height) {
        img.scaleToWidth(canvasWidth);
      } else {
        img.scaleToHeight(canvasHeight);
      }
      if (img.scaleY * img.height > canvasHeight) {
        img.scaleToHeight(canvasHeight);
      } else if (img.scaleX * img.width > canvasWidth) {
        img.scaleToWidth(canvasWidth);
      }

      canvas
        .add(img)
        .sendToBack(img)
        .renderAll();

      const imgWidth = img.width * img.scaleX;
      const imgHeight = img.height * img.scaleY;

      dispatch(setBaseImageSize({ width: imgWidth, height: imgHeight }));
    }
  }, [canvas, baseImage?.url, dispatch]);
};
