import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuItem from '@mui/material/MenuItem';

import CustomIcon from './CustomIcon';
import StyledMenu from './StyledMenu';
import AccessibilitySvg from '../symbols/accessibility.svg';
import FireSvg from '../symbols/fire.svg';
import InfoSvg from '../symbols/info.svg';

import { addItem } from '../store/slices/canvas';
import { createIcon } from '../helpers/items';

const SiderAddIcons = () => {
  const baseImage = useSelector((state) => state.canvas.baseImage);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const addIconAndClose = useCallback((e) => {
    if (!baseImage) {
      handleClose();

      return;
    }

    dispatch(
      addItem(createIcon({
        url: e.currentTarget.firstElementChild.src,
        title: e.currentTarget.firstElementChild.alt,
      })),
    );

    handleClose();
  }, [dispatch, baseImage]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
        <MenuItem onClick={addIconAndClose}>
          <CustomIcon src={AccessibilitySvg} alt="Accessibility" />Accessibility
        </MenuItem>
        <MenuItem onClick={addIconAndClose}>
          <CustomIcon src={FireSvg} alt="Fire" />Fire
        </MenuItem>
        <MenuItem onClick={addIconAndClose}>
          <CustomIcon src={InfoSvg} alt="Info" />Info
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default SiderAddIcons;
