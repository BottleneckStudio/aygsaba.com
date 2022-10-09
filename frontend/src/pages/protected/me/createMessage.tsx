/* eslint-disable react/require-default-props */
import React, { FC, useState, useContext, useEffect } from 'react';

import { AuthContext } from '../../../context/auth';

import { Input, Textarea, InputContainer } from '../../../components/Input';
import { FormGroup } from '../../../components/Form';
import Button from '../../../components/Button';
import Switch from '../../../components/Switch';

import { Message } from '../../../types/models';

import useService from '../../../services/http.service';
import InputValidation from '../../../utils/input-validation';

const CreateMessage: FC<{
  editableMessage?: Message;
  onSubmit: () => void;
}> = ({
  editableMessage,
  onSubmit
}) => {
  const { auth } = useContext(AuthContext);
  const { actions: { createMessage } } = useService();

  const [messageValidation, setMessageValidation] = useState<{
    title: boolean;
    content: boolean;
    limit: boolean;
  }>({
    title: false,
    content: false,
    limit: false
  });

  const [message, setMessage] = useState<Message>({
    id: '',
    title: '',
    content: '',
    hideByView: false,
    limit: 5,
    status: '',
    user: {
      id: auth.id,
      username: auth.username,
      image: auth.image
    }
  });

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({ ...message, [event.target.name]: event.target.value });
  }

  const handleTextareaOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({ ...message, content: event.target.value });
  };

  const handleSwitch = () => setMessage({
    ...message,
    hideByView: !message.hideByView
  });

  const create = () => {
    const invalid = {
      title: !InputValidation(message.title),
      content: !InputValidation(message.content),
      limit: !InputValidation(message.limit, 'limit')
    };

    setMessageValidation(invalid);

    if (invalid.title || invalid.content || invalid.limit) return;

    onSubmit();
    createMessage({
      token: auth.token,
      ...message
    });
  };

  useEffect(() => {
    if (editableMessage !== null && editableMessage !== undefined) {
      setMessage(editableMessage);
    }
  }, []);

  return (
    <>
      <FormGroup>
        <p>Title</p>
        <InputContainer
          isError={messageValidation.title}
          data-error="Title cannot be empty"
        >
          <Input
            className="width100"
            name="title"
            placeholder="Naa koy sekreto"
            onChange={handleInputOnChange}
            value={message.title}
          />
        </InputContainer>
      </FormGroup>
      <FormGroup>
        <p>Content to hide</p>
        <InputContainer
          isError={messageValidation.content}
          data-error="Content cannot be empty"
        >
          <Textarea
            className="width100"
            name="content"
            placeholder="mao ni...."
            rows={4}
            onChange={handleTextareaOnChange}
            value={message.content}
          />
        </InputContainer>
      </FormGroup>
      <FormGroup className="flex-middle">
        <Switch
          checked={message.hideByView}
          onChange={handleSwitch}
        />
        <p>Hide by view</p>
      </FormGroup>
      <FormGroup>
        <p>
          {message.hideByView ? 'View' : 'Time'}
          &nbsp;limit
        </p>
        <InputContainer
          isError={messageValidation.limit}
          data-error={`limit cannot be less than 5 ${message.hideByView ? 'viewers' : 'minutes'}`}
        >
          <Input
            className="width100"
            name="limit"
            placeholder={`120 ${message.hideByView ? 'views' : 'mins'}`}
            onChange={handleInputOnChange}
            value={message.limit}
            type="number"
          />
        </InputContainer>
      </FormGroup>
      <FormGroup className="margin0">
        <Button className="width100 margin0 black" onClick={create}>Create</Button>
      </FormGroup>
    </>
  );
};

export default CreateMessage;
