import { useCreateText, useSetTextColorOnCanvas } from '../hooks';

const FabricText = ({ item }) => {
  useCreateText(item);
  useSetTextColorOnCanvas(item);
  
  return null;
};

export default FabricText;
