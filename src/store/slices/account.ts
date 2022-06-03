import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { TransactionType } from '../../modules/Dashboard/types';
import { RootState } from './../types/index';

const slice = createSlice({
  name: 'account',
  initialState: { loading: true, balance: 0, transactions: [] } as RootState['account'],
  reducers: {
    setBalance: (account, action: PayloadAction<number>) => {
      account.balance = action.payload;
    },
    setTransactions: (account, action: PayloadAction<TransactionType[]>) => {
      account.transactions = action.payload;
    },
  },
});

export default slice.reducer;
export const { setBalance, setTransactions } = slice.actions;

export const getTodayTransactions = createSelector(
  (state: RootState) => state.account.transactions,
  (transactions) => transactions.filter((t) => dayjs(t.timestamp).isSame(dayjs())),
);
