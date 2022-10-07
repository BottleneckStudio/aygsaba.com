const endpoints = {
  baseUrl: `${process.env.NODE_API_DOMAIN as string}/api`,
  signin: '/signin',
  messages: '/messages'
};

export default endpoints;
