import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhotoIcon from '@mui/icons-material/Photo';

import {
  useTriggerBaseImageUpload,
} from '../hooks';

const SiderBaseImage = () => {
  const triggerBaseImageUpload = useTriggerBaseImageUpload();

  return (
    <ListItem button onClick={triggerBaseImageUpload}>
      <ListItemIcon>
        <PhotoIcon />
      </ListItemIcon>
      <ListItemText primary="Set image" />
    </ListItem>
  );
};

export default SiderBaseImage;
