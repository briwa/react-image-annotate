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
  const shapedItems = useSelector((state) => {
    return state.canvas.items.allIds.map((id) => {
      const item = state.canvas.items.byId[id];

      if (item) {
        return [
          item.title,
          item.x + (item.width * item.scaleX / 2),
          item.y + (item.height * item.scaleY / 2),
          encodeURIComponent(JSON.stringify(item.attributes)),
        ];
      }

      return null;
    });
  });

  return useCallback(() => {
    if (shapedItems.length === 0) return;

    const headers = [['title', 'x', 'y', 'attributes']];
    const csvContent = 'data:text/csv;charset=utf-8,'
      + headers.concat(shapedItems).map((m) => m.join(',')).join('\n');

    const link = document.createElement('a');
    link.setAttribute('download', 'data.csv');
    link.href = csvContent;
    link.click();
    link.remove();
  }, [shapedItems]);
};
