import { useMemo } from 'react';

import { styled } from '@mui/material/styles';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import {
  useActiveItemColor, useTriggerDeleteActiveItem,
} from '../hooks';

const ColorField = styled(TextField)({
  width: '151px',
})

const SiderProperties = () => {
  const [activeItemColor, setActiveItemColor] = useActiveItemColor();
  const triggerDeleteActiveItem = useTriggerDeleteActiveItem();

  const colorField = useMemo(() => {
    if (!activeItemColor) return null;

    const setColorToActiveItem = (e) => {
      setActiveItemColor(e.currentTarget.value);
    };  

    return (
      <ColorField
        id="selected-icon-color"
        label="Color"
        type="color"
        variant="standard"
        value={activeItemColor}
        onChange={setColorToActiveItem}
      />
    );
  }, [activeItemColor, setActiveItemColor]);

  return !activeItemColor ? null : (
    <>
      <ListItem>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        Properties
      </ListItem>
      <ListItem>{colorField}</ListItem>
      <ListItem sx={{ marginLeft: [-1] }}>
        <IconButton onClick={triggerDeleteActiveItem}>
          <DeleteIcon/>
        </IconButton>
      </ListItem>
    </>
  );
};

export default SiderProperties;
