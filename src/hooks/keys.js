import { useLayoutEffect } from 'react';
import { useTriggerDeleteActiveItem } from '../hooks';

export const useKeys = () => {
  const triggerDeleteActiveItem = useTriggerDeleteActiveItem();

  useLayoutEffect(() => {
    document.addEventListener('keyup', (e) => {
      // These shortcuts should only work
      // when user is not currently typing into any input.
      if (document.activeElement.tagName === 'INPUT') return;

      switch (e.key) {
        case 'Delete':
        case 'Backspace': {
          triggerDeleteActiveItem();
          break;
        }
        default: {
          break;
        }
      }
    });
  }, [triggerDeleteActiveItem]);
};
