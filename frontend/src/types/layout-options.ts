import { Message } from './models';

export interface DefaultOptions {
  children: React.ReactNode;
}

export interface MessageItemOptions {
  message: Message;
  onShare: (id: string) => void;
  onLink: (id: string) => void;
  onEdit: (message: Message) => void;
}

export type DrawerOptions = DefaultOptions & {
  open: boolean;
  onClose: () => void;
  title: string;
};

export interface AlertBannerOptions {
  open: boolean;
  content: string;
  type: string;
  onClose: () => void;
}

export type LayoutOptions = DefaultOptions & {
  isBlurred?: boolean;
};
