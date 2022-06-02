import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: { trace: true },
});

export { store };
