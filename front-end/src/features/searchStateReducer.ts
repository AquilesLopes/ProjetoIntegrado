import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ISearch } from '../interface/ISearch';

export interface ISearchState {
  value: ISearch;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ISearchState = {
  value: {
    type: 'number',
    cnpj: '',
    number: 0,
    color: '', 
    time: 0
  },
  status: 'idle',
};

export const searchStateReducer = createSlice({
  name: 'Search CAEPI Slice',
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<ISearch>) => {
      state.value = action.payload;
    }
  },
});

export const {setSearchState} = searchStateReducer.actions;

export const getSearchState = (state: RootState) => state.searchCaepi.value;

export default searchStateReducer.reducer;

