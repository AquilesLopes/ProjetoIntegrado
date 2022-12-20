import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IUser } from '../interface/IUser';

export interface IUserState {
  value: IUser | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IUserState = {
  value: undefined,
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'showModalCaepi',
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<IUser | undefined>) => {
      state.value = action.payload;
    },
  },
});

export const {setUserState} = userSlice.actions;

export const getUserState = (state: RootState) => state.user.value;

export default userSlice.reducer;

