const helperTexts = {
  displayName: 'Username must be at least 8 characters long',
  email: 'Enter valid e-mail: user@domain.com',
  password: 'Password must be at least 6 characters long',
  confirmPassword: 'Password does not match!',
};

const validateDisplayName = ({ displayName }) => {
  const displayNameMinLength = 8;
  if (displayName.length < displayNameMinLength) {
    return helperTexts.displayName;
  }
  return '';
};

const validateEmail = ({ email }) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!new RegExp(emailRegex).test(email)) {
    return helperTexts.email;
  }
  return '';
};

const validatePassword = ({ password, confirmPassword }) => {
  const passwordMinLength = 6;
  if (password.length < passwordMinLength) {
    return helperTexts.password;
  }
  if (password !== confirmPassword) {
    return helperTexts.confirmPassword;
  }
  return '';
};

const validationFuncs = {
  displayName: validateDisplayName,
  email: validateEmail,
  password: validatePassword,
};

export function getFieldValidation(fieldName) {
  return validationFuncs[fieldName];
}

export function validateFields(state) {
  const fields = Object.values(validationFuncs);
  return fields.some((validationFunc) => validationFunc(state));
}
