export enum EventType {
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  MESSAGE_SEND = 'message_send',
  MESSAGE_RECEIVE = 'message_receive',
  MESSAGES_REQUEST_ALL = 'messages_request_all',
  MESSAGES_SEND_ALL = 'messages_send_all',
}

export interface iEvent {
  event: EventType;
  user?: iUser;
  message?: iMessage;
}

export interface iUser {
  key?: string;
  name: string;
}

export interface iMessage {
  uid?: string;
  timestamp?: number;
  userKey: string;
  content: string;
  senderName?: string;
}
