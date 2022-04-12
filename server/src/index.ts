import dotenv from 'dotenv';

import webSocket from 'websocket';
import http from 'http';

import { styles, format } from './lib/log';
import { sendMessage, uuidv4 } from './lib/chat';
import { iEvent, EventType, iClient, iUser, iMessage } from './lib/types';

const INFO = format(styles.bg.green, 'INFO:');
const DATA = format(styles.bg.blue, 'DATA:');
const ERROR = format(styles.bg.red, 'ERROR:');

dotenv.config();
const webSocketsServerPort = process.env.PORT;

console.clear();
console.log(format(styles.fg.green, 'Started successfully!'));
console.log('You can now access your server.\n');
console.log('\tLocal:', 'http://localhost:' + webSocketsServerPort);
console.log('\tOn Your Network:', 'http://' + require('os').networkInterfaces().en0[1].address + ':' + webSocketsServerPort);
console.log('\nNote that the development build is not optimized.');
console.log('To create a production build, use', format(styles.fg.cyan, 'npm start:build') + '.\n');

const webSocketServer = webSocket.server;
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({ httpServer: server });

const clients = new Map<string, iClient>(); // Active connections

wsServer.on('request', (request) => {
  console.log(new Date(), 'New connection from', request.origin);
  const connection = request.accept(undefined, request.origin);
  // setup user
  const userUuid = request.key;
  const newUser: iUser = { key: userUuid };
  const newClient: iClient = { connection: connection, user: newUser };
  clients.set(userUuid, newClient);
  // proceed events from client
  connection.on('message', (message) => {
    if (message.type !== 'utf8') {
      console.log(ERROR, 'Non utf8 encoding');
      return;
    }
    const dataFromClient: iEvent = JSON.parse(message.utf8Data); // getting data
    switch (dataFromClient.event) {
      case EventType.USER_LOGIN: {
        clients.get(userUuid)!.user.username = dataFromClient.user!.username; // set username
        const json: iEvent = {
          event: EventType.USER_LOGIN,
          user: clients.get(userUuid)!.user,
        };
        sendMessage(connection, JSON.stringify(json)); // confirm user
        json.event = EventType.USER_JOINED;
        clients.forEach((c) => {
          // send other users
          if (c.connection !== connection) {
            sendMessage(c.connection, JSON.stringify(json));
          }
        });
        console.log(DATA, 'Logged user:', json);
        break;
      }

      case EventType.MESSAGE_SEND: {
        console.log(clients.get(userUuid)!.user.username);

        const newMessage: iMessage = {
          uid: uuidv4(),
          timestamp: Date.now(),
          userKey: dataFromClient.message!.userKey,
          content: dataFromClient.message!.content,
          senderName: clients.get(userUuid)!.user.username,
        };
        const json: iEvent = {
          event: EventType.MESSAGE_RECEIVE,
          message: newMessage,
        };
        // send every one
        clients.forEach((c) => {
          sendMessage(c.connection, JSON.stringify(json));
        });
        console.log(DATA, 'New message:', json);
        break;
      }

      default:
        console.log(ERROR, 'Unknown event type');
        break;
    }
  });

  connection.on('close', function (connection) {
    console.log(`${new Date()} User ${userUuid} disconnected`);
    const json: iEvent = { event: EventType.USER_LOGOUT, user: clients.get(userUuid)!.user };
    // TODO: Send everyone user left
    clients.delete(userUuid);
  });
});
