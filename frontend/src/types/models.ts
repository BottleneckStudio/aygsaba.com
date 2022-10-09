export interface User {
  id: string;
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
  user: User;
}

export type Auth = User & {
  token: string;
};
