import { useMemo, useState } from 'react';

import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PhotoIcon from '@mui/icons-material/Photo';
import DownloadIcon from '@mui/icons-material/Download';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import AddIcons from './AddIcons';
import StyledMenu from './StyledMenu';

import {
  useActiveItemColor,
  useTriggerBaseImageUpload,
  useDownloadImage,
  useDownloadCSV,
} from '../hooks';

const Drawer = styled(MuiDrawer)({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    boxSizing: 'border-box',
  },
});

const ColorField = styled(TextField)({
  width: '151px',
})

export const MainListItems = () => {
  const triggerBaseImageUpload = useTriggerBaseImageUpload();
  const downloadImage = useDownloadImage();
  const downloadCSV = useDownloadCSV();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const triggerDownloadImageAndClose = () => {
    downloadImage();
    handleClose();
  };

  const triggerDownloadCSVAndClose = () => {
    downloadCSV();
    handleClose();
  };

  return (
    <>
      <ListItem button onClick={triggerBaseImageUpload}>
        <ListItemIcon>
          <PhotoIcon />
        </ListItemIcon>
        <ListItemText primary="Set image" />
      </ListItem>
      <AddIcons />
      <ListItem
        button
        id="sider-download"
        aria-controls="sider-download-options"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </ListItem>
      <StyledMenu
        id="sider-download-options"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sider-download',
        }}
      >
        <MenuItem onClick={triggerDownloadImageAndClose}>
          Image
        </MenuItem>
        <MenuItem onClick={triggerDownloadCSVAndClose}>
          CSV
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export const SecondaryListItems = () => {
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

export default function SiderListItems () {
  return (
    <Drawer variant="permanent">
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
    </Toolbar>
    <Divider />
    <List><MainListItems /></List>
    <Divider />
    <List><SecondaryListItems /></List>
  </Drawer>
  );
}
