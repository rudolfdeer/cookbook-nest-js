import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';
import userApi from '../../../helpers/api/userApi';
import ResultList from './ResultList';

import './index.scss';

export default function SearchBar(): JSX.Element {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await userApi.getAllUsers();
      setUsers(response);
    })();
  }, []);

  const usersList = users?.map((el) => ({
    name: el.name,
    id: el.id,
  }));

  const getResultList = () => {
    const result = usersList.filter((el) => el.name.toLowerCase().includes(inputValue.toLowerCase()));
    return result;
  };

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setInputValue(value);
  };

  return (
    <div className="header__search">
      <div className="header__search__icon" />
      <input
        type="text"
        value={inputValue}
        className="header__search__input"
        onChange={(e) => {
          handleChange(e);
          debounce(() => setList(getResultList()), 2000)();
        }}
        placeholder={t('SEARCH_USERS')}
      />
      {inputValue.length > 0 && list.length > 0 ? (
        <div className="header__search__result">
          <ResultList list={list} setSearchInput={setInputValue} />
        </div>
      ) : null}
    </div>
  );
}
