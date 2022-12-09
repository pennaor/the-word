import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

export default function Navigation() {
  return (
    <Grid
      container
      item
      justifyContent="space-between"
      component="nav"
      xs={ 11.2 }
      sm={ 7.4 }
    >
      <Grid item>
        <Button
          sx={ {
            fontSize: '0.7rem',
            padding: '0',
          } }
          component={ Link }
          to="/posts"
          color="secondary"
          fontSize="0.5rem"
        >
          My Posts
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={ {
            fontSize: '0.7rem',
            padding: '0',
          } }
          component={ Link }
          to="/search"
          color="secondary"
          fontSize="0.5rem"
        >
          Search
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={ {
            fontSize: '0.7rem',
            padding: '0',
          } }
          component={ Link }
          to="/authors"
          color="secondary"
        >
          Community
        </Button>
      </Grid>
    </Grid>
  );
}
