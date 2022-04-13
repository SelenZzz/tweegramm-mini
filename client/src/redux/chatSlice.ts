import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iMessage, iUser } from '../lib/types';
import { RootState } from './store';

export interface ChatState {
  messages: (iMessage | iUser)[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: ChatState = {
  messages: [],
  isEstablishingConnection: false,
  isConnected: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    receiveAllMessages: (state, action: PayloadAction<{ messages: iMessage[] }>) => {
      state.messages = action.payload.messages;
    },
    receiveMessage: (state, action: PayloadAction<{ message: iMessage | iUser }>) => {
      state.messages.push(action.payload.message);
    },
    submitMessage: (state, action: PayloadAction<{ content: string }>) => {
      return;
    },
  },
});

export const chatActions = chatSlice.actions;

export const selectMessages = (state: RootState) => state.chat.messages;
export const selectConnected = (state: RootState) => state.chat.isConnected;

export default chatSlice.reducer;
