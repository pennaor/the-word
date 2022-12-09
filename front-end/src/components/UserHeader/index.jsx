import React from 'react';
import Navigation from './Navigation';
import * as S from './styles';
import User from './User';

export default function UserHeader() {
  return (
    <S.Header>
      <S.LogoAndUser>
        <S.Logo />
        <User />
      </S.LogoAndUser>
      <Navigation />
    </S.Header>
  );
}
