const InputValidation = (value: any, type?: string) => {
  // check length
  if (value.length === 0) return false;

  // check view limit or duration
  if (type === 'limit' && (value as unknown) as number < 5) return false;

  return true;
};

export default InputValidation;
