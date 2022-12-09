import { Avatar, Chip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './user.css';

export default function User({ author }) {
  return (
    <Chip
      avatar={ <Avatar alt={ author.displayName } src={ author.image } /> }
      label={ author.displayName }
      component={ Link }
      to={ `/posts?user=${author.id}` }
      clickable
    />
  );
}
