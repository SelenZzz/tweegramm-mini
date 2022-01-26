import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chatMiddleware from './middleware/socket';
import loggerMiddleware from './middleware/logger';

import userReducer from './userSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([loggerMiddleware, chatMiddleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
