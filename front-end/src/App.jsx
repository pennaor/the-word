import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useDispatch } from 'react-redux';
import Routes from './components/Routes';
import { addUser } from './redux/reducers/userReducer';
import Loading from './components/Loading';
import ModalAlert from './components/ModalAlert';
import fetchAPI from './utils/fetchAPI';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    background: {
      default: '#d7d7d7',
    },
    info: {
      main: '#1976d2',
    },
  },
});

export default function App() {
  const [appLoading, setAppLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAPI('POST', 'user/auth')
      .then(({ data: user }) => dispatch(addUser({ ...user })))
      .catch(() => localStorage.removeItem('__blog-word'))
      .finally(() => setAppLoading(false));
  }, [dispatch]);

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline enableColorScheme />
      { !appLoading
        ? <Routes />
        : <Loading /> }
      <ModalAlert />
    </ThemeProvider>
  );
}
