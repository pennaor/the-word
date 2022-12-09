const schemas = require('./schemas');

function identifier(id) {
  const { error } = schemas.identifier.validate(id);
  if (!error) {
    return null;
  }
  error.name = 'BAD_REQUEST';
  throw error;
}

function userCredentials(body) {
  const { error } = schemas.userCredentials.validate(body);
  if (!error) {
    return null;
  }
  error.name = 'BAD_REQUEST';
  error.message = 'E-mail ou senha inválidos';
  throw error;
}

function newUser(body) {
  const { error } = schemas.newUser.validate(body);
  if (!error) {
    return null;
  }
  error.name = 'BAD_REQUEST';
  throw error;
}

function newCategory(body) {
  const { error } = schemas.newCategory.validate(body);
  if (!error) {
    return null;
  }
  error.name = 'BAD_REQUEST';
  throw error;
}

function newPost(body) {
  const { error } = schemas.newPost.validate(body);
  if (!error) {
    return null;
  }
  error.name = 'BAD_REQUEST';
  const [{ type }] = error.details;
  if (type.match(/.required|.empty/)) {
    error.message = 'Some required fields are missing';
  }
  throw error;
}

function postUpdate(body) {
  const { error } = schemas.postUpdate.validate(body);
  if (!error) {
    return null;
  }
  error.name = 'BAD_REQUEST';
  const [{ type }] = error.details;
  if (type.match(/.required|.empty/)) {
    error.message = 'Some required fields are missing';
  }
  throw error;
}

module.exports = {
  identifier,
  userCredentials,
  newUser,
  newCategory,
  newPost,
  postUpdate,
};
