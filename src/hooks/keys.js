import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTriggerDeleteActiveItem } from '../hooks';

export const useKeys = () => {
  const triggerDeleteActiveItem = useTriggerDeleteActiveItem();
  const editingTextItemId = useSelector((state) => state.canvas.editingTextItemId);

  useLayoutEffect(() => {
    const addShortcutKeys = (e) => {
      // These shortcuts should only work
      // when user is not currently typing into any input.
      if (document.activeElement.tagName === 'INPUT' || !!editingTextItemId) return;

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
    };

    document.addEventListener('keyup', addShortcutKeys);

    return () => {
      document.removeEventListener('keyup', addShortcutKeys);
    };
  }, [editingTextItemId, triggerDeleteActiveItem]);
};
