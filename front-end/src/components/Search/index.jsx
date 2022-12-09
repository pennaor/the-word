import { Grid } from '@mui/material';
import React, { useState } from 'react';
import UserHeader from '../UserHeader';
import SearchPost from './searchPost';
import Post from './Post';

export default function Search() {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <UserHeader />
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
        <Grid
          item
          xs={ 11.2 }
          sm={ 5 }
          md={ 4 }
          lg={ 3 }
        >
          <SearchPost setPosts={ setPosts } />
        </Grid>
      </Grid>
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
        { !!posts.length
          && posts.map(({ id, title, content, user, published, categories }, i) => (
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
                author={ user }
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
          ))}
      </Grid>
    </>
  );
}
