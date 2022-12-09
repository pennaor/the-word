import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  Divider,
  FormControl,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import fetchAPI from '../../utils/fetchAPI';
import useModal from '../../hooks/useModal';
import SelectCategories from './selectCategories';

export default function EditPost({ postId, title, content, categories }) {
  const [form, setFormValue] = useState({
    title,
    content,
    categoryNames: categories.map(({ name }) => name),
  });

  const { writeResponseOnModal } = useModal();

  const history = useHistory();

  const onChangeField = ({ target: { name, value } }) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const redirectToPostDetails = () => history.push(`/post/${postId}`);

  const onEditPost = (ev) => {
    ev.preventDefault();
    fetchAPI('PUT', `post/${postId}`, form)
      .then(redirectToPostDetails)
      .catch(writeResponseOnModal);
  };

  return (
    <Card>
      <form onSubmit={ onEditPost }>
        <FormControl
          fullWidth
          sx={ {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            padding: '20px 6px',
          } }
        >
          <S.Input
            type="text"
            name="title"
            label="Título"
            placeholder="Insira o título de sua publicação"
            value={ form.title }
            onChange={ onChangeField }
            autoFocus
            required
          />
          <S.Input
            type="text"
            label="Conteúdo"
            name="content"
            placeholder="Insira o conteúdo de sua publicação"
            value={ form.content }
            onChange={ onChangeField }
            multiline
            required
          />

        </FormControl>
        <Divider sx={ { width: '100%' } } />

        {/* <Stack
          direction="row"
          spacing={ 0.5 }
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          padding="10px"
        >
          { categories.map(({ id, name }) => <Chip label={ name } key={ id } />) }
        </Stack> */}

        <S.MultipleSelect>
          <SelectCategories
            name="categoryNames"
            checkedOptions={ form.categoryNames }
            onChangeField={ onChangeField }
          />
        </S.MultipleSelect>

        <Divider sx={ { width: '100%' } } />

        <CardActions>
          <Button
            type="submit"
            size="small"
          >
            Editar
          </Button>
          <Button
            type="button"
            size="small"
            color="error"
            onClick={ redirectToPostDetails }
          >
            Cancelar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
