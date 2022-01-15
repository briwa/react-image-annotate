import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import {
  useInitializeCanvas,
  useKeys,
  useContentSize,
  useActiveItem,
  useItemModifications,
} from '../hooks';

import BaseImageInput from '../components/BaseImageInput';
import FabricCanvas from '../components/FabricCanvas';
import WelcomeText from '../components/WelcomeText';
import Sider from '../components/Sider';

const CanvasContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const EditorPage = () => {
  const baseImage = useSelector((state) => state.canvas.baseImage);

  useInitializeCanvas();
  useKeys();
  useContentSize();
  useActiveItem();
  useItemModifications();

  return (
    <>
      <Sider />
      <Box
        id="main-content" 
        component="main"
        sx={{
          flexGrow: 1,
          height: 'calc(100vh - 4rem)',
          overflow: 'auto',
          mt: 8,
        }}
      >
        { !baseImage && <WelcomeText /> }
        <CanvasContainer id="canvas-container">
          <canvas id="canvas"></canvas>
        </CanvasContainer>
      </Box>
      <BaseImageInput />
      <FabricCanvas />
    </>
  );
};

export default EditorPage;
