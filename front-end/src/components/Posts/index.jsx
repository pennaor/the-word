import { Alert, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserHeader from '../UserHeader';
import Post from './Post';
import NewPost from './NewPost';
import fetchAPI from '../../utils/fetchAPI';
import useModal from '../../hooks/useModal';
import useQuery from '../../hooks/useLocation';
import Loading from '../Loading';

export default function Posts() {
  const user = useSelector((state) => state.user);

  const [author, setAuthor] = useState();

  const query = useQuery();

  const { writeResponseOnModal } = useModal();

  useEffect(() => {
    const endpoint = `user/posts/${query.get('user') || user.id}`;
    fetchAPI('GET', endpoint)
      .then(({ data }) => {
        data.isUser = data.id === user.id;
        setAuthor(data);
      })
      .catch(writeResponseOnModal);
  }, [writeResponseOnModal, query, user.id]);

  return (
    <>
      <UserHeader />
      { author ? (
        <Grid
          container
          flexDirection="row"
          justifyContent="center"
          alignItems="baseline"
          gap={ 2 }
          my={ 2 }
          sx={ {
            backgroundColor: 'transparent',
          } }
        >
          { author.posts.length
            ? author.posts.map(({ id, title, content, published, categories }, i) => (
              <Grid
                item
                xs={ 11.2 }
                sm={ 5 }
                md={ 4 }
                lg={ 3 }
                key={ title + content + i }
              >
                <Post
                  postId={ id }
                  title={ title }
                  content={ content }
                  author={ author }
                  published={ new Date(published).toLocaleDateString() }
                  categories={
                    categories.sort((a, b) => {
                      const negativeInteger = -1;
                      if (b.name > a.name) {
                        return negativeInteger;
                      }
                      return 1;
                    })
                  }
                />
              </Grid>
            )) : (
              <Alert
                variant="filled"
                severity="info"
                sx={ {
                  width: '90%',
                  maxWidth: '350px',
                  my: 2,
                } }
              >
                { author.isUser
                  ? 'You have no posts yet!'
                  : `${author.displayName} has no posts yet!` }
              </Alert>
            ) }
          { author.isUser && <NewPost /> }
        </Grid>
      ) : (
        <Loading />
      ) }
    </>
  );
}
