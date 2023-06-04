import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ISearch } from '../interface/ISearch';

export interface IHistoricCaepiState {
  value: ISearch[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IHistoricCaepiState = {
  value: [],
  status: 'idle',
};

export const historicCaepiSlice = createSlice({
  name: 'Historic CAEPI Slice',
  initialState,
  reducers: {
    setHistoricCaepiState: (state, action: PayloadAction<ISearch[]>) => {
      state.value = action.payload;
    },
  },
});

export const {setHistoricCaepiState} = historicCaepiSlice.actions;

export const getHistoricCaepiState = (state: RootState) => state.historicCaepi.value;

export default historicCaepiSlice.reducer;

