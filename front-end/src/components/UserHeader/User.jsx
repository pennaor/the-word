import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as S from './styles';

export default function User() {
  const userName = useSelector((state) => state.user.displayName);

  const history = useHistory();

  const onUserLogout = () => {
    localStorage.removeItem('__blog-word');
    history.go(0);
  };

  return (
    <S.UserContent>
      <S.UserName userName={ userName } />
      <S.LogOut onUserLogout={ onUserLogout } />
    </S.UserContent>
  );
}
