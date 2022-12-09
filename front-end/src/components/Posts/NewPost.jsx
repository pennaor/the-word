import React from 'react';
import {
  Button,
  Grid,
  Icon,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function NewPost() {
  const history = useHistory();
  return (
    <Grid
      item
      xs={ 10 }
      sx={ {
        padding: 1.5,
        textAlign: 'center',
      } }
    >
      <Button
        onClick={ () => history.push('/post/create') }
        sx={ {
          padding: 0,
          minHeight: 0,
        } }
      >
        <Icon
          sx={ {
            fontSize: '4rem',
            color: 'gray',
          } }
        >
          add_circle
        </Icon>
        <Typography
          variant="h5"
          component="span"
        >
          New
        </Typography>
      </Button>
    </Grid>
  );
}
