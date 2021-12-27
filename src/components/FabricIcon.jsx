import { useSelector } from 'react-redux';
import { useCreateIcon } from '../hooks/icon';

export default function FabricIcon ({ id }) {
  const icon = useSelector((state) => state.canvas.icons.byId[id]);
  useCreateIcon(icon);
  
  return null;
};
