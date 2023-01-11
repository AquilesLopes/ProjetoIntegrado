import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface IFindCaepiState {
  value: string;
  local: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IFindCaepiState = {
  value: '',
  local: '',
  status: 'idle',
};

export const findCaepiSlice = createSlice({
  name: 'Find CAEPI Slice',
  initialState,
  reducers: {
    setFindCaepiState: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setLocalCaepiState: (state, action: PayloadAction<string>) => {
      state.local = action.payload;
    },
  },
});

export const {setFindCaepiState, setLocalCaepiState} = findCaepiSlice.actions;

export const getFindCaepiState = (state: RootState) => state.findCaepi.value;
export const getLocalCaepiState = (state: RootState) => state.findCaepi.local;

export default findCaepiSlice.reducer;

