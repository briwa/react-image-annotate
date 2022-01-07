import { createSlice } from '@reduxjs/toolkit';

const recursivelySetProps = (item, props) => {
  for (const key in props) {
    if (typeof props[key] === 'object') {
      recursivelySetProps(item[key], props[key]);
    } else {
      item[key] = props[key];
    }
  }
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    size: { width: 0, height: 0, isSiderOpened: true },
    baseImage: null,
    items: {
      allIds: [],
      byId: {},
    },
    activeItemId: null,
    editingTextItemId: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.allIds.push(action.payload.id);
      state.items.byId[action.payload.id] = action.payload;
    },
    removeItem: (state, action) => {
      state.items.allIds = state.items.allIds.filter((id) => id !== action.payload.id);
      delete state.items.byId[action.payload.id]
    },
    setItemProps: (state, action) => {
      const item = state.items.byId[action.payload.id];
      if (item) {
        recursivelySetProps(item, action.payload.props);
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
    setEditingTextItemId: (state, action) => {
      state.editingTextItemId = action.payload.id;
    },
    toggleSider: (state, action) => {
      state.size.isSiderOpened = action.payload.toggle;
    },
  },
});

export const {
  addItem,
  removeItem,
  setItemProps,
  setEditingTextItemId,
  setBaseImage,
  unsetBaseImage,
  setSize,
  setBaseImageSize,
  setActiveItemId,
  toggleSider,
} = canvasSlice.actions;

export default canvasSlice.reducer;
