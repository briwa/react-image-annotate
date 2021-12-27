import { createSlice } from '@reduxjs/toolkit';

import { createBaseImage } from '../../helpers/base-items';

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    size: { w: 0, h: 0 },
    baseImage: null,
    icons: {
      allIds: [],
      byId: {},
    },
  },
  reducers: {
    addIcon: (state, action) => {
      state.icons.allIds.push(action.payload.id);
      state.icons.byId[action.payload.id] = action.payload;
    },
    removeIcon: (state, action) => {
      state.icons.allIds = state.icons.allIds.filter((id) => id !== action.payload.id);
      delete state.icons.byId[action.payload.id]
    },
    updateIconProps: (state, action) => {
      const icon = state.icons[action.payload.id];
      if (icon) {
        icon[action.payload.prop] = icon.payload.value;
      }
    },
    setBaseImage: (state, action) => {
      const baseImage = createBaseImage();
      baseImage.src = action.payload.src;

      state.baseImage = baseImage;
    },
    unsetBaseImage: (state) => {
      state.baseImage = null;
    },
    setSize: (state, action) => {
      state.size.w = action.payload.w;
      state.size.h = action.payload.h;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addIcon,
  removeIcon,
  updateIconProps,
  setBaseImage,
  unsetBaseImage,
  setSize,
} = canvasSlice.actions;

export default canvasSlice.reducer;
