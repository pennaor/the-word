import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import * as S from './styles';
import { addUser } from '../../redux/reducers/userReducer';
import useModal from '../../hooks/useModal';
import fetchAPI from '../../utils/fetchAPI';

export default function Login({ redirectUser }) {
  const [form, setFormValue] = useState({
    email: '',
    password: '',
  });

  const { writeResponseOnModal } = useModal();

  const dispatch = useDispatch();

  const history = useHistory();

  const onChangeField = ({ target: { name, value } }) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const onLoginClickButton = async (ev) => {
    ev.preventDefault();
    fetchAPI('POST', 'login', form)
      .then(({ data: { user, token } }) => {
        localStorage.setItem('__blog-word', token);
        dispatch(addUser({ ...user }));
        history.push('/posts');
      })
      .catch(writeResponseOnModal);
  };

  return !redirectUser ? (
    <S.Login>
      <S.Form onSubmit={ onLoginClickButton }>
        <S.Title text="Login" />
        <S.Input
          type="email"
          name="email"
          label="E-mail"
          placeholder="Insira seu email"
          autoFocus
          value={ form.email }
          onChange={ onChangeField }
        />
        <S.Input
          type="password"
          name="password"
          label="Password"
          placeholder="Insira sua senha"
          value={ form.password }
          onChange={ onChangeField }
        />
        <Button
          variant="contained"
          type="submit"
          size="small"
          disabled={ form.email.length < 2 }
        >
          Entrar
        </Button>
        <S.HelperLinks
          links={ [
            { href: '/subscribe', text: 'Crie sua conta' },
          ] }
        />
      </S.Form>
    </S.Login>
  ) : (
    <Redirect to="/posts" />
  );
}
