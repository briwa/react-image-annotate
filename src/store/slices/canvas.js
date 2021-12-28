import { createSlice } from '@reduxjs/toolkit';

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    size: { width: 0, height: 0, isSiderOpened: true },
    baseImage: null,
    icons: {
      allIds: [],
      byId: {},
    },
    activeItemId: null,
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
    setIconProp: (state, action) => {
      const icon = state.icons.byId[action.payload.id];
      if (icon) {
        icon[action.payload.key] = action.payload.value;
      }
    },
    setIconProps: (state, action) => {
      const icon = state.icons.byId[action.payload.id];
      if (icon) {
        for (const key in action.payload.props) {
          icon[key] = action.payload.props[key];
        }
      }
    },
    setBaseImage: (state, action) => {
      state.baseImage = action.payload;
    },
    setBaseImageSize: (state, action) => {
      state.baseImage.width = action.payload.width;
      state.baseImage.height = action.payload.height;
    },
    unsetBaseImage: (state) => {
      state.baseImage = null;
    },
    setSize: (state, action) => {
      state.size.width = action.payload.width;
      state.size.height = action.payload.height;
    },
    setActiveItemId: (state, action) => {
      state.activeItemId = action.payload.id;
    },
    toggleSider: (state, action) => {
      state.size.isSiderOpened = action.payload.toggle;
    },
  },
});

export const {
  addIcon,
  removeIcon,
  setIconProp,
  setIconProps,
  setBaseImage,
  unsetBaseImage,
  setSize,
  setBaseImageSize,
  setActiveItemId,
  toggleSider,
} = canvasSlice.actions;

export default canvasSlice.reducer;
