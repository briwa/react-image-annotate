import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import { CanvasContext } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setItemProps, setEditingTextItemId, removeItem } from '../store/slices/canvas';

export const useCreateText = (text) => {
  const { canvas } = useContext(CanvasContext);
  const { width, height, id, scaleX, scaleY, x, y } = text;
  const dispatch = useDispatch();
  const baseImage = useSelector((state) => state.canvas.baseImage);

  useEffect(() => {
    if (!canvas || !baseImage) return;

    const currentText = new fabric.IText(text.attributes.text);

    if (!width && !height && scaleX === 1 && scaleY === 1) {
      dispatch(setItemProps({
        id,
        props: {
          scaleX: currentText.scaleX,
          scaleY: currentText.scaleY,
          width: currentText.width,
          height: currentText.height,
        }
      }));
    } else {
      currentText
        .set('width', width)
        .set('height', height)
        .set('scaleX', scaleX)
        .set('scaleY', scaleY);
    }

    if (!x && !y) {
      currentText
        .set('left', baseImage.width / 2 - currentText.width / 2)
        .set('top', baseImage.height / 2 - currentText.height / 2); 
    } else {
      currentText
        .set('left', x)
        .set('top', y);
    }
    
    currentText.set('id', id);
    canvas.add(currentText).setActiveObject(currentText).renderAll();

    currentText.on('editing:entered', () => {
      dispatch(setEditingTextItemId({ id }));
    });

    currentText.on('editing:exited', () => {
      dispatch(setEditingTextItemId({ id: null }));

      if (currentText.text.trim() === '') {
        dispatch(removeItem({ id }));
      } else {
        dispatch(setItemProps({
          id,
          props: {
            width: currentText.width,
            height: currentText.height,
            attributes: { text: currentText.text }
          },
        }));
      }
    });

    return () => {
      const deletedText = canvas.getObjects().find((o) => o.id === id);
      if (deletedText) canvas.remove(deletedText);
    };

  // Trigger hook only once in order to avoid flickering on re-rendering.
  }, [dispatch, canvas, !!text]);
};

export const useSetTextColorOnCanvas = (text) => {
  const { canvas } = useContext(CanvasContext);
  const { id, attributes } = text;

  useEffect(() => {
    if (!canvas) return;

    const object = canvas.getObjects().find((o) => o.id === id);
    if (object && attributes.color) {
      object.set('fill', attributes.color);
      canvas.renderAll();
    }
  }, [canvas, id, attributes.color]);
};
