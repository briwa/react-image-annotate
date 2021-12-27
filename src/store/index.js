import { configureStore } from '@reduxjs/toolkit'

import canvasReducer from './slices/canvas';

export default configureStore({
  reducer: {
    canvas: canvasReducer,
  },
});
