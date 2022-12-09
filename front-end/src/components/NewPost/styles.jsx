import React from 'react';
import {
  FormControl,
  TextField,
  Card,
  Divider,
  CardActions,
  Button,
  Grid,
} from '@mui/material';

export const Form = ({ children, onSubmit }) => {
  const [TitleInput, ContentInput, MultipleSelect, EditButton, CancelButton] = children;
  return (
    <Grid
      container
      justifyContent="center"
      maxWidth="700px"
      mx="auto"
      my={ 2 }
      sx={ {
        backgroundColor: 'transparent',
      } }
    >
      <Grid
        item
        xs={ 11.2 }
        sm={ 7.2 }
      >
        <Card>
          <form
            onSubmit={ onSubmit }
          >
            <FormControl
              fullWidth
              sx={ {
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px 6px',
              } }
            >
              { TitleInput }
              { ContentInput }
            </FormControl>

            <Divider />

            { MultipleSelect }

            <Divider />

            <CardActions>
              { EditButton }
              { CancelButton }
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

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

export const EditButton = ({ children, ...props }) => (
  <Button
    size="small"
    { ...props }
  >
    { children }
  </Button>
);

export const CancelButton = ({ children, ...props }) => (
  <Button
    size="small"
    color="error"
    { ...props }
  >
    { children }
  </Button>
);
