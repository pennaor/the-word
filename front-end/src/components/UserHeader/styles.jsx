import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Icon, Button, Grid, Typography, useMediaQuery,
  Link as LinkUI } from '@mui/material';
import { Link } from 'react-router-dom';

export const Header = ({ children }) => (
  <Box sx={ { flexGrow: 1 } }>
    <AppBar
      position="static"
    >
      <Toolbar
        variant="dense"
        sx={ {
          p: 1.3,
        } }
      >
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          flexDirection="column"
          maxWidth="700px"
          margin="auto"
          gap="8px"
        >
          { children }
        </Grid>
      </Toolbar>
    </AppBar>
  </Box>
);

export const LogoAndUser = ({ children }) => (
  <Grid
    container
    item
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    xs={ 11.6 }
    sm={ 7.4 }
  >
    { children }
  </Grid>
);

const Anchor = ({ children }) => (
  <LinkUI
    underline="none"
    color="#fff"
    component={ Link }
    to="/posts"
  >
    { children }
  </LinkUI>
);

export const Logo = () => (
  <Grid item xs={ 7 } component={ Anchor }>
    <Typography variant="h5" color="inherit" component="span">
      The Word
    </Typography>
    <Icon>app_registration</Icon>
  </Grid>
);

export const UserContent = ({ children }) => (
  <Grid item sx={ { flexBasis: 'fit-content' } }>
    { children }
  </Grid>
);

export const UserName = ({ userName }) => {
  const mw600 = useMediaQuery('(min-width:600px)');
  return (
    <Typography
      variant="caption"
      color="inherit"
      sx={ {
        fontSize: '12px',
        verticalAlign: 'bottom',
        display: 'inline-block',
        maxWidth: mw600 ? '150px' : '75px',
        maxHeight: '30px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      } }
    >
      { userName }
    </Typography>
  );
};

export const LogOut = ({ onUserLogout }) => (
  <Button
    type="button"
    color="secondary"
    onClick={ onUserLogout }
    sx={ { minWidth: 'fit-content', padding: '0' } }
  >
    <Icon
      sx={ {
        ml: 0.5,
        fontSize: '1.1em',
      } }
    >
      logout
    </Icon>
  </Button>
);
