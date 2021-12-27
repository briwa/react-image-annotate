import { useSelector } from 'react-redux';
import { useCreateIcon, useUpdateIconColor } from '../hooks/icon';

export default function FabricIcon ({ id }) {
  const icon = useSelector((state) => state.canvas.icons.byId[id]);

  useCreateIcon(icon);
  useUpdateIconColor(icon);
  
  return null;
};
