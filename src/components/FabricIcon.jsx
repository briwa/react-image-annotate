import { useCreateIcon, useSetIconColorOnCanvas } from '../hooks';

const FabricIcon = ({ item }) => {
  useCreateIcon(item);
  useSetIconColorOnCanvas(item);
  
  return null;
};

export default FabricIcon;
