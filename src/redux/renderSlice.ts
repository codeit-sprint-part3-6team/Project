import { createSlice } from '@reduxjs/toolkit';

type RenderState = {
  toggle: boolean;
};

const initialState: RenderState = {
  toggle: false,
};

const renderSlice = createSlice({
  name: 'render',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { toggleState } = renderSlice.actions;
export default renderSlice.reducer;
