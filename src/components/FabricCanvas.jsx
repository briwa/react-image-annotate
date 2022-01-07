import { useSetBaseImage, useSetCanvasToBaseImage } from '../hooks';
import { useSelector } from 'react-redux';

import FabricIcon from './FabricIcon';
import FabricText from './FabricText';

const FabricCanvas = () => {
  useSetBaseImage();
  useSetCanvasToBaseImage();

  const { allIds, byId } = useSelector((state) => state.canvas.items);

  const itemNodes = allIds.map((itemId) => {
    const item = byId[itemId];

    switch (item.type) {
      case 'icon': {
        return (
          <FabricIcon key={item.id} item={item} />
        );
      }
      case 'text': {
        return (
          <FabricText key={item.id} item={item} />
        );
      }
      default: {
        return null;
      }
    }
  });

  return (
    <>
      {itemNodes}
    </>
  );
};

export default FabricCanvas;
