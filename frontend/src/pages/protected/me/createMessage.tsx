import React, { FC, useState, useContext } from 'react';

import { AuthContext } from '../../../context/auth';

import { Input, Textarea } from '../../../components/Input';
import { FormGroup } from '../../../components/Form';
import Button from '../../../components/Button';
import Switch from '../../../components/Switch';

import { Message } from '../../../types/models';

import useService from '../../../services/http.service';

const CreateMessage: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const { auth } = useContext(AuthContext);
  const { actions: { createMessage } } = useService();
  const [message, setMessage] = useState<Message>({
    id: '',
    title: '',
    content: '',
    hideByView: false,
    limit: 0,
    status: ''
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
    onSubmit();
    createMessage({
      token: auth.token,
      ...message
    });
  };

  return (
    <>
      <FormGroup>
        <p>Title</p>
        <Input
          className="width100"
          name="title"
          placeholder="Naa koy sekreto"
          onChange={handleInputOnChange}
          value={message.title}
        />
      </FormGroup>
      <FormGroup>
        <p>Content to hide</p>
        <Textarea
          className="width100"
          name="content"
          placeholder="mao ni...."
          rows={4}
          onChange={handleTextareaOnChange}
          value={message.content}
        />
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
        <Input
          className="width100"
          name="limit"
          placeholder={`120 ${message.hideByView ? 'views' : 'mins'}`}
          onChange={handleInputOnChange}
          value={message.limit}
        />
      </FormGroup>
      <FormGroup className="margin0">
        <Button className="width100 margin0 black" onClick={create}>Create</Button>
      </FormGroup>
    </>
  );
};

export default CreateMessage;
