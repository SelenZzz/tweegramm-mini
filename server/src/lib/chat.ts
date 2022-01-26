import webSocket from 'websocket';

export const uuidv4 = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) =>
    ('x' == c ? (r = (Math.random() * 16) | 0) : (r & 0x3) | 0x8).toString(16),
  );

export const sendMessage = (connection: webSocket.connection, jsonString: string) => {
  connection.sendUTF(jsonString);
};
