import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../UserHeader';
import Post from './Post';
import Loading from '../Loading';
import fetchAPI from '../../utils/fetchAPI';
import useModal from '../../hooks/useModal';

export default function PostDetails() {
  const [post, setPost] = useState();

  const { id } = useParams();

  const { writeResponseOnModal } = useModal();

  useEffect(() => {
    fetchAPI('GET', `post/${id}`)
      .then(({ data }) => {
        setPost(data);
      })
      .catch(writeResponseOnModal);
  }, [id, writeResponseOnModal]);

  return post ? (
    <>
      <Header />
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
          <Post
            postId={ id }
            title={ post.title }
            author={ post.user }
            published={ new Date(post.published).toLocaleDateString() }
            content={ post.content }
            categories={
              post.categories.sort((a, b) => {
                const negativeInteger = -1;
                if (b.name > a.name) {
                  return negativeInteger;
                }
                return 1;
              })
            }
          />
        </Grid>
      </Grid>
    </>
  ) : <Loading />;
}
