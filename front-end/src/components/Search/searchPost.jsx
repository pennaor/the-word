import { Alert, Card, CardContent } from '@mui/material';
import React, { useState } from 'react';
import useModal from '../../hooks/useModal';
import fetchAPI from '../../utils/fetchAPI';
import * as S from './styles';

export default function SearchPost({ setPosts }) {
  const [postQuery, setPostQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const { writeResponseOnModal } = useModal();

  const onSubmitPostSearch = (ev) => {
    ev.preventDefault();
    fetchAPI('GET', `post/search?q=${postQuery}`)
      .then(({ data }) => {
        setAlertMessage(data.length ? `Searching by ${postQuery}` : 'No matches found');
        setPosts(data);
      })
      .catch(writeResponseOnModal);
  };

  return (
    <Card>
      <CardContent
        sx={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        } }
      >
        <S.Form onSubmit={ onSubmitPostSearch }>
          <S.Title text="Search Post" />
          <S.Input
            type="text"
            name="postQuery"
            label="Post Keyword"
            value={ postQuery }
            onChange={ (ev) => setPostQuery(ev.target.value) }
            required
          />
          <S.SearchButton
            type="submit"
          >
            Search
          </S.SearchButton>
          { alertMessage && (
            <Alert
              variant="filled"
              severity="info"
              sx={ {
                width: '90%',
                maxWidth: '350px',
                my: 2,
              } }
            >
              { alertMessage }
            </Alert>
          ) }
        </S.Form>
      </CardContent>
    </Card>
  );
}
