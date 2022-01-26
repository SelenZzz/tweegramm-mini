import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { iUser } from '../lib/types';

export interface userState {
  logged: boolean;
  uid: string | undefined;
  name: string | undefined;
}

const initialState: userState = {
  logged: false,
  uid: undefined,
  name: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<{ user: iUser }>) => {
      // state.name = action.payload.user.name;
      return;
    },
    login: (state, action: PayloadAction<{ user: iUser }>) => {
      state.uid = action.payload.user.key;
      state.name = action.payload.user.name;
      if (action.payload.user.key) state.logged = true;
    },
    logout: (state) => {
      state.logged = false;
      state.uid = undefined;
      state.name = undefined;
    },
  },
});

export const userActions = userSlice.actions;

export const selectLogged = (state: RootState) => state.user.logged;
export const selectUserUid = (state: RootState) => state.user.uid;

export default userSlice.reducer;
