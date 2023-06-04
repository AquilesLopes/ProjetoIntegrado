import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchStateReducer from '../features/searchStateReducer';
import historicCaepiReducer from '../features/historicCaepiReducer';
import userReducer from '../features/userReducer';

export const store = configureStore({
  reducer: {
    searchCaepi: searchStateReducer,
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
