const domain = process.env.REACT_APP_API_DOMAIN;

const endpoints = {
  baseUrl: domain as string,
  signin: '/signin',
  messages: '/messages'
};

export default endpoints;
