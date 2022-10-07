import { Message } from './models';

export interface DefaultOptions {
  children: React.ReactNode;
}

export interface MessageItemOptions {
  message: Message;
  onShare: (message: Message) => void;
}

export type DrawerOptions = DefaultOptions & {
  open: boolean;
  onClose: () => void;
  title: string;
};

export type LayoutOptions = DefaultOptions & {
  isBlurred?: boolean;
};
