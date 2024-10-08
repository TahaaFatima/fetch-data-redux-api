import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducer';

export default configureStore({
  reducer: postReducer,
});