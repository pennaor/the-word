import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../UserHeader';
import EditPost from './EditPost';
import Loading from '../Loading';
import fetchAPI from '../../utils/fetchAPI';
import useModal from '../../hooks/useModal';

export default function PostEditor() {
  const user = useSelector((state) => state.user);

  const { id } = useParams();

  const [post, setPost] = useState();

  const { writeOnModal, writeResponseOnModal } = useModal();

  useEffect(() => {
    fetchAPI('GET', `post/${id}`)
      .then(({ data }) => {
        if (data.user.id !== user.id) {
          return writeOnModal('Error!!', 'Not authorized', '/login');
        }
        setPost(data);
      })
      .catch(writeResponseOnModal);
  }, [id, writeOnModal, writeResponseOnModal, user.id]);

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
          <EditPost
            postId={ id }
            title={ post.title }
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
