import { Message } from './models';

interface Token {
  token: string;
}

export type LoginPayloadType = Token & {
  uid: string;
};

export type GetUserMessagePayloadType = Token & {
  userId: string;
};

export type GetMessagePayloadType = Token & {
  id: string;
};

export type CreateMessagePayloadType = Token & Omit<Message, 'status' | 'user'> & {
  userId: string,
};
