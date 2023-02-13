const getCodeByErrorType = (type) => {
  let code;
  console.log(type);
  switch (type) {
    case 'any.required':
    case 'number.min':
    case 'string.empty':
      code = 400;
      break;
    default:
      code = 422;
      break;
  }

  return code;
};

const validator = (schema) => (payload) => {
  const result = schema.validate(payload, { abortEarly: false });

  if (result.error) {
    const error = result.error.details[0];

    return {
      error: {
        code: getCodeByErrorType(error.type),
        message: error.message,
      },
    };
  }

  return payload;
};

export default validator;
