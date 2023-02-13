const validator = (schema) => (payload) => {
  const result = schema.validate(payload, { abortEarly: false });

  if (result.error) {
    let code;

    const error = result.error.details[0];

    switch (error.type) {
      case 'any.required':
      case 'number.min':
        code = 400;
        break;
      default:
        code = 422;
        break;
    }

    return {
      error: {
        code,
        message: error.message,
      },
    };
  }

  return payload;
};

export default validator;
