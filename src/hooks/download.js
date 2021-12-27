import * as React from 'react';
import { CanvasContext } from '../hooks';
import { useSelector } from 'react-redux';

export const useDownload = () => {
  const { canvas } = React.useContext(CanvasContext);
  const baseImage = useSelector((state) => state.canvas.baseImage);

  return React.useCallback(() => {
    if (!canvas || !baseImage) return;

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
  }, [canvas, baseImage]);
};
