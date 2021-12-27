import * as React from 'react';
import { useDispatch } from 'react-redux'
import { setSize } from '../store/slices/canvas';

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
