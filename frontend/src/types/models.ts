export interface User {
  username: string;
  image: string;
}

export type Auth = User & {
  token: string;
};
