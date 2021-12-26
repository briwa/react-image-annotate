import * as React from 'react';

export const useContentSize = () => {
  const [canvasContRect, setCanvasContRect] = React.useState(null);

  React.useLayoutEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      setCanvasContRect(mainContent.getBoundingClientRect());
    }

  }, [setCanvasContRect]);

  return canvasContRect;
}
