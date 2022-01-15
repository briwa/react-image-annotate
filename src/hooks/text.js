import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import { CanvasContext, useSetInitialItemProps } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setItemProps, setEditingTextItemId, removeItem } from '../store/slices/canvas';

export const useCreateText = (text) => {
  const { canvas } = useContext(CanvasContext);
  const dispatch = useDispatch();
  const baseImage = useSelector((state) => state.canvas.baseImage);
  const setInitialItemProps = useSetInitialItemProps();

  useEffect(() => {
    if (!canvas || !baseImage) return;

    const fabricText = new fabric.IText(text.attributes.text);

    setInitialItemProps(text, fabricText, baseImage);
    canvas.add(fabricText).setActiveObject(fabricText).renderAll();

    fabricText.on('editing:entered', () => {
      dispatch(setEditingTextItemId({ id: text.id }));
    });

    fabricText.on('editing:exited', () => {
      dispatch(setEditingTextItemId({ id: null }));

      if (fabricText.text.trim() === '') {
        dispatch(removeItem({ id: text.id }));
      } else {
        dispatch(setItemProps({
          id: text.id,
          props: {
            width: fabricText.width,
            height: fabricText.height,
            attributes: { text: fabricText.text }
          },
        }));
      }
    });

    return () => {
      const deletedText = canvas.getObjects().find((o) => o.id === text.id);
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
