import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { fabric } from 'fabric';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import CustomIcon from './CustomIcon';
import AccessibilitySvg from '../symbols/accessibility.svg';
import FireSvg from '../symbols/fire.svg';
import InfoSvg from '../symbols/info.svg';

import { CanvasContext } from '../fabric';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 220,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function AddIcons() {
  const { canvas } = React.useContext(CanvasContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const addIconAndClose = (e) => {
    fabric.loadSVGFromURL(e.currentTarget.firstElementChild.src, (icons) => {
      const icon = icons[0];
      icon.scaleToWidth(50);
      canvas.add(icon).setActiveObject(icon).renderAll();
    });

    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <ListItem
        button
        id="sider-add-icons"
        aria-controls="sider-icons-list"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Add icons" />
      </ListItem>
      <StyledMenu
        id="sider-icons-list"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sider-add-icons',
        }}
      >
        <MenuItem onClick={addIconAndClose}><CustomIcon src={AccessibilitySvg} />Accessibility</MenuItem>
        <MenuItem onClick={addIconAndClose}><CustomIcon src={FireSvg} />Fire</MenuItem>
        <MenuItem onClick={addIconAndClose}><CustomIcon src={InfoSvg} />Info</MenuItem>
      </StyledMenu>
    </React.Fragment>
  );
}
