import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './slices/account';
import authReducer from './slices/auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
  },
  devTools: { trace: true },
});

export { store };
