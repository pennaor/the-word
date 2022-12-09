import React from 'react';
import { FormControl, TextField, Typography, Button } from '@mui/material';

export const Form = ({ children, onSubmit }) => (
  <FormControl
    component="form"
    onSubmit={ onSubmit }
    fullWidth
    sx={ {
      alignItems: 'center',
      gap: '18px',
    } }
  >
    { children }
  </FormControl>
);

export const Title = ({ text }) => (
  <Typography
    variant="h6"
    component="h1"
    textAlign="center"
    color="#1976d2"
  >
    { text }
  </Typography>
);

export const Input = (props) => (
  <TextField
    variant="outlined"
    size="small"
    FormHelperTextProps={ { sx: { textAlign: 'center' } } }
    sx={ { maxWidth: '210px' } }
    { ...props }
  />
);

export const SearchButton = ({ children, ...props }) => (
  <Button
    variant="contained"
    size="small"
    { ...props }
  >
    { children }
  </Button>
);
