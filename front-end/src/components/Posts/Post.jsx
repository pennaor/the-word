import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import User from './User';

export default function Post({ postId, title, author, published, content, categories }) {
  const history = useHistory();
  return (
    <Card>
      <CardContent
        sx={ {
          overflow: 'auto',
          height: {
            xs: 'fit-content',
            sm: '200px',
          },
          maxHeight: {
            xs: '200px',
          },
        } }
      >
        <Typography
          variant="h6"
          component="p"
          gutterBottom
          marginBottom={ 1 }
          textAlign="center"
        >
          { title }
        </Typography>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          sx={ {
            gap: '4px',
            border: '1px solid rgb(0 0 0 / 12%)',
            borderRadius: '5px',
            marginBottom: 2,
            p: 1,
          } }
        >
          <Grid item xs={ 5 } sm={ 5 }>
            <Typography
              variant="subtitle1"
              fontSize="0.90rem"
              textAlign="center"
            >
              { published }
            </Typography>
          </Grid>
          <Grid item xs={ 5 } sm={ 5 }>
            <User author={ author } />
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          paddingY={ 1 }
          textAlign="center"
        >
          { content }
        </Typography>
      </CardContent>

      <Divider />

      <Stack
        sx={ { overflow: 'auto', height: '60px' } }
        direction="row"
        spacing={ 0.5 }
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        padding="10px"
      >
        { categories.map(({ id, name }) => <Chip label={ name } key={ id } />) }
      </Stack>

      <Divider />

      <CardActions>
        <Button
          size="small"
          onClick={ () => history.push(`/post/${postId}`) }
        >
          Ler
        </Button>
      </CardActions>
    </Card>
  );
}
