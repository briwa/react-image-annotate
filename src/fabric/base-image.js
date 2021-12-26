import * as React from 'react';
import { fabric } from 'fabric';

import { CanvasContext } from './context';

export const useTriggerBaseImageUpload = () => {
  return () => {
    const imageInput = document.getElementById('image-input');
    if (imageInput) {
      imageInput.value = null;
      imageInput.click();
    }
  };
};

export const BaseImageInput = ({ content }) => {
  const { canvas } = React.useContext(CanvasContext);

  const setBaseImageToCanvas = (e) => {
    canvas.remove(...canvas.getObjects());

    const reader = new FileReader();
    reader.onload = function(e) {
      const image = new Image();
      image.src = e.target.result;

      image.onload = function() {
        const img = new fabric.Image(image, { selectable: false, evented: false, hoverCursor: 'pointer' });

        // Fit to either width or height of the canvas depending on the image ratio.
        if (img.width > img.height) {
          img.scaleToWidth(content.width);
        } else {
          img.scaleToHeight(content.height);
        }
        if (img.scaleY * img.height > content.height) {
          img.scaleToHeight(content.height);
        } else if (img.scaleX * img.width > content.width) {
          img.scaleToWidth(content.width);
        }

        canvas.add(img).renderAll();
        canvas.setDimensions({ width: img.width * img.scaleX, height: img.height * img.scaleY });
      }
    }

    reader.readAsDataURL(e.target.files[0]);
    document.getElementById('no-image-set').style.display = 'none';
  };
  
  return (
    <input
      id="image-input"
      style={{ display: 'none' }}
      type="file"
      onChange={setBaseImageToCanvas}
    />
  );
};
