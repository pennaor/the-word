import { Avatar, Chip } from '@mui/material';
import React from 'react';

import './user.css';

export default function User({ author }) {
  return (
    <Chip
      avatar={ <Avatar alt={ author.displayName } src={ author.image } /> }
      label={ author.displayName }
    />
  );
}
