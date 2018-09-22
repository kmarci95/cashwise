import validator from 'validator';

export const validate = (value, type) => {
  let error = {
    errorMsg: '',
    error: false
  };

  if(type === 'email') {
    if(!validator.isEmail(value)) {
      error.errorMsg = 'Please add a valid email';
      error.error = true
    }
    if(validator.isEmpty(value)) {
      error.errorMsg = 'Email field is required';
      error.error = true
    }
  }

  if(type === 'password') {
    if(!validator.isLength(value, {min: 6, max: 32})) {
      error.errorMsg = 'Please add a password between 6 and 32 characters';
      error.error = true;
    }
    if(validator.isEmpty(value)) {
      error.errorMsg = 'Password is required';
      error.error = true
    }
  }

  if(type === 'text') {
    if(validator.isEmpty(value)) {
      error.errorMsg = 'Password is required';
      error.error = true
    }
  }

  return error;
};