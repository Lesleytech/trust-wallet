import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { TransactionType } from '../../modules/Dashboard/types';
import { RootState } from './../types/index';

const slice = createSlice({
  name: 'account',
  initialState: {
    loading: true,
    balance: 0,
    transactions: [],
    cardNumber: '',
  } as RootState['account'],
  reducers: {
    setAccountDetails: (
      account,
      action: PayloadAction<{ balance: number; cardNumber: string }>,
    ) => {
      account.balance = action.payload.balance;
      account.cardNumber = action.payload.cardNumber;
    },
    setTransactions: (account, action: PayloadAction<TransactionType[]>) => {
      account.transactions = action.payload;
      account.loading = false;
    },
  },
});

export default slice.reducer;
export const { setAccountDetails, setTransactions } = slice.actions;

export const getTodayTransactions = createSelector(
  (state: RootState) => state.account.transactions,
  (transactions) => transactions.filter((t) => dayjs(t.timestamp).isSame(dayjs(), 'day')),
);

export const getTodayTotal = createSelector(getTodayTransactions, (transactions) => {
  let withdraw = 0,
    deposit = 0;

  // console.log(transactions);

  transactions.forEach((t) => {
    if (t.type === 'withdrawal') {
      withdraw += t.amount;
    } else {
      deposit += t.amount;
    }
  });

  return { withdraw, deposit };
});

export const getAvgWithdrawal = createSelector(
  (state: RootState) => state.account.transactions,
  (transactions) => {
    const pastMonthTransactions = transactions.filter(
      (t) => t.type !== 'deposit' && dayjs().diff(dayjs(t.timestamp), 'day') <= 30,
    );

    const total = pastMonthTransactions.reduce((acc, curr) => acc + curr.amount, 0);
    const avg = total / pastMonthTransactions.length;

    return avg;
  },
);
