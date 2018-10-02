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
      error.errorMsg = 'This field can not be empty';
      error.error = true
    }
  }

  if(type === 'number') {
    if(parseFloat(value) <= 0) {
      error.errorMsg = 'This value must be bigger than 0';
      error.error = true;
    }
    if(validator.isEmpty(value)) {
      error.errorMsg = 'Password is required';
      error.error = true
    }
  }

  return error;
};