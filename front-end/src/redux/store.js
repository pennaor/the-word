import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export default store;
