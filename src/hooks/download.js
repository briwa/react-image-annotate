import { useContext, useCallback } from 'react';
import { CanvasContext } from '../hooks';
import { useSelector } from 'react-redux';

export const useDownloadImage = () => {
  const { canvas } = useContext(CanvasContext);
  const baseImage = useSelector((state) => state.canvas.baseImage);

  return useCallback(() => {
    if (!canvas || !baseImage) return;

    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 0.8
    });

    const link = document.createElement('a');
    link.setAttribute('download', 'image.png');
    link.href = dataUrl;
    link.click();
    link.remove();
  }, [canvas, baseImage]);
};

export const useDownloadCSV = () => {
  const shapedIcons = useSelector((state) => {
    return state.canvas.icons.allIds.map((id) => {
      const icon = state.canvas.icons.byId[id];

      if (icon) {
        return [
          icon.title,
          icon.x + (icon.width * icon.scaleX / 2),
          icon.y + (icon.height * icon.scaleY / 2),
          encodeURIComponent(icon.color),
        ];
      }

      return null;
    });
  });

  return useCallback(() => {
    if (shapedIcons.length === 0) return;

    const headers = [['title', 'x', 'y', 'color']];
    const csvContent = 'data:text/csv;charset=utf-8,'
      + headers.concat(shapedIcons).map((m) => m.join(',')).join('\n');

    const link = document.createElement('a');
    link.setAttribute('download', 'data.csv');
    link.href = csvContent;
    link.click();
    link.remove();
  }, [shapedIcons]);
};
