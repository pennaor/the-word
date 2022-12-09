import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserHeader from '../UserHeader';
import * as S from './styles';
import useModal from '../../hooks/useModal';
import SelectCategories from './selectCategories';
import fetchAPI from '../../utils/fetchAPI';

export default function NewPost() {
  const [form, setFormValue] = useState({
    title: '',
    content: '',
    categoryNames: [],
  });

  const { writeResponseOnModal } = useModal();

  const history = useHistory();

  const onChangeField = ({ target: { name, value } }) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const onCreatePost = (ev) => {
    ev.preventDefault();
    fetchAPI('POST', 'post', form)
      .then(({ data }) => history.push(`/post/${data.id}`))
      .catch(writeResponseOnModal);
  };

  return (
    <>
      <UserHeader />
      <S.Form onSubmit={ onCreatePost }>
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
        <S.MultipleSelect>
          <SelectCategories
            name="categoryNames"
            checkedOptions={ form.categoryNames }
            onChangeField={ onChangeField }
          />
        </S.MultipleSelect>
        <S.EditButton
          type="submit"
        >
          Criar
        </S.EditButton>
        <S.CancelButton
          type="button"
          onClick={ () => history.push('/posts') }
        >
          Cancelar
        </S.CancelButton>
      </S.Form>
    </>
  );
}
