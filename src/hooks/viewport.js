import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSize } from '../store/slices/canvas';

import { CanvasContext } from '../hooks';

export const useContentSize = () => {
  const [canvasContRect, setCanvasContRect] = React.useState(null);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      const rect = mainContent.getBoundingClientRect();
      dispatch(setSize({ w: rect.width, h: rect.height }));
    }

  }, [setCanvasContRect, dispatch]);

  return canvasContRect;
}

export const useSetCanvasToBaseImage = () => {
  const { canvas } = React.useContext(CanvasContext);
  const baseImageWidth = useSelector((state) => state.canvas.baseImage?.width);
  const baseImageHeight = useSelector((state) => state.canvas.baseImage?.height);

  React.useLayoutEffect(() => {
    if (!baseImageWidth || !baseImageHeight || !canvas) return;

    canvas.setDimensions({ width: baseImageWidth, height: baseImageHeight });
  }, [canvas, baseImageWidth, baseImageHeight]);
};
