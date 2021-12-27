import { useState, useContext, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSize } from '../store/slices/canvas';

import { CanvasContext } from '../hooks';

export const useContentSize = () => {
  const [canvasContRect, setCanvasContRect] = useState(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      const rect = mainContent.getBoundingClientRect();
      dispatch(setSize({ w: rect.width, h: rect.height }));
    }

  }, [setCanvasContRect, dispatch]);

  return canvasContRect;
}

export const useSetCanvasToBaseImage = () => {
  const { canvas } = useContext(CanvasContext);
  const baseImageWidth = useSelector((state) => state.canvas.baseImage?.width);
  const baseImageHeight = useSelector((state) => state.canvas.baseImage?.height);

  useLayoutEffect(() => {
    if (!baseImageWidth || !baseImageHeight || !canvas) return;

    canvas.setDimensions({ width: baseImageWidth, height: baseImageHeight });
  }, [canvas, baseImageWidth, baseImageHeight]);
};
