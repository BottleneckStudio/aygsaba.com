import React, { FC } from 'react';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';

import type { MessageItemOptions } from '../../../types/layout-options';

import {
  Message,
  MessageButton
} from './components';

const MessageItem: FC<MessageItemOptions> = ({
  message,
  onShare
}) => (
  <Message>
    <h3>{message.title}</h3>
    <MessageButton
      status={message.status}
      disabled={message.status !== 'ready'}
      onClick={() => onShare(message)}
    >
      {message.status === 'ready' && (
        <p>
          <span className="icon">
            <RecordVoiceOverRoundedIcon />
          </span>
          Share
        </p>
      )}

      {message.status === 'ongoing' && (
        <p>
          Ongoing
          {message.hideByView
            ? (
              <span className="counter">
                11/200
              </span>
            )
            : (
              <span className="counter">
                1hr left
              </span>
            )}
        </p>
      )}

      {message.status === 'done' && <p>Done</p>}
    </MessageButton>
  </Message>
);

export default MessageItem;
