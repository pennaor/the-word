import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Icon, Button, Grid, Typography } from '@mui/material';

export const Header = ({ children }) => (
  <Box sx={ { flexGrow: 1 } }>
    <AppBar
      position="static"
      sx={ { borderRadius: '10px 10px 0px 0px' } }
    >
      <Toolbar
        variant="dense"
        sx={ { flexWrap: 'wrap', p: 1.3 } }
      >
        <Grid
          sx={ {
            display: 'flex',
          } }
          width={ 1 }
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          { children }
        </Grid>
      </Toolbar>
    </AppBar>
  </Box>
);

export const User = ({ userName, onUserLogout }) => (
  <Grid item>
    <Typography
      variant="caption"
      color="inherit"
      sx={ {
        fontSize: '12px',
        padding: '6px 8px',
      } }
    >
      { userName }
    </Typography>
    <Button
      type="button"
      color="secondary"
      onClick={ onUserLogout }
      sx={ { minWidth: '10px' } }
    >
      <Icon
        sx={ {
          fontSize: '1.1em',
        } }
      >
        logout
      </Icon>
    </Button>
  </Grid>
);
