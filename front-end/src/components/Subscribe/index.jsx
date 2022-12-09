import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import { validateFields, getFieldValidation } from './fieldValidation';
import fetchAPI from '../../utils/fetchAPI';
import useModal from '../../hooks/useModal';

export default function Subscribe() {
  const [form, setFormValue] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
  });

  const [helperTexts, setHelperTexts] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => setDisableSubmit(validateFields(form)), [form]);

  const { writeResponseOnModal } = useModal();

  const history = useHistory();

  const onChangeField = ({ target: { name, value } }) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const onBlurField = ({ target: { name } }) => {
    const validationFunc = getFieldValidation(name);
    const helperText = validationFunc({ ...form });
    setHelperTexts((prev) => ({ ...prev, [name]: helperText }));
  };

  const onSubscribeSubmit = (ev) => {
    ev.preventDefault();
    const { avatar, confirmPassword, ...body } = form;
    body.image = avatar;
    fetchAPI('POST', 'user/create', body)
      .then(({ data }) => {
        localStorage.setItem('__blog-word', data.token);
        history.replace('/login');
        history.go(0);
      })
      .catch(writeResponseOnModal);
  };

  return (
    <S.Subscribe>
      <S.Form onSubmit={ onSubscribeSubmit }>
        <S.Title text="New User" />
        <S.Input
          type="text"
          name="displayName"
          label="Display Name"
          value={ form.displayName }
          error={ !!helperTexts.displayName }
          helperText={ helperTexts.displayName }
          onChange={ onChangeField }
          onBlur={ onBlurField }
          required
        />
        <S.Input
          type="email"
          name="email"
          label="E-mail"
          value={ form.email }
          error={ !!helperTexts.email }
          helperText={ helperTexts.email }
          onChange={ onChangeField }
          onBlur={ onBlurField }
          required
        />
        <S.Input
          type="password"
          name="password"
          label="Password"
          value={ form.password }
          error={ !!helperTexts.password }
          onChange={ onChangeField }
          onBlur={ onBlurField }
          required
        />
        <S.Input
          type="password"
          name="confirmPassword"
          label="Repeat password"
          value={ form.confirmPassword }
          error={ !!helperTexts.password }
          helperText={ helperTexts.password }
          onChange={ onChangeField }
          onBlur={ () => onBlurField({ target: { name: 'password' } }) }
          required
        />
        <S.Input
          type="text"
          name="avatar"
          label="Avatar"
          placeholder="Picture URL"
          value={ form.avatar }
          onChange={ onChangeField }
        />
        <Button
          variant="contained"
          type="submit"
          size="small"
          disabled={ disableSubmit }
        >
          Subscribe
        </Button>
        <S.HelperLinks
          links={ [
            { href: '/', text: 'Already subscribed? Log In' },
          ] }
        />
      </S.Form>
    </S.Subscribe>
  );
}
