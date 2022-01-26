import { iEvent, EventType, iMessage, iUser } from '../../lib/types';

import { Middleware } from 'redux';
import { w3cwebsocket } from 'websocket';

import { chatActions } from '../chatSlice';
import { userActions } from '../userSlice';
// TODO: Auto reconnect
const LOCAL_DOMAINS = ['localhost', '127.0.0.1'];
const url =
  LOCAL_DOMAINS.includes(window.location.hostname) ||
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname.startsWith('10.0.') ||
  window.location.hostname.endsWith('local')
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PUBLIC;

const chatMiddleware: Middleware = (store) => {
  let socket: w3cwebsocket;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;

    if (chatActions.startConnecting.match(action)) {
      socket = new w3cwebsocket(url);

      // open
      socket.onopen = () => {
        store.dispatch(chatActions.connectionEstablished()); // connect
      };

      // receive
      socket.onmessage = (message: any) => {
        const dataFromServer: iEvent = JSON.parse(message.data); // fetched data

        switch (dataFromServer.event) {
          case EventType.USER_LOGIN: {
            const user: iUser = {
              key: dataFromServer.user!.key,
              name: dataFromServer.user!.name,
            };
            store.dispatch(userActions.login({ user }));
            break;
          }

          case EventType.MESSAGE_RECEIVE: {
            console.log(dataFromServer);

            const newMessage: iMessage = {
              uid: dataFromServer.message!.uid,
              timestamp: dataFromServer.message!.timestamp,
              userKey: dataFromServer.message!.userKey,
              content: dataFromServer.message!.content,
            };
            store.dispatch(chatActions.receiveMessage({ message: newMessage }));
            break;
          }

          default:
            break;
        }
      };
      // TODO: Get previous messages
    }
    // send
    if (chatActions.submitMessage.match(action) && isConnectionEstablished) {
      const message: iMessage = {
        content: action.payload.content,
        userKey: store.getState().user.uid,
      };
      const data: iEvent = {
        event: EventType.MESSAGE_SEND,
        message: message,
      };
      socket.send(JSON.stringify(data));
    }

    if (userActions.setUsername.match(action) && isConnectionEstablished) {
      const user: iUser = { name: action.payload.user.name };
      const data: iEvent = { event: EventType.USER_LOGIN, user: user };
      if (socket.readyState) socket.send(JSON.stringify(data));
    }

    next(action);
  };
};

export default chatMiddleware;
