import { Grid, Icon, Typography } from '@mui/material';
import React from 'react';

export default function Logo() {
  return (
    <Grid item>
      <Typography variant="h5" color="inherit" component="span">
        The Word
        <Icon sx={ { ml: 0.5, verticalAlign: 'top' } }>app_registration</Icon>
      </Typography>
    </Grid>
  );
}
