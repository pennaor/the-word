import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import fetchAPI from '../../utils/fetchAPI';
import Loading from '../Loading';
import UserHeader from '../UserHeader';

export default function UsersList() {
  const user = useSelector((state) => state.user);

  const [authors, setAuthors] = useState();

  const { writeResponseOnModal } = useModal();

  useEffect(() => {
    fetchAPI('GET', 'user')
      .then(({ data }) => {
        const filtredAuthors = data.filter((author) => author.id !== user.id);
        setAuthors(filtredAuthors);
      })
      .catch(writeResponseOnModal);
  }, [writeResponseOnModal, user.id]);

  return (
    <>
      <UserHeader />
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
        { authors ? (
          <List
            sx={ {
              backgroundColor: 'white',
              borderRadius: '10px',
            } }
          >
            { authors.map((author, index) => (
              <Box key={ author.id }>
                <ListItemButton
                  component={ Link }
                  to={ `/posts?user=${author.id}` }
                  sx={ { p: 2 } }
                >
                  <ListItemIcon>
                    <Avatar
                      alt={ author.displayName }
                      src={ author.image }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={ author.displayName }
                    primaryTypographyProps={ {
                      sx: {
                        maxWidth: '180px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    } }
                  />
                </ListItemButton>
                { authors.length - 1 > index
                  && <Divider variant="inset" component="li" /> }
              </Box>
            )) }
          </List>
        ) : (
          <Loading />
        ) }
      </Grid>
    </>
  );
}
