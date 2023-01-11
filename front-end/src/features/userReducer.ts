import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IUser } from '../interface/IUser';
import { emptyUser } from '../util/util';

export interface IUserState {
  value: IUser;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IUserState = {
  value: emptyUser(),
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'User Slice',
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<IUser>) => {
      state.value = action.payload;
    },
  },
});

export const {setUserState} = userSlice.actions;

export const getUserState = (state: RootState) => state.user.value;

export default userSlice.reducer;

