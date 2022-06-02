import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../modules/Dashboard/types';

const slice = createSlice({
  name: 'auth',
  initialState: { currentUser: null } as { currentUser: UserType | null },
  reducers: {
    login: (auth, action: PayloadAction<UserType | null>) => {
      auth.currentUser = action.payload;
    },
    logout: (auth) => {
      auth.currentUser = null;
    },
  },
});

export default slice.reducer;
export const { login } = slice.actions;
