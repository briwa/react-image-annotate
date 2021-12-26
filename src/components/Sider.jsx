import * as React from 'react';
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
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextField from '@mui/material/TextField';

import AddIcons from './AddIcons';

const Drawer = styled(MuiDrawer)({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    boxSizing: 'border-box',
  },
});

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PhotoIcon />
      </ListItemIcon>
      <ListItemText primary="Set image" />
    </ListItem>
    <AddIcons />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Properties</ListSubheader>
    <ListItem>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <TextField
        id="selected-icon-name"
        label="Name"
        type="text"
        variant="standard"
      />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <TextField
        id="selected-icon-color"
        label="Color"
        type="text"
        variant="standard"
      />
    </ListItem>
  </div>
);

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
    <List>{mainListItems}</List>
    <Divider />
    <List>{secondaryListItems}</List>
  </Drawer>
  );
}
