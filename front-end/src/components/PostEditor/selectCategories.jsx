import { Checkbox,
  InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';
import useModal from '../../hooks/useModal';

export default function SelectCategories({ name, checkedOptions, onChangeField }) {
  const [categories, setCategories] = useState([]);

  const { writeResponseOnModal } = useModal();

  useEffect(() => {
    fetchAPI('GET', 'categories')
      .then(({ data }) => {
        const names = data.map((category) => category.name).sort();
        setCategories(names);
      })
      .catch(writeResponseOnModal);
  }, [writeResponseOnModal]);

  return (
    <>
      <InputLabel id={ `select-${name}` }>Categorias</InputLabel>
      <Select
        labelId={ `select-${name}` }
        name={ name }
        input={ <OutlinedInput label="Categorias" /> }
        renderValue={ (selected) => selected.join(', ') }
        value={ checkedOptions }
        onChange={ onChangeField }
        multiple
      >
        { categories.map((option) => (
          <MenuItem key={ option } value={ option }>
            <Checkbox checked={ checkedOptions.indexOf(option) >= 0 } />
            <ListItemText primary={ option } />
          </MenuItem>
        )) }
      </Select>
    </>
  );
}
