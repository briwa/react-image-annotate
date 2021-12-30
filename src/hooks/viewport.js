import { useCallback, useContext, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleSider, setSize } from '../store/slices/canvas';

import { CanvasContext } from '../hooks';

const useDispatchContentSize = () => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();

  return useCallback(() => {
    if (!canvas) return;

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      const rect = mainContent.getBoundingClientRect();
      dispatch(setSize({ width: rect.width, height: rect.height }));
    }
  }, [dispatch, canvas]);
}

export const useContentSize = () => {
  const contentSizeCallback = useDispatchContentSize();

  useLayoutEffect(contentSizeCallback, [contentSizeCallback]);
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

export const useToggleSider = () => {
  const dispatch = useDispatch();
  const contentSizeCallback = useDispatchContentSize();

  const isSiderOpened = useSelector((state) => state.canvas.size.isSiderOpened);
  const triggerToggleSider = useCallback(() => {
    dispatch(toggleSider({ toggle: !isSiderOpened }));
    contentSizeCallback();
  }, [dispatch, isSiderOpened, contentSizeCallback]);

  return [isSiderOpened, triggerToggleSider];
}
