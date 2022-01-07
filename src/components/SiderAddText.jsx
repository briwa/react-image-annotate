import { useDispatch, useSelector } from 'react-redux';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import { addItem } from '../store/slices/canvas';
import { createText } from '../helpers/items';
import { useCallback } from 'react';

const SiderAddText = () => {
  const dispatch = useDispatch();
  const baseImage = useSelector((state) => state.canvas.baseImage);

  const triggerAddText = useCallback(() => {
    if (!baseImage) return;

    dispatch(addItem(createText()));
  }, [baseImage]);

  return (
    <ListItem button onClick={triggerAddText}>
      <ListItemIcon>
        <TextFieldsIcon />
      </ListItemIcon>
      <ListItemText primary="Add text" />
    </ListItem>
  );
};

export default SiderAddText;
