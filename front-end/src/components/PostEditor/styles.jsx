import React from 'react';
import {
  FormControl,
  TextField,
  Typography,
  Grid,
  Link } from '@mui/material';

export const Form = ({ children, onSubmit }) => (
  <form
    onSubmit={ onSubmit }
  >
    <FormControl
      sx={ {
        alignItems: 'center',
        gap: '9px',
      } }
    >
      { children }
    </FormControl>
  </form>
);

export const Title = ({ text }) => (
  <Typography variant="h6" component="h1" marginTop={ -1 } color="#1976d2">
    { text }
  </Typography>
);

export const Input = (props) => (
  <TextField
    variant="outlined"
    sx={ {
      width: '95%',
      padding: '0',
    } }
    { ...props }
  />
);

export const MultipleSelect = ({ children }) => (
  <Grid
    display="flex"
    justifyContent="center"
    sx={ { padding: '16px' } }
  >
    <Grid item flexBasis="fit-content">
      <FormControl sx={ { minWidth: '130px' } }>
        { children }
      </FormControl>
    </Grid>
  </Grid>
);

export const HelperLinks = ({ links }) => (
  <Grid container sx={ { textAlign: 'center', gap: '2.5px' } }>

    { links.map(({ href, text }) => (
      <Grid item xs={ 12 } key={ href }>
        <Link href={ href } variant="body2">
          { text }
        </Link>
      </Grid>
    )) }

  </Grid>
);
