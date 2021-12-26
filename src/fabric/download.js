import * as React from 'react';
import { CanvasContext } from './context';

export const useDownload = () => {
  const { canvas } = React.useContext(CanvasContext);

  return React.useCallback(() => {
    if (!canvas) return;

    const imageInput = document.getElementById('image-input');
    if (imageInput && !imageInput.value) return;

    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 0.8
    });

    const link = document.createElement('a');
    link.setAttribute('download', 'download');
    link.href = dataUrl;
    link.click();
    link.remove();

    return dataUrl;
  }, [canvas]);
};
