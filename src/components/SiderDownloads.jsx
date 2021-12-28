import { useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DownloadIcon from '@mui/icons-material/Download';
import MenuItem from '@mui/material/MenuItem';

import StyledMenu from './StyledMenu';

import {
  useDownloadImage,
  useDownloadCSV,
} from '../hooks';

const SiderDownloads = () => {
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

export default SiderDownloads;
