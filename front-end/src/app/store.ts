import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/findCaepiReducer';
import historicCaepiReducer from '../features/historicCaepiReducer';
import userReducer from '../features/userReducer';

export const store = configureStore({
  reducer: {
    findCaepi: counterReducer,
    user: userReducer,
    historicCaepi: historicCaepiReducer,
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
