import { useSetBaseImage, useSetCanvasToBaseImage } from '../hooks';
import { useSelector } from 'react-redux';

import FabricIcon from './FabricIcon';

export default function FabricCanvas () {
  useSetBaseImage();
  useSetCanvasToBaseImage();

  const iconIds = useSelector((state) => state.canvas.icons.allIds);

  const iconNodes = iconIds.map((iconId) => {
    return (
      <FabricIcon key={iconId} id={iconId} />
    );
  });

  return (
    <>
      {iconNodes}
    </>
  );
};
