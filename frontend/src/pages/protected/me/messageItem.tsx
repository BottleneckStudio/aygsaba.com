/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, useContext } from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import type { MessageItemOptions } from '../../../types/layout-options';

import {
  Message,
  MessageButton,
  MessageStatus,
  MessageButtonGroup,
  MessageUser,
  MessageLink
} from '../../../components/Message';

import { AuthContext } from '../../../context/auth';

const MessageItem: FC<MessageItemOptions> = ({
  message,
  onShare,
  onLink,
  onEdit
}) => {
  const { auth } = useContext(AuthContext);

  const unSharedGroup = () => (
    <>
      <MessageButton
        onClick={() => onShare(message.id)}
      >
        <span>
          <ReplyRoundedIcon
            sx={{ fontSize: '20px' }}
          />
        </span>
      </MessageButton>

      <MessageButton
        onClick={() => onLink(message.id)}
      >
        <span>
          <InsertLinkRoundedIcon
            sx={{ fontSize: '20px' }}
          />
        </span>
      </MessageButton>

      <MessageButton
        onClick={() => onEdit(message)}
      >
        <span>
          <EditRoundedIcon
            sx={{ fontSize: '20px' }}
          />
        </span>
      </MessageButton>
    </>
  );

  const doneGroup = () => (
    <MessageStatus status={message.status}>
      <span>
        <CheckCircleRoundedIcon
          sx={{ fontSize: '20px' }}
        />
      </span>
      <span className="text">Done</span>
    </MessageStatus>
  );

  const onGoingGroup = () => {
    let statusComponent;

    if (message.hideByView) {
      statusComponent = (
        <>
          <span>
            <RemoveRedEyeRoundedIcon
              sx={{ fontSize: '20px' }}
            />
          </span>
          <span className="text">11/200</span>
        </>
      );
    } else {
      statusComponent = (
        <>
          <span>
            <AccessTimeRoundedIcon
              sx={{ fontSize: '20px' }}
            />
          </span>
          <span className="text">1:00:53</span>
        </>
      );
    }
    return (
      <MessageStatus status={message.status}>
        {statusComponent}
      </MessageStatus>
    );
  };

  const returnButtonGroup = () => {
    if (message.status === 'ready') {
      return unSharedGroup();
    }

    if (message.status === 'ongoing') {
      return onGoingGroup();
    }

    return doneGroup();
  };

  return (
    <Message>
      {message.status !== 'ready' && (
        <MessageLink to={`/message/${message.id}`} />
      )}
      <MessageUser>
        <img src={auth.image} alt="user" />
        <p>
          @
          {auth.username}
        </p>
      </MessageUser>

      <p>{message.title}</p>

      <MessageButtonGroup>
        {returnButtonGroup()}
      </MessageButtonGroup>
    </Message>
  );
};

export default MessageItem;
