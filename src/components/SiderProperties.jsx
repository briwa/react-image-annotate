import { useMemo } from 'react';

import { styled } from '@mui/material/styles';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextField from '@mui/material/TextField';

import {
  useActiveItemColor,
} from '../hooks';

const ColorField = styled(TextField)({
  width: '151px',
})

const SiderProperties = () => {
  const [activeItemColor, setActiveItemColor] = useActiveItemColor();

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
      <ListSubheader inset>Properties</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        {colorField}
      </ListItem>
    </>
  );
};

export default SiderProperties;
