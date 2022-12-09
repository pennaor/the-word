import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: { title: '', message: '', redirectPath: '' },
};

const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setModal } = appReducer.actions;

export default appReducer.reducer;
