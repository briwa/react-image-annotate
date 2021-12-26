import * as React from 'react';
import { fabric } from 'fabric';

import { CanvasContext } from './context';

export const BaseImageInput = ({ canvasContRect }) => {
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
          img.scaleToWidth(canvasContRect.width);
        } else {
          img.scaleToHeight(canvasContRect.height);
        }
        if (img.scaleY * img.height > canvasContRect.height) {
          img.scaleToHeight(canvasContRect.height);
        } else if (img.scaleX * img.width > canvasContRect.width) {
          img.scaleToWidth(canvasContRect.width);
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
