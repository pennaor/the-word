import React from 'react';
import { Box,
  Container,
  FormControl,
  TextField,
  Typography,
  Grid,
  Link } from '@mui/material';
import Header from '../BasicHeader';

export const Subscribe = ({ children }) => (
  <Container
    maxWidth="xs"
    sx={ {
      bgcolor: 'white',
      mt: '10vh',
      borderRadius: '10px',
      width: '90%',
      minHeight: '250px',
      justifyContent: 'center',
    } }
    component="main"
    disableGutters
  >
    <Header />
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        border: 1,
        p: 1.5,
        mx: 'auto',
        boxShadow: '0 3px 5px 2px #9bc3ea',
        borderRadius: '0px 0px 10px 10px',
        borderWidth: '0px 1px 1px 1px',
        borderStyle: 'solid',
        borderColor: '#1976d2',
      } }
    >
      { children }
    </Box>
  </Container>
);

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
    size="small"
    FormHelperTextProps={ { sx: { textAlign: 'center' } } }
    sx={ { maxWidth: '210px' } }
    { ...props }
  />
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
