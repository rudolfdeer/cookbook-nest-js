import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../../constants/routes';

type ResultListProps = {
  list: { name: string; id: number }[];
  setSearchInput: Dispatch<SetStateAction<string>>;
};

export default function ResultList(props: ResultListProps): JSX.Element {
  const { list, setSearchInput } = props;

  return (
    <ul className="header__search__result__list">
      {list.map((el) => (
        <li
          key={el.id}
          className="header__search__result__list__item"
          onClick={() => setSearchInput('')}
        >
          <Link to={`${ROUTES.PROFILE_USER}/${el.id}`}>{el.name}</Link>
        </li>
      ))}
    </ul>
  );
}
