import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../constants/routes';
import SearchBar from './SearchBar';
import { IUser } from '../../interfaces';

import './index.scss';

type HeaderProps = {
  user: IUser;
  getLoggedInUser: () => void;
};

export default function Header(props: HeaderProps): JSX.Element {
  const { user, getLoggedInUser } = props;
  const { t } = useTranslation();

  useEffect(() => getLoggedInUser(), []);

  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__nav__list">
          <li className="header__nav__list__item">
            <Link to={ROUTES.COOKBOOKS}>{t('COOKBOOKS')}</Link>
          </li>
          <li className="header__nav__list__item">
            <Link to={ROUTES.RECIPES}>{t('RECIPES')}</Link>
          </li>
        </ul>
      </nav>
      <SearchBar />
      {user ? (
        <button className="header__btn">
          <Link to={ROUTES.PROFILE_COOKBOOKS}>{t('CREATE_COOKBOOK_BTN')}</Link>
        </button>
      ) : (
        <button className="header__btn">
          <Link to={ROUTES.LOG_IN}>{t('CREATE_COOKBOOK_BTN')}</Link>
        </button>
      )}
      {user ? (
        <div className="header__login">
          <div className="header__login__icon"></div>
          <Link to={ROUTES.PROFILE_SETTINGS}>{user.name}</Link>
        </div>
      ) : (
        <div className="header__login">
          <Link to="/login">{t('SIGN_IN')}</Link>
        </div>
      )}
    </header>
  );
}
