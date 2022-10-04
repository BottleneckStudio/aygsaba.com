export interface User {
  username: string;
  image: string;
}

export interface Message {
  id: string,
  title: string;
  content: string;
  hideByView: boolean;
  limit: number;
  status: string;
}

export type Auth = User & {
  token: string;
};
