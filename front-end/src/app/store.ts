import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/findCaepiReducer';
import userReducer from '../features/userReducer';

export const store = configureStore({
  reducer: {
    findCaepi: counterReducer,
    user: userReducer,
  }, 
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
