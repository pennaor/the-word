import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  email: '',
  displayName: '',
  image: '',
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.image = action.payload.image;
    },
  },
});

export const { addUser } = userReducer.actions;

export default userReducer.reducer;
